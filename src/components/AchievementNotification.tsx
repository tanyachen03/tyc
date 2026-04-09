import { useEffect } from 'react';
import { Achievement, getRarityColor } from '../types/achievements';
import { useAchievementStore } from '../store/useAchievementStore';

interface AchievementNotificationProps {
  achievement: Achievement;
}

const AchievementNotification = ({ achievement }: AchievementNotificationProps) => {
  const dismissNotification = useAchievementStore((state) => state.dismissNotification);

  useEffect(() => {
    const timer = setTimeout(() => {
      dismissNotification(achievement.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [achievement.id, dismissNotification]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-white rounded-xl shadow-2xl p-4 max-w-sm border-2 border-yellow-400">
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl ${getRarityColor(
              achievement.rarity
            )} animate-bounce`}
          >
            {achievement.icon}
          </div>
          <div className="flex-1">
            <div className="text-yellow-600 font-bold text-sm">🎉 成就解锁！</div>
            <h3 className="font-bold text-gray-800">{achievement.title}</h3>
            <p className="text-sm text-gray-600">{achievement.description}</p>
          </div>
          <button
            onClick={() => dismissNotification(achievement.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        .animate-bounce {
          animation: bounce 1s ease-in-out 3;
        }
      `}</style>
    </div>
  );
};

export const AchievementNotificationContainer = () => {
  const notificationQueue = useAchievementStore((state) => state.notificationQueue);

  return (
    <>
      {notificationQueue.map((achievement) => (
        <AchievementNotification key={achievement.id} achievement={achievement} />
      ))}
    </>
  );
};
