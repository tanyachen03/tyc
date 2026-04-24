import express, { type Request, type Response, type NextFunction } from 'express';
import { spawn } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';

const router = express.Router();

interface RunCodeRequest {
  code: string;
}

router.post(
  '/run',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { code }: RunCodeRequest = req.body;

      if (!code) {
        res.status(400).json({
          success: false,
          error: '代码不能为空',
        });
        return;
      }

      // 限制代码长度，防止滥用
      if (code.length > 10000) {
        res.status(400).json({
          success: false,
          error: '代码长度超过限制',
        });
        return;
      }

      // 安全检查：禁止使用危险模块
      const dangerousModules = ['os', 'subprocess', 'sys', 'shutil', 'glob', 'tempfile', 'socket', 'http', 'urllib', 'requests'];
      for (const module of dangerousModules) {
        if (code.includes(`import ${module}`) || code.includes(`from ${module} import`)) {
          res.status(400).json({
            success: false,
            error: '禁止使用危险模块',
          });
          return;
        }
      }

      // 安全检查：禁止使用危险函数
      const dangerousFunctions = ['exec', 'eval', 'compile', 'open', 'file', '__import__'];
      for (const func of dangerousFunctions) {
        if (code.includes(func + '(')) {
          res.status(400).json({
            success: false,
            error: '禁止使用危险函数',
          });
          return;
        }
      }

      // 运行Python代码
      const result = await runPythonCode(code);

      res.status(200).json({
        success: true,
        result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: '运行代码时出错',
      });
    }
  },
);

interface ValidateCodeRequest {
  code: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
}

router.post(
  '/validate',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { code, testCases }: ValidateCodeRequest = req.body;

      if (!code) {
        res.status(400).json({
          success: false,
          error: '代码不能为空',
        });
        return;
      }

      if (!testCases || testCases.length === 0) {
        res.status(400).json({
          success: false,
          error: '测试用例不能为空',
        });
        return;
      }

      // 限制代码长度，防止滥用
      if (code.length > 10000) {
        res.status(400).json({
          success: false,
          error: '代码长度超过限制',
        });
        return;
      }

      // 安全检查：禁止使用危险模块
      const dangerousModules = ['os', 'subprocess', 'sys', 'shutil', 'glob', 'tempfile', 'socket', 'http', 'urllib', 'requests'];
      for (const module of dangerousModules) {
        if (code.includes(`import ${module}`) || code.includes(`from ${module} import`)) {
          res.status(400).json({
            success: false,
            error: '禁止使用危险模块',
          });
          return;
        }
      }

      // 安全检查：禁止使用危险函数
      const dangerousFunctions = ['exec', 'eval', 'compile', 'open', 'file', '__import__'];
      for (const func of dangerousFunctions) {
        if (code.includes(func + '(')) {
          res.status(400).json({
            success: false,
            error: '禁止使用危险函数',
          });
          return;
        }
      }

      // 验证代码
      const validationResult = await validatePythonCode(code, testCases);

      res.status(200).json({
        success: true,
        isCorrect: validationResult.isCorrect,
        message: validationResult.message,
        testResults: validationResult.testResults,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: '验证代码时出错',
      });
    }
  },
);

