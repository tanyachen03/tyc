import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';

const CodeRunner: React.FC = () => {
  const [code, setCode] = useState<string>('print("Hello, Python!")');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleRunCode = async () => {
    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/code/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('运行代码时发生错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">代码编辑器</h1>
          <p className="text-gray-600">在线编写和运行Python代码</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <CodeEditor
              value={code}
              onChange={setCode}
              placeholder="编写Python代码..."
            />
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={handleRunCode}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '运行中...' : '运行代码'}
            </button>
          </div>

          {error && (
            <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">运行结果</h3>
            <div className="bg-gray-100 rounded-md p-4 min-h-32 font-mono text-sm">
              {result || '运行代码查看结果'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeRunner;