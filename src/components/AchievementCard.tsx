import { Achievement, getRarityColor, getRarityBorder } from '../types/achievements';

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  return (
    <div
      className={`p-4 rounded-xl border-2 ${getRarityBorder(achievement.rarity)} ${
        achievement.unlocked ? 'bg-white' : 'bg-gray-100'
      } transition-all duration-300 hover:shadow-lg ${
        achievement.unlocked ? '' : 'opacity-60'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl ${
            getRarityColor(achievement.rarity)
          } ${achievement.unlocked ? '' : 'grayscale'}`}
        >
          {achievement.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>
        </div>
        {achievement.unlocked && (
          <div className="text-green-500 text-2xl">✓</div>
        )}
      </div>
      {achievement.unlocked && achievement.unlockedAt && (
        <div className="mt-2 text-xs text-gray-500">
          解锁于: {new Date(achievement.unlockedAt).toLocaleDateString('zh-CN')}
        </div>
      )}
    </div>
  );
};
