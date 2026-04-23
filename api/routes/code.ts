import express, { type Request, type Response, type NextFunction } from 'express';
import { spawn } from 'child_process';
import { promisify } from 'util';

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
      const dangerousModules = ['os', 'subprocess', 'sys', 'shutil', 'glob', 'tempfile'];
      for (const module of dangerousModules) {
        if (code.includes(`import ${module}`) || code.includes(`from ${module} import`)) {
          res.status(400).json({
            success: false,
            error: '禁止使用危险模块',
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

async function runPythonCode(code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', ['-c', code]);
    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(output || '代码执行成功，无输出');
      } else {
        resolve(`错误: ${errorOutput || '未知错误'}`);
      }
    });

    pythonProcess.on('error', (error) => {
      reject(error);
    });

    // 设置超时，防止代码运行时间过长
    setTimeout(() => {
      pythonProcess.kill();
      resolve('错误: 代码运行超时');
    }, 5000);
  });
}

export default router;