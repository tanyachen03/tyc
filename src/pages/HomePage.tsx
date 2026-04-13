import { Link } from 'react-router-dom';
import { courses } from '../data/courseData';
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
        return 'bg-accent-100 text-accent-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
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
      courses: ['course-1']
    },
    {
      stage: '第二阶段',
      title: '数据处理与分析',
      description: 'Pandas数据处理、数据清洗、数据可视化',
      icon: '🔍',
      topics: ['Pandas数据分析', '数据清洗与预处理', 'Matplotlib可视化', 'Seaborn高级图表'],
      courses: ['course-1']
    },
    {
      stage: '第三阶段',
      title: '数据库基础',
      description: 'SQL语法、数据查询、数据库管理',
      icon: '💾',
      topics: ['SQL基础概念', 'SELECT语句', '数据修改语句', '表连接', '聚合函数'],
      courses: ['course-3']
    },
    {
      stage: '第四阶段',
      title: '机器学习入门',
      description: '机器学习基础、监督学习、模型评估',
      icon: '🤖',
      topics: ['机器学习概述', '线性回归', '分类算法', '模型评估与优化'],
      courses: ['course-2']
    },
    {
      stage: '第五阶段',
      title: '实战应用',
      description: '综合项目、案例分析、行业应用',
      icon: '🚀',
      topics: ['数据分析项目实战', '行业案例分析', '数据驱动决策', '职业技能提升'],
      courses: ['course-1', 'course-2', 'course-3']
    }
  ];

  const features = [
    {
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: '系统化课程体系',
      description: '按照四个阶段系统学习，从数据分析基础到实战应用',
      color: 'primary'
    },
    {
      icon: (
        <svg className="w-10 h-10 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 01.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: '互动式学习体验',
      description: '练习、测验、即时反馈，让学习更高效',
      color: 'secondary'
    },
    {
      icon: (
        <svg className="w-10 h-10 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: '成就激励系统',
      description: '勋章、等级、学习进度追踪，让学习更有动力',
      color: 'accent'
    }
  ];

  return (
    <div className="min-h-screen bg-background-50">
      <div className="bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-bounce-subtle"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-bounce-subtle animate-delay-500"></div>
        </div>
        
        <div className="container-custom py-24 md:py-32 relative z-10">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              数据分析在线教育平台
            </h1>
            <p className="text-xl text-primary-100 mb-10 max-w-3xl mx-auto text-balance">
              专为商务数据分析与应用专业学生打造的互动式学习平台，从基础到实战，成就你的数据分析师之路
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="#learning-path" 
                className="btn-primary text-lg animate-fade-in-up animate-delay-200"
              >
                查看学习大纲
              </Link>
              <Link 
                to="#courses" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] animate-fade-in-up animate-delay-300"
              >
                开始学习
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="section bg-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-4xl font-bold text-primary-600 mb-2">{Math.round(totalLearningTime / 60)}</div>
              <div className="text-background-600">学习时长 (分钟)</div>
            </div>
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-4xl font-bold text-secondary-600 mb-2">{completedChapters}</div>
              <div className="text-background-600">已完成章节</div>
            </div>
            <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-4xl font-bold text-accent-600 mb-2">{unlockedAchievements}/{totalAchievements}</div>
              <div className="text-background-600">已解锁成就</div>
            </div>
          </div>
        </div>
      </section>

      <section id="learning-path" className="section bg-background-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-background-900 mb-4 animate-fade-in-up">
              系统化学习路径
            </h2>
            <p className="text-background-600 max-w-2xl mx-auto text-lg animate-fade-in-up animate-delay-100">
              五个阶段，从数据分析基础到实战应用，全面覆盖商务数据分析所需技能
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {learningPath.map((stage, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up border border-background-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-4">{stage.icon}</div>
                <div className="text-sm font-semibold text-primary-600 mb-2">{stage.stage}</div>
                <h3 className="text-xl font-bold text-background-900 mb-3">{stage.title}</h3>
                <p className="text-background-600 mb-4 text-sm">{stage.description}</p>
                <div className="space-y-2 mb-6">
                  {stage.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-accent-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-background-700">{topic}</span>
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
                          className="px-3 py-1.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-lg hover:bg-primary-200 transition-colors duration-200"
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

      <section id="courses" className="section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-background-900 mb-4 animate-fade-in-up">
              精选课程
            </h2>
            <p className="text-background-600 max-w-2xl mx-auto text-lg animate-fade-in-up animate-delay-100">
              精心设计的课程体系，涵盖数据分析、机器学习等热门领域
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const progress = getCourseProgress(course.id);
              const progressPercent = progress 
                ? Math.round((progress.completedChapters.length / course.chapters.length) * 100)
                : 0;

              return (
                <Link 
                  key={course.id}
                  to={`/course/${course.id}`}
                  className="group card overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={course.imageUrl} 
                      alt={course.title}
                      className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500 ease-out-cubic"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-md ${getLevelColor(course.level)}`}>
                        {getLevelText(course.level)}
                      </span>
                    </div>
                    {progressPercent > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4">
                        <div className="flex items-center justify-between text-white text-sm mb-2 font-medium">
                          <span>学习进度</span>
                          <span>{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-background-300/30 rounded-full h-2.5">
                          <div 
                            className="bg-gradient-to-r from-primary-400 to-secondary-500 h-2.5 rounded-full transition-all duration-1000 ease-out-cubic"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-background-500">{course.category}</span>
                      <span className="text-background-300">•</span>
                      <span className="text-sm text-background-500">{course.duration}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-background-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                      {course.title}
                    </h3>
                    
                    <p className="text-background-600 mb-5 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-5">
                      {course.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-3 py-1 bg-background-100 text-background-600 text-xs font-medium rounded-lg hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-5 border-t border-background-100">
                      <div className="text-sm text-background-500 font-medium">
                        {course.chapters.length} 个章节
                      </div>
                      <div className="flex items-center text-primary-600 font-semibold group-hover:text-secondary-600 transition-colors duration-300">
                        开始学习
                        <svg 
                          className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300 ease-out-back" 
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

      <section id="features" className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-background-900 mb-4 animate-fade-in-up">
              平台特色
            </h2>
            <p className="text-background-600 max-w-2xl mx-auto text-lg animate-fade-in-up animate-delay-100">
              我们致力于为你提供最优质的学习体验
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-8 rounded-2xl bg-background-50 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-20 h-20 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-background-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-background-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-background-900 mb-6 animate-fade-in-up">
              开始你的数据分析学习之旅
            </h2>
            <p className="text-background-600 text-lg mb-8 animate-fade-in-up animate-delay-100">
              无论你是零基础还是有一定基础，我们的课程都能帮助你掌握数据分析技能，开启职业新篇章
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-200">
              <Link 
                to="#courses" 
                className="btn-primary text-lg"
              >
                浏览课程
              </Link>
              <Link 
                to="/achievements" 
                className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                查看成就系统
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
