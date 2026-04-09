import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useAchievementStore } from './useAchievementStore';

export interface ChapterProgress {
  chapterId: string;
  completed: boolean;
  completedAt?: number;
}

export interface CourseProgress {
  courseId: string;
  completedChapters: string[];
  totalChapters: number;
  completedAt?: number;
}

export interface PracticeScore {
  id: string;
  courseId: string;
  chapterId?: string;
  score: number;
  maxScore: number;
  completedAt: number;
}

export interface QuizScore {
  id: string;
  courseId: string;
  chapterId?: string;
  score: number;
  maxScore: number;
  completedAt: number;
}

export interface LearningState {
  completedCourses: CourseProgress[];
  completedChapters: ChapterProgress[];
  practiceScores: PracticeScore[];
  quizScores: QuizScore[];
  totalLearningTime: number;
  dailyLearningTime: Record<string, number>;
  currentSessionStartTime: number | null;
}

export interface LearningActions {
  markCourseComplete: (courseId: string, totalChapters: number) => void;
  markChapterComplete: (courseId: string, chapterId: string) => void;
  addPracticeScore: (score: Omit<PracticeScore, 'completedAt' | 'id'>) => void;
  addQuizScore: (score: Omit<QuizScore, 'completedAt' | 'id'>) => void;
  startLearningSession: () => void;
  endLearningSession: () => void;
  resetProgress: () => void;
  getCourseProgress: (courseId: string) => CourseProgress | undefined;
  getChapterProgress: (chapterId: string) => ChapterProgress | undefined;
  getTotalPracticeScore: (courseId?: string) => { total: number; max: number };
  getTotalQuizScore: (courseId?: string) => { total: number; max: number };
  getTodayLearningTime: () => number;
}

const checkAndUnlockAchievements = (state: LearningState) => {
  const totalPracticeScore = state.practiceScores.reduce((sum, s) => sum + s.score, 0);
  const totalQuizScore = state.quizScores.reduce((sum, s) => sum + s.score, 0);
  const perfectQuizzes = state.quizScores.filter(s => s.score === s.maxScore).length;

  useAchievementStore.getState().checkAchievements({
    completedChapters: state.completedChapters.length,
    completedCourses: state.completedCourses.length,
    totalLearningTime: state.totalLearningTime,
    totalScore: totalPracticeScore + totalQuizScore,
    perfectQuizzes,
  });
};

const initialState: LearningState = {
  completedCourses: [],
  completedChapters: [],
  practiceScores: [],
  quizScores: [],
  totalLearningTime: 0,
  dailyLearningTime: {},
  currentSessionStartTime: null,
};

export const useLearningStore = create<LearningState & LearningActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      markCourseComplete: (courseId: string, totalChapters: number) => {
        set((state) => {
          const existingCourse = state.completedCourses.find(c => c.courseId === courseId);
          let newState;
          if (existingCourse) {
            newState = {
              completedCourses: state.completedCourses.map(c =>
                c.courseId === courseId
                  ? { ...c, completedAt: Date.now() }
                  : c
              ),
            };
          } else {
            newState = {
              completedCourses: [
                ...state.completedCourses,
                {
                  courseId,
                  completedChapters: [],
                  totalChapters,
                  completedAt: Date.now(),
                },
              ],
            };
          }
          setTimeout(() => checkAndUnlockAchievements({ ...state, ...newState }), 0);
          return newState;
        });
      },

      markChapterComplete: (courseId: string, chapterId: string) => {
        set((state) => {
          const existingChapter = state.completedChapters.find(c => c.chapterId === chapterId);
          let newCompletedChapters = [...state.completedChapters];
          
          if (!existingChapter) {
            newCompletedChapters.push({
              chapterId,
              completed: true,
              completedAt: Date.now(),
            });
          }

          let newCompletedCourses = [...state.completedCourses];
          const courseIndex = newCompletedCourses.findIndex(c => c.courseId === courseId);
          
          if (courseIndex !== -1) {
            const course = newCompletedCourses[courseIndex];
            if (!course.completedChapters.includes(chapterId)) {
              newCompletedCourses[courseIndex] = {
                ...course,
                completedChapters: [...course.completedChapters, chapterId],
              };
            }
          } else {
            newCompletedCourses.push({
              courseId,
              completedChapters: [chapterId],
              totalChapters: 0,
            });
          }

          const newState = {
            completedChapters: newCompletedChapters,
            completedCourses: newCompletedCourses,
          };
          setTimeout(() => checkAndUnlockAchievements({ ...state, ...newState }), 0);
          return newState;
        });
      },

      addPracticeScore: (score) => {
        set((state) => {
          const newState = {
            practiceScores: [
              ...state.practiceScores,
              {
                ...score,
                id: `practice-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                completedAt: Date.now(),
              },
            ],
          };
          setTimeout(() => checkAndUnlockAchievements({ ...state, ...newState }), 0);
          return newState;
        });
      },

      addQuizScore: (score) => {
        set((state) => {
          const newState = {
            quizScores: [
              ...state.quizScores,
              {
                ...score,
                id: `quiz-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                completedAt: Date.now(),
              },
            ],
          };
          setTimeout(() => checkAndUnlockAchievements({ ...state, ...newState }), 0);
          return newState;
        });
      },

      startLearningSession: () => {
        set({ currentSessionStartTime: Date.now() });
      },

      endLearningSession: () => {
        const state = get();
        if (state.currentSessionStartTime) {
          const sessionDuration = Date.now() - state.currentSessionStartTime;
          const today = new Date().toISOString().split('T')[0];
          
          set((prevState) => {
            const newState = {
              totalLearningTime: prevState.totalLearningTime + sessionDuration,
              dailyLearningTime: {
                ...prevState.dailyLearningTime,
                [today]: (prevState.dailyLearningTime[today] || 0) + sessionDuration,
              },
              currentSessionStartTime: null,
            };
            setTimeout(() => checkAndUnlockAchievements({ ...prevState, ...newState }), 0);
            return newState;
          });
        }
      },

      resetProgress: () => {
        set(initialState);
      },

      getCourseProgress: (courseId) => {
        return get().completedCourses.find(c => c.courseId === courseId);
      },

      getChapterProgress: (chapterId) => {
        return get().completedChapters.find(c => c.chapterId === chapterId);
      },

      getTotalPracticeScore: (courseId) => {
        const scores = courseId
          ? get().practiceScores.filter(s => s.courseId === courseId)
          : get().practiceScores;
        return {
          total: scores.reduce((sum, s) => sum + s.score, 0),
          max: scores.reduce((sum, s) => sum + s.maxScore, 0),
        };
      },

      getTotalQuizScore: (courseId) => {
        const scores = courseId
          ? get().quizScores.filter(s => s.courseId === courseId)
          : get().quizScores;
        return {
          total: scores.reduce((sum, s) => sum + s.score, 0),
          max: scores.reduce((sum, s) => sum + s.maxScore, 0),
        };
      },

      getTodayLearningTime: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().dailyLearningTime[today] || 0;
      },
    }),
    {
      name: 'learning-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
