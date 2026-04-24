import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* 英雄区域 */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Python 学练写一体化平台</h1>
          <p className="text-xl mb-8">从入门到精通，一站式Python学习解决方案</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/courses" 
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
            >
              开始学习
            </Link>
            <Link 
              to="/code" 
              className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
            >
              代码实操场
            </Link>
          </div>
        </div>
      </section>

      {/* 功能介绍 */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">核心功能</h2>
          <p className="text-gray-600">全面的Python学习体验</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon="📚" 
            title="课程学习" 
            description="从入门到进阶的完整课程体系，包含10-15个章节"
            link="/courses"
          />
          <FeatureCard 
            icon="💻" 
            title="代码实操场" 
            description="在线编写和运行Python代码，支持代码高亮和自动补全"
            link="/code"
          />
          <FeatureCard 
            icon="📝" 
            title="项目训练" 
            description="10个实战项目，覆盖常用场景，提供任务描述和参考代码"
            link="/projects"
          />
          <FeatureCard 
            icon="🎥" 
            title="视频教程" 
            description="每个章节配套5-10分钟短视频，可上传或嵌入第三方视频链接"
            link="/courses"
          />
        </div>
      </section>

      {/* 学习路径 */}
      <section className="bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">学习路径</h2>
          <p className="text-gray-600">循序渐进，轻松掌握Python</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PathCard 
            title="入门阶段" 
            items={[
              "Python基础语法",
              "基本数据类型",
              "控制流语句",
              "函数定义与调用"
            ]}
            link="/courses"
          />
          <PathCard 
            title="进阶阶段" 
            items={[
              "面向对象编程",
              "异常处理",
              "文件操作",
              "正则表达式"
            ]}
            link="/courses"
          />
          <PathCard 
            title="高级阶段" 
            items={[
              "数据分析",
              "Web开发",
              "爬虫技术",
              "机器学习"
            ]}
            link="/courses"
          />
        </div>
      </section>

      {/* 统计数据 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard number="15+" title="课程章节" />
        <StatCard number="10" title="实战项目" />
        <StatCard number="50+" title="互动练习" />
        <StatCard number="100%" title="免费学习" />
      </section>
    </div>
  );
}

// 功能卡片组件
const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  link: string;
}> = ({ icon, title, description, link }) => {
  return (
    <Link to={link} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};

// 学习路径卡片组件
const PathCard: React.FC<{
  title: string;
  items: string[];
  link: string;
}> = ({ title, items, link }) => {
  return (
    <Link to={link} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {item}
          </li>
        ))}
      </ul>
    </Link>
  );
};

// 统计卡片组件
const StatCard: React.FC<{
  number: string;
  title: string;
}> = ({ number, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className="text-3xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600">{title}</div>
    </div>
  );
};