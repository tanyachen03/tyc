import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { getTrainingProjectById } from '../data/trainingProjects';
import { initPyodide, runPythonCode } from '../utils/pyodide';
import { saveTrainingProgress, getTrainingProgress } from '../utils/storage';

export function TrainingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = getTrainingProjectById(id || '');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'description' | 'challenges'>('code');

  useEffect(() => {
    if (project) {
      const savedProgress = getTrainingProgress(project.id);
      setCode(savedProgress || project.starterCode);
    }
  }, [project]);

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        await initPyodide();
        setIsPyodideReady(true);
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setOutput('警告：Pyodide 加载失败，部分功能可能不可用。');
      }
    };
    loadPyodide();
  }, []);

  const handleRunCode = async () => {
    if (!isPyodideReady) {
      setOutput('Pyodide 正在加载中，请稍候...');
      return;
    }

    setIsRunning(true);
    setOutput('正在运行代码...\n');

    try {
      const result = await runPythonCode(code);
      if (result.success) {
        setOutput(prev => prev + JSON.stringify(result.result, null, 2));
      } else {
        setOutput(prev => prev + '错误：' + result.error);
      }
    } catch (error) {
      setOutput(prev => prev + '运行时错误：' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveProgress = () => {
    if (project) {
      saveTrainingProgress(project.id, code);
      setOutput(prev => prev + '\n✅ 进度已保存！');
    }
  };

  const handleResetCode = () => {
    if (project && confirm('确定要重置代码吗？您的修改将丢失。')) {
      setCode(project.starterCode);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '初级':
        return 'bg-green-100 text-green-700 border-green-200';
      case '中级':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case '进阶':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => (
      <span key={i} className="text-yellow-500">⭐</span>
    ));
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">项目未找到</h2>
          <Link to="/training" className="text-blue-600 hover:text-blue-800 font-semibold">
            返回项目列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                to="/training"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{project.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                  <div className="flex items-center gap-0.5">{renderStars(project.stars)}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleResetCode}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                重置
              </button>
              <button
                onClick={handleSaveProgress}
                className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl transition-all duration-200 font-semibold"
              >
                💾 保存
              </button>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 rounded-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isRunning ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    运行中...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    运行
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* 左侧面板 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 标签页 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-200 ${activeTab === 'description' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  项目介绍
                </button>
                <button
                  onClick={() => setActiveTab('challenges')}
                  className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-200 ${activeTab === 'challenges' ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-500' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  扩展挑战
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">项目描述</h3>
                      <p className="text-gray-600 leading-relaxed">{project.description}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        学习目标
                      </h3>
                      <ul className="space-y-2">
                        {project.learningObjectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        核心功能
                      </h3>
                      <ul className="space-y-2">
                        {project.coreFeatures.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'challenges' && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      扩展挑战
                    </h3>
                    <div className="space-y-3">
                      {project.extensionChallenges.map((challenge, index) => (
                        <div key={index} className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <p className="text-sm text-purple-800 leading-relaxed">{challenge}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 右侧代码和输出区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 代码编辑器 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-900 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <span className="text-gray-400 text-sm ml-2">main.py</span>
              </div>
              <div className="h-96 border-b border-gray-100">
                <Editor
                  height="100%"
                  defaultLanguage="python"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>
            </div>

            {/* 输出区域 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  输出
                </h3>
                <button
                  onClick={() => setOutput('')}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  清空
                </button>
              </div>
              <div className="h-48 p-4 bg-gray-900 overflow-auto">
                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{output || '运行代码后，结果将显示在这里...'}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
