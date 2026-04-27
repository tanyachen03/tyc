import { useState } from 'react'
import { BarChart2, Clock } from 'lucide-react'

const Assessments = () => {
  const [activeAssessment, setActiveAssessment] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const assessments = [
    {
      id: 1,
      title: 'Python基础测试',
      description: '测试你对Python基础语法和概念的理解',
      totalQuestions: 10,
      passingScore: 70,
      timeLimit: 30,
      level: 'beginner'
    },
    {
      id: 2,
      title: '数据分析基础测试',
      description: '测试你对数据分析基本方法的掌握程度',
      totalQuestions: 15,
      passingScore: 70,
      timeLimit: 45,
      level: 'beginner'
    },
    {
      id: 3,
      title: '商务数据分析测试',
      description: '测试你在商务场景中应用数据分析的能力',
      totalQuestions: 20,
      passingScore: 75,
      timeLimit: 60,
      level: 'intermediate'
    }
  ]

  const questions = [
    {
      id: 1,
      question: 'Python中以下哪个不是内置数据类型？',
      options: ['list', 'dict', 'set', 'array'],
      correctAnswer: 'array'
    },
    {
      id: 2,
      question: '以下哪个函数用于读取文件？',
      options: ['open()', 'read()', 'load()', 'import()'],
      correctAnswer: 'open()'
    },
    {
      id: 3,
      question: 'Python中如何定义一个函数？',
      options: ['function def()', 'def function()', 'def() function', 'function() def'],
      correctAnswer: 'def function()'
    },
    {
      id: 4,
      question: '以下哪个库用于数据可视化？',
      options: ['numpy', 'pandas', 'matplotlib', 'scikit-learn'],
      correctAnswer: 'matplotlib'
    },
    {
      id: 5,
      question: 'Python中用于安装包的命令是？',
      options: ['pip install', 'npm install', 'apt install', 'brew install'],
      correctAnswer: 'pip install'
    },
    {
      id: 6,
      question: '以下哪个是Python的集成开发环境？',
      options: ['VS Code', 'PyCharm', 'Jupyter Notebook', '所有选项都是'],
      correctAnswer: '所有选项都是'
    },
    {
      id: 7,
      question: 'Python中处理数据框的库是？',
      options: ['numpy', 'pandas', 'scipy', 'tensorflow'],
      correctAnswer: 'pandas'
    },
    {
      id: 8,
      question: '以下哪个符号用于Python中的注释？',
      options: ['//', '/* */', '#', '--'],
      correctAnswer: '#'
    },
    {
      id: 9,
      question: 'Python中如何创建一个空列表？',
      options: ['list = []', 'list = list()', 'list = {}', '选项A和B都正确'],
      correctAnswer: '选项A和B都正确'
    },
    {
      id: 10,
      question: '以下哪个不是Python的循环结构？',
      options: ['for', 'while', 'do-while', '都不是'],
      correctAnswer: 'do-while'
    }
  ]

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleSubmit = () => {
    // 模拟提交测评
    alert('测评提交成功！')
    setActiveAssessment(null)
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">测评中心</h1>
        
        {!activeAssessment ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="card hover:transform hover:scale-105">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BarChart2 size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{assessment.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{assessment.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">题目数量</span>
                    <span className="font-medium">{assessment.totalQuestions} 题</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">及格分数</span>
                    <span className="font-medium">{assessment.passingScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">时间限制</span>
                    <span className="font-medium">{assessment.timeLimit} 分钟</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">难度等级</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${assessment.level === 'beginner' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {assessment.level === 'beginner' ? '入门' : '中级'}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveAssessment(assessment.id)}
                  className="btn btn-primary w-full"
                >
                  开始测评
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{assessments.find(a => a.id === activeAssessment)?.title}</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-600" />
                  <span className="font-medium">25:00</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{currentQuestion + 1}/{questions.length}</span>
                </div>
              </div>
            </div>
            
            {/* Question */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h3>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${questions[currentQuestion].id}`}
                        value={option}
                        checked={answers[questions[currentQuestion].id] === option}
                        onChange={() => handleAnswer(questions[currentQuestion].id, option)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span>{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button 
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一题
              </button>
              <div className="flex space-x-1">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${currentQuestion === index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              {currentQuestion === questions.length - 1 ? (
                <button 
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  提交测评
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                  className="btn btn-primary"
                >
                  下一题
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Past Results */}
        <div className="card mt-8">
          <h2 className="text-xl font-semibold mb-4">历史测评结果</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">测评名称</th>
                  <th className="text-left py-3 px-4">分数</th>
                  <th className="text-left py-3 px-4">状态</th>
                  <th className="text-left py-3 px-4">完成时间</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">Python基础测试</td>
                  <td className="py-3 px-4">85%</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">通过</span>
                  </td>
                  <td className="py-3 px-4">2026-04-18 14:30</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">数据分析基础测试</td>
                  <td className="py-3 px-4">75%</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">通过</span>
                  </td>
                  <td className="py-3 px-4">2026-04-15 10:15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assessments