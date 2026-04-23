import React, { useEffect } from 'react';
import { useAchievements } from '../hooks/useAchievements';

const Achievements: React.FC = () => {
  const { 
    achievements, 
    userAchievements, 
    loading, 
    error, 
    initAchievements 
  } = useAchievements();

  useEffect(() => {
    // 初始化成就数据
    initAchievements();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">成就系统</h1>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-800 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 已获得的成就 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">已获得的成就</h2>
            
            {userAchievements.length > 0 ? (
              <div className="space-y-4">
                {userAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-4xl mr-4">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{achievement.name}</h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                      {achievement.earned_at && (
                        <p className="text-gray-500 text-xs mt-1">
                          获得于: {new Date(achievement.earned_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-600">暂无成就，继续努力学习吧！</p>
              </div>
            )}
          </div>

          {/* 所有成就 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">所有成就</h2>
            
            <div className="space-y-4">
              {achievements.map((achievement) => {
                const isEarned = userAchievements.some((ua) => ua.id === achievement.id);
                
                return (
                  <div 
                    key={achievement.id} 
                    className={`flex items-center p-4 rounded-lg ${isEarned ? 'bg-green-50' : 'bg-gray-50'}`}
                  >
                    <div className="text-4xl mr-4">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{achievement.name}</h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        要求: {achievement.requirement} {getRequirementText(achievement.type)}
                      </p>
                    </div>
                    <div className={`text-sm font-medium px-3 py-1 rounded-full ${isEarned ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {isEarned ? '已获得' : '未获得'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 成就统计 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">成就统计</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600">{userAchievements.length}</div>
              <div className="text-gray-600">已获得</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-gray-600">{achievements.length}</div>
              <div className="text-gray-600">总成就</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">
                {achievements.length > 0 ? Math.round((userAchievements.length / achievements.length) * 100) : 0}%
              </div>
              <div className="text-gray-600">完成率</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600">
                {achievements.length - userAchievements.length}
              </div>
              <div className="text-gray-600">未获得</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 辅助函数：获取成就类型的中文描述
function getRequirementText(type: string): string {
  switch (type) {
    case 'exercises':
      return '个练习';
    case 'projects':
      return '个项目';
    case 'courses':
      return '个课程';
    default:
      return '';
  }
}

export default Achievements;