import { useEffect } from 'react';
import { useLearningStore } from './store/useLearningStore';

const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
};

export const LearningProgressDemo = () => {
  const {
    completedCourses,
    completedChapters,
    practiceScores,
    quizScores,
    totalLearningTime,
    currentSessionStartTime,
    markCourseComplete,
    markChapterComplete,
    addPracticeScore,
    addQuizScore,
    startLearningSession,
    endLearningSession,
    resetProgress,
    getTotalPracticeScore,
    getTotalQuizScore,
    getTodayLearningTime,
  } = useLearningStore();

  const totalPractice = getTotalPracticeScore();
  const totalQuiz = getTotalQuizScore();
  const todayTime = getTodayLearningTime();

  useEffect(() => {
    return () => {
      if (currentSessionStartTime) {
        endLearningSession();
      }
    };
  }, [currentSessionStartTime, endLearningSession]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">学习进度管理演示</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">学习时长</h2>
          <div className="space-y-2">
            <p>总学习时长: <span className="font-bold">{formatTime(totalLearningTime)}</span></p>
            <p>今日学习时长: <span className="font-bold">{formatTime(todayTime)}</span></p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={startLearningSession}
                disabled={currentSessionStartTime !== null}
                className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
              >
                开始学习
              </button>
              <button
                onClick={endLearningSession}
                disabled={currentSessionStartTime === null}
                className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-400"
              >
                结束学习
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">得分统计</h2>
          <div className="space-y-2">
            <p>练习总得分: <span className="font-bold">{totalPractice.total}/{totalPractice.max}</span></p>
            <p>测验总得分: <span className="font-bold">{totalQuiz.total}/{totalQuiz.max}</span></p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">操作示例</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => markCourseComplete('course-1', 5)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            标记课程1完成
          </button>
          <button
            onClick={() => markChapterComplete('course-1', 'chapter-1-1')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            标记章节1-1完成
          </button>
          <button
            onClick={() => addPracticeScore({ courseId: 'course-1', chapterId: 'chapter-1-1', score: 85, maxScore: 100 })}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            添加练习得分 (85/100)
          </button>
          <button
            onClick={() => addQuizScore({ courseId: 'course-1', chapterId: 'chapter-1-1', score: 90, maxScore: 100 })}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            添加测验得分 (90/100)
          </button>
          <button
            onClick={resetProgress}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            重置所有进度
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">当前状态</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">已完成课程: {completedCourses.length}</h3>
            <ul className="list-disc list-inside ml-4">
              {completedCourses.map((course) => (
                <li key={course.courseId}>{course.courseId} - 已完成 {course.completedChapters.length}/{course.totalChapters} 章</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">已完成章节: {completedChapters.length}</h3>
            <ul className="list-disc list-inside ml-4">
              {completedChapters.map((chapter) => (
                <li key={chapter.chapterId}>{chapter.chapterId}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">练习记录: {practiceScores.length}</h3>
            <ul className="list-disc list-inside ml-4">
              {practiceScores.map((score) => (
                <li key={score.id}>{score.courseId} - {score.score}/{score.maxScore}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">测验记录: {quizScores.length}</h3>
            <ul className="list-disc list-inside ml-4">
              {quizScores.map((score) => (
                <li key={score.id}>{score.courseId} - {score.score}/{score.maxScore}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
