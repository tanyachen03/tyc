import express, { type Request, type Response, type NextFunction } from 'express';
import { supabaseAdmin } from '../utils/database.js';

const router = express.Router();

interface ProgressRequest {
  module_id: string;
  module_type: string;
  progress: number;
  completed?: boolean;
}

// 获取用户学习进度
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_id = req.headers['x-user-id'] as string;

      if (!user_id) {
        res.status(401).json({
          success: false,
          error: '未授权',
        });
        return;
      }

      const { data, error } = await supabaseAdmin
        .from('learning_progress')
        .select('*')
        .eq('user_id', user_id);

      if (error) {
        res.status(500).json({
          success: false,
          error: '获取进度失败',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: '服务器错误',
      });
    }
  },
);

// 更新或创建学习进度
router.post(
  '/update',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_id = req.headers['x-user-id'] as string;
      const { module_id, module_type, progress, completed = false }: ProgressRequest = req.body;

      if (!user_id) {
        res.status(401).json({
          success: false,
          error: '未授权',
        });
        return;
      }

      if (!module_id || !module_type || progress === undefined) {
        res.status(400).json({
          success: false,
          error: '参数不完整',
        });
        return;
      }

      // 检查是否已存在进度记录
      const { data: existingProgress } = await supabaseAdmin
        .from('learning_progress')
        .select('id')
        .eq('user_id', user_id)
        .eq('module_id', module_id)
        .eq('module_type', module_type)
        .single();

      let result;
      if (existingProgress) {
        // 更新现有记录
        result = await supabaseAdmin
          .from('learning_progress')
          .update({
            progress,
            completed,
            last_updated: new Date().toISOString(),
          })
          .eq('id', existingProgress.id)
          .select();
      } else {
        // 创建新记录
        result = await supabaseAdmin
          .from('learning_progress')
          .insert({
            user_id,
            module_id,
            module_type,
            progress,
            completed,
          })
          .select();
      }

      if (result.error) {
        res.status(500).json({
          success: false,
          error: '更新进度失败',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.data[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: '服务器错误',
      });
    }
  },
);

// 获取特定模块的进度
router.get(
  '/:module_type/:module_id',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_id = req.headers['x-user-id'] as string;
      const { module_type, module_id } = req.params;

      if (!user_id) {
        res.status(401).json({
          success: false,
          error: '未授权',
        });
        return;
      }

      const { data, error } = await supabaseAdmin
        .from('learning_progress')
        .select('*')
        .eq('user_id', user_id)
        .eq('module_id', module_id)
        .eq('module_type', module_type)
        .single();

      if (error) {
        // 如果没有找到记录，返回默认进度
        res.status(200).json({
          success: true,
          data: {
            progress: 0,
            completed: false,
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: '服务器错误',
      });
    }
  },
);

export default router;