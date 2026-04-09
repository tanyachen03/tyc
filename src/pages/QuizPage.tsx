import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuizById, getCourseById } from '../data/courseData';
import { useLearningStore } from '../store/useLearningStore';

type QuizState = 'start' | 'in_progress' | 'finished';

export function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const quiz = quizId ? getQuizById(quizId) : undefined;
  const course = quiz ? getCourseById(quiz.courseId) : undefined;

  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  const addQuizScore = useLearningStore(state => state.addQuizScore);

  useEffect(() => {
    if (quiz) {
      const total = quiz.questions.reduce((sum, q) => sum + q.points, 0);
      setMaxScore(total);
    }
  }, [quiz]);

  if (!quiz || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">测验未找到</h2>
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const handleStartQuiz = () => {
    setQuizState('in_progress');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const unanswered = quiz.questions.filter(q => userAnswers[q.id] === undefined);
    if (unanswered.length > 0) {
      if (!confirm(`还有 ${unanswered.length} 道题未作答，确定要提交吗？`)) {
        return;
      }
    }

    let totalScore = 0;
    quiz.questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        totalScore += question.points;
      }
    });

    setScore(totalScore);
    setQuizState('finished');

    addQuizScore({
      courseId: quiz.courseId,
      chapterId: quiz.chapterId,
      score: totalScore,
      maxScore: maxScore
    });
  };

  const handleRetakeQuiz = () => {
    setQuizState('start');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(0);
  };

  const getResultType = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { type: 'excellent', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', text: '优秀' };
    if (percentage >= 80) return { type: 'good', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', text: '良好' };
    if (percentage >= 60) return { type: 'pass', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', text: '及格' };
    return { type: 'fail', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', text: '不及格' };
  };

  const result = getResultType(score, maxScore);
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const accuracy = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return (
    <div className="min-h-screen bg-background-50">
      <div className="bg-white shadow-sm sticky top-20 z-40">
        <div className="container-custom max-w-4xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                to={quiz.chapterId 
                  ? `/course/${quiz.courseId}/chapter/${quiz.chapterId}` 
                  : `/course/${quiz.courseId}`
                }
                className="text-background-600 hover:text-primary-600 flex items-center gap-2 transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回
              </Link>
            </div>
            <div className="text-sm text-background-500 font-medium">
              {quiz.type === 'chapter' ? '章节测验' : '综合考试'}
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-8">
        {quizState === 'start' && (
          <div className="card p-8 text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-background-900 mb-4">{quiz.title}</h1>
            <p className="text-background-600 mb-8 max-w-2xl mx-auto text-lg">{quiz.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
              <div className="bg-background-50 rounded-xl p-5 border-2 border-background-100">
                <div className="text-3xl font-bold text-primary-600">{quiz.questions.length}</div>
                <div className="text-sm text-background-500 mt-1">题目数量</div>
              </div>
              <div className="bg-background-50 rounded-xl p-5 border-2 border-background-100">
                <div className="text-3xl font-bold text-secondary-600">{maxScore}</div>
                <div className="text-sm text-background-500 mt-1">总分</div>
              </div>
              <div className="bg-background-50 rounded-xl p-5 border-2 border-background-100">
                <div className="text-3xl font-bold text-accent-600">60%</div>
                <div className="text-sm text-background-500 mt-1">及格线</div>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="btn-primary text-lg px-10"
            >
              开始测验
            </button>
          </div>
        )}

        {quizState === 'in_progress' && (
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-700">
                  第 {currentQuestionIndex + 1} 题 / 共 {quiz.questions.length} 题
                </span>
                <span className="text-sm text-gray-500">
                  已答 {Object.keys(userAnswers).length} / {quiz.questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">{currentQuestionIndex + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">{currentQuestion.text}</h2>
                    <span className="text-sm text-gray-500">({currentQuestion.points}分)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(currentQuestion.id, index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      userAnswers[currentQuestion.id] === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                        userAnswers[currentQuestion.id] === index
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300'
                      }`}>
                        {userAnswers[currentQuestion.id] === index && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-900">
                        <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentQuestionIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                上一题
              </button>
              
              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  提交答卷
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  下一题
                </button>
              )}
            </div>
          </div>
        )}

        {quizState === 'finished' && (
          <div>
            <div className="bg-white rounded-xl shadow-md p-8 mb-6">
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${result.bg} mb-4`}>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${result.color}`}>{score}</div>
                    <div className="text-sm text-gray-500">/ {maxScore}</div>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">测验完成！</h1>
                <div className={`inline-block px-4 py-2 rounded-full ${result.bg} ${result.border} border mb-4`}>
                  <span className={`font-semibold ${result.color}`}>{result.text}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">{score}</div>
                  <div className="text-sm text-gray-500">得分</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600">{accuracy}%</div>
                  <div className="text-sm text-gray-500">正确率</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {quiz.questions.filter(q => userAnswers[q.id] === q.correctAnswer).length}
                  </div>
                  <div className="text-sm text-gray-500">正确题数</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {quiz.questions.filter(q => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctAnswer).length}
                  </div>
                  <div className="text-sm text-gray-500">错误题数</div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleRetakeQuiz}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  重新测验
                </button>
                <Link
                  to={quiz.chapterId 
                    ? `/course/${quiz.courseId}/chapter/${quiz.chapterId}` 
                    : `/course/${quiz.courseId}`
                  }
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  返回课程
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">详细解析</h2>
              <div className="space-y-6">
                {quiz.questions.map((question, index) => {
                  const userAnswer = userAnswers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div 
                      key={question.id}
                      className={`p-6 rounded-lg border-2 ${
                        isCorrect 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCorrect 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {isCorrect ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              第 {index + 1} 题：{question.text}
                            </h3>
                            <span className="text-sm text-gray-500">({question.points}分)</span>
                          </div>
                          
                          <div className="space-y-2 mt-4">
                            {question.options.map((option, optIndex) => {
                              const isSelected = userAnswer === optIndex;
                              const isRightAnswer = question.correctAnswer === optIndex;
                              
                              let className = 'p-3 rounded-lg border ';
                              if (isRightAnswer) {
                                className += 'bg-green-100 border-green-300 text-green-800';
                              } else if (isSelected && !isRightAnswer) {
                                className += 'bg-red-100 border-red-300 text-red-800';
                              } else {
                                className += 'bg-white border-gray-200 text-gray-600';
                              }
                              
                              return (
                                <div key={optIndex} className={className}>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span>
                                    <span>{option}</span>
                                    {isRightAnswer && <span className="ml-auto text-sm font-medium">正确答案</span>}
                                    {isSelected && !isRightAnswer && <span className="ml-auto text-sm font-medium">你的选择</span>}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="font-medium text-gray-900">解析</span>
                            </div>
                            <p className="text-gray-700">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
