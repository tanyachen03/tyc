import { Link } from 'react-router-dom';
import { trainingProjects } from '../data/trainingProjects';

export function TrainingListPage() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '初级':
        return 'bg-green-100 text-green-700 border-green-200';
      case '中级':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case '进阶':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => (
      <span key={i} className="text-yellow-500">⭐</span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="container-custom">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            实战训练
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Python 编程练习项目集</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            从入门到进阶，10个精心设计的项目，让你在实战中掌握 Python 编程技能
          </p>
        </div>

        {/* 项目列表 */}
        <div className="space-y-8">
          {trainingProjects.map((project) => (
            <Link
              key={project.id}
              to={`/training/${project.id}`}
              className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* 左侧内容 */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty}
                      </span>
                      <div className="flex items-center gap-1">
                        {renderStars(project.stars)}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* 学习目标 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        学习目标
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.learningObjectives.map((objective, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {objective}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 核心功能 */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        核心功能
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.coreFeatures.slice(0, 3).map((feature, index) => (
                          <span key={index} className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                            {feature}
                          </span>
                        ))}
                        {project.coreFeatures.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{project.coreFeatures.length - 3} 更多
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 右侧按钮 */}
                  <div className="flex md:flex-col items-center md:justify-center gap-4">
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:text-cyan-600 transition-all duration-300">
                      <span>开始练习</span>
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
              </div>
            </Link>
          ))}
        </div>

        {/* 学习建议 */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            学习建议
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">按顺序挑战</h4>
              <p className="text-sm text-gray-600">建议从1号项目开始，逐步提升难度</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">先实现再优化</h4>
              <p className="text-sm text-gray-600">优先跑通核心功能，再考虑边界情况和优化</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">写README</h4>
              <p className="text-sm text-gray-600">记录项目功能、使用方法和学习心得</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
