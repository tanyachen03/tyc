import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Book, Filter, ChevronRight } from 'lucide-react'

const Courses = () => {
  const [filter, setFilter] = useState('all')
  const [level, setLevel] = useState('all')

  const courses = [
    {
      id: 1,
      title: 'Python基础入门',
      description: 'Python编程语言基础，包括语法、数据类型和基本操作',
      level: 'beginner',
      duration: 10,
      category: '编程语言',
      progress: 75
    },
    {
      id: 2,
      title: '数据分析基础',
      description: '数据清洗、处理和可视化的基本方法',
      level: 'beginner',
      duration: 15,
      category: '数据分析',
      progress: 40
    },
    {
      id: 3,
      title: '商务数据分析',
      description: '面向商务场景的数据分析方法和工具',
      level: 'intermediate',
      duration: 20,
      category: '商务分析',
      progress: 10
    },
    {
      id: 4,
      title: '高级数据建模',
      description: '机器学习和统计建模在商务中的应用',
      level: 'advanced',
      duration: 25,
      category: '数据建模',
      progress: 0
    },
    {
      id: 5,
      title: '数据可视化进阶',
      description: '使用Matplotlib和Seaborn创建专业的数据可视化',
      level: 'intermediate',
      duration: 18,
      category: '数据分析',
      progress: 0
    },
    {
      id: 6,
      title: 'SQL数据库基础',
      description: '学习SQL语言和数据库操作，为数据分析打下基础',
      level: 'beginner',
      duration: 12,
      category: '编程语言',
      progress: 0
    },
    {
      id: 7,
      title: '商业智能工具',
      description: '学习使用Power BI和Tableau进行数据可视化和分析',
      level: 'intermediate',
      duration: 22,
      category: '商务分析',
      progress: 0
    },
    {
      id: 8,
      title: '大数据分析',
      description: '使用Python处理和分析大规模数据集',
      level: 'advanced',
      duration: 28,
      category: '数据建模',
      progress: 0
    }
  ]

  const filteredCourses = courses.filter(course => {
    const categoryMatch = filter === 'all' || course.category === filter
    const levelMatch = level === 'all' || course.level === level
    return categoryMatch && levelMatch
  })

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">课程列表</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-600" />
            <span className="font-medium">分类:</span>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">全部</option>
              <option value="编程语言">编程语言</option>
              <option value="数据分析">数据分析</option>
              <option value="商务分析">商务分析</option>
              <option value="数据建模">数据建模</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="font-medium">难度:</span>
            <select 
              value={level} 
              onChange={(e) => setLevel(e.target.value)}
              className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">全部</option>
              <option value="beginner">入门</option>
              <option value="intermediate">中级</option>
              <option value="advanced">高级</option>
            </select>
          </div>
        </div>
        
        {/* Course List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`} className="card hover:transform hover:scale-105">
              <div className="mb-4 p-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <Book size={48} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${course.level === 'beginner' ? 'bg-green-100 text-green-600' : course.level === 'intermediate' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                  {course.level === 'beginner' ? '入门' : course.level === 'intermediate' ? '中级' : '高级'}
                </span>
                <span className="text-gray-500">{course.duration} 小时</span>
              </div>
              {course.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">学习进度</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{course.category}</span>
                <ChevronRight size={20} className="text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Courses