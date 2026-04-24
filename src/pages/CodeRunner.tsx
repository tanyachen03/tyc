import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';

// 示例代码
const examples = [
  {
    id: 'example-1',
    title: 'Hello World',
    code: `print("Hello, Python!")`
  },
  {
    id: 'example-2',
    title: '基本数据类型',
    code: `# 数字
x = 10
y = 3.14

# 字符串
name = "Python"

# 列表
numbers = [1, 2, 3, 4, 5]

# 打印
print(x, y, name)
print(numbers)`
  },
  {
    id: 'example-3',
    title: '条件语句',
    code: `age = 18

if age >= 18:
    print("成年人")
elif age >= 13:
    print("青少年")
else:
    print("儿童")`
  },
  {
    id: 'example-4',
    title: '循环',
    code: `# for 循环
for i in range(5):
    print(i)

# while 循环
count = 0
while count < 3:
    print(count)
    count += 1`
  },
  {
    id: 'example-5',
    title: '函数',
    code: `def greet(name):
    return f"Hello, {name}!"

print(greet("Python"))

# 带默认参数的函数
def add(a, b=10):
    return a + b

print(add(5))
print(add(5, 20))`
  }
];

const CodeRunner: React.FC = () => {
  const [code, setCode] = useState<string>('print("Hello, Python!")');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'result' | 'examples'>('result');
  const [selectedExample, setSelectedExample] = useState<string>('example-1');

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

  const handleExampleSelect = (exampleId: string) => {
    setSelectedExample(exampleId);
    const example = examples.find(e => e.id === exampleId);
    if (example) {
      setCode(example.code);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">代码实操场</h1>
          <p className="text-gray-600">在线编写和运行Python代码</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* 左侧代码编辑器 */}
            <div className="w-full lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">代码编辑器</h3>
              <CodeEditor
                value={code}
                onChange={setCode}
                height="500px"
                placeholder="编写Python代码..."
              />
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleRunCode}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '运行中...' : '运行代码'}
                </button>
              </div>
            </div>

            {/* 右侧结果/示例 */}
            <div className="w-full lg:w-1/2 p-6">
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  onClick={() => setActiveTab('result')}
                  className={`px-4 py-2 font-medium ${activeTab === 'result' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  运行结果
                </button>
                <button
                  onClick={() => setActiveTab('examples')}
                  className={`px-4 py-2 font-medium ${activeTab === 'examples' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  示例代码
                </button>
              </div>

              {activeTab === 'result' ? (
                <div>
                  {error && (
                    <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-md">
                      {error}
                    </div>
                  )}
                  <div className="bg-gray-100 rounded-md p-4 min-h-[500px] font-mono text-sm">
                    {result || '运行代码查看结果'}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">选择示例：</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {examples.map(example => (
                        <button
                          key={example.id}
                          onClick={() => handleExampleSelect(example.id)}
                          className={`p-2 text-left rounded-md text-sm ${selectedExample === example.id ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                        >
                          {example.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-md p-4 min-h-[400px] font-mono text-sm">
                    {examples.find(e => e.id === selectedExample)?.code || ''}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeRunner;