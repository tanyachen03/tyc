import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { getAllProgress } from '../hooks/useProgress';

const Progress: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [progressData, setProgressData] = useState<any[]>([]);
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
    const fetchProgress = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getAllProgress();
        setProgressData(data);
      } catch (err) {
        setError('获取学习进度失败');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">请先登录</h2>
          <a 
            href="/login" 
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            前往登录
          </a>
        </div>
      </div>
    );
  }

  // 统计数据
  const totalModules = progressData.length;
  const completedModules = progressData.filter(item => item.completed).length;
  const totalProgress = progressData.length > 0 
    ? Math.round(progressData.reduce((sum, item) => sum + item.progress, 0) / progressData.length)
    : 0;

  // 按类型分组
  const progressByType = progressData.reduce((acc, item) => {
    if (!acc[item.module_type]) {
      acc[item.module_type] = [];
    }
    acc[item.module_type].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">学习进度</h1>
          <p className="text-gray-600">追踪您的学习旅程</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">总进度</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full" 
                  style={{ width: `${totalProgress}%` }}
                ></div>
              </div>
              <span className="ml-4 font-semibold text-gray-900">{totalProgress}%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">已完成模块</h3>
            <p className="text-2xl font-bold text-blue-600">{completedModules}/{totalModules}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">学习模块</h3>
            <p className="text-2xl font-bold text-gray-900">{totalModules}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">详细进度</h3>
          
          {Object.entries(progressByType).map(([type, items]) => (
            <div key={type} className="mb-6">
              <h4 className="text-md font-semibold text-gray-700 mb-3">
                {type === 'course' ? '课程' : type === 'exercise' ? '练习' : '项目'}
              </h4>
              <div className="space-y-3">
                {items.map((item: any) => (
                  <div key={item.id} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{item.module_id}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {item.completed ? '已完成' : `${item.progress}%`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.completed ? 'bg-green-500' : 'bg-blue-600'}`} 
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {totalModules === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">您还没有开始学习任何模块</p>
              <a 
                href="/" 
                className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              >
                开始学习
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;