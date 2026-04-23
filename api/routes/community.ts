import express, { type Request, type Response, type NextFunction } from 'express';
import { supabaseAdmin } from '../utils/database.js';

const router = express.Router();

interface PostRequest {
  title: string;
  content: string;
}

interface CommentRequest {
  content: string;
}

// 获取所有帖子
router.get(
  '/posts',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { data, error } = await supabaseAdmin
        .from('posts')
        .select('*, auth.users(email)')
        .order('created_at', { ascending: false });

      if (error) {
        res.status(500).json({
          success: false,
          error: '获取帖子失败',
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

// 获取单个帖子详情
router.get(
  '/posts/:id',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      // 获取帖子信息
      const { data: post, error: postError } = await supabaseAdmin
        .from('posts')
        .select('*, auth.users(email)')
        .eq('id', id)
        .single();

      if (postError) {
        res.status(404).json({
          success: false,
          error: '帖子不存在',
        });
        return;
      }

      // 获取帖子的回复
      const { data: comments, error: commentsError } = await supabaseAdmin
        .from('comments')
        .select('*, auth.users(email)')
        .eq('post_id', id)
        .order('created_at', { ascending: true });

      if (commentsError) {
        res.status(500).json({
          success: false,
          error: '获取回复失败',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          ...post,
          comments,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: '服务器错误',
      });
    }
  },
);

// 创建新帖子
router.post(
  '/posts',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_id = req.headers['x-user-id'] as string;
      const { title, content }: PostRequest = req.body;

      if (!user_id) {
        res.status(401).json({
          success: false,
          error: '未授权',
        });
        return;
      }

      if (!title || !content) {
        res.status(400).json({
          success: false,
          error: '标题和内容不能为空',
        });
        return;
      }

      const { data, error } = await supabaseAdmin
        .from('posts')
        .insert({
          user_id,
          title,
          content,
        })
        .select('*, auth.users(email)')
        .single();

      if (error) {
        res.status(500).json({
          success: false,
          error: '创建帖子失败',
        });
        return;
      }

      res.status(201).json({
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

// 更新帖子
router.put(
  '/posts/:id',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_id = req.headers['x-user-id'] as string;
      const { id } = req.params;
      const { title, content }: PostRequest = req.body;

      if (!user_id) {
        res.status(401).json({
          success: false,
          error: '未授权',
        });
        return;
      }

      if (!title || !content) {
        res.status(400).json({
          success: false,
          error: '标题和内容不能为空',
        });
        return;
      }

      // 检查帖子是否存在且属于当前用户
      const { data: existingPost } = await supabaseAdmin
        .from('posts')
        .select('id')
        .eq('id', id)
        .eq('user_id', user_id)
        .single();

      if (!existingPost) {
        res.status(404).json({
          success: false,
          error: '帖子不存在或无权修改',
        });
        return;
      }

      const { data, error } = await supabaseAdmin
        .from('posts')
        .update({
          title,
          content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select('*, auth.users(email)')
        .single();

      if (error) {
        res.status(500).json({
          success: false,
          error: '更新帖子失败',
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

// 删除帖子
router.delete(
  '/posts/:id',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_id = req.headers['x-user-id'] as string;
      const { id } = req.params;

      if (!user_id) {
        res.status(401).json({
          success: false,
          error: '未授权',
        });
        return;
      }

      // 检查帖子是否存在且属于当前用户
      const { data: existingPost } = await supabaseAdmin
        .from('posts')
        .select('id')
        .eq('id', id)
        .eq('user_id', user_id)
        .single();

      if (!existingPost) {
        res.status(404).json({
          success: false,
          error: '帖子不存在或无权删除',
        });
        return;
      }

      const { error } = await supabaseAdmin
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) {
        res.status(500).json({
          success: false,
          error: '删除帖子失败',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: '帖子删除成功',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: '服务器错误',
      });
    }
  },
);

// 创建回复
router.post(
  '/posts/:post_id/comments',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_id = req.headers['x-user-id'] as string;
      const { post_id } = req.params;
      const { content }: CommentRequest = req.body;

      if (!user_id) {
        res.status(401).json({
          success: false,
          error: '未授权',
        });
        return;
      }

      if (!content) {
        res.status(400).json({
          success: false,
          error: '回复内容不能为空',
        });
        return;
      }

      // 检查帖子是否存在
      const { data: existingPost } = await supabaseAdmin
        .from('posts')
        .select('id')
        .eq('id', post_id)
        .single();

      if (!existingPost) {
        res.status(404).json({
          success: false,
          error: '帖子不存在',
        });
        return;
      }

      const { data, error } = await supabaseAdmin
        .from('comments')
        .insert({
          post_id,
          user_id,
          content,
        })
        .select('*, auth.users(email)')
        .single();

      if (error) {
        res.status(500).json({
          success: false,
          error: '创建回复失败',
        });
        return;
      }

      res.status(201).json({
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

// 删除回复
router.delete(
  '/comments/:id',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_id = req.headers['x-user-id'] as string;
      const { id } = req.params;

      if (!user_id) {
        res.status(401).json({
          success: false,
          error: '未授权',
        });
        return;
      }

      // 检查回复是否存在且属于当前用户
      const { data: existingComment } = await supabaseAdmin
        .from('comments')
        .select('id')
        .eq('id', id)
        .eq('user_id', user_id)
        .single();

      if (!existingComment) {
        res.status(404).json({
          success: false,
          error: '回复不存在或无权删除',
        });
        return;
      }

      const { error } = await supabaseAdmin
        .from('comments')
        .delete()
        .eq('id', id);

      if (error) {
        res.status(500).json({
          success: false,
          error: '删除回复失败',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: '回复删除成功',
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