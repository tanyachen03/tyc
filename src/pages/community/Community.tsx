import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';

interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  users: {
    email: string;
  };
}

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  users: {
    email: string;
  };
}

const Community: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newCommentContent, setNewCommentContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);

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
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/community/posts');
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      } else {
        setError('获取帖子失败');
      }
    } catch (err) {
      setError('获取帖子失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchPostDetails = async (postId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/community/posts/${postId}`);
      const data = await response.json();
      if (data.success) {
        setSelectedPost(data.data);
        setComments(data.data.comments);
      } else {
        setError('获取帖子详情失败');
      }
    } catch (err) {
      setError('获取帖子详情失败');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!user) return;
    if (!newPostTitle || !newPostContent) return;

    setLoading(true);
    try {
      const response = await fetch('/api/community/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify({ title: newPostTitle, content: newPostContent }),
      });

      const data = await response.json();
      if (data.success) {
        setNewPostTitle('');
        setNewPostContent('');
        setShowCreatePost(false);
        fetchPosts();
      } else {
        setError('创建帖子失败');
      }
    } catch (err) {
      setError('创建帖子失败');
    } finally {
      setLoading(false);
    }
  };

  const createComment = async () => {
    if (!user || !selectedPost) return;
    if (!newCommentContent) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/community/posts/${selectedPost.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify({ content: newCommentContent }),
      });

      const data = await response.json();
      if (data.success) {
        setNewCommentContent('');
        fetchPostDetails(selectedPost.id);
      } else {
        setError('创建回复失败');
      }
    } catch (err) {
      setError('创建回复失败');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!user) return;

    if (window.confirm('确定要删除这个帖子吗？')) {
      setLoading(true);
      try {
        const response = await fetch(`/api/community/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            'x-user-id': user.id,
          },
        });

        const data = await response.json();
        if (data.success) {
          fetchPosts();
          if (selectedPost?.id === postId) {
            setSelectedPost(null);
            setComments([]);
          }
        } else {
          setError('删除帖子失败');
        }
      } catch (err) {
        setError('删除帖子失败');
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!user) return;

    if (window.confirm('确定要删除这个回复吗？')) {
      setLoading(true);
      try {
        const response = await fetch(`/api/community/comments/${commentId}`, {
          method: 'DELETE',
          headers: {
            'x-user-id': user.id,
          },
        });

        const data = await response.json();
        if (data.success && selectedPost) {
          fetchPostDetails(selectedPost.id);
        } else {
          setError('删除回复失败');
        }
      } catch (err) {
        setError('删除回复失败');
      } finally {
        setLoading(false);
      }
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

  // 渲染帖子列表
  if (!selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">社区交流</h1>
            {user && (
              <button
                onClick={() => setShowCreatePost(!showCreatePost)}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              >
                {showCreatePost ? '取消' : '发布帖子'}
              </button>
            )}
          </div>

          {showCreatePost && user && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">发布新帖子</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    标题
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入帖子标题"
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    内容
                  </label>
                  <textarea
                    id="content"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    placeholder="输入帖子内容"
                  />
                </div>
                <button
                  onClick={createPost}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '发布中...' : '发布帖子'}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 mb-6 text-sm text-red-800 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                    {user && user.id === post.user_id && (
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        删除
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">作者: {post.users.email}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => fetchPostDetails(post.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      查看详情
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">暂无帖子</h3>
                {user && (
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                  >
                    发布第一个帖子
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 渲染帖子详情
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <button
            onClick={() => {
              setSelectedPost(null);
              setComments([]);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300"
          >
            ← 返回帖子列表
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{selectedPost.title}</h2>
            {user && user.id === selectedPost.user_id && (
              <button
                onClick={() => deletePost(selectedPost.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                删除
              </button>
            )}
          </div>
          <p className="text-gray-600 mb-4">{selectedPost.content}</p>
          <div className="flex justify-between items-center mb-6 border-t border-gray-200 pt-4">
            <span className="text-sm text-gray-500">作者: {selectedPost.users.email}</span>
            <span className="text-sm text-gray-500">
              {new Date(selectedPost.created_at).toLocaleString()}
            </span>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">回复 ({comments.length})</h3>
            
            {user && (
              <div className="mb-6">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                  写下你的回复
                </label>
                <textarea
                  id="comment"
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder="输入回复内容"
                />
                <button
                  onClick={createComment}
                  disabled={loading}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '回复中...' : '发布回复'}
                </button>
              </div>
            )}

            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-4">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-900">{comment.users.email}</span>
                      {user && user.id === comment.user_id && (
                        <button
                          onClick={() => deleteComment(comment.id)}
                          className="text-red-600 hover:text-red-800 text-xs font-medium"
                        >
                          删除
                        </button>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{comment.content}</p>
                    <span className="text-xs text-gray-500 mt-2 block">
                      {new Date(comment.created_at).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">暂无回复，快来发表你的看法吧！</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;