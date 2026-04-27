import { Link } from 'react-router-dom'
import { Menu, X, User, Book, BarChart2, Award, Code, PieChart, Home, Target } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: '首页', path: '/', icon: <Home size={20} /> },
    { name: '仪表盘', path: '/dashboard', icon: <BarChart2 size={20} /> },
    { name: '课程', path: '/courses', icon: <Book size={20} /> },
    { name: '练习', path: '/practice', icon: <Code size={20} /> },
    { name: '实战训练', path: '/practice', icon: <Target size={20} />, newTab: true },
    { name: '测评', path: '/assessments', icon: <PieChart size={20} /> },
    { name: '成就', path: '/achievements', icon: <Award size={20} /> },
    { name: '个人中心', path: '/profile', icon: <User size={20} /> },
  ]

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-700">
              数据分析学习平台
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              item.newTab ? (
                <a
                  key={index}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              )
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 bg-gray-50 rounded-md">
            {navItems.map((item, index) => (
              item.newTab ? (
                <a
                  key={index}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              )
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar