import { Link } from 'react-router-dom'
import { Book, Award, Clock, TrendingUp, Code } from 'lucide-react'

const Dashboard = () => {
  const progressData = [
    {
      id: 1,
      course: 'Python基础入门',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15
    },
    {
      id: 2,
      course: '数据分析基础',
      progress: 40,
      totalLessons: 25,
      completedLessons: 10
    },
    {
      id: 3,
      course: '商务数据分析',
      progress: 10,
      totalLessons: 30,
      completedLessons: 3
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'course',
      action: '完成了课程章节',
      course: 'Python基础入门',
      time: '2小时前'
    },
    {
      id: 2,
      type: 'practice',
      action: '完成了练习',
      course: '数据分析基础',
      time: '5小时前'
    },
    {
      id: 3,
      type: 'achievement',
      action: '获得了成就',
      course: 'Python初学者',
      time: '1天前'
    }
  ]

  const achievements = [
    {
      id: 1,
      name: 'Python初学者',
      description: '完成Python基础入门课程',
      icon: '🎯',
      earned: true
    },
    {
      id: 2,
      name: '数据分析师',
      description: '完成数据分析基础课程',
      icon: '📊',
      earned: true
    },
    {
      id: 3,
      name: '商务分析专家',
      description: '完成商务数据分析课程',
      icon: '💼',
      earned: false
    },
    {
      id: 4,
      name: '建模大师',
      description: '完成高级数据建模课程',
      icon: '🤖',
      earned: false
    }
  ]

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-blue-700">学习仪表盘</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Book size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600">总课程数</p>
                <h3 className="text-2xl font-bold">4</h3>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-600">学习进度</p>
                <h3 className="text-2xl font-bold">42%</h3>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Award size={24} className="text-amber-600" />
              </div>
              <div>
                <p className="text-gray-600">获得成就</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600">学习时长</p>
                <h3 className="text-2xl font-bold">12小时</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">课程进度</h2>
              <div className="space-y-6">
                {progressData.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between mb-2">
                      <Link to={`/courses/${item.id}`} className="font-medium hover:text-blue-600">
                        {item.course}
                      </Link>
                      <span className="text-gray-600">{item.progress}%</span>
                    </div>
                    <div className="business-progress">
                      <div 
                        className="business-progress-bar" 
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.completedLessons}/{item.totalLessons} 章节
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recent Activities */}
          <div>
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">最近活动</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${activity.type === 'course' ? 'bg-blue-100' : activity.type === 'practice' ? 'bg-green-100' : 'bg-amber-100'}`}>
                      {activity.type === 'course' ? <Book size={16} className="text-blue-600" /> : 
                       activity.type === 'practice' ? <Code size={16} className="text-green-600" /> : 
                       <Award size={16} className="text-amber-600" />}
                    </div>
                    <div>
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-sm font-medium">{activity.course}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Achievements */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">我的成就</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`p-4 rounded-lg border ${achievement.earned ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h3 className="font-medium mb-1">{achievement.name}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <div className={`mt-2 text-xs px-2 py-1 rounded-full ${achievement.earned ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                  {achievement.earned ? '已获得' : '未获得'}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recommended Courses */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">推荐课程</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/courses/3" className="card hover:shadow-lg">
              <h3 className="font-medium mb-2">商务数据分析</h3>
              <p className="text-sm text-gray-600 mb-3">面向商务场景的数据分析方法和工具</p>
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">中级</span>
                <span className="text-sm text-gray-500">20小时</span>
              </div>
            </Link>
            
            <Link to="/courses/4" className="card hover:shadow-lg">
              <h3 className="font-medium mb-2">高级数据建模</h3>
              <p className="text-sm text-gray-600 mb-3">机器学习和统计建模在商务中的应用</p>
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">高级</span>
                <span className="text-sm text-gray-500">25小时</span>
              </div>
            </Link>
            
            <Link to="/practice" className="card hover:shadow-lg">
              <h3 className="font-medium mb-2">实践项目</h3>
              <p className="text-sm text-gray-600 mb-3">真实商务数据分析场景实战</p>
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">实践</span>
                <span className="text-sm text-gray-500">15小时</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard