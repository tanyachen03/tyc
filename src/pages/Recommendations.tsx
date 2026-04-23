import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { getAllProgress } from '../hooks/useProgress';

// 学习内容数据
const learningContent = {
  courses: [
    { id: 'course1', title: 'Python基础入门', difficulty: 'beginner', description: '学习Python的基本语法和概念' },
    { id: 'course2', title: 'Python函数与模块', difficulty: 'beginner', description: '学习Python函数定义和模块使用' },
    { id: 'course3', title: 'Python面向对象编程', difficulty: 'intermediate', description: '学习Python类和对象的概念' },
    { id: 'course4', title: 'Python文件操作', difficulty: 'intermediate', description: '学习Python的文件读写操作' },
    { id: 'course5', title: 'Python网络编程', difficulty: 'intermediate', description: '学习Python的网络编程基础' },
    { id: 'course6', title: 'Python数据库操作', difficulty: 'advanced', description: '学习Python操作数据库' },
    { id: 'course7', title: 'Python机器学习入门', difficulty: 'advanced', description: '学习Python机器学习基础' }
  ],
  exercises: [
    { id: 'ex1', title: 'Python基础语法练习', difficulty: 'beginner', description: '练习Python的基本语法' },
    { id: 'ex2', title: 'Python函数练习', difficulty: 'intermediate', description: '练习Python函数的使用' },
    { id: 'ex3', title: 'Python面向对象练习', difficulty: 'advanced', description: '练习Python面向对象编程' }
  ],
  projects: [
    { id: 'proj1', title: '猜数字游戏', difficulty: 'beginner', description: '创建一个简单的猜数字游戏' },
    { id: 'proj2', title: '简单计算器', difficulty: 'beginner', description: '创建一个简单的命令行计算器' },
    { id: 'proj3', title: '待办事项列表', difficulty: 'beginner', description: '创建一个待办事项列表应用' },
    { id: 'proj4', title: '文件读写操作', difficulty: 'intermediate', description: '创建一个文件读写程序' },
    { id: 'proj5', title: '简单的Web服务器', difficulty: 'intermediate', description: '创建一个简单的Web服务器' },
    { id: 'proj6', title: '数据可视化', difficulty: 'intermediate', description: '创建数据可视化图表' },
    { id: 'proj7', title: '简单的爬虫', difficulty: 'intermediate', description: '创建一个简单的网页爬虫' },
    { id: 'proj8', title: '面向对象编程 - 银行账户', difficulty: 'advanced', description: '创建一个银行账户类' },
    { id: 'proj9', title: '简单的数据库应用', difficulty: 'advanced', description: '创建一个数据库应用' },
    { id: 'proj10', title: '机器学习入门 - 线性回归', difficulty: 'advanced', description: '创建一个线性回归模型' }
  ]
};

const Recommendations: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [progressData, setProgressData] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    const fetchProgressAndRecommend = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const data = await getAllProgress();
        setProgressData(data);
        
        // 生成推荐
        const recs = generateRecommendations(data);
        setRecommendations(recs);
      } catch (err) {
        console.error('获取进度失败:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressAndRecommend();
  }, [user]);

  // 生成推荐算法
  const generateRecommendations = (progress: any[]) => {
    // 计算用户的总体学习水平
    const userLevel = calculateUserLevel(progress);
    
    // 收集所有未完成的内容
    const allContent = [
      ...learningContent.courses.map(c => ({ ...c, type: 'course' })),
      ...learningContent.exercises.map(e => ({ ...e, type: 'exercise' })),
      ...learningContent.projects.map(p => ({ ...p, type: 'project' }))
    ];

    // 过滤已完成的内容
    const completedIds = progress
      .filter(item => item.completed)
      .map(item => `${item.module_type}_${item.module_id}`);

    const uncompletedContent = allContent.filter(item => 
      !completedIds.includes(`${item.type}_${item.id}`)
    );

    // 根据用户水平和内容难度进行匹配
    const matchedContent = uncompletedContent.filter(item => {
      if (userLevel === 'beginner') {
        return item.difficulty === 'beginner';
      } else if (userLevel === 'intermediate') {
        return item.difficulty === 'beginner' || item.difficulty === 'intermediate';
      } else {
        return true; // advanced用户可以学习所有内容
      }
    });

    // 按难度和类型排序
    const sortedContent = matchedContent.sort((a, b) => {
      // 先按难度排序
      const difficultyOrder = { 'beginner': 0, 'intermediate': 1, 'advanced': 2 };
      const diffCompare = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      if (diffCompare !== 0) return diffCompare;
      
      // 再按类型排序（课程 -> 练习 -> 项目）
      const typeOrder = { 'course': 0, 'exercise': 1, 'project': 2 };
      return typeOrder[a.type] - typeOrder[b.type];
    });

    // 返回前10个推荐
    return sortedContent.slice(0, 10);
  };

  // 计算用户学习水平
  const calculateUserLevel = (progress: any[]) => {
    if (progress.length === 0) return 'beginner';

    // 计算已完成的内容
    const completed = progress.filter(item => item.completed);
    const completionRate = completed.length / progress.length;

    // 计算已完成内容的平均难度
    const completedDifficulties = completed.map(item => {
      const content = [...learningContent.courses, ...learningContent.exercises, ...learningContent.projects]
        .find(c => c.id === item.module_id);
      return content?.difficulty || 'beginner';
    });

    const difficultyScores = {
      'beginner': 1,
      'intermediate': 2,
      'advanced': 3
    };

    const avgDifficultyScore = completedDifficulties.length > 0
      ? completedDifficulties.reduce((sum, diff) => sum + difficultyScores[diff as keyof typeof difficultyScores], 0) / completedDifficulties.length
      : 1;

    // 根据完成率和平均难度确定用户水平
    if (completionRate < 0.3 || avgDifficultyScore < 1.5) {
      return 'beginner';
    } else if (completionRate < 0.7 || avgDifficultyScore < 2.5) {
      return 'intermediate';
    } else {
      return 'advanced';
    }
  };

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
          <p className="text-gray-600 mb-6">登录后可以查看个性化学习推荐</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">个性化学习推荐</h1>
          <p className="text-gray-600">根据您的学习历史推荐适合的内容</p>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((item, index) => (
              <div key={`${item.type}_${item.id}`} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    item.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {item.difficulty === 'beginner' ? '基础' :
                     item.difficulty === 'intermediate' ? '中级' : '高级'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}>
                    {item.type === 'course' ? '课程' : item.type === 'exercise' ? '练习' : '项目'}
                  </span>
                  <span className="text-sm text-gray-500">推荐 #{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">开始您的学习之旅</h3>
            <p className="text-gray-600 mb-6">完成一些学习内容后，我们将为您提供个性化推荐</p>
            <a 
              href="/exercises" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              开始练习
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;