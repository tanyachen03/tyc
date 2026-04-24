import { useParams, Link } from 'react-router-dom';
import { getCourseById, getChapterById, getQuizByChapter, exercises } from '../data/courseData';
import { useLearningStore } from '../store/useLearningStore';
import { useState, useEffect } from 'react';
import { ExerciseComponent } from '../components/ExerciseComponent';
import { Exercise } from '../types/exercise';

export function ChapterPage() {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();
  const course = courseId ? getCourseById(courseId) : undefined;
  const chapter = courseId && chapterId ? getChapterById(courseId, chapterId) : undefined;
  
  const [isMarkedComplete, setIsMarkedComplete] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  
  const getChapterProgress = useLearningStore(state => state.getChapterProgress);
  const markChapterComplete = useLearningStore(state => state.markChapterComplete);
  const endLearningSession = useLearningStore(state => state.endLearningSession);

  useEffect(() => {
    if (chapterId) {
      const progress = getChapterProgress(chapterId);
      setIsMarkedComplete(!!progress?.completed);
    }
  }, [chapterId, getChapterProgress]);

  if (!course || !chapter) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-background-900 mb-4">页面未找到</h2>
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

  const currentChapterIndex = course.chapters.findIndex(c => c.id === chapterId);
  const prevChapter = currentChapterIndex > 0 ? course.chapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < course.chapters.length - 1 ? course.chapters[currentChapterIndex + 1] : null;
  const chapterQuiz = courseId && chapterId ? getQuizByChapter(courseId, chapterId) : undefined;
  const chapterExercise = courseId && chapterId ? exercises.find(ex => ex.courseId === courseId && ex.chapterId === chapterId) : undefined;

  const handleMarkComplete = () => {
    if (courseId && chapterId && !isMarkedComplete) {
      markChapterComplete(courseId, chapterId);
      setIsMarkedComplete(true);
    }
  };

  const handleStartExercise = () => {
    if (chapterExercise) {
      setCurrentExercise(chapterExercise as Exercise);
      setShowExercise(true);
    }
  };

  const handleExerciseComplete = (score: number, maxScore: number) => {
    // 练习完成后的处理，例如记录成绩等
    console.log(`练习完成，得分: ${score}/${maxScore}`);
  };

  const handleCloseExercise = () => {
    setShowExercise(false);
    setCurrentExercise(null);
  };

  useEffect(() => {
    return () => {
      endLearningSession();
    };
  }, [endLearningSession]);

  const renderMarkdown = (content: string) => {
    return content
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-background-900 mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-background-900 mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-background-900 mb-6">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-background-100 p-4 rounded-xl my-4 overflow-x-auto"><code>$1</code></pre>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
      .replace(/\n\n/g, '</p><p class="text-background-700 mb-4">');
  };

  return (
    <div className="min-h-screen bg-background-50">
      <div className="bg-white shadow-sm sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                to={`/course/${courseId}`}
                className="text-background-600 hover:text-primary-600 flex items-center gap-2 transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回课程
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-background-500">
              <span className="font-medium">第 {currentChapterIndex + 1} 章</span>
              <span className="text-background-300">/</span>
              <span>{course.chapters.length} 章</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="card p-8 mb-8 animate-fade-in-up">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-background-900 mb-3">{chapter.title}</h1>
                <div className="flex items-center gap-6 text-background-500">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{chapter.duration}</span>
                  </span>
                  {isMarkedComplete && (
                    <span className="flex items-center gap-2 text-accent-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium">已完成</span>
                    </span>
                  )}
                </div>
              </div>

              {/* 视频教程 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-background-900 mb-4">视频教程</h3>
                <div className="bg-background-900 rounded-xl overflow-hidden">
                  <div className="aspect-video relative">
                    {/* 这里可以嵌入视频播放器，暂时使用占位符 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white p-8">
                        <svg className="w-16 h-16 mx-auto mb-4 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        <p className="text-lg font-medium">配套教学视频</p>
                        <p className="text-sm opacity-75 mt-2">点击播放视频教程</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="text-white hover:text-gray-300 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button className="text-white hover:text-gray-300 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <div className="text-white text-sm">0:00 / 10:00</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <select className="bg-gray-800 text-white text-sm rounded px-2 py-1">
                        <option>0.5x</option>
                        <option>0.75x</option>
                        <option selected>1x</option>
                        <option>1.25x</option>
                        <option>1.5x</option>
                        <option>2x</option>
                      </select>
                      <button className="text-white hover:text-gray-300 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="prose max-w-none text-background-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: `<p class="text-background-700 mb-4">${renderMarkdown(chapter.content)}</p>`
                }}
              />
            </div>

            <div className="card p-6 animate-fade-in-up animate-delay-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                {prevChapter ? (
                  <Link
                    to={`/course/${courseId}/chapter/${prevChapter.id}`}
                    className="flex items-center gap-3 px-6 py-3 border-2 border-background-200 rounded-xl text-background-700 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-medium">上一章：{prevChapter.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
                
                {nextChapter ? (
                  <Link
                    to={`/course/${courseId}/chapter/${nextChapter.id}`}
                    className="flex items-center gap-3 px-6 py-3 btn-primary"
                  >
                    <span className="font-medium">下一章：{nextChapter.title}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card p-8 sticky top-44 animate-fade-in-up animate-delay-200">
              <h3 className="text-xl font-bold text-background-900 mb-6">章节操作</h3>
              
              <div className="space-y-4">
                <button
                  onClick={handleMarkComplete}
                  disabled={isMarkedComplete}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                    isMarkedComplete
                      ? 'bg-accent-100 text-accent-700 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {isMarkedComplete ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      已标记完成
                    </span>
                  ) : (
                    '标记完成'
                  )}
                </button>

                {chapter.hasPractice && chapterExercise && (
                  <button
                    onClick={handleStartExercise}
                    className="w-full py-4 bg-secondary-500 text-white rounded-xl font-semibold hover:bg-secondary-600 transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  >
                    开始练习
                  </button>
                )}

                {chapter.hasQuiz && chapterQuiz && (
                  <Link
                    to={`/quiz/${chapterQuiz.id}`}
                    className="block w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center rounded-xl font-semibold hover:opacity-90 transition-opacity transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  >
                    章节测验
                  </Link>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-background-100">
                <h4 className="font-bold text-background-900 mb-4">章节列表</h4>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {course.chapters.map((c, index) => {
                    const progress = getChapterProgress(c.id);
                    const isCompleted = progress?.completed;
                    
                    return (
                      <Link
                        key={c.id}
                        to={`/course/${courseId}/chapter/${c.id}`}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                          c.id === chapterId
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-background-600 hover:bg-background-50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all duration-300 ${
                          isCompleted
                            ? 'bg-accent-500 text-white shadow-md'
                            : c.id === chapterId
                            ? 'bg-primary-500 text-white shadow-md'
                            : 'bg-background-200 text-background-600'
                        }`}>
                          {isCompleted ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <span className="text-sm font-medium truncate">{c.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showExercise && currentExercise && courseId && (
        <ExerciseComponent
          exercise={currentExercise}
          courseId={courseId}
          chapterId={chapterId}
          isQuiz={false}
          onComplete={handleExerciseComplete}
          onClose={handleCloseExercise}
        />
      )}
    </div>
  );
}
