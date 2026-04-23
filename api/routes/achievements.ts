import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../utils/database';

const router = Router();

// 获取所有成就
router.get('/achievements', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('achievements')
      .select('*');

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 获取用户的成就
router.get('/achievements/user', async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('user_achievements')
      .select('achievement_id, achievements(name, description, icon, earned_at)')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 检测并颁发成就
router.post('/achievements/check', async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    // 获取用户的学习进度
    const { data: progressData, error: progressError } = await supabaseAdmin
      .from('learning_progress')
      .select('module_type, completed')
      .eq('user_id', userId);

    if (progressError) {
      return res.status(500).json({ success: false, error: progressError.message });
    }

    // 统计用户完成的项目数
    const completedProjects = progressData.filter(
      (item) => item.module_type === 'project' && item.completed
    ).length;

    // 统计用户完成的练习数
    const completedExercises = progressData.filter(
      (item) => item.module_type === 'exercise' && item.completed
    ).length;

    // 统计用户完成的课程数
    const completedCourses = progressData.filter(
      (item) => item.module_type === 'course' && item.completed
    ).length;

    // 获取所有成就
    const { data: achievements, error: achievementsError } = await supabaseAdmin
      .from('achievements')
      .select('*');

    if (achievementsError) {
      return res.status(500).json({ success: false, error: achievementsError.message });
    }

    // 获取用户已获得的成就
    const { data: userAchievements, error: userAchievementsError } = await supabaseAdmin
      .from('user_achievements')
      .select('achievement_id')
      .eq('user_id', userId);

    if (userAchievementsError) {
      return res.status(500).json({ success: false, error: userAchievementsError.message });
    }

    const earnedAchievementIds = userAchievements.map((ua) => ua.achievement_id);
    const newAchievements = [];

    // 检测并颁发成就
    for (const achievement of achievements) {
      if (earnedAchievementIds.includes(achievement.id)) {
        continue;
      }

      let shouldEarn = false;

      switch (achievement.type) {
        case 'projects':
          shouldEarn = completedProjects >= achievement.requirement;
          break;
        case 'exercises':
          shouldEarn = completedExercises >= achievement.requirement;
          break;
        case 'courses':
          shouldEarn = completedCourses >= achievement.requirement;
          break;
        default:
          break;
      }

      if (shouldEarn) {
        const { error: insertError } = await supabaseAdmin
          .from('user_achievements')
          .insert({
            user_id: userId,
            achievement_id: achievement.id
          });

        if (!insertError) {
          newAchievements.push(achievement);
        }
      }
    }

    res.json({ success: true, newAchievements });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 初始化默认成就
router.post('/achievements/init', async (req: Request, res: Response) => {
  try {
    const defaultAchievements = [
      {
        name: 'Python新手',
        description: '完成第一个Python练习',
        icon: '🐍',
        requirement: 1,
        type: 'exercises'
      },
      {
        name: '练习达人',
        description: '完成10个Python练习',
        icon: '🏋️',
        requirement: 10,
        type: 'exercises'
      },
      {
        name: '练习大师',
        description: '完成50个Python练习',
        icon: '🏆',
        requirement: 50,
        type: 'exercises'
      },
      {
        name: '项目初学者',
        description: '完成第一个Python项目',
        icon: '📁',
        requirement: 1,
        type: 'projects'
      },
      {
        name: '项目开发者',
        description: '完成5个Python项目',
        icon: '👨‍💻',
        requirement: 5,
        type: 'projects'
      },
      {
        name: '项目专家',
        description: '完成10个Python项目',
        icon: '👑',
        requirement: 10,
        type: 'projects'
      },
      {
        name: '课程学习者',
        description: '完成第一个Python课程',
        icon: '📚',
        requirement: 1,
        type: 'courses'
      },
      {
        name: '课程爱好者',
        description: '完成3个Python课程',
        icon: '🎓',
        requirement: 3,
        type: 'courses'
      }
    ];

    for (const achievement of defaultAchievements) {
      const { data, error } = await supabaseAdmin
        .from('achievements')
        .select('id')
        .eq('name', achievement.name)
        .single();

      if (!data) {
        await supabaseAdmin.from('achievements').insert(achievement);
      }
    }

    res.json({ success: true, message: 'Default achievements initialized' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;