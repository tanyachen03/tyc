import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getProjectById } from '../data/projects';
import { runPythonCode } from '../utils/pyodide';
import { saveProjectProgress, getProjectProgress, saveChatHistory, getChatHistory, ChatMessage } from '../utils/storage';

interface ProjectDetailPageProps {
  // 可以添加额外的props
}

export function ProjectDetailPage({}: ProjectDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id!);
  
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (project) {
      // 加载保存的代码和聊天记录
      const progress = getProjectProgress(project.id);
      setCode(progress.code || project.datasetCode);
      setCompleted(progress.completed);
      const chatHistory = getChatHistory(project.id);
      setMessages(chatHistory);
      setIsLoading(false);
    }
  }, [project]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    try {
      const result = await runPythonCode(code);
      if (result.success) {
        setOutput(JSON.stringify(result.result, null, 2));
      } else {
        setOutput(`Error: ${result.error}`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveCode = () => {
    if (project) {
      saveProjectProgress(project.id, { code, completed });
      alert('代码已保存');
    }
  };

  const handleToggleComplete = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    if (project) {
      saveProjectProgress(project.id, { code, completed: newCompleted });
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || !project) return;
    
    const newMessage: ChatMessage = {
      role: 'user',
      content: userInput,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setUserInput('');
    
    // 模拟AI响应（实际项目中会调用Cloudflare Workers）
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        role: 'assistant',
        content: `我是你的AI数据分析教练。关于你提出的问题："${userInput}"，我建议你：\n\n1. 先仔细分析数据结构\n2. 尝试使用基本的统计方法\n3. 查看相关文档和示例\n\n记住，重要的是培养数据分析思维，而不仅仅是编写代码。`,
        timestamp: Date.now()
      };
      setMessages(prev => {
        const updated = [...prev, aiResponse];
        saveChatHistory(project.id, updated);
        return updated;
      });
    }, 1000);
  };

  if (isLoading || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            数据分析AI训练平台
          </Link>
          <Link to="/projects" className="text-blue-600 hover:text-blue-800">
            返回项目列表
          </Link>
        </div>
      </div>

      {/* 项目详情 */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                {project.difficulty === 'beginner' ? '初级' : project.difficulty === 'intermediate' ? '中级' : '高级'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleComplete}
                className={`px-4 py-2 rounded-lg font-medium ${completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
              >
                {completed ? '已完成' : '标记完成'}
              </button>
              <button
                onClick={handleSaveCode}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                保存代码
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">任务清单</h2>
            <ul className="space-y-2">
              {project.tasks.map((task, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{task}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-3"
            >
              <svg className={`w-5 h-5 mr-2 transition-transform ${showHints ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              查看提示
            </button>
            {showHints && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <h3 className="font-semibold text-yellow-800 mb-2">提示：</h3>
                <ul className="space-y-2 text-yellow-700">
                  {project.hints.map((hint, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-yellow-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 代码编辑器和输出 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 代码编辑器 */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-between items-center bg-gray-100 px-4 py-3 border-b">
              <h3 className="font-semibold text-gray-700">代码编辑器</h3>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium ${isRunning ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
              >
                {isRunning ? '运行中...' : '运行代码'}
              </button>
            </div>
            <div className="h-[600px]">
              <Editor
                height="100%"
                language="python"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: true },
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  tabSize: 4,
                  automaticLayout: true
                }}
              />
            </div>
          </div>

          {/* 输出和AI */}
          <div className="flex flex-col gap-6">
            {/* 输出区域 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex-1">
              <div className="bg-gray-100 px-4 py-3 border-b">
                <h3 className="font-semibold text-gray-700">运行结果</h3>
              </div>
              <div className="p-4 h-[300px] overflow-auto bg-gray-50 font-mono text-sm">
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>
            </div>

            {/* AI 助手 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex justify-between items-center bg-gray-100 px-4 py-3 border-b">
                <h3 className="font-semibold text-gray-700">AI 助手</h3>
                <button
                  onClick={() => setShowAI(!showAI)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {showAI ? '收起' : '展开'}
                </button>
              </div>
              {showAI && (
                <div className="h-[300px] flex flex-col">
                  {/* 聊天记录 */}
                  <div className="flex-1 p-4 overflow-auto bg-gray-50">
                    {messages.map((message, index) => (
                      <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block max-w-[80%] p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* 输入区域 */}
                  <div className="p-4 border-t flex gap-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="输入你的问题..."
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      发送
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