async function runPythonCode(code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // 创建临时目录
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'python-'));
    const tempFile = path.join(tempDir, 'code.py');

    try {
      // 写入代码到临时文件
      fs.writeFileSync(tempFile, code);

      // 运行Python代码，限制资源使用
      const pythonProcess = spawn('python3', ['-c', `
import resource
# 限制内存使用（256MB）
resource.setrlimit(resource.RLIMIT_AS, (256 * 1024 * 1024, 256 * 1024 * 1024))
# 限制CPU时间（5秒）
resource.setrlimit(resource.RLIMIT_CPU, (5, 5))

# 执行用户代码
with open('${tempFile.replace(/'/g, "'\\''")}', 'r') as f:
    exec(f.read())
`]);

      let output = '';
      let errorOutput = '';

      pythonProcess.stdout.on('data', (data) => {
        // 限制输出大小
        if (output.length < 10000) {
          output += data.toString();
        }
      });

      pythonProcess.stderr.on('data', (data) => {
        // 限制错误输出大小
        if (errorOutput.length < 10000) {
          errorOutput += data.toString();
        }
      });

      pythonProcess.on('close', (code) => {
        // 清理临时文件
        try {
          fs.unlinkSync(tempFile);
          fs.rmdirSync(tempDir);
        } catch (err) {
          // 忽略清理错误
        }

        if (code === 0) {
          resolve(output || '代码执行成功，无输出');
        } else {
          resolve(`错误: ${errorOutput || '未知错误'}`);
        }
      });

      pythonProcess.on('error', (error) => {
        // 清理临时文件
        try {
          fs.unlinkSync(tempFile);
          fs.rmdirSync(tempDir);
        } catch (err) {
          // 忽略清理错误
        }
        reject(error);
      });

      // 设置超时，防止代码运行时间过长
      setTimeout(() => {
        pythonProcess.kill();
        // 清理临时文件
        try {
          fs.unlinkSync(tempFile);
          fs.rmdirSync(tempDir);
        } catch (err) {
          // 忽略清理错误
        }
        resolve('错误: 代码运行超时');
      }, 5000);
    } catch (error) {
      // 清理临时文件
      try {
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
        if (fs.existsSync(tempDir)) {
          fs.rmdirSync(tempDir);
        }
      } catch (err) {
        // 忽略清理错误
      }
      reject(error);
    }
  });
}

async function validatePythonCode(code: string, testCases: Array<{ input: string; expectedOutput: string }>): Promise<{
  isCorrect: boolean;
  message: string;
  testResults: Array<{
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
  }>;
}> {
  const testResults = [];
  let allPassed = true;

  for (const testCase of testCases) {
    try {
      // 创建临时目录
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'python-'));
      const tempFile = path.join(tempDir, 'code.py');

      // 准备测试代码
      const testCode = `
import resource
# 限制内存使用（256MB）
resource.setrlimit(resource.RLIMIT_AS, (256 * 1024 * 1024, 256 * 1024 * 1024))
# 限制CPU时间（5秒）
resource.setrlimit(resource.RLIMIT_CPU, (5, 5))

${code}

# 执行测试
${testCase.input}
`;

      // 写入代码到临时文件
      fs.writeFileSync(tempFile, testCode);

      // 运行Python代码
      const pythonProcess = spawn('python3', [tempFile]);

      let output = '';
      let errorOutput = '';

      pythonProcess.stdout.on('data', (data) => {
        if (output.length < 10000) {
          output += data.toString();
        }
      });

      pythonProcess.stderr.on('data', (data) => {
        if (errorOutput.length < 10000) {
          errorOutput += data.toString();
        }
      });

      await new Promise<void>((resolve) => {
        pythonProcess.on('close', () => resolve());
        pythonProcess.on('error', () => resolve());

        // 设置超时
        setTimeout(() => {
          pythonProcess.kill();
          resolve();
        }, 5000);
      });

      // 清理临时文件
      try {
        fs.unlinkSync(tempFile);
        fs.rmdirSync(tempDir);
      } catch (err) {
        // 忽略清理错误
      }

      const actualOutput = errorOutput || output;
      const passed = actualOutput.trim() === testCase.expectedOutput.trim();
      allPassed &&= passed;

      testResults.push({
        input: testCase.input,
        expected: testCase.expectedOutput,
        actual: actualOutput.trim(),
        passed,
      });
    } catch (error) {
      testResults.push({
        input: testCase.input,
        expected: testCase.expectedOutput,
        actual: `错误: ${error instanceof Error ? error.message : '未知错误'}`,
        passed: false,
      });
      allPassed = false;
    }
  }

  return {
    isCorrect: allPassed,
    message: allPassed ? '所有测试用例通过！' : '部分测试用例失败，请检查代码',
    testResults,
  };
}

export default router;