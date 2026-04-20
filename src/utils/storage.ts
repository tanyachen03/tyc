// 数据分析项目进度类型定义
export interface ProjectProgress {
  code: string; // 用户编写的代码
  completed: boolean; // 是否完成
  lastUpdated: number; // 最后更新时间
}

// 存储单个数据分析项目进度
export const saveProjectProgress = (projectId: string, progress: Omit<ProjectProgress, 'lastUpdated'>) => {
  const allProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
  allProgress[projectId] = {
    ...progress,
    lastUpdated: Date.now()
  };
  localStorage.setItem('learningProgress', JSON.stringify(allProgress));
};

// 获取单个数据分析项目进度
export const getProjectProgress = (projectId: string): ProjectProgress => {
  const allProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
  return allProgress[projectId] || { code: '', completed: false, lastUpdated: 0 };
};

// 获取所有数据分析项目进度
export const getAllProgress = (): Record<string, ProjectProgress> => {
  return JSON.parse(localStorage.getItem('learningProgress') || '{}');
};

// 训练项目进度类型定义
export interface TrainingProgress {
  code: string; // 用户编写的代码
  lastUpdated: number; // 最后更新时间
}

// 存储单个训练项目进度
export const saveTrainingProgress = (projectId: string, code: string) => {
  const allProgress = JSON.parse(localStorage.getItem('trainingProgress') || '{}');
  allProgress[projectId] = {
    code,
    lastUpdated: Date.now()
  };
  localStorage.setItem('trainingProgress', JSON.stringify(allProgress));
};

// 获取单个训练项目进度
export const getTrainingProgress = (projectId: string): string => {
  const allProgress = JSON.parse(localStorage.getItem('trainingProgress') || '{}');
  return allProgress[projectId]?.code || '';
};

// 存储AI聊天记录
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export const saveChatHistory = (projectId: string, messages: ChatMessage[]) => {
  const allChats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
  allChats[projectId] = messages;
  localStorage.setItem('chatHistory', JSON.stringify(allChats));
};

export const getChatHistory = (projectId: string): ChatMessage[] => {
  const allChats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
  return allChats[projectId] || [];
};
