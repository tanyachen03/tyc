import { useLearningStore } from '../store/useLearningStore';
import { useAchievementStore } from '../store/useAchievementStore';

const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}小时${minutes % 60}分钟`;
  }
  if (minutes > 0) {
    return `${minutes}分钟`;
  }
  return `${seconds}秒`;
};

export const LearningStats = () => {
  const {
    completedChapters,
    completedCourses,
    totalLearningTime,
    practiceScores,
    quizScores,
  } = useLearningStore();

  const {
    xp,
    currentLevel,
    getCurrentLevelData,
    getNextLevelData,
    getProgressToNextLevel,
    unlockedAchievements,
    achievements,
  } = useAchievementStore();

  const currentLevelData = getCurrentLevelData();
  const nextLevelData = getNextLevelData();
  const progressToNextLevel = getProgressToNextLevel();

  const totalPracticeScore = practiceScores.reduce((sum, s) => sum + s.score, 0);
  const totalQuizScore = quizScores.reduce((sum, s) => sum + s.score, 0);
  const perfectQuizzes = quizScores.filter((s) => s.score === s.maxScore).length;

  const stats = [
    { label: '完成章节', value: completedChapters.length, icon: '📖' },
    { label: '完成课程', value: completedCourses.length, icon: '🎓' },
    { label: '学习时长', value: formatTime(totalLearningTime), icon: '⏱️' },
    { label: '练习得分', value: totalPracticeScore, icon: '✏️' },
    { label: '测验得分', value: totalQuizScore, icon: '📝' },
    { label: '满分测验', value: perfectQuizzes, icon: '💯' },
    { label: '解锁成就', value: unlockedAchievements.length, icon: '🏆' },
    { label: '总成就数', value: achievements.length, icon: '⭐' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">等级 {currentLevel}</h2>
            <p className="text-gray-600">{currentLevelData.name}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-yellow-600">{xp} XP</div>
          </div>
        </div>

        {nextLevelData && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>距离 {nextLevelData.name}</span>
              <span>{Math.round(progressToNextLevel)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressToNextLevel}%` }}
              />
            </div>
            <div className="text-sm text-gray-500">
              需要 {nextLevelData.requiredXP - xp} XP 升级
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm text-center"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
