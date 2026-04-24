import React from 'react';
import { Link } from 'react-router-dom';

// 课程数据
const courses = [
  {
    id: 'course-1',
    title: 'Python基础入门',
    description: '学习Python的基本语法、数据类型、控制流等基础知识',
    chapters: [
      { id: 'chapter-1', title: 'Python简介与环境搭建' },
      { id: 'chapter-2', title: '基本数据类型' },
      { id: 'chapter-3', title: '控制流语句' },
      { id: 'chapter-4', title: '函数定义与调用' },
      { id: 'chapter-5', title: '模块与包' }
    ]
  },
  {
    id: 'course-2',
    title: 'Python进阶编程',
    description: '深入学习Python的面向对象编程、异常处理、文件操作等进阶知识',
    chapters: [
      { id: 'chapter-6', title: '面向对象编程基础' },
      { id: 'chapter-7', title: '异常处理' },
      { id: 'chapter-8', title: '文件操作' },
      { id: 'chapter-9', title: '正则表达式' },
      { id: 'chapter-10', title: '装饰器与上下文管理器' }
    ]
  },
  {
    id: 'course-3',
    title: 'Python数据分析',
    description: '学习使用Python进行数据处理、分析和可视化',
    chapters: [
      { id: 'chapter-11', title: 'NumPy基础' },
      { id: 'chapter-12', title: 'Pandas数据处理' },
      { id: 'chapter-13', title: 'Matplotlib数据可视化' },
      { id: 'chapter-14', title: 'Seaborn高级可视化' },
      { id: 'chapter-15', title: '数据分析实战' }
    ]
  }
];

const Courses: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Python课程体系</h1>
          <p className="text-gray-600">从入门到进阶的完整学习路径</p>
        </div>

        <div className="space-y-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <h3 className="text-lg font-medium text-gray-900 mb-3">章节列表</h3>
                <ul className="space-y-2">
                  {course.chapters.map((chapter, index) => (
                    <li key={chapter.id}>
                      <Link
                        to={`/courses/${course.id}/chapters/${chapter.id}`}
                        className="flex items-center p-3 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <span className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium mr-3">
                          {index + 1}
                        </span>
                        <span className="text-gray-800">{chapter.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;