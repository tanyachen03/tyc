export enum AchievementType {
  MEDAL = 'medal',
  LEVEL = 'level'
}

export enum AchievementRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary'
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: AchievementType;
  rarity: AchievementRarity;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
  criteria: AchievementCriteria;
}

export interface AchievementCriteria {
  type: 'chapters' | 'courses' | 'streak' | 'time' | 'score' | 'perfect';
  target: number;
}

export interface Level {
  level: number;
  name: string;
  requiredXP: number;
}

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'first-chapter',
    title: '初出茅庐',
    description: '完成第一个章节',
    type: AchievementType.MEDAL,
    rarity: AchievementRarity.COMMON,
    icon: '🎓',
    unlocked: false,
    criteria: { type: 'chapters', target: 1 }
  },
  {
    id: 'chapter-5',
    title: '勤奋好学',
    description: '完成5个章节',
    type: AchievementType.MEDAL,
    rarity: AchievementRarity.UNCOMMON,
    icon: '📚',
    unlocked: false,
    criteria: { type: 'chapters', target: 5 }
  },
  {
    id: 'chapter-10',
    title: '博学多才',
    description: '完成10个章节',
    type: AchievementType.MEDAL,
    rarity: AchievementRarity.RARE,
    icon: '🏆',
    unlocked: false,
    criteria: { type: 'chapters', target: 10 }
  },
  {
    id: 'first-course',
    title: '小试牛刀',
    description: '完成第一门课程',
    type: AchievementType.MEDAL,
    rarity: AchievementRarity.UNCOMMON,
    icon: '🎯',
    unlocked: false,
    criteria: { type: 'courses', target: 1 }
  },
  {
    id: 'course-3',
    title: '学业有成',
    description: '完成3门课程',
    type: AchievementType.MEDAL,
    rarity: AchievementRarity.EPIC,
    icon: '🌟',
    unlocked: false,
    criteria: { type: 'courses', target: 3 }
  },
  {
    id: 'time-1h',
    title: '坚持不懈',
    description: '累计学习1小时',
    type: AchievementType.MEDAL,
    rarity: AchievementRarity.COMMON,
    icon: '⏱️',
    unlocked: false,
    criteria: { type: 'time', target: 3600000 }
  },
  {
    id: 'time-5h',
    title: '持之以恒',
    description: '累计学习5小时',
    type: AchievementType.MEDAL,
    rarity: AchievementRarity.UNCOMMON,
    icon: '🕰️',
    unlocked: false,
    criteria: { type: 'time', target: 18000000 }
  },
  {
    id: 'perfect-quiz',
    title: '完美答卷',
    description: '获得一次满分测验',
    type: AchievementType.MEDAL,
    rarity: AchievementRarity.RARE,
    icon: '💯',
    unlocked: false,
    criteria: { type: 'perfect', target: 1 }
  },
  {
    id: 'score-100',
    title: '积累点滴',
    description: '累计获得100分',
    type: AchievementType.MEDAL,
    rarity: AchievementRarity.COMMON,
    icon: '🎪',
    unlocked: false,
    criteria: { type: 'score', target: 100 }
  }
];

export const LEVELS_DATA: Level[] = [
  { level: 1, name: '初学者', requiredXP: 0 },
  { level: 2, name: '学徒', requiredXP: 100 },
  { level: 3, name: '学者', requiredXP: 300 },
  { level: 4, name: '专家', requiredXP: 600 },
  { level: 5, name: '大师', requiredXP: 1000 },
  { level: 6, name: '宗师', requiredXP: 1500 },
  { level: 7, name: '传奇', requiredXP: 2100 },
  { level: 8, name: '神话', requiredXP: 2800 },
  { level: 9, name: '至尊', requiredXP: 3600 },
  { level: 10, name: '不朽', requiredXP: 4500 }
];

export const getRarityColor = (rarity: AchievementRarity) => {
  switch (rarity) {
    case AchievementRarity.COMMON:
      return 'bg-gray-500';
    case AchievementRarity.UNCOMMON:
      return 'bg-green-500';
    case AchievementRarity.RARE:
      return 'bg-blue-500';
    case AchievementRarity.EPIC:
      return 'bg-purple-500';
    case AchievementRarity.LEGENDARY:
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

export const getRarityBorder = (rarity: AchievementRarity) => {
  switch (rarity) {
    case AchievementRarity.COMMON:
      return 'border-gray-400';
    case AchievementRarity.UNCOMMON:
      return 'border-green-400';
    case AchievementRarity.RARE:
      return 'border-blue-400';
    case AchievementRarity.EPIC:
      return 'border-purple-400';
    case AchievementRarity.LEGENDARY:
      return 'border-yellow-400';
    default:
      return 'border-gray-400';
  }
};
