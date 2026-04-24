import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { supabase } from '../utils/supabase';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* 导航栏 */}
      <nav className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">Python学习平台</span>
              </Link>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <NavLink to="/" current={location.pathname === '/'}>
                  首页
                </NavLink>
                <NavLink to="/courses" current={location.pathname.startsWith('/courses')}>
                  课程
                </NavLink>
                <NavLink to="/exercises" current={location.pathname.startsWith('/exercises')}>
                  练习
                </NavLink>
                <NavLink to="/projects" current={location.pathname.startsWith('/projects')}>
                  项目
                </NavLink>
                <NavLink to="/code" current={location.pathname === '/code'}>
                  代码实操场
                </NavLink>
                <NavLink to="/community" current={location.pathname === '/community'}>
                  社区
                </NavLink>
              </div>
            </div>
            <div className="flex items-center">
              {/* 主题切换按钮 */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDark ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-800'}`}
                aria-label="切换主题"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              
              {/* 用户菜单 */}
              <div className="ml-4 flex items-center md:ml-6">
                {user ? (
                  <div className="relative">
                    <button
                      type="button"
                      className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center"
                    >
                      {user.email?.charAt(0).toUpperCase()}
                    </button>
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        个人资料
                      </Link>
                      <Link to="/progress" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        学习进度
                      </Link>
                      <Link to="/achievements" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        成就
                      </Link>
                      <Link to="/recommendations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        学习推荐
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                      >
                        退出登录
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to="/login" className="ml-3 px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    登录
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

// 导航链接组件
const NavLink: React.FC<{ to: string; current: boolean; children: React.ReactNode }> = ({ to, current, children }) => {
  return (
    <Link
      to={to}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${current ? 'border-blue-500 text-blue-600' : 'border-transparent hover:border-gray-300 hover:text-gray-700'}`}
    >
      {children}
    </Link>
  );
};

export default Layout;