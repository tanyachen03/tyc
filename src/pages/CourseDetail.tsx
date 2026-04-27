import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Book, Play, Check, ChevronLeft, Code, BarChart2 } from 'lucide-react'

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [activeLesson, setActiveLesson] = useState<number>(1)

  const course = {
    id: Number(id),
    title: 'Python基础入门',
    description: 'Python编程语言基础，包括语法、数据类型和基本操作。本课程适合零基础学习者，通过循序渐进的方式帮助你掌握Python编程的核心概念。',
    level: 'beginner',
    duration: 10,
    category: '编程语言',
    progress: 75,
    lessons: [
      {
        id: 1,
        title: 'Python简介',
        content: 'Python是一种高级编程语言，以其简洁的语法和强大的生态系统而闻名。它广泛应用于数据分析、人工智能、Web开发等领域。',
        completed: true
      },
      {
        id: 2,
        title: '基本语法',
        content: 'Python的基本语法包括变量、数据类型、运算符、控制流等。Python使用缩进来表示代码块，这使得代码更加清晰易读。',
        completed: true
      },
      {
        id: 3,
        title: '数据类型',
        content: 'Python支持多种数据类型，包括整数、浮点数、字符串、列表、元组、字典等。每种数据类型都有其特定的操作方法。',
        completed: true
      },
      {
        id: 4,
        title: '函数',
        content: '函数是Python中的重要概念，它允许你将代码组织成可重用的块。函数通过def关键字定义，可以接受参数并返回值。',
        completed: true
      },
      {
        id: 5,
        title: '模块和包',
        content: 'Python的模块和包系统允许你组织和重用代码。模块是一个包含Python定义和语句的文件，而包是一个包含多个模块的目录。',
        completed: false
      },
      {
        id: 6,
        title: '文件操作',
        content: 'Python提供了丰富的文件操作功能，包括读取、写入、追加文件等。你可以使用open()函数来打开文件，并使用不同的模式来指定操作类型。',
        completed: false
      }
    ]
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4">
        {/* Course Header */}
        <div className="mb-8">
          <Link to="/courses" className="flex items-center text-gray-600 hover:text-primary mb-4">
            <ChevronLeft size={20} className="mr-2" />
            返回课程列表
          </Link>
          
          <div className="card mb-6">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <div className="p-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Book size={64} className="text-primary" />
                </div>
              </div>
              <div className="md:w-3/4 md:pl-6">
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${course.level === 'beginner' ? 'bg-green-100 text-green-600' : course.level === 'intermediate' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                    {course.level === 'beginner' ? '入门' : course.level === 'intermediate' ? '中级' : '高级'}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {course.duration} 小时
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {course.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{course.description}</p>
                <div className="flex justify-between items-center">
                  <div className="w-full max-w-md">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">学习进度</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="btn btn-primary ml-4">
                    继续学习
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lesson List */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-semibold mb-4">课程章节</h2>
              <div className="space-y-2">
                {course.lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson.id)}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${activeLesson === lesson.id ? 'bg-blue-50 border-l-4 border-primary' : 'hover:bg-gray-50'}`}
                  >
                    <div className="mr-3">
                      {lesson.completed ? (
                        <Check size={20} className="text-green-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-sm">
                          {lesson.id}
                        </div>
                      )}
                    </div>
                    <span className="font-medium">{lesson.title}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-3">课程资源</h3>
                <div className="space-y-2">
                  <a href="#" className="flex items-center text-primary hover:underline cursor-pointer">
                    <Code size={16} className="mr-2" />
                    代码示例
                  </a>
                  <a href="#" className="flex items-center text-primary hover:underline cursor-pointer">
                    <BarChart2 size={16} className="mr-2" />
                    数据集
                  </a>
                  <a href="#" className="flex items-center text-primary hover:underline cursor-pointer">
                    <Book size={16} className="mr-2" />
                    参考资料
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lesson Content */}
          <div className="lg:col-span-3">
            <div className="card">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-primary rounded-full text-white mr-4">
                  <Play size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{course.lessons.find(l => l.id === activeLesson)?.title}</h2>
                  <p className="text-gray-600">章节 {activeLesson} / {course.lessons.length}</p>
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                <p>{course.lessons.find(l => l.id === activeLesson)?.content}</p>
                <h3>学习目标</h3>
                <ul>
                  <li>了解Python的基本概念</li>
                  <li>掌握Python的基本语法</li>
                  <li>学会使用Python的基本数据类型</li>
                  <li>能够编写简单的Python程序</li>
                </ul>
                <h3>代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>
{`# 基本Python代码示例
print("Hello, World!")

# 变量和数据类型
name = "Python"
age = 30
is_popular = True

# 列表
fruits = ["apple", "banana", "cherry"]

# 函数
def greet(name):
    return f"Hello, {name}!"

print(greet("Learner"))`}
                  </code>
                </pre>
              </div>
              
              <div className="flex justify-between">
                <button 
                  disabled={activeLesson === 1}
                  onClick={() => setActiveLesson(prev => Math.max(1, prev - 1))}
                  className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一章
                </button>
                <button 
                  disabled={activeLesson === course.lessons.length}
                  onClick={() => setActiveLesson(prev => Math.min(course.lessons.length, prev + 1))}
                  className="btn btn-primary"
                >
                  下一章
                </button>
              </div>
            </div>
            
            {/* Practice Section */}
            <div className="card mt-6">
              <h2 className="text-xl font-semibold mb-4">实践练习</h2>
              <p className="text-gray-600 mb-4">完成以下练习来巩固本章所学内容：</p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2">练习：创建一个简单的Python程序</h3>
                <p className="text-gray-600 mb-4">编写一个程序，要求：</p>
                <ol className="list-decimal pl-5 mb-4 space-y-1">
                  <li>创建一个变量存储你的名字</li>
                  <li>创建一个变量存储你的年龄</li>
                  <li>打印一条欢迎信息，包含你的名字和年龄</li>
                  <li>创建一个列表存储你喜欢的水果</li>
                  <li>打印列表中的第三个水果</li>
                </ol>
                <div className="border border-gray-200 rounded-lg p-3 bg-white">
                  <pre className="text-sm">
                    <code>
{`# 请在此处编写代码

`}
                    </code>
                  </pre>
                </div>
                <button className="btn btn-secondary mt-4">
                  提交练习
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail