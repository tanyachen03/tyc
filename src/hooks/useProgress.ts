import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface ProgressData {
  id?: string;
  module_id: string;
  module_type: string;
  progress: number;
  completed: boolean;
  last_updated?: string;
  created_at?: string;
}

interface UseProgressReturn {
  progress: number;
  completed: boolean;
  isLoading: boolean;
  error: string | null;
  updateProgress: (newProgress: number, completed?: boolean) => Promise<void>;
}

export function useProgress(module_id: string, module_type: string): UseProgressReturn {
  const [progress, setProgress] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 获取进度
  useEffect(() => {
    const fetchProgress = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(`/api/progress/${module_type}/${module_id}`, {
          headers: {
            'x-user-id': user.id,
          },
        });

        const data = await response.json();
        if (data.success) {
          setProgress(data.data.progress);
          setCompleted(data.data.completed);
        }
      } catch (err) {
        setError('获取进度失败');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [module_id, module_type]);

  // 更新进度
  const updateProgress = async (newProgress: number, completed: boolean = newProgress >= 100) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('请先登录');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/progress/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify({
          module_id,
          module_type,
          progress: newProgress,
          completed,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setProgress(data.data.progress);
        setCompleted(data.data.completed);
      } else {
        setError('更新进度失败');
      }
    } catch (err) {
      setError('更新进度失败');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    progress,
    completed,
    isLoading,
    error,
    updateProgress,
  };
}

// 获取用户所有学习进度
export async function getAllProgress(): Promise<ProgressData[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return [];
    }

    const response = await fetch('/api/progress', {
      headers: {
        'x-user-id': user.id,
      },
    });

    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return [];
  } catch (err) {
    console.error('获取所有进度失败:', err);
    return [];
  }
}