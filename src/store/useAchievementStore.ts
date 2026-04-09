import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Achievement, ACHIEVEMENTS_DATA, LEVELS_DATA, Level } from '../types/achievements';

export interface AchievementState {
  achievements: Achievement[];
  xp: number;
  currentLevel: number;
  unlockedAchievements: string[];
  notificationQueue: Achievement[];
}

export interface AchievementActions {
  unlockAchievement: (achievementId: string) => void;
  addXP: (amount: number) => void;
  checkAchievements: (stats: {
    completedChapters: number;
    completedCourses: number;
    totalLearningTime: number;
    totalScore: number;
    perfectQuizzes: number;
  }) => void;
  dismissNotification: (achievementId: string) => void;
  resetAchievements: () => void;
  getCurrentLevelData: () => Level;
  getNextLevelData: () => Level | null;
  getProgressToNextLevel: () => number;
}

const initialState: AchievementState = {
  achievements: ACHIEVEMENTS_DATA.map(achievement => ({ ...achievement })),
  xp: 0,
  currentLevel: 1,
  unlockedAchievements: [],
  notificationQueue: [],
};

export const useAchievementStore = create<AchievementState & AchievementActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      unlockAchievement: (achievementId: string) => {
        set((state) => {
          const achievement = state.achievements.find((a: Achievement) => a.id === achievementId);
          if (!achievement || achievement.unlocked) return state;

          const updatedAchievements = state.achievements.map((a: Achievement) =>
            a.id === achievementId
              ? { ...a, unlocked: true, unlockedAt: Date.now() }
              : a
          );

          return {
            achievements: updatedAchievements,
            unlockedAchievements: [...state.unlockedAchievements, achievementId],
            notificationQueue: [...state.notificationQueue, achievement],
          };
        });
      },

      addXP: (amount: number) => {
        set((state) => {
          let newXP = state.xp + amount;
          let newLevel = state.currentLevel;

          for (let i = 0; i < LEVELS_DATA.length; i++) {
            if (newXP >= LEVELS_DATA[i].requiredXP) {
              newLevel = LEVELS_DATA[i].level;
            }
          }

          return {
            xp: newXP,
            currentLevel: newLevel,
          };
        });
      },

      checkAchievements: (stats) => {
        const state = get();
        state.achievements.forEach(achievement => {
          if (achievement.unlocked) return;

          let shouldUnlock = false;
          switch (achievement.criteria.type) {
            case 'chapters':
              shouldUnlock = stats.completedChapters >= achievement.criteria.target;
              break;
            case 'courses':
              shouldUnlock = stats.completedCourses >= achievement.criteria.target;
              break;
            case 'time':
              shouldUnlock = stats.totalLearningTime >= achievement.criteria.target;
              break;
            case 'score':
              shouldUnlock = stats.totalScore >= achievement.criteria.target;
              break;
            case 'perfect':
              shouldUnlock = stats.perfectQuizzes >= achievement.criteria.target;
              break;
          }

          if (shouldUnlock) {
            get().unlockAchievement(achievement.id);
            get().addXP(achievement.criteria.target * 10);
          }
        });
      },

      dismissNotification: (achievementId: string) => {
        set((state) => ({
          notificationQueue: state.notificationQueue.filter(a => a.id !== achievementId),
        }));
      },

      resetAchievements: () => {
        set(initialState);
      },

      getCurrentLevelData: () => {
        const state = get();
        return LEVELS_DATA.find((l: Level) => l.level === state.currentLevel) || LEVELS_DATA[0];
      },

      getNextLevelData: () => {
        const state = get();
        return LEVELS_DATA.find((l: Level) => l.level === state.currentLevel + 1) || null;
      },

      getProgressToNextLevel: () => {
        const state = get();
        const currentLevel = state.getCurrentLevelData();
        const nextLevel = state.getNextLevelData();
        
        if (!nextLevel) return 100;
        
        const xpRange = nextLevel.requiredXP - currentLevel.requiredXP;
        const currentXP = state.xp - currentLevel.requiredXP;
        return Math.min(100, Math.max(0, (currentXP / xpRange) * 100));
      },
    }),
    {
      name: 'achievement-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
