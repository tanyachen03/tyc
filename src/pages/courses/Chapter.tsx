import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CodeEditor from '../../components/CodeEditor';
import { useProgress } from '../../hooks/useProgress';

// 章节内容数据
const chapterContent = {
  'chapter-1': {
    title: 'Python简介与环境搭建',
    content: `
      <h3>Python简介</h3>
      <p>Python是一种高级、通用、解释型编程语言，由Guido van Rossum于1989年创建。它以简洁的语法和强大的生态系统而闻名，被广泛应用于Web开发、数据分析、人工智能、科学计算等领域。</p>
      
      <h3>Python的特点</h3>
      <ul>
        <li>简单易学：Python的语法清晰简洁，可读性强</li>
        <li>强大的生态系统：拥有丰富的第三方库</li>
        <li>跨平台：可在Windows、macOS、Linux等多种操作系统上运行</li>
        <li>面向对象：支持面向对象编程范式</li>
        <li>解释型：无需编译，直接运行</li>
      </ul>
      
      <h3>环境搭建</h3>
      <p>要开始使用Python，你需要安装Python解释器。推荐从官方网站下载最新版本的Python：</p>
      <ol>
        <li>访问 <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">Python官方网站</a></li>
        <li>下载适合你操作系统的安装包</li>
        <li>运行安装程序，确保勾选"Add Python to PATH"选项</li>
        <li>安装完成后，打开命令行或终端，输入 <code>python --version</code> 验证安装是否成功</li>
      </ol>
    `,
    codeExample: `# 第一个Python程序
print("Hello, Python!")

# 变量和数据类型
name = "Python"
age = 30
is_popular = True

# 打印变量
print(f"{name} is {age} years old and it's {is_popular} that it's popular")`,
    videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw' // 示例视频链接
  },
  'chapter-2': {
    title: '基本数据类型',
    content: `
      <h3>Python的基本数据类型</h3>
      <p>Python支持多种数据类型，包括：</p>
      
      <h4>1. 数字类型</h4>
      <ul>
        <li><strong>整数 (int)</strong>：如 1, 2, 3, -4</li>
        <li><strong>浮点数 (float)</strong>：如 1.0, 2.5, -3.14</li>
        <li><strong>复数 (complex)</strong>：如 1+2j, 3-4j</li>
      </ul>
      
      <h4>2. 字符串 (str)</h4>
      <p>用于表示文本，用单引号、双引号或三引号包围：</p>
      <pre><code>"Hello", 'World', '''Multi-line string'''</code></pre>
      
      <h4>3. 布尔值 (bool)</h4>
      <p>表示真或假，只有两个值：True 和 False</p>
      
      <h4>4. 空值 (None)</h4>
      <p>表示空值或无值</p>
    `,
    codeExample: `# 数字类型
integer = 42
float_number = 3.14
complex_number = 1 + 2j

# 字符串
string1 = "Hello"
string2 = 'World'
multiline_string = '''This is a
multiline string''' 

# 布尔值
true_value = True
false_value = False

# 空值
none_value = None

# 打印类型
print(type(integer))  # <class 'int'>
print(type(float_number))  # <class 'float'>
print(type(string1))  # <class 'str'>
print(type(true_value))  # <class 'bool'>
print(type(none_value))  # <class 'NoneType'>`,
    videoUrl: 'https://www.youtube.com/embed/kqU53l2V6Vk' // 示例视频链接
  },
  // 可以添加更多章节内容...
};

const Chapter: React.FC = () => {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();
  const chapter = chapterContent[chapterId as keyof typeof chapterContent];
  const { progress, completed, updateProgress } = useProgress(chapterId || '', 'course');

  // 当组件加载时，更新进度为100%
  useEffect(() => {
    if (chapterId) {
      updateProgress(100, true);
    }
  }, [chapterId, updateProgress]);

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">章节不存在</h1>
          <Link to="/courses" className="text-blue-600 hover:text-blue-800">
            返回课程列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link to="/courses" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← 返回课程列表
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{chapter.title}</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            {/* 视频教程 */}
            {chapter.videoUrl && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">视频教程</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={chapter.videoUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-64 md:h-96 rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* 文字内容 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">文字讲解</h2>
              <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
            </div>

            {/* 代码示例 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">代码示例</h2>
              <CodeEditor
                value={chapter.codeExample}
                onChange={() => {}}
                height="300px"
                placeholder="Python代码示例"
              />
            </div>

            {/* 习题 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">习题</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-4">请完成以下习题：</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>编写一个程序，输出你的姓名和年龄</li>
                  <li>计算并打印 1 + 2 * 3 的结果</li>
                  <li>创建一个包含至少5个元素的列表，并打印出来</li>
                </ol>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  提交答案
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter;