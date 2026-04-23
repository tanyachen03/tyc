import React, { useState } from 'react';
import { CodeExample, codeExamples } from '../data/examples';
import CodeEditor from '../components/CodeEditor';

const Examples: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<CodeExample | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('全部');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 提取所有唯一的分类
  React.useEffect(() => {
    const uniqueCategories = ['全部', ...new Set(codeExamples.map(example => example.category))];
    setCategories(uniqueCategories);
  }, []);

  // 当选择示例时更新代码
  React.useEffect(() => {
    if (selectedExample) {
      setCode(selectedExample.code);
    }
  }, [selectedExample]);

  // 过滤示例
  const filteredExamples = codeExamples.filter(example => {
    const matchesCategory = selectedCategory === '全部' || example.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === '全部' || example.difficulty === selectedDifficulty;
    const matchesSearch = example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        example.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  // 运行代码
  const runCode = async () => {
    setLoading(true);
    setOutput('');
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
        setOutput(data.output);
      } else {
        setOutput(data.error);
      }
    } catch (error) {
      setOutput('运行代码时出错');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Python代码示例库</h1>

        {/* 搜索和筛选 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                搜索示例
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入关键词搜索"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                分类
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                难度
              </label>
              <select
                id="difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="全部">全部</option>
                <option value="beginner">初级</option>
                <option value="intermediate">中级</option>
                <option value="advanced">高级</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 示例列表 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">代码示例 ({filteredExamples.length})</h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredExamples.map((example) => (
                  <div
                    key={example.id}
                    onClick={() => setSelectedExample(example)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedExample?.id === example.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                  >
                    <h3 className="font-medium text-gray-900">{example.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{example.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{example.category}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${example.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : example.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {example.difficulty === 'beginner' ? '初级' : example.difficulty === 'intermediate' ? '中级' : '高级'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 代码编辑器和运行 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {selectedExample ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedExample.title}</h2>
                    <button
                      onClick={runCode}
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? '运行中...' : '运行代码'}
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4">{selectedExample.description}</p>
                  <div className="mb-4">
                    <CodeEditor
                      value={code}
                      onChange={setCode}
                      language="python"
                      height="400px"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">运行结果</h3>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm whitespace-pre-wrap min-h-[100px]">
                      {output || '点击"运行代码"按钮查看结果'}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">选择一个代码示例</h3>
                  <p className="text-gray-600">从左侧列表中选择一个Python代码示例来查看和运行</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;