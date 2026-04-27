import { Link } from 'react-router-dom'
import { Book, BarChart2, ChevronRight, Code, PieChart, Brain } from 'lucide-react'

const Home = () => {
  const courses = [
    {
      id: 1,
      title: 'Python基础入门',
      description: 'Python编程语言基础，包括语法、数据类型和基本操作',
      level: 'beginner',
      duration: 10,
      category: '编程语言'
    },
    {
      id: 2,
      title: '数据分析基础',
      description: '数据清洗、处理和可视化的基本方法',
      level: 'beginner',
      duration: 15,
      category: '数据分析'
    },
    {
      id: 3,
      title: '商务数据分析',
      description: '面向商务场景的数据分析方法和工具',
      level: 'intermediate',
      duration: 20,
      category: '商务分析'
    },
    {
      id: 4,
      title: '高级数据建模',
      description: '机器学习和统计建模在商务中的应用',
      level: 'advanced',
      duration: 25,
      category: '数据建模'
    }
  ]

  const categories = [
    { name: '编程语言', icon: <Code size={24} />, color: 'bg-blue-100 text-blue-600' },
    { name: '数据分析', icon: <BarChart2 size={24} />, color: 'bg-green-100 text-green-600' },
    { name: '商务分析', icon: <PieChart size={24} />, color: 'bg-purple-100 text-purple-600' },
    { name: '数据建模', icon: <Brain size={24} />, color: 'bg-amber-100 text-amber-600' }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              掌握Python数据分析，开启商务智能之旅
            </h1>
            <p className="text-xl mb-8">
              为商务数据分析与应用专业学生打造的系统化学习平台，从入门到进阶，助你成为数据分析专家
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses" className="btn btn-primary">
                浏览课程
              </Link>
              <Link to="/dashboard" className="btn bg-white text-blue-600 hover:bg-gray-50">
                查看学习路径
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">课程分类</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/courses"
                className="card flex flex-col items-center text-center p-6 hover:shadow-lg"
              >
                <div className={`${category.color} p-4 rounded-full mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">探索相关课程</p>
                <ChevronRight size={20} className="text-blue-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-blue-700">推荐课程</h2>
            <Link to="/courses" className="text-blue-600 hover:underline flex items-center">
              查看全部 <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="card hover:shadow-lg">
                <div className="mb-4 p-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Book size={48} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${course.level === 'beginner' ? 'bg-green-100 text-green-600' : course.level === 'intermediate' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                    {course.level === 'beginner' ? '入门' : course.level === 'intermediate' ? '中级' : '高级'}
                  </span>
                  <span className="text-gray-500">{course.duration} 小时</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">学习路径</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card border-t-4 border-green-500">
              <h3 className="text-xl font-semibold mb-4">入门路径</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">1</div>
                  <span>Python基础入门</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">2</div>
                  <span>数据分析基础</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">3</div>
                  <span>商务数据分析</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">4</div>
                  <span>高级数据建模</span>
                </li>
              </ul>
              <Link to="/courses" className="btn btn-primary w-full">开始学习</Link>
            </div>
            
            <div className="card border-t-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-4">中级路径</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">1</div>
                  <span>Python基础入门</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">2</div>
                  <span>数据分析基础</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</div>
                  <span>商务数据分析</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">4</div>
                  <span>高级数据建模</span>
                </li>
              </ul>
              <Link to="/courses" className="btn btn-secondary w-full">开始学习</Link>
            </div>
            
            <div className="card border-t-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-4">高级路径</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">1</div>
                  <span>Python基础入门</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">2</div>
                  <span>数据分析基础</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">3</div>
                  <span>商务数据分析</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">4</div>
                  <span>高级数据建模</span>
                </li>
              </ul>
              <Link to="/courses" className="btn bg-purple-600 text-white hover:bg-purple-700 w-full">开始学习</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home