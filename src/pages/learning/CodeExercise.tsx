import React, { useState } from 'react';
import { useProgress } from '../../hooks/useProgress';
import CodeEditor from '../../components/CodeEditor';

// 代码练习数据
const codeExercises = [
  {
    id: 'code-ex1',
    title: 'Hello World 练习',
    description: '编写一个Python程序，输出"Hello, World!"',
    difficulty: 'beginner',
    testCases: [
      {
        input: '',
        expectedOutput: 'Hello, World!'
      }
    ],
    hint: '使用print()函数输出文本'
  },
  {
    id: 'code-ex2',
    title: '求和函数练习',
    description: '编写一个函数sum_numbers，接收一个数字列表，返回列表中所有数字的和',
    difficulty: 'beginner',
    testCases: [
      {
        input: '[1, 2, 3, 4, 5]',
        expectedOutput: '15'
      },
      {
        input: '[10, 20, 30]',
        expectedOutput: '60'
      },
      {
        input: '[]',
        expectedOutput: '0'
      }
    ],
    hint: '使用for循环遍历列表，累加每个元素'
  },
  {
    id: 'code-ex3',
    title: '质数判断练习',
    description: '编写一个函数is_prime，判断一个数是否为质数',
    difficulty: 'intermediate',
    testCases: [
      {
        input: '7',
        expectedOutput: 'True'
      },
      {
        input: '10',
        expectedOutput: 'False'
      },
      {
        input: '2',
        expectedOutput: 'True'
      }
    ],
    hint: '质数是只能被1和自身整除的大于1的自然数'
  }
];

const CodeExercise: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    testResults: Array<{
      input: string;
      expected: string;
      actual: string;
      passed: boolean;
    }>;
  } | null>(null);

  // 获取和更新练习进度
  const { progress, completed, updateProgress } = useProgress(
    selectedExercise?.id || 'code-exercises',
    'code-exercise'
  );

  const handleExerciseSelect = (exercise: any) => {
    setSelectedExercise(exercise);
    setCode('');
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!selectedExercise) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/code/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          testCases: selectedExercise.testCases
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          success: data.isCorrect,
          message: data.message,
          testResults: data.testResults
        });

        // 更新进度
        const exerciseProgress = data.isCorrect ? 100 : 0;
        updateProgress(exerciseProgress, data.isCorrect);
      } else {
        setResult({
          success: false,
          message: data.error || '验证代码时发生错误',
          testResults: []
        });
      }
    } catch (err) {
      setResult({
        success: false,
        message: '验证代码时发生错误',
        testResults: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedExercise(null);
    setCode('');
    setResult(null);
  };

  // 渲染练习列表
  if (!selectedExercise) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">代码练习</h1>
            <p className="text-gray-600">通过编写代码巩固Python知识点</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {codeExercises.map(exercise => {
              const { progress: exProgress, completed: exCompleted } = useProgress(
                exercise.id,
                'code-exercise'
              );

              return (
                <div 
                  key={exercise.id} 
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleExerciseSelect(exercise)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{exercise.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      exercise.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {exercise.difficulty === 'beginner' ? '基础' :
                       exercise.difficulty === 'intermediate' ? '中级' : '高级'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{exercise.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{exercise.testCases.length} 个测试用例</span>
                    {exCompleted ? (
                      <span className="text-sm text-green-600 font-medium">已完成</span>
                    ) : (
                      <span className="text-sm text-gray-600">{exProgress}% 完成</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 渲染练习详情
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToList}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300"
          >
            ← 返回练习列表
          </button>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            selectedExercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            selectedExercise.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {selectedExercise.difficulty === 'beginner' ? '基础' :
             selectedExercise.difficulty === 'intermediate' ? '中级' : '高级'}
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedExercise.title}</h2>
          <p className="text-gray-600 mb-6">{selectedExercise.description}</p>

          {selectedExercise.hint && (
            <div className="mb-6 p-4 bg-blue-50 rounded-md">
              <h4 className="text-sm font-medium text-blue-800 mb-2">提示</h4>
              <p className="text-sm text-blue-700">{selectedExercise.hint}</p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">编写代码</h3>
            <CodeEditor
              value={code}
              onChange={setCode}
              height="400px"
              placeholder="编写Python代码..."
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">测试用例</h3>
            <div className="space-y-2">
              {selectedExercise.testCases.map((testCase, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">输入:</span> {testCase.input}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">预期输出:</span> {testCase.expectedOutput}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '验证中...' : '提交验证'}
            </button>
          </div>

          {result && (
            <div className={`mt-8 p-4 rounded-md ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
              <h3 className="text-lg font-medium text-gray-900 mb-2">验证结果</h3>
              <p className={`mb-4 ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                {result.message}
              </p>
              {result.testResults.length > 0 && (
                <div className="space-y-3">
                  {result.testResults.map((testResult, index) => (
                    <div key={index} className={`p-3 rounded-md ${testResult.passed ? 'bg-green-50' : 'bg-red-50'}`}>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">测试用例 {index + 1}:</span> {testResult.passed ? '通过' : '失败'}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">输入:</span> {testResult.input}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">预期输出:</span> {testResult.expected}
                      </p>
                      <p className={`text-sm ${testResult.passed ? 'text-green-600' : 'text-red-600'}`}>
                        <span className="font-medium">实际输出:</span> {testResult.actual}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeExercise;