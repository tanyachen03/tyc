import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 模拟数据，用于演示
let mockProgressData: any[] = [];
let mockPostsData: any[] = [];
let mockCommentsData: any[] = [];
let mockAchievementsData: any[] = [];
let mockUserAchievementsData: any[] = [];

// 创建客户端
let supabaseAdminInstance: any;

if (supabaseUrl && supabaseServiceKey) {
  supabaseAdminInstance = createClient(supabaseUrl, supabaseServiceKey);
} else {
  // 创建模拟客户端
  supabaseAdminInstance = {
    from: (table: string) => {
      return {
        select: (fields: string) => {
          return {
            eq: (field: string, value: any) => {
              return {
                order: (field: string, options: any) => {
                  return {
                    single: () => {
                      return Promise.resolve({ data: null, error: null });
                    },
                    then: (callback: any) => {
                      let data = [];
                      if (table === 'learning_progress') {
                        data = mockProgressData.filter(item => item[field] === value);
                      } else if (table === 'posts') {
                        data = mockPostsData.filter(item => item[field] === value);
                      } else if (table === 'comments') {
                        data = mockCommentsData.filter(item => item[field] === value);
                      } else if (table === 'achievements') {
                        data = mockAchievementsData;
                      } else if (table === 'user_achievements') {
                        data = mockUserAchievementsData.filter(item => item[field] === value);
                      }
                      return Promise.resolve({ data, error: null });
                    }
                  };
                },
                single: () => {
                  return Promise.resolve({ data: null, error: null });
                },
                then: (callback: any) => {
                  let data = [];
                  if (table === 'learning_progress') {
                    data = mockProgressData.filter(item => item[field] === value);
                  } else if (table === 'posts') {
                    data = mockPostsData.filter(item => item[field] === value);
                  } else if (table === 'comments') {
                    data = mockCommentsData.filter(item => item[field] === value);
                  } else if (table === 'achievements') {
                    data = mockAchievementsData;
                  } else if (table === 'user_achievements') {
                    data = mockUserAchievementsData.filter(item => item[field] === value);
                  }
                  return Promise.resolve({ data, error: null });
                }
              };
            },
            then: (callback: any) => {
              let data = [];
              if (table === 'learning_progress') {
                data = mockProgressData;
              } else if (table === 'posts') {
                data = mockPostsData;
              } else if (table === 'comments') {
                data = mockCommentsData;
              } else if (table === 'achievements') {
                data = mockAchievementsData;
              } else if (table === 'user_achievements') {
                data = mockUserAchievementsData;
              }
              return Promise.resolve({ data, error: null });
            }
          };
        },
        insert: (data: any) => {
          return {
            select: (fields: string) => {
              return {
                single: () => {
                  if (table === 'learning_progress') {
                    mockProgressData.push(data);
                  } else if (table === 'posts') {
                    mockPostsData.push(data);
                  } else if (table === 'comments') {
                    mockCommentsData.push(data);
                  } else if (table === 'achievements') {
                    mockAchievementsData.push(data);
                  } else if (table === 'user_achievements') {
                    mockUserAchievementsData.push(data);
                  }
                  return Promise.resolve({ data, error: null });
                },
                then: (callback: any) => {
                  if (table === 'learning_progress') {
                    mockProgressData.push(data);
                  } else if (table === 'posts') {
                    mockPostsData.push(data);
                  } else if (table === 'comments') {
                    mockCommentsData.push(data);
                  } else if (table === 'achievements') {
                    mockAchievementsData.push(data);
                  } else if (table === 'user_achievements') {
                    mockUserAchievementsData.push(data);
                  }
                  return Promise.resolve({ data, error: null });
                }
              };
            },
            then: (callback: any) => {
              if (table === 'learning_progress') {
                mockProgressData.push(data);
              } else if (table === 'posts') {
                mockPostsData.push(data);
              } else if (table === 'comments') {
                mockCommentsData.push(data);
              } else if (table === 'achievements') {
                mockAchievementsData.push(data);
              } else if (table === 'user_achievements') {
                mockUserAchievementsData.push(data);
              }
              return Promise.resolve({ data, error: null });
            }
          };
        },
        update: (data: any) => {
          return {
            eq: (field: string, value: any) => {
              return {
                select: (fields: string) => {
                  return {
                    single: () => {
                      return Promise.resolve({ data, error: null });
                    },
                    then: (callback: any) => {
                      return Promise.resolve({ data, error: null });
                    }
                  };
                },
                then: (callback: any) => {
                  return Promise.resolve({ data, error: null });
                }
              };
            },
            then: (callback: any) => {
              return Promise.resolve({ data, error: null });
            }
          };
        },
        delete: () => {
          return {
            eq: (field: string, value: any) => {
              return {
                then: (callback: any) => {
                  return Promise.resolve({ data: null, error: null });
                }
              };
            },
            then: (callback: any) => {
              return Promise.resolve({ data: null, error: null });
            }
          };
        }
      };
    },
    rpc: (name: string, params: any) => {
      return Promise.resolve({ data: null, error: null });
    }
  };
  
  // 初始化模拟数据
  mockAchievementsData = [
    {
      id: '1',
      name: 'Python新手',
      description: '完成第一个Python练习',
      icon: '🐍',
      requirement: 1,
      type: 'exercises',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: '练习达人',
      description: '完成10个Python练习',
      icon: '🏋️',
      requirement: 10,
      type: 'exercises',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: '项目初学者',
      description: '完成第一个Python项目',
      icon: '📁',
      requirement: 1,
      type: 'projects',
      created_at: new Date().toISOString()
    }
  ];
  
  mockProgressData = [
    {
      id: '1',
      user_id: 'test-user-1',
      module_id: 'course-1',
      module_type: 'course',
      progress: 50,
      completed: false,
      last_updated: new Date().toISOString(),
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      user_id: 'test-user-1',
      module_id: 'exercise-1',
      module_type: 'exercise',
      progress: 100,
      completed: true,
      last_updated: new Date().toISOString(),
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      user_id: 'test-user-1',
      module_id: 'project-1',
      module_type: 'project',
      progress: 75,
      completed: false,
      last_updated: new Date().toISOString(),
      created_at: new Date().toISOString()
    }
  ];
  
  mockPostsData = [
    {
      id: '1',
      user_id: 'test-user-1',
      title: '如何学习Python?',
      content: '我是Python初学者，请问有什么好的学习资源推荐吗？',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      user_id: 'test-user-2',
      title: 'Python爬虫实战',
      content: '分享一个我最近做的爬虫项目，用来爬取网站数据...',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
}

export const supabaseAdmin = supabaseAdminInstance;

// 创建学习进度表
export async function createProgressTable() {
  try {
    const { error } = await supabaseAdmin.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS learning_progress (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          module_id TEXT NOT NULL,
          module_type TEXT NOT NULL, -- course, exercise, project
          progress INTEGER NOT NULL DEFAULT 0, -- 0-100
          completed BOOLEAN DEFAULT false,
          last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          UNIQUE(user_id, module_id, module_type)
        );

        -- 为user_id创建索引
        CREATE INDEX IF NOT EXISTS idx_learning_progress_user_id ON learning_progress(user_id);

        -- 设置RLS
        ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;

        -- 创建策略
        CREATE POLICY "Users can view their own progress" ON learning_progress
          FOR SELECT USING (user_id = auth.uid());

        CREATE POLICY "Users can insert their own progress" ON learning_progress
          FOR INSERT WITH CHECK (user_id = auth.uid());

        CREATE POLICY "Users can update their own progress" ON learning_progress
          FOR UPDATE USING (user_id = auth.uid());

        CREATE POLICY "Users can delete their own progress" ON learning_progress
          FOR DELETE USING (user_id = auth.uid());
      `
    });

    if (error) {
      console.error('Error creating progress table:', error);
    } else {
      console.log('Progress table created successfully');
    }
  } catch (error) {
    console.error('Error creating progress table:', error);
  }
}

// 创建社区帖子表
export async function createPostsTable() {
  try {
    const { error } = await supabaseAdmin.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS posts (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );

        -- 为user_id创建索引
        CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);

        -- 设置RLS
        ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

        -- 创建策略
        CREATE POLICY "Users can view all posts" ON posts
          FOR SELECT USING (true);

        CREATE POLICY "Users can insert their own posts" ON posts
          FOR INSERT WITH CHECK (user_id = auth.uid());

        CREATE POLICY "Users can update their own posts" ON posts
          FOR UPDATE USING (user_id = auth.uid());

        CREATE POLICY "Users can delete their own posts" ON posts
          FOR DELETE USING (user_id = auth.uid());
      `
    });

    if (error) {
      console.error('Error creating posts table:', error);
    } else {
      console.log('Posts table created successfully');
    }
  } catch (error) {
    console.error('Error creating posts table:', error);
  }
}

// 创建社区回复表
export async function createCommentsTable() {
  try {
    const { error } = await supabaseAdmin.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS comments (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          content TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );

        -- 为post_id和user_id创建索引
        CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
        CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);

        -- 设置RLS
        ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

        -- 创建策略
        CREATE POLICY "Users can view all comments" ON comments
          FOR SELECT USING (true);

        CREATE POLICY "Users can insert their own comments" ON comments
          FOR INSERT WITH CHECK (user_id = auth.uid());

        CREATE POLICY "Users can update their own comments" ON comments
          FOR UPDATE USING (user_id = auth.uid());

        CREATE POLICY "Users can delete their own comments" ON comments
          FOR DELETE USING (user_id = auth.uid());
      `
    });

    if (error) {
      console.error('Error creating comments table:', error);
    } else {
      console.log('Comments table created successfully');
    }
  } catch (error) {
    console.error('Error creating comments table:', error);
  }
}

// 创建成就表
export async function createAchievementsTable() {
  try {
    const { error } = await supabaseAdmin.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS achievements (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          description TEXT NOT NULL,
          icon TEXT NOT NULL,
          requirement INTEGER NOT NULL,
          type TEXT NOT NULL, -- completion, streak, projects, code_runs
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );

        -- 为type创建索引
        CREATE INDEX IF NOT EXISTS idx_achievements_type ON achievements(type);

        -- 设置RLS
        ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

        -- 创建策略
        CREATE POLICY "Users can view all achievements" ON achievements
          FOR SELECT USING (true);
      `
    });

    if (error) {
      console.error('Error creating achievements table:', error);
    } else {
      console.log('Achievements table created successfully');
    }
  } catch (error) {
    console.error('Error creating achievements table:', error);
  }
}

// 创建用户成就表
export async function createUserAchievementsTable() {
  try {
    const { error } = await supabaseAdmin.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS user_achievements (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
          earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          UNIQUE(user_id, achievement_id)
        );

        -- 为user_id和achievement_id创建索引
        CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
        CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON user_achievements(achievement_id);

        -- 设置RLS
        ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

        -- 创建策略
        CREATE POLICY "Users can view their own achievements" ON user_achievements
          FOR SELECT USING (user_id = auth.uid());

        CREATE POLICY "Users can insert their own achievements" ON user_achievements
          FOR INSERT WITH CHECK (user_id = auth.uid());
      `
    });

    if (error) {
      console.error('Error creating user achievements table:', error);
    } else {
      console.log('User achievements table created successfully');
    }
  } catch (error) {
    console.error('Error creating user achievements table:', error);
  }
}

// 初始化数据库表
export async function initDatabase() {
  await createProgressTable();
  await createPostsTable();
  await createCommentsTable();
  await createAchievementsTable();
  await createUserAchievementsTable();
}