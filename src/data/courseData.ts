export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  type: 'chapter' | 'comprehensive';
  courseId: string;
  chapterId?: string;
  questions: Question[];
  timeLimit?: number;
  description: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: string;
  hasPractice: boolean;
  hasQuiz: boolean;
  quizId?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  tags: string[];
  chapters: Chapter[];
  comprehensiveQuizId?: string;
}

export const courses: Course[] = [
  {
    id: 'course-1',
    title: 'Python数据分析基础',
    description: '从零开始学习Python数据分析，掌握Pandas、NumPy等核心库的使用',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20data%20analysis%20course%20banner%20with%20charts%20and%20code&image_size=landscape_16_9',
    category: '数据分析',
    level: 'beginner',
    duration: '12小时',
    tags: ['Python', 'Pandas', 'NumPy', '数据分析'],
    comprehensiveQuizId: 'quiz-comp-1',
    chapters: [
      {
        id: 'chapter-1',
        title: 'Python基础入门',
        description: '学习Python的基本语法和数据结构',
        content: `# Python基础入门

## 变量与数据类型

Python是一种动态类型语言，不需要显式声明变量类型。

\`\`\`python
# 整数
age = 25

# 浮点数
price = 19.99

# 字符串
name = "张三"

# 布尔值
is_student = True
\`\`\`

## 列表与字典

列表和字典是Python中最常用的数据结构。

\`\`\`python
# 列表
numbers = [1, 2, 3, 4, 5]

# 字典
person = {
    "name": "张三",
    "age": 25,
    "city": "北京"
}
\`\`\`

## 条件语句与循环

\`\`\`python
# if语句
if age >= 18:
    print("成年人")
else:
    print("未成年人")

# for循环
for num in numbers:
    print(num)
\`\`\``,
        duration: '2小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-chapter-1'
      },
      {
        id: 'chapter-2',
        title: 'NumPy数组操作',
        description: '掌握NumPy库的核心功能和数组操作',
        content: `# NumPy数组操作

## NumPy简介

NumPy是Python科学计算的核心库，提供了高性能的多维数组对象。

\`\`\`python
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
print(arr)
\`\`\`

## 数组运算

NumPy支持向量化运算，使代码更简洁高效。

\`\`\`python
# 数组加法
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
c = a + b
print(c)  # [5, 7, 9]

# 矩阵乘法
matrix1 = np.array([[1, 2], [3, 4]])
matrix2 = np.array([[5, 6], [7, 8]])
result = np.dot(matrix1, matrix2)
\`\`\`

## 常用函数

\`\`\`python
# 统计函数
arr = np.array([1, 2, 3, 4, 5])
print(np.mean(arr))  # 平均值
print(np.std(arr))   # 标准差
print(np.sum(arr))   # 求和
\`\`\``,
        duration: '2.5小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-chapter-2'
      },
      {
        id: 'chapter-3',
        title: 'Pandas数据处理',
        description: '学习使用Pandas进行数据清洗和分析',
        content: `# Pandas数据处理

## Pandas简介

Pandas是Python数据分析的核心库，提供了DataFrame和Series两种主要数据结构。

\`\`\`python
import pandas as pd

# 创建DataFrame
data = {
    'name': ['张三', '李四', '王五'],
    'age': [25, 30, 35],
    'city': ['北京', '上海', '广州']
}
df = pd.DataFrame(data)
print(df)
\`\`\`

## 数据选择与过滤

\`\`\`python
# 选择列
ages = df['age']

# 选择行
first_row = df.iloc[0]

# 过滤数据
young_people = df[df['age'] < 30]
\`\`\`

## 数据清洗

\`\`\`python
# 处理缺失值
df_clean = df.dropna()  # 删除缺失值
df_filled = df.fillna(0)  # 填充缺失值

# 去重
df_unique = df.drop_duplicates()
\`\`\``,
        duration: '3小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-chapter-3'
      },
      {
        id: 'chapter-4',
        title: '数据可视化入门',
        description: '使用Matplotlib和Seaborn创建数据图表',
        content: `# 数据可视化入门

## Matplotlib基础

Matplotlib是Python最流行的绘图库。

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# 创建简单的折线图
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title('正弦函数')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.show()
\`\`\`

## Seaborn进阶

Seaborn基于Matplotlib，提供了更美观的统计图表。

\`\`\`python
import seaborn as sns
import pandas as pd

# 创建散点图
data = pd.DataFrame({
    'x': [1, 2, 3, 4, 5],
    'y': [2, 4, 5, 4, 6]
})

sns.scatterplot(data=data, x='x', y='y')
plt.title('散点图示例')
plt.show()
\`\`\``,
        duration: '2.5小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-chapter-4'
      },
      {
        id: 'chapter-5',
        title: '实战项目：数据分析案例',
        description: '综合运用所学知识完成一个完整的数据分析项目',
        content: `# 实战项目：数据分析案例

## 项目概述

在这个项目中，我们将综合运用前面所学的知识，完成一个完整的数据分析案例。

## 项目步骤

1. 数据收集
2. 数据清洗
3. 探索性数据分析
4. 数据可视化
5. 结论与报告

## 示例代码

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 读取数据
df = pd.read_csv('sales_data.csv')

# 数据预览
print(df.head())
print(df.info())

# 数据统计
print(df.describe())

# 可视化
plt.figure(figsize=(12, 6))
sns.histplot(data=df, x='sales', bins=30)
plt.title('销售分布')
plt.show()
\`\`\``,
        duration: '2小时',
        hasPractice: true,
        hasQuiz: false
      }
    ]
  },
  {
    id: 'course-2',
    title: '机器学习入门',
    description: '学习机器学习的基本概念和常用算法，使用Scikit-learn构建预测模型',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Machine%20learning%20course%20banner%20with%20neural%20networks%20and%20data%20visualization&image_size=landscape_16_9',
    category: '机器学习',
    level: 'intermediate',
    duration: '16小时',
    tags: ['机器学习', 'Scikit-learn', 'Python', '算法'],
    chapters: [
      {
        id: 'chapter-ml-1',
        title: '机器学习概述',
        description: '了解机器学习的基本概念和应用场景',
        content: '# 机器学习概述\n\n机器学习是人工智能的一个分支，使计算机能够从数据中学习。\n\n## 主要类型\n\n- 监督学习\n- 无监督学习\n- 强化学习',
        duration: '1.5小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-ml-1'
      },
      {
        id: 'chapter-ml-2',
        title: '线性回归',
        description: '学习线性回归算法，用于预测连续值',
        content: '# 线性回归\n\n线性回归是最基础的机器学习算法之一。',
        duration: '2小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-ml-2'
      },
      {
        id: 'chapter-ml-3',
        title: '分类算法',
        description: '学习逻辑回归、决策树等分类算法',
        content: '# 分类算法\n\n分类算法用于预测离散类别。',
        duration: '3小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-ml-3'
      },
      {
        id: 'chapter-ml-4',
        title: '模型评估与优化',
        description: '学习如何评估和优化机器学习模型',
        content: '# 模型评估与优化\n\n评估模型性能是机器学习的重要环节。',
        duration: '2.5小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-ml-4'
      },
      {
        id: 'chapter-ml-5',
        title: '实战项目：房价预测',
        description: '使用机器学习预测房价',
        content: '# 实战项目：房价预测\n\n综合运用所学知识完成房价预测项目。',
        duration: '3小时',
        hasPractice: true,
        hasQuiz: false
      }
    ]
  }
];

export const quizzes: Quiz[] = [
  {
    id: 'quiz-chapter-1',
    title: 'Python基础入门测验',
    type: 'chapter',
    courseId: 'course-1',
    chapterId: 'chapter-1',
    description: '测试你对Python基础语法的掌握程度',
    questions: [
      {
        id: 'q1-1',
        text: '以下哪个是Python中正确的变量命名？',
        options: ['123abc', 'my-variable', 'my_variable', 'class'],
        correctAnswer: 2,
        explanation: 'Python变量名不能以数字开头，不能使用连字符，也不能使用关键字如class。',
        points: 10
      },
      {
        id: 'q1-2',
        text: 'Python中列表的索引从几开始？',
        options: ['1', '0', '-1', '任意值'],
        correctAnswer: 1,
        explanation: 'Python使用0-based索引，列表的第一个元素索引为0。',
        points: 10
      },
      {
        id: 'q1-3',
        text: '以下哪个数据类型是可变的？',
        options: ['字符串', '元组', '列表', '整数'],
        correctAnswer: 2,
        explanation: '列表是可变的，可以修改其内容。字符串、元组和整数都是不可变的。',
        points: 10
      },
      {
        id: 'q1-4',
        text: '在Python中，如何定义一个函数？',
        options: ['function myFunc()', 'def myFunc():', 'func myFunc()', 'define myFunc()'],
        correctAnswer: 1,
        explanation: 'Python使用def关键字来定义函数。',
        points: 10
      },
      {
        id: 'q1-5',
        text: '以下哪个操作会创建一个新的列表？',
        options: ['list.append()', 'list.extend()', 'list + [1, 2]', 'list.pop()'],
        correctAnswer: 2,
        explanation: 'list + [1, 2] 会创建一个新的列表，其他操作都是在原列表上修改。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-chapter-2',
    title: 'NumPy数组操作测验',
    type: 'chapter',
    courseId: 'course-1',
    chapterId: 'chapter-2',
    description: '测试你对NumPy库的掌握程度',
    questions: [
      {
        id: 'q2-1',
        text: 'NumPy数组的默认数据类型是什么？',
        options: ['int32', 'float64', 'object', 'string'],
        correctAnswer: 1,
        explanation: 'NumPy数组的默认数据类型是float64。',
        points: 10
      },
      {
        id: 'q2-2',
        text: '如何创建一个3x3的全0数组？',
        options: ['np.zeros(3)', 'np.zeros((3, 3))', 'np.zeros(3, 3)', 'np.zeros([3, 3])'],
        correctAnswer: 1,
        explanation: 'np.zeros()接受一个元组作为形状参数。',
        points: 10
      },
      {
        id: 'q2-3',
        text: 'NumPy中用于矩阵乘法的函数是？',
        options: ['np.multiply()', 'np.dot()', 'np.matmul()', 'np.product()'],
        correctAnswer: 1,
        explanation: 'np.dot()用于矩阵乘法，也可以使用@运算符。',
        points: 10
      },
      {
        id: 'q2-4',
        text: '以下哪个函数用于计算数组的平均值？',
        options: ['np.median()', 'np.mean()', 'np.average()', 'np.sum()'],
        correctAnswer: 1,
        explanation: 'np.mean()用于计算数组的算术平均值。',
        points: 10
      },
      {
        id: 'q2-5',
        text: '如何获取数组的形状？',
        options: ['arr.size', 'arr.shape', 'arr.length', 'arr.dimensions'],
        correctAnswer: 1,
        explanation: 'arr.shape属性返回数组的形状。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-chapter-3',
    title: 'Pandas数据处理测验',
    type: 'chapter',
    courseId: 'course-1',
    chapterId: 'chapter-3',
    description: '测试你对Pandas库的掌握程度',
    questions: [
      {
        id: 'q3-1',
        text: 'Pandas中用于表示二维表格数据的结构是？',
        options: ['Series', 'DataFrame', 'Array', 'Table'],
        correctAnswer: 1,
        explanation: 'DataFrame是Pandas中表示二维表格数据的主要结构。',
        points: 10
      },
      {
        id: 'q3-2',
        text: '如何选择DataFrame中的一列？',
        options: ['df.column', 'df["column"]', 'df.get("column")', '以上都可以'],
        correctAnswer: 3,
        explanation: 'Pandas支持多种方式选择列：点号、方括号和get()方法。',
        points: 10
      },
      {
        id: 'q3-3',
        text: '以下哪个方法用于删除缺失值？',
        options: ['df.fillna()', 'df.dropna()', 'df.remove_na()', 'df.clean()'],
        correctAnswer: 1,
        explanation: 'df.dropna()用于删除包含缺失值的行或列。',
        points: 10
      },
      {
        id: 'q3-4',
        text: '如何按条件过滤DataFrame？',
        options: ['df.filter(condition)', 'df[condition]', 'df.where(condition)', 'df.select(condition)'],
        correctAnswer: 1,
        explanation: '可以使用布尔索引df[condition]来过滤DataFrame。',
        points: 10
      },
      {
        id: 'q3-5',
        text: '以下哪个方法用于分组聚合？',
        options: ['df.group()', 'df.groupby()', 'df.aggregate()', 'df.group_and_agg()'],
        correctAnswer: 1,
        explanation: 'df.groupby()用于分组操作，之后可以进行聚合计算。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-chapter-4',
    title: '数据可视化入门测验',
    type: 'chapter',
    courseId: 'course-1',
    chapterId: 'chapter-4',
    description: '测试你对数据可视化的掌握程度',
    questions: [
      {
        id: 'q4-1',
        text: 'Matplotlib中用于创建折线图的函数是？',
        options: ['plt.bar()', 'plt.plot()', 'plt.scatter()', 'plt.line()'],
        correctAnswer: 1,
        explanation: 'plt.plot()用于创建折线图。',
        points: 10
      },
      {
        id: 'q4-2',
        text: 'Seaborn是基于哪个库构建的？',
        options: ['Plotly', 'Bokeh', 'Matplotlib', 'ggplot'],
        correctAnswer: 2,
        explanation: 'Seaborn是基于Matplotlib构建的高级统计绘图库。',
        points: 10
      },
      {
        id: 'q4-3',
        text: '以下哪个图表用于显示数据分布？',
        options: ['折线图', '散点图', '直方图', '饼图'],
        correctAnswer: 2,
        explanation: '直方图用于显示数据的分布情况。',
        points: 10
      },
      {
        id: 'q4-4',
        text: '如何显示Matplotlib图表？',
        options: ['plt.display()', 'plt.show()', 'plt.render()', 'plt.draw()'],
        correctAnswer: 1,
        explanation: 'plt.show()用于显示创建的图表。',
        points: 10
      },
      {
        id: 'q4-5',
        text: '散点图最适合展示什么关系？',
        options: ['时间趋势', '分类对比', '两个变量的相关性', '占比关系'],
        correctAnswer: 2,
        explanation: '散点图最适合展示两个变量之间的相关性。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-comp-1',
    title: 'Python数据分析综合考试',
    type: 'comprehensive',
    courseId: 'course-1',
    description: '综合测试你对Python数据分析课程的掌握程度',
    questions: [
      {
        id: 'cq1',
        text: 'Python中，以下哪个是正确的列表推导式？',
        options: ['[x for x in range(10)]', '(x for x in range(10))', '{x for x in range(10)}', 'x for x in range(10)'],
        correctAnswer: 0,
        explanation: '列表推导式使用方括号[]，返回一个列表。',
        points: 10
      },
      {
        id: 'cq2',
        text: 'NumPy中，如何创建一个从0到9的数组？',
        options: ['np.arange(10)', 'np.range(10)', 'np.array(10)', 'np.linspace(0, 9, 10)'],
        correctAnswer: 0,
        explanation: 'np.arange(10)创建一个从0到9的数组。',
        points: 10
      },
      {
        id: 'cq3',
        text: 'Pandas中，如何读取CSV文件？',
        options: ['pd.read_csv()', 'pd.load_csv()', 'pd.import_csv()', 'pd.csv_read()'],
        correctAnswer: 0,
        explanation: 'pd.read_csv()用于读取CSV文件。',
        points: 10
      },
      {
        id: 'cq4',
        text: '在Matplotlib中，如何设置图表标题？',
        options: ['plt.title()', 'plt.set_title()', 'plt.header()', 'plt.caption()'],
        correctAnswer: 0,
        explanation: 'plt.title()用于设置图表标题。',
        points: 10
      },
      {
        id: 'cq5',
        text: '以下哪个不是Python数据分析的常用库？',
        options: ['Pandas', 'NumPy', 'TensorFlow', 'Matplotlib'],
        correctAnswer: 2,
        explanation: 'TensorFlow主要用于深度学习，不是基础数据分析的常用库。',
        points: 10
      },
      {
        id: 'cq6',
        text: 'Pandas中，DataFrame的merge方法用于什么？',
        options: ['合并行', '合并列', '根据键合并两个DataFrame', '删除重复数据'],
        correctAnswer: 2,
        explanation: 'merge方法用于根据一个或多个键将两个DataFrame合并在一起。',
        points: 10
      },
      {
        id: 'cq7',
        text: 'NumPy数组和Python列表的主要区别是什么？',
        options: ['NumPy数组更快', 'NumPy数组支持向量化运算', 'NumPy数组元素类型必须相同', '以上都是'],
        correctAnswer: 3,
        explanation: 'NumPy数组具有更快的速度、支持向量化运算，且元素类型必须相同。',
        points: 10
      },
      {
        id: 'cq8',
        text: 'Seaborn的distplot函数用于创建什么类型的图表？',
        options: ['散点图', '箱线图', '分布图（直方图+密度图）', '热力图'],
        correctAnswer: 2,
        explanation: 'distplot（或新版本的displot）用于创建分布图，结合直方图和密度图。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-ml-1',
    title: '机器学习概述测验',
    type: 'chapter',
    courseId: 'course-2',
    chapterId: 'chapter-ml-1',
    description: '测试你对机器学习基本概念的理解',
    questions: [
      {
        id: 'ml-q1-1',
        text: '以下哪个不是机器学习的主要类型？',
        options: ['监督学习', '无监督学习', '强化学习', '深度学习'],
        correctAnswer: 3,
        explanation: '深度学习是机器学习的一个子领域，不是主要类型分类。',
        points: 10
      },
      {
        id: 'ml-q1-2',
        text: '监督学习需要什么类型的数据？',
        options: ['只有特征数据', '有标签的数据', '未标记的数据', '实时数据'],
        correctAnswer: 1,
        explanation: '监督学习需要有标签的数据来训练模型。',
        points: 10
      },
      {
        id: 'ml-q1-3',
        text: '分类问题预测的是什么类型的输出？',
        options: ['连续值', '离散类别', '概率', '时间序列'],
        correctAnswer: 1,
        explanation: '分类问题预测离散的类别标签。',
        points: 10
      }
    ]
  }
];

export function getCourseById(courseId: string): Course | undefined {
  return courses.find(course => course.id === courseId);
}

export function getChapterById(courseId: string, chapterId: string): Chapter | undefined {
  const course = getCourseById(courseId);
  return course?.chapters.find(chapter => chapter.id === chapterId);
}

export function getQuizById(quizId: string): Quiz | undefined {
  return quizzes.find(quiz => quiz.id === quizId);
}

export function getQuizByChapter(courseId: string, chapterId: string): Quiz | undefined {
  return quizzes.find(quiz => quiz.courseId === courseId && quiz.chapterId === chapterId);
}

export function getComprehensiveQuiz(courseId: string): Quiz | undefined {
  return quizzes.find(quiz => quiz.courseId === courseId && quiz.type === 'comprehensive');
}
