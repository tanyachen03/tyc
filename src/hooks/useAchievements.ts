import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: string;
  earned_at?: string;
}

export const useAchievements = () => {
  const [user, setUser] = useState<any>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserAchievements();
    }
  }, [user]);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/achievements');
      const data = await response.json();
      if (data.success) {
        setAchievements(data.data);
      } else {
        setError('获取成就列表失败');
      }
    } catch (err) {
      setError('获取成就列表失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserAchievements = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch('/api/achievements/user', {
        headers: {
          'x-user-id': user.id,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUserAchievements(
          data.data.map((item: any) => ({
            ...item.achievements,
            id: item.achievement_id,
          }))
        );
      } else {
        setError('获取用户成就失败');
      }
    } catch (err) {
      setError('获取用户成就失败');
    } finally {
      setLoading(false);
    }
  };

  const checkAchievements = async () => {
    if (!user) return [];

    try {
      const response = await fetch('/api/achievements/check', {
        method: 'POST',
        headers: {
          'x-user-id': user.id,
        },
      });
      const data = await response.json();
      if (data.success) {
        // 重新获取用户成就
        await fetchUserAchievements();
        return data.newAchievements;
      }
      return [];
    } catch (err) {
      return [];
    }
  };

  const initAchievements = async () => {
    try {
      const response = await fetch('/api/achievements/init', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        await fetchAchievements();
      }
    } catch (err) {
      console.error('初始化成就失败:', err);
    }
  };

  return {
    achievements,
    userAchievements,
    loading,
    error,
    checkAchievements,
    initAchievements,
  };
};