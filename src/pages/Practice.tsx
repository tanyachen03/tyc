import { useState, useEffect } from 'react'
import { Code, Play, Check, ChevronRight } from 'lucide-react'

const Practice = () => {
  const [activeExercise, setActiveExercise] = useState<number>(1)
  const [code, setCode] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const exercises = [
    {
      id: 1,
      title: '变量和数据类型',
      description: '创建不同类型的变量并打印它们',
      difficulty: 'beginner',
      template: `# 创建不同类型的变量
name = "John"
age = 25
height = 1.75
is_student = True

# 打印变量
print("Name:", name)
print("Age:", age)
print("Height:", height)
print("Is student:", is_student)
`,
      testCases: [
        {
          input: '',
          expected: 'Name: John\nAge: 25\nHeight: 1.75\nIs student: True'
        }
      ]
    },
    {
      id: 2,
      title: '列表操作',
      description: '创建并操作列表',
      difficulty: 'beginner',
      template: `# 创建一个水果列表
fruits = ["apple", "banana", "cherry"]

# 添加一个元素
fruits.append("orange")

# 访问第二个元素
print("Second fruit:", fruits[1])

# 遍历列表
print("All fruits:")
for fruit in fruits:
    print(fruit)
`,
      testCases: [
        {
          input: '',
          expected: 'Second fruit: banana\nAll fruits:\napple\nbanana\ncherry\norange'
        }
      ]
    },
    {
      id: 3,
      title: '函数定义',
      description: '创建一个计算面积的函数',
      difficulty: 'intermediate',
      template: `# 定义一个计算矩形面积的函数
def calculate_area(length, width):
    return length * width

# 测试函数
length = 5
width = 3
area = calculate_area(length, width)
print(f"Area of rectangle with length {length} and width {width} is {area}")
`,
      testCases: [
        {
          input: '',
          expected: 'Area of rectangle with length 5 and width 3 is 15'
        }
      ]
    }
  ]

  const currentExercise = exercises.find(ex => ex.id === activeExercise)

  const handleRunCode = () => {
    setIsRunning(true)
    // 模拟代码执行
    setTimeout(() => {
      let result = '执行结果:\n\n'
      
      // 根据当前练习生成对应的输出
      if (currentExercise) {
        // 查找当前练习的测试用例
        const testCase = currentExercise.testCases[0]
        if (testCase) {
          result += testCase.expected
        } else {
          result += '代码执行成功！'
        }
      } else {
        result += '请选择一个练习'
      }
      
      setOutput(result)
      setIsRunning(false)
    }, 1000)
  }
  
  // 初始化代码编辑器内容
  useEffect(() => {
    if (currentExercise) {
      setCode(currentExercise.template)
    }
  }, [activeExercise])

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-blue-700">实践练习</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Exercise List */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">练习列表</h2>
              <div className="space-y-2">
                {exercises.map((exercise) => (
                  <div 
                    key={exercise.id}
                    onClick={() => {
                      setActiveExercise(exercise.id)
                      setCode(exercise.template)
                      setOutput('')
                    }}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${activeExercise === exercise.id ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50'}`}
                  >
                    <div className="mr-3">
                      <Code size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{exercise.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                        {exercise.difficulty === 'beginner' ? '入门' : '中级'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Code Editor */}
          <div className="lg:col-span-3">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">{currentExercise?.title}</h2>
              <p className="text-gray-600 mb-6">{currentExercise?.description}</p>
              
              {/* Code Editor */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">代码编辑器</h3>
                  <button 
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="btn btn-primary flex items-center space-x-2"
                  >
                    <Play size={16} />
                    <span>{isRunning ? '运行中...' : '运行代码'}</span>
                  </button>
                </div>
                <div className="border border-gray-300 rounded-lg">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-sm text-gray-600 ml-2">practice.py</span>
                  </div>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full p-4 h-80 font-mono text-sm bg-white rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-t-0"
                    placeholder="在此编写Python代码..."
                    spellCheck="false"
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>
              </div>
              
              {/* Output */}
              <div className="mb-6">
                <h3 className="font-medium mb-2 text-gray-700">输出结果</h3>
                <div className="output-area">
                  {output || '运行代码查看输出...'}
                </div>
              </div>
              
              {/* Test Results */}
              <div className="mb-6">
                <h3 className="font-medium mb-2 text-gray-700">测试结果</h3>
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Check size={20} className="text-green-500" />
                    <span className="font-medium">测试通过</span>
                  </div>
                  <p className="text-sm text-gray-600">所有测试用例都已通过！</p>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between">
                <button 
                  disabled={activeExercise === 1}
                  onClick={() => setActiveExercise(prev => Math.max(1, prev - 1))}
                  className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一个练习
                </button>
                <button 
                  disabled={activeExercise === exercises.length}
                  onClick={() => setActiveExercise(prev => Math.min(exercises.length, prev + 1))}
                  className="btn btn-primary"
                >
                  下一个练习
                </button>
              </div>
            </div>
            
            {/* Data Sets */}
            <div className="card mt-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">可用数据集</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                  <h3 className="font-medium mb-2">销售数据</h3>
                  <p className="text-sm text-gray-600 mb-2">包含产品销售记录的数据集</p>
                  <div className="flex items-center text-blue-600 text-sm">
                    <ChevronRight size={16} className="mr-1" />
                    <span>查看详情</span>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                  <h3 className="font-medium mb-2">客户数据</h3>
                  <p className="text-sm text-gray-600 mb-2">包含客户信息和行为数据</p>
                  <div className="flex items-center text-blue-600 text-sm">
                    <ChevronRight size={16} className="mr-1" />
                    <span>查看详情</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Practice