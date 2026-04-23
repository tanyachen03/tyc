import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-blue-600">Python学习平台</a>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <a href="/profile" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    个人资料
                  </a>
                  <a href="/progress" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    学习进度
                  </a>
                  <a href="/recommendations" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    学习推荐
                  </a>
                  <a href="/community" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    社区交流
                  </a>
                  <a href="/achievements" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    成就系统
                  </a>
                  <a href="/examples" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    示例代码
                  </a>
                  <button
                    onClick={async () => await supabase.auth.signOut()}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    退出登录
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    登录
                  </a>
                  <a href="/register" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    注册
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">欢迎来到Python学习平台</h1>
          <p className="text-xl text-gray-600 mb-8">从基础到进阶，沉浸式学习Python编程</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/code" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
              代码编辑器
            </a>
            <a href="/" className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md border border-blue-600 hover:bg-blue-50">
              浏览项目
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/code" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">代码编辑与运行</h3>
            <p className="text-gray-600">在线编写和运行Python代码，即时查看结果</p>
          </a>
          <a href="/exercises" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">互动式学习</h3>
            <p className="text-gray-600">通过练习和测验巩固知识点，获得即时反馈</p>
          </a>
          <a href="/projects" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">项目实践</h3>
            <p className="text-gray-600">完成10个实战项目，从基础到进阶</p>
          </a>
          <a href="/community" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">社区交流</h3>
            <p className="text-gray-600">与其他学习者交流，分享学习心得和经验</p>
          </a>
          <a href="/achievements" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">成就系统</h3>
            <p className="text-gray-600">完成学习任务，获得成就徽章，激励学习动力</p>
          </a>
          <a href="/examples" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">示例代码库</h3>
            <p className="text-gray-600">浏览和运行各种Python代码示例，学习不同知识点</p>
          </a>
        </div>
      </div>
    </div>
  );
}