import { useParams, Link } from 'react-router-dom';
import { getCourseById, getComprehensiveQuiz } from '../data/courseData';
import { useLearningStore } from '../store/useLearningStore';

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? getCourseById(courseId) : undefined;
  
  const getCourseProgress = useLearningStore(state => state.getCourseProgress);
  const getChapterProgress = useLearningStore(state => state.getChapterProgress);
  const startLearningSession = useLearningStore(state => state.startLearningSession);

  if (!course) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-background-900 mb-4">课程未找到</h2>
          <Link 
            to="/" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const progress = getCourseProgress(course.id);
  const progressPercent = progress 
    ? Math.round((progress.completedChapters.length / course.chapters.length) * 100)
    : 0;
  const comprehensiveQuiz = courseId ? getComprehensiveQuiz(courseId) : undefined;

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

  const handleStartLearning = () => {
    startLearningSession();
  };

  return (
    <div className="min-h-screen bg-background-50">
      <div className="bg-white shadow-sm">
        <div className="container-custom py-6">
          <div className="flex items-center text-sm text-background-500 mb-4 animate-fade-in">
            <Link to="/" className="hover:text-primary-600 transition-colors">首页</Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-background-900">{course.title}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card overflow-hidden mb-8 animate-fade-in-up">
              <img 
                src={course.imageUrl} 
                alt={course.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getLevelColor(course.level)}`}>
                    {getLevelText(course.level)}
                  </span>
                  <span className="text-background-500">{course.category}</span>
                  <span className="text-background-300">•</span>
                  <span className="text-background-500">{course.duration}</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-background-900 mb-4">{course.title}</h1>
                <p className="text-background-600 text-lg mb-6 leading-relaxed">{course.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-primary-50 text-primary-700 text-sm font-medium rounded-lg hover:bg-primary-100 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="card p-8 mb-8 animate-fade-in-up animate-delay-100">
              <h2 className="text-2xl font-bold text-background-900 mb-6">课程章节</h2>
              <div className="space-y-4">
                {course.chapters.map((chapter, index) => {
                  const chapterProgress = getChapterProgress(chapter.id);
                  const isCompleted = chapterProgress?.completed;

                  return (
                    <Link
                      key={chapter.id}
                      to={`/course/${course.id}/chapter/${chapter.id}`}
                      onClick={handleStartLearning}
                      className="flex items-center gap-4 p-5 border-2 border-background-100 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 group"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-accent-500 text-white shadow-lg' 
                          : 'bg-background-100 text-background-600 group-hover:bg-primary-500 group-hover:text-white group-hover:shadow-lg'
                      }`}>
                        {isCompleted ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="font-bold text-lg">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-lg ${isCompleted ? 'text-accent-700' : 'text-background-900 group-hover:text-primary-600'} transition-colors duration-300`}>
                          {chapter.title}
                        </h3>
                        <p className="text-sm text-background-500 truncate">{chapter.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-background-500">
                        <span>{chapter.duration}</span>
                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 ease-out-back" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card p-8 sticky top-32 animate-fade-in-up animate-delay-200">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-background-900 text-lg">学习进度</span>
                  <span className="text-primary-600 font-bold text-xl">{progressPercent}%</span>
                </div>
                <div className="w-full bg-background-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-secondary-600 h-4 rounded-full transition-all duration-1000 ease-out-cubic"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-sm text-background-500 mt-3 font-medium">
                  {progress?.completedChapters.length || 0} / {course.chapters.length} 章节已完成
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-background-600">
                  <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">总时长：{course.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-background-600">
                  <svg className="w-6 h-6 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">{course.chapters.length} 个章节</span>
                </div>
                <div className="flex items-center gap-3 text-background-600">
                  <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="font-medium">永久访问</span>
                </div>
              </div>

              <Link
                to={`/course/${course.id}/chapter/${course.chapters[0].id}`}
                onClick={handleStartLearning}
                className="btn-primary w-full mb-4"
              >
                {progressPercent > 0 ? '继续学习' : '开始学习'}
              </Link>
              
              {comprehensiveQuiz && (
                <Link
                  to={`/quiz/${comprehensiveQuiz.id}`}
                  className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  综合考试
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
