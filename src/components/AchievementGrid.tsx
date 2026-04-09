import { Achievement } from '../types/achievements';
import { AchievementCard } from './AchievementCard';

interface AchievementGridProps {
  achievements: Achievement[];
}

export const AchievementGrid = ({ achievements }: AchievementGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
};
