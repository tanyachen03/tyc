import { Link } from 'react-router-dom';
import { courses } from '../data/courseData';
import { projects } from '../data/projects';
import { useLearningStore } from '../store/useLearningStore';
import { useAchievementStore } from '../store/useAchievementStore';

export function HomePage() {
  const getCourseProgress = useLearningStore(state => state.getCourseProgress);
  const totalLearningTime = useLearningStore(state => state.totalLearningTime);
  const completedChapters = useLearningStore(state => state.completedChapters.length);
  const unlockedAchievements = useAchievementStore(state => state.achievements.filter(a => a.unlocked).length);
  const totalAchievements = useAchievementStore(state => state.achievements.length);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200';
      case 'intermediate':
        return 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200';
      case 'advanced':
        return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200';
      default:
        return 'bg-background-100 text-background-700';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner':
        return '初级';
      case 'intermediate':
        return '中级';
      case 'advanced':
        return '高级';
      default:
        return level;
    }
  };

  const learningPath = [
    {
      stage: '第一阶段',
      title: '数据分析基础',
      description: 'Python基础、数据结构、NumPy数组操作',
      icon: '📊',
      topics: ['Python核心语法', '数据结构与算法', 'NumPy科学计算', '基础数据处理'],
      courses: ['course-1'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      stage: '第二阶段',
      title: '数据处理与分析',
      description: 'Pandas数据处理、数据清洗、数据可视化',
      icon: '🔍',
      topics: ['Pandas数据分析', '数据清洗与预处理', 'Matplotlib可视化', 'Seaborn高级图表'],
      courses: ['course-1'],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      stage: '第三阶段',
      title: '数据库基础',
      description: 'SQL语法、数据查询、数据库管理',
      icon: '💾',
      topics: ['SQL基础概念', 'SELECT语句', '数据修改语句', '表连接', '聚合函数'],
      courses: ['course-3'],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      stage: '第四阶段',
      title: '机器学习入门',
      description: '机器学习基础、监督学习、模型评估',
      icon: '🤖',
      topics: ['机器学习概述', '线性回归', '分类算法', '模型评估与优化'],
      courses: ['course-2'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      stage: '第五阶段',
      title: '实战应用',
      description: '综合项目、案例分析、行业应用',
      icon: '🚀',
      topics: ['数据分析项目实战', '行业案例分析', '数据驱动决策', '职业技能提升'],
      courses: ['course-1', 'course-2', 'course-3'],
      color: 'from-orange-500 to-amber-500'
    }
  ];

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: '系统化课程体系',
      description: '按照五个阶段系统学习，从数据分析基础到实战应用',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderGradient: 'border-blue-200'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 01.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: '互动式学习体验',
      description: '练习、测验、即时反馈，让学习更高效',
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50',
      borderGradient: 'border-purple-200'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: '成就激励系统',
      description: '勋章、等级、学习进度追踪，让学习更有动力',
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50',
      borderGradient: 'border-pink-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] animate-float">
            <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm"></div>
          </div>
          <div className="absolute top-40 right-[15%] animate-float delay-500">
            <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm"></div>
          </div>
          <div className="absolute bottom-32 left-[20%] animate-float delay-1000">
            <div className="w-20 h-20 bg-white/15 rounded-3xl backdrop-blur-sm"></div>
          </div>
        </div>
        
        <div className="container-custom py-28 md:py-40 relative z-10">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>全新升级 · 完整课程体系</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
              数据分析
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                在线教育平台
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto text-balance leading-relaxed">
              专为商务数据分析与应用专业学生打造的互动式学习平台，
              <br className="hidden md:block" />
              从基础到实战，成就你的数据分析师之路
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="#learning-path" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">查看学习大纲</span>
                <svg 
                  className="relative z-10 w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange-100 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
              </Link>
              
              <Link 
                to="#courses" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/50 rounded-2xl backdrop-blur-sm hover:bg-white/20 hover:border-white transition-all duration-300 transform hover:scale-105"
              >
                开始学习
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <section className="section py-16 -mt-1 relative z-20">
        <div className="container-custom">
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 text-center border border-blue-100">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                    {Math.round(totalLearningTime / 60)}
                  </div>
                  <div className="text-gray-600 font-medium">学习时长 (分钟)</div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 text-center border border-purple-100">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {completedChapters}
                  </div>
                  <div className="text-gray-600 font-medium">已完成章节</div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 text-center border border-pink-100">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                    {unlockedAchievements}/{totalAchievements}
                  </div>
                  <div className="text-gray-600 font-medium">已解锁成就</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section id="learning-path" className="section py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              系统化学习路径
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              五个阶段，循序渐进
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              从数据分析基础到实战应用，全面覆盖商务数据分析所需技能
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {learningPath.map((stage, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-3xl p-6 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
              >
                {/* Decorative Gradient Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stage.color} rounded-t-3xl`}></div>
                
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stage.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-4xl">{stage.icon}</span>
                </div>
                
                <div className={`inline-block px-3 py-1 bg-gradient-to-r ${stage.color} text-white text-xs font-bold rounded-full mb-3`}>
                  {stage.stage}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:{stage.color} transition-all duration-300">
                  {stage.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {stage.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {stage.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center text-sm">
                      <div className={`w-2 h-2 bg-gradient-to-r ${stage.color} rounded-full mr-3 flex-shrink-0`}></div>
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {stage.courses.map((courseId, courseIndex) => {
                    const course = courses.find(c => c.id === courseId);
                    if (course) {
                      return (
                        <Link 
                          key={courseIndex}
                          to={`/course/${course.id}`}
                          className={`px-4 py-2 bg-gradient-to-r ${stage.color} text-white text-xs font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                        >
                          {course.title}
                        </Link>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="section py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              精选课程
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              探索优质课程
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              精心设计的课程体系，涵盖数据分析、机器学习等热门领域
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const progress = getCourseProgress(course.id);
              const progressPercent = progress 
                ? Math.round((progress.completedChapters.length / course.chapters.length) * 100)
                : 0;

              return (
                <Link 
                  key={course.id}
                  to={`/course/${course.id}`}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-2"
                >
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={course.imageUrl} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Level Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-2 rounded-xl text-sm font-bold shadow-lg ${getLevelColor(course.level)}`}>
                        {getLevelText(course.level)}
                      </span>
                    </div>
                    
                    {/* Progress Overlay */}
                    {progressPercent > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md p-4">
                        <div className="flex items-center justify-between text-white text-sm mb-2 font-semibold">
                          <span>📊 学习进度</span>
                          <span className="text-yellow-400">{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000"
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-7">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-gray-500 font-medium">{course.category}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500 font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                      {course.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:from-purple-100 hover:to-indigo-100 hover:text-purple-700 transition-all duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {course.chapters.length} 个章节
                      </div>
                      <div className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-bold group-hover:from-pink-600 group-hover:to-rose-600 transition-all duration-300">
                        开始学习
                        <svg 
                          className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              平台特色
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              为什么选择我们？
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              我们致力于为你提供最优质的学习体验
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                <div className={`relative bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-10 text-center border ${feature.borderGradient} hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-3`}>
                  <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${feature.gradient} rounded-3xl mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              项目练习
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              实践出真知
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              10个梯度项目，从基础到高级，让你在实践中掌握数据分析技能
            </p>
          </div>

          <div className="space-y-12">
            {/* Beginner Projects */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-green-100 text-green-700 rounded-full mr-3">
                  📚
                </span>
                初级项目
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.filter(p => p.difficulty === 'beginner').map((project) => (
                  <Link 
                    key={project.id}
                    to={`/project/${project.id}`}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="p-7">
                      <div className="inline-flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                          初级
                        </span>
                        <span className="text-sm text-gray-500 font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 01.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          {project.tasks.length} 个任务
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-300">
                        {project.title}
                      </h4>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          立即练习
                        </div>
                        <svg 
                          className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-2 transition-all duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Intermediate Projects */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 text-amber-700 rounded-full mr-3">
                  🔍
                </span>
                中级项目
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.filter(p => p.difficulty === 'intermediate').map((project) => (
                  <Link 
                    key={project.id}
                    to={`/project/${project.id}`}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="p-7">
                      <div className="inline-flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                          中级
                        </span>
                        <span className="text-sm text-gray-500 font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 01.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          {project.tasks.length} 个任务
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-amber-600 to-orange-600 transition-all duration-300">
                        {project.title}
                      </h4>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          立即练习
                        </div>
                        <svg 
                          className="w-5 h-5 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-2 transition-all duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Advanced Projects */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-700 rounded-full mr-3">
                  🚀
                </span>
                高级项目
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.filter(p => p.difficulty === 'advanced').map((project) => (
                  <Link 
                    key={project.id}
                    to={`/project/${project.id}`}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="p-7">
                      <div className="inline-flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                          高级
                        </span>
                        <span className="text-sm text-gray-500 font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 01.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          {project.tasks.length} 个任务
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300">
                        {project.title}
                      </h4>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          立即练习
                        </div>
                        <svg 
                          className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-2 transition-all duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 实战训练 Section */}
      <section id="training" className="section py-20 bg-gradient-to-b from-blue-50 to-indigo-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              实战训练
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Python 编程练习项目集
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              从入门到进阶，10个精心设计的项目，让你在实战中掌握 Python 编程技能
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl shadow-blue-200/50 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-10 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">系统化学习路径</h3>
                        <p className="text-gray-600">从入门到进阶，10个项目循序渐进</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">实时代码运行</h3>
                        <p className="text-gray-600">内置代码编辑器，直接在浏览器运行 Python</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 01.806-1.946 3.42 3.42 0 013.138-3.138" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">进度自动保存</h3>
                        <p className="text-gray-600">你的代码进度会自动保存到本地</p>
                      </div>
                    </div>

                    <div className="pt-6">
                      <Link
                        to="/training"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        开始训练
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="relative h-full min-h-[400px] bg-gradient-to-br from-gray-900 to-cyan-900 p-8 flex items-center justify-center overflow-hidden">
                  <div className="relative z-10 w-full max-w-md">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
                      <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-700">
                        <div className="flex gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-red-500"></span>
                          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                          <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        </div>
                        <span className="text-gray-500 text-xs ml-2">项目：个人记账本</span>
                      </div>
                      <div className="p-4 bg-gray-900 font-mono text-xs">
                        <div className="text-cyan-400"># 个人记账本项目</div>
                        <div className="text-gray-400"># 在这里开始编写你的代码</div>
                        <div></div>
                        <div><span className="text-purple-400">import</span> <span className="text-green-400">datetime</span></div>
                        <div><span className="text-purple-400">import</span> <span className="text-green-400">csv</span></div>
                        <div></div>
                        <div><span className="text-blue-400">print</span>(<span className="text-yellow-400">"欢迎使用个人记账本！"</span>)</div>
                        <div className="text-green-400 animate-pulse mt-2">
                          &gt; 欢迎使用个人记账本！
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 背景装饰 */}
                  <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              准备好开始你的
              <span className="block text-yellow-300">数据分析学习之旅了吗？</span>
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              无论你是零基础还是有一定基础，我们的课程都能帮助你掌握数据分析技能，开启职业新篇章
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="#courses" 
                className="group inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-gray-900 bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                浏览课程
                <svg 
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                to="#projects" 
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white border-2 border-white/50 rounded-2xl backdrop-blur-sm hover:bg-white/20 hover:border-white transition-all duration-300 transform hover:scale-105"
              >
                开始项目练习
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
