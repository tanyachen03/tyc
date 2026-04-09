import { useState } from 'react';
import { useAchievementStore } from '../store/useAchievementStore';
import { AchievementGrid } from '../components/AchievementGrid';
import { LearningStats } from '../components/LearningStats';
import { AchievementNotificationContainer } from '../components/AchievementNotification';

type TabType = 'achievements' | 'stats';

export const AchievementsPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('achievements');
  const { achievements, unlockedAchievements } = useAchievementStore();

  const unlockedCount = unlockedAchievements.length;
  const totalCount = achievements.length;

  return (
    <div className="min-h-screen bg-background-50 py-12">
      <AchievementNotificationContainer />
      <div className="container-custom max-w-6xl">
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-background-900 mb-3">🏆 成就系统</h1>
          <p className="text-background-600 text-lg">
            已解锁 <span className="font-bold text-primary-600">{unlockedCount}</span>/<span className="font-bold">{totalCount}</span> 个成就
          </p>
        </div>

        <div className="flex gap-3 mb-8 animate-fade-in-up animate-delay-100">
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
              activeTab === 'achievements'
                ? 'btn-primary shadow-xl'
                : 'bg-white text-background-600 hover:bg-background-50 shadow-lg hover:shadow-xl border-2 border-background-100'
            }`}
          >
            成就勋章
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
              activeTab === 'stats'
                ? 'btn-primary shadow-xl'
                : 'bg-white text-background-600 hover:bg-background-50 shadow-lg hover:shadow-xl border-2 border-background-100'
            }`}
          >
            学习统计
          </button>
        </div>

        <div className="animate-fade-in-up animate-delay-200">
          {activeTab === 'achievements' && (
            <div className="space-y-8">
              <AchievementGrid achievements={achievements.filter(a => a.unlocked)} />
              {achievements.some(a => !a.unlocked) && (
                <>
                  <h2 className="text-2xl font-bold text-background-700 mt-10 mb-6">待解锁</h2>
                  <AchievementGrid achievements={achievements.filter(a => !a.unlocked)} />
                </>
              )}
            </div>
          )}

          {activeTab === 'stats' && <LearningStats />}
        </div>
      </div>
    </div>
  );
};
