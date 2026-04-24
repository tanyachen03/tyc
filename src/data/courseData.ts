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
    title: 'Python从入门到进阶',
    description: '完整的Python学习路径，从零基础到进阶编程，包含学-看-练-写-测一站式学习体验',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20programming%20course%20banner%20with%20code%20and%20learning%20path&image_size=landscape_16_9',
    category: 'Python',
    level: 'beginner',
    duration: '20小时',
    tags: ['Python', '编程', '从入门到进阶', '一站式学习'],
    comprehensiveQuizId: 'quiz-python-comp-1',
    chapters: [
      {
        id: 'chapter-1',
        title: 'Python入门',
        description: '了解Python的基本概念和环境搭建',
        content: "# Python入门\n\n## Python简介\n\nPython是一种简单易学、功能强大的编程语言，广泛应用于Web开发、数据分析、人工智能等领域。\n\n## 环境搭建\n\n### 安装Python\n\n1. 访问 [Python官网](https://www.python.org/)\n2. 下载对应操作系统的安装包\n3. 运行安装程序，勾选\"Add Python to PATH\"\n4. 验证安装：在命令行中输入 `python --version`\n\n### 安装IDE\n\n推荐使用以下IDE：\n- **PyCharm**：功能强大的Python IDE\n- **VS Code**：轻量级编辑器，需安装Python插件\n- **Jupyter Notebook**：交互式编程环境\n\n## 第一个Python程序\n\n\`\`\`python\nprint('Hello, World!')\n\`\`\`\n\n## 运行方式\n\n1. **命令行**：`python filename.py`\n2. **IDE**：直接运行或调试\n3. **交互式**：`python` 命令进入交互式环境",
        duration: '1小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-chapter-1'
      },
      {
        id: 'chapter-2',
        title: '基础语法',
        description: '学习Python的基本语法规则和语句结构',
        content: `# 基础语法

## 变量与赋值

\`\`\`python
# 变量赋值
name = "张三"
age = 25
price = 19.99
is_student = True
\`\`\`

## 注释

\`\`\`python
# 单行注释

"""
多行注释
可以跨越多行
"""
\`\`\`

## 缩进

Python使用缩进来表示代码块，通常使用4个空格或1个制表符。

\`\`\`python
if age >= 18:
    print("成年人")
else:
    print("未成年人")
\`\`\`

## 运算符

- **算术运算符**：+, -, *, /, //, %, **
- **比较运算符**：==, !=, >, <, >=, <=
- **逻辑运算符**：and, or, not
- **赋值运算符**：=, +=, -=, *=, /=

## 输入输出

\`\`\`python
# 输入
name = input("请输入你的名字：")

# 输出
print("你好，" + name)
print(f"你好，{name}")  # f-string
\`\`\``,
        duration: '2小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-chapter-2'
      },
      {
        id: 'chapter-3',
        title: '数据类型',
        description: '掌握Python的基本数据类型和数据结构',
        content: `# 数据类型

## 基本数据类型

- **整数 (int)**：如 1, 2, 3
- **浮点数 (float)**：如 3.14, 1.0
- **字符串 (str)**：如 "Hello", 'World'
- **布尔值 (bool)**：True, False
- **None**：表示空值

## 字符串操作

\`\`\`python
s = "Hello, Python!"
print(s[0])  # 访问单个字符
print(s[0:5])  # 切片
print(len(s))  # 长度
print(s.upper())  # 大写
print(s.lower())  # 小写
print(s.replace("Python", "World"))  # 替换
\`\`\`

## 列表 (list)

\`\`\`python
# 创建列表
numbers = [1, 2, 3, 4, 5]

# 访问元素
print(numbers[0])

# 添加元素
numbers.append(6)

# 插入元素
numbers.insert(0, 0)

# 删除元素
numbers.remove(3)

# 切片
print(numbers[1:4])
\`\`\`

## 元组 (tuple)

元组是不可变的列表。

\`\`\`python
# 创建元组
t = (1, 2, 3)

# 访问元素
print(t[0])
\`\`\`

## 字典 (dict)

\`\`\`python
# 创建字典
person = {
    "name": "张三",
    "age": 25,
    "city": "北京"
}

# 访问元素
print(person["name"])
print(person.get("age"))

# 添加/修改元素
person["email"] = "zhangsan@example.com"

# 删除元素
del person["city"]
\`\`\`

## 集合 (set)

\`\`\`python
# 创建集合
s = {1, 2, 3, 4, 5}

# 添加元素
s.add(6)

# 移除元素
s.remove(3)

# 集合运算
a = {1, 2, 3}
b = {3, 4, 5}
print(a | b)  # 并集
print(a & b)  # 交集
print(a - b)  # 差集
\`\`\``,
        duration: '2.5小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-chapter-3'
      },
      {
        id: 'chapter-4',
        title: '函数',
        description: '学习如何定义和使用函数',
        content: `# 函数

## 定义函数

\`\`\`python
def greet(name):
    """问候函数"""
    print(f"你好，{name}！")

# 调用函数
greet("张三")
\`\`\`

## 函数参数

### 位置参数

\`\`\`python
def add(a, b):
    return a + b

print(add(1, 2))
\`\`\`

### 默认参数

\`\`\`python
def greet(name, greeting="你好"):
    print(f"{greeting}，{name}！")

# 使用默认值
greet("张三")
# 覆盖默认值
greet("张三", "早上好")
\`\`\`

### 关键字参数

\`\`\`python
def describe_person(name, age, city):
    print(f"姓名：{name}")
    print(f"年龄：{age}")
    print(f"城市：{city}")

# 使用关键字参数
describe_person(name="张三", age=25, city="北京")
\`\`\`

### 可变参数

\`\`\`python
def sum_numbers(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_numbers(1, 2, 3, 4, 5))
\`\`\`

### 关键字可变参数

\`\`\`python
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="张三", age=25, city="北京")
\`\`\`

## 函数返回值

\`\`\`python
def calculate(a, b):
    return a + b, a - b, a * b, a / b

# 接收多个返回值
add, sub, mul, div = calculate(10, 5)
print(add, sub, mul, div)
\`\`\`

## 递归函数

\`\`\`python
def factorial(n):
    if n == 1:
        return 1
    else:
        return n * factorial(n - 1)

print(factorial(5))
\`\`\``,
        duration: '2.5小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-chapter-4'
      },
      {
        id: 'chapter-5',
        title: '模块',
        description: '学习如何使用和创建Python模块',
        content: "# 模块\n\n## 导入模块\n\n\`\`\`python\n# 导入整个模块\nimport math\n\n# 使用模块中的函数\nprint(math.sqrt(16))\n\n# 导入特定函数\nfrom math import sqrt, sin\n\n# 使用别名\nimport math as m\nprint(m.pi)\n\n# 导入所有函数\nfrom math import *\n\`\`\`\n\n## 常用标准库\n\n- **math**：数学函数\n- **random**：随机数生成\n- **datetime**：日期时间处理\n- **os**：操作系统接口\n- **sys**：系统相关参数\n- **json**：JSON数据处理\n- **re**：正则表达式\n\n## 创建模块\n\n1. 创建一个.py文件，例如 `mymodule.py`\n2. 在文件中定义函数和变量\n3. 在其他文件中导入使用\n\n## 包\n\n包是包含多个模块的目录，需要包含 `__init__.py` 文件。\n\n\`\`\`\nmy_package/\n├── __init__.py\n├── module1.py\n└── module2.py\n\`\`\`\n\n## 第三方库\n\n使用pip安装第三方库：\n\n\`\`\`bash\npip install numpy pandas matplotlib\n\`\`\`\n\n导入并使用：\n\n\`\`\`python\nimport numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\`\`\`", 
        duration: '2小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-chapter-5'
      },
      {
        id: 'chapter-6',
        title: '文件操作',
        description: '学习如何读写文件',
        content: "# 文件操作\n\n## 打开和关闭文件\n\n\`\`\`python\n# 打开文件\nfile = open(\"example.txt\", \"r\")\n\n# 读取内容\ncontent = file.read()\nprint(content)\n\n# 关闭文件\nfile.close()\n\`\`\`\n\n## 文件模式\n\n- **r**：只读（默认）\n- **w**：写入（覆盖原有内容）\n- **a**：追加\n- **x**：创建新文件\n- **b**：二进制模式\n- **+**：读写模式\n\n## 使用with语句\n\n自动处理文件关闭：\n\n\`\`\`python\nwith open(\"example.txt\", \"r\") as file:\n    content = file.read()\n    print(content)\n# 文件自动关闭\n\`\`\`\n\n## 读取文件\n\n\`\`\`python\n# 读取整个文件\nwith open(\"example.txt\", \"r\") as file:\n    content = file.read()\n\n# 逐行读取\nwith open(\"example.txt\", \"r\") as file:\n    for line in file:\n        print(line.strip())\n\n# 读取所有行\nwith open(\"example.txt\", \"r\") as file:\n    lines = file.readlines()\n\`\`\`\n\n## 写入文件\n\n\`\`\`python\n# 写入文件\nwith open(\"example.txt\", \"w\") as file:\n    file.write(\"Hello, World!\\n\")\n    file.write(\"This is a test.\\n\")\n\n# 追加内容\nwith open(\"example.txt\", \"a\") as file:\n    file.write(\"Additional content.\\n\")\n\`\`\`\n\n## 处理CSV文件\n\n\`\`\`python\nimport csv\n\n# 写入CSV\nwith open(\"data.csv\", \"w\", newline=\"\") as file:\n    writer = csv.writer(file)\n    writer.writerow([\"Name\", \"Age\", \"City\"])\n    writer.writerow([\"张三\", 25, \"北京\"])\n    writer.writerow([\"李四\", 30, \"上海\"])\n\n# 读取CSV\nwith open(\"data.csv\", \"r\") as file:\n    reader = csv.reader(file)\n    for row in reader:\n        print(row)\n\`\`\`\n\n## 处理JSON文件\n\n\`\`\`python\nimport json\n\n# 写入JSON\ndata = {\n    \"name\": \"张三\",\n    \"age\": 25,\n    \"city\": \"北京\"\n}\n\nwith open(\"data.json\", \"w\", encoding=\"utf-8\") as file:\n    json.dump(data, file, ensure_ascii=False, indent=2)\n\n# 读取JSON\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as file:\n    data = json.load(file)\n    print(data)\n\`\`\`", 
        duration: '2小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-chapter-6'
      },
      {
        id: 'chapter-7',
        title: '异常处理',
        description: '学习如何处理程序运行时的错误',
        content: `# 异常处理

## 基本异常处理

\`\`\`python
try:
    # 可能引发异常的代码
    result = 10 / 0
except ZeroDivisionError:
    # 处理特定异常
    print("除数不能为零")
except Exception as e:
    # 处理其他异常
    print(f"发生错误：{e}")
else:
    # 没有异常时执行
    print("计算成功")
finally:
    # 无论是否有异常都执行
    print("程序结束")
\`\`\`

## 常见异常类型

- **SyntaxError**：语法错误
- **NameError**：名称错误
- **TypeError**：类型错误
- **ValueError**：值错误
- **ZeroDivisionError**：除零错误
- **FileNotFoundError**：文件未找到错误
- **ImportError**：导入错误

## 自定义异常

\`\`\`python
class CustomError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

try:
    raise CustomError("这是一个自定义异常")
except CustomError as e:
    print(f"捕获到自定义异常：{e}")
\`\`\`

## 断言

\`\`\`python
def divide(a, b):
    assert b != 0, "除数不能为零"
    return a / b

try:
    result = divide(10, 0)
except AssertionError as e:
    print(f"断言失败：{e}")
\`\`\`

## 异常处理的最佳实践

1. 只捕获你能处理的异常
2. 提供具体的错误信息
3. 不要过度使用异常处理
4. 清理资源（使用finally或with语句）
5. 记录异常信息
\`\`\``,
        duration: '1.5小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-chapter-7'
      },
      {
        id: 'chapter-8',
        title: '面向对象',
        description: '学习Python的面向对象编程',
        content: `# 面向对象

## 类和对象

\`\`\`python
# 定义类
class Person:
    # 类属性
    species = "人类"
    
    # 初始化方法
    def __init__(self, name, age):
        # 实例属性
        self.name = name
        self.age = age
    
    # 实例方法
    def greet(self):
        print(f"你好，我是{self.name}，今年{self.age}岁。")
    
    # 类方法
    @classmethod
    def get_species(cls):
        return cls.species
    
    # 静态方法
    @staticmethod
    def is_adult(age):
        return age >= 18

# 创建对象
person = Person("张三", 25)

# 访问属性
print(person.name)
print(person.age)

# 调用方法
person.greet()

# 访问类属性
print(Person.species)

# 调用类方法
print(Person.get_species())

# 调用静态方法
print(Person.is_adult(25))
\`\`\`

## 继承

\`\`\`python
# 父类
class Animal:
    def __init__(self, name):
        self.name = name
    
    def make_sound(self):
        print("动物发出声音")

# 子类
class Dog(Animal):
    def make_sound(self):
        print("汪汪汪")

class Cat(Animal):
    def make_sound(self):
        print("喵喵喵")

# 创建对象
dog = Dog("旺财")
cat = Cat("咪咪")

# 调用方法
dog.make_sound()
cat.make_sound()
\`\`\`

## 多态

\`\`\`python
def animal_sound(animal):
    animal.make_sound()

# 传入不同的对象
animal_sound(Dog("旺财"))  # 输出：汪汪汪
animal_sound(Cat("咪咪"))  # 输出：喵喵喵
\`\`\`

## 封装

\`\`\`python
class Person:
    def __init__(self, name, age):
        self._name = name  # 私有属性（约定）
        self.__age = age   # 真正的私有属性
    
    # getter方法
    def get_name(self):
        return self._name
    
    # setter方法
    def set_name(self, name):
        self._name = name
    
    # 属性装饰器
    @property
    def age(self):
        return self.__age
    
    @age.setter
    def age(self, age):
        if age >= 0:
            self.__age = age

person = Person("张三", 25)
print(person.get_name())
person.set_name("李四")
print(person.get_name())
print(person.age)
person.age = 30
print(person.age)
\`\`\`

## 魔术方法

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"Person(name='{self.name}', age={self.age})"
    
    def __repr__(self):
        return f"Person('{self.name}', {self.age})"
    
    def __eq__(self, other):
        return self.name == other.name and self.age == other.age

person1 = Person("张三", 25)
person2 = Person("张三", 25)
print(str(person1))
print(repr(person1))
print(person1 == person2)
\`\`\``,
        duration: '3小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-chapter-8'
      },
      {
        id: 'chapter-9',
        title: '第三方库',
        description: '学习常用的Python第三方库',
        content: `# 第三方库

## NumPy

NumPy是Python科学计算的核心库，提供高性能的多维数组对象。

\`\`\`python
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
print(arr)

# 数组运算
arr2 = arr * 2
print(arr2)

# 统计函数
print(np.mean(arr))  # 平均值
print(np.sum(arr))   # 求和
print(np.max(arr))   # 最大值

# 多维数组
matrix = np.array([[1, 2], [3, 4]])
print(matrix)
\`\`\`

## Pandas

Pandas是数据分析的核心库，提供DataFrame和Series数据结构。

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

# 数据操作
print(df['name'])  # 选择列
print(df.loc[0])   # 选择行
print(df[df['age'] > 28])  # 过滤数据
print(df.groupby('city').mean())  # 分组聚合
\`\`\`

## Matplotlib

Matplotlib是数据可视化库，用于创建各种图表。

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# 创建数据
x = np.linspace(0, 10, 100)
y = np.sin(x)

# 创建图表
plt.plot(x, y)
plt.title('正弦函数')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.grid(True)
plt.show()
\`\`\`

## Requests

Requests是HTTP请求库，用于与Web API交互。

\`\`\`python
import requests

# 发送GET请求
response = requests.get('https://api.github.com/users/octocat')

# 检查状态码
if response.status_code == 200:
    # 解析JSON
    data = response.json()
    print(data['name'])
\`\`\`

## BeautifulSoup

BeautifulSoup用于解析HTML和XML文档。

\`\`\`python
from bs4 import BeautifulSoup
import requests

# 获取网页内容
response = requests.get('https://example.com')
soup = BeautifulSoup(response.text, 'html.parser')

# 提取元素
print(soup.title.text)
print(soup.find('p').text)
\`\`\`

## 安装第三方库

\`\`\`bash
pip install numpy pandas matplotlib requests beautifulsoup4
\`\`\``,
        duration: '3小时',
        hasPractice: true,
        hasQuiz: true,
        quizId: 'quiz-chapter-9'
      },
      {
        id: 'chapter-10',
        title: '综合实战',
        description: '综合运用所学知识完成一个完整的Python项目',
        content: `# 综合实战

## 项目：个人待办清单

### 功能需求

1. 添加待办事项
2. 查看所有待办事项
3. 标记待办事项为已完成
4. 删除待办事项
5. 保存待办事项到文件
6. 从文件加载待办事项

### 项目结构

\`\`\`
todo_list/
├── todo.py        # 主程序
├── todo_list.py   # 待办清单类
└── todos.json     # 存储待办事项
\`\`\`

### 代码实现

**todo_list.py**

\`\`\`python
import json

class TodoList:
    def __init__(self, filename='todos.json'):
        self.filename = filename
        self.todos = self.load_todos()
    
    def load_todos(self):
        try:
            with open(self.filename, 'r', encoding='utf-8') as file:
                return json.load(file)
        except FileNotFoundError:
            return []
    
    def save_todos(self):
        with open(self.filename, 'w', encoding='utf-8') as file:
            json.dump(self.todos, file, ensure_ascii=False, indent=2)
    
    def add_todo(self, task):
        todo = {
            'id': len(self.todos) + 1,
            'task': task,
            'completed': False,
            'created_at': '2024-01-01 12:00:00'
        }
        self.todos.append(todo)
        self.save_todos()
        return todo
    
    def get_todos(self):
        return self.todos
    
    def mark_completed(self, todo_id):
        for todo in self.todos:
            if todo['id'] == todo_id:
                todo['completed'] = True
                self.save_todos()
                return True
        return False
    
    def delete_todo(self, todo_id):
        for i, todo in enumerate(self.todos):
            if todo['id'] == todo_id:
                del self.todos[i]
                self.save_todos()
                return True
        return False
\`\`\`

**todo.py**

\`\`\`python
from todo_list import TodoList

def main():
    todo_list = TodoList()
    
    while True:
        print("\n===== 待办清单 =====")
        print("1. 添加待办事项")
        print("2. 查看所有待办事项")
        print("3. 标记待办事项为已完成")
        print("4. 删除待办事项")
        print("5. 退出")
        
        choice = input("请选择操作：")
        
        if choice == '1':
            task = input("请输入待办事项：")
            todo = todo_list.add_todo(task)
            print(f"已添加待办事项：{todo['task']}")
        elif choice == '2':
            todos = todo_list.get_todos()
            if not todos:
                print("暂无待办事项")
            else:
                for todo in todos:
                    status = "✓" if todo['completed'] else "✗"
                    print(f"{todo['id']}. [{status}] {todo['task']}")
        elif choice == '3':
            todo_id = int(input("请输入待办事项ID："))
            if todo_list.mark_completed(todo_id):
                print("已标记为已完成")
            else:
                print("待办事项不存在")
        elif choice == '4':
            todo_id = int(input("请输入待办事项ID："))
            if todo_list.delete_todo(todo_id):
                print("已删除待办事项")
            else:
                print("待办事项不存在")
        elif choice == '5':
            print("再见！")
            break
        else:
            print("无效的选择，请重新输入")

if __name__ == "__main__":
    main()
\`\`\`

### 运行项目

\`\`\`bash
python todo.py
\`\`\`

## 项目扩展

1. 添加GUI界面（使用tkinter）
2. 添加优先级和截止日期
3. 添加分类功能
4. 添加提醒功能
5. 同步到云端存储
\`\`\``,
        duration: '2小时',
        hasPractice: true,
        hasQuiz: false
      }
    ]
  }
];

export const exercises: any[] = [
  {
    id: 'exercise-chapter-1',
    title: 'Python基础练习',
    description: '练习Python基础语法和数据结构',
    courseId: 'course-1',
    chapterId: 'chapter-1',
    questions: [
      {
        id: 'ex1-q1',
        type: 'multiple_choice',
        question: '以下哪个是Python中正确的变量命名？',
        options: ['123abc', 'my-variable', 'my_variable', 'class'],
        correctAnswer: 2,
        explanation: 'Python变量名不能以数字开头，不能使用连字符，也不能使用关键字如class。'
      },
      {
        id: 'ex1-q2',
        type: 'true_false',
        question: 'Python中列表是不可变的数据类型。',
        correctAnswer: false,
        explanation: '列表是可变的数据类型，可以修改其内容。'
      },
      {
        id: 'ex1-q3',
        type: 'code',
        question: '编写一个函数，计算列表中所有元素的和。',
        codeTemplate: 'def calculate_sum(numbers):\n    # 在这里编写代码\n    pass\n\n# 测试\nprint(calculate_sum([1, 2, 3, 4, 5]))',
        codeHint: '使用for循环遍历列表，累加每个元素的值。',
        correctAnswer: 'def calculate_sum(numbers):\n    total = 0\n    for num in numbers:\n        total += num\n    return total\n\n# 测试\nprint(calculate_sum([1, 2, 3, 4, 5]))',
        explanation: '这个函数通过遍历列表并累加每个元素的值来计算总和。'
      }
    ]
  },
  {
    id: 'exercise-chapter-2',
    title: 'NumPy数组练习',
    description: '练习NumPy数组的创建和操作',
    courseId: 'course-1',
    chapterId: 'chapter-2',
    questions: [
      {
        id: 'ex2-q1',
        type: 'multiple_choice',
        question: '如何创建一个3x3的全0数组？',
        options: ['np.zeros(3)', 'np.zeros((3, 3))', 'np.zeros(3, 3)', 'np.zeros([3, 3])'],
        correctAnswer: 1,
        explanation: 'np.zeros()接受一个元组作为形状参数。'
      },
      {
        id: 'ex2-q2',
        type: 'code',
        question: '使用NumPy创建一个从0到9的数组，并计算其平均值。',
        codeTemplate: 'import numpy as np\n\n# 创建数组\narr = \n\n# 计算平均值\navg = \n\nprint(avg)',
        codeHint: '使用np.arange()创建数组，使用np.mean()计算平均值。',
        correctAnswer: 'import numpy as np\n\n# 创建数组\narr = np.arange(10)\n\n# 计算平均值\navg = np.mean(arr)\n\nprint(avg)',
        explanation: 'np.arange(10)创建一个从0到9的数组，np.mean()计算数组的平均值。'
      }
    ]
  },
  {
    id: 'exercise-chapter-3',
    title: 'Pandas数据处理练习',
    description: '练习使用Pandas进行数据处理',
    courseId: 'course-1',
    chapterId: 'chapter-3',
    questions: [
      {
        id: 'ex3-q1',
        type: 'multiple_choice',
        question: 'Pandas中用于表示二维表格数据的结构是？',
        options: ['Series', 'DataFrame', 'Array', 'Table'],
        correctAnswer: 1,
        explanation: 'DataFrame是Pandas中表示二维表格数据的主要结构。'
      },
      {
        id: 'ex3-q2',
        type: 'code',
        question: '使用Pandas读取CSV文件并显示前5行。',
        codeTemplate: 'import pandas as pd\n\n# 读取CSV文件\ndf = \n\n# 显示前5行\nprint()',
        codeHint: '使用pd.read_csv()读取文件，使用head()方法显示前几行。',
        correctAnswer: 'import pandas as pd\n\n# 读取CSV文件\ndf = pd.read_csv(\'data.csv\')\n\n# 显示前5行\nprint(df.head())',
        explanation: 'pd.read_csv()用于读取CSV文件，head()方法默认显示前5行数据。'
      }
    ]
  },
  {
    id: 'exercise-chapter-4',
    title: '数据可视化练习',
    description: '练习使用Matplotlib创建数据图表',
    courseId: 'course-1',
    chapterId: 'chapter-4',
    questions: [
      {
        id: 'ex4-q1',
        type: 'multiple_choice',
        question: 'Matplotlib中用于创建折线图的函数是？',
        options: ['plt.bar()', 'plt.plot()', 'plt.scatter()', 'plt.line()'],
        correctAnswer: 1,
        explanation: 'plt.plot()用于创建折线图。'
      },
      {
        id: 'ex4-q2',
        type: 'code',
        question: '使用Matplotlib创建一个简单的折线图，显示sin函数。',
        codeTemplate: 'import matplotlib.pyplot as plt\nimport numpy as np\n\n# 创建数据\nx = np.linspace(0, 10, 100)\ny = np.sin(x)\n\n# 创建图表\n\n# 显示图表\nplt.show()',
        codeHint: '使用plt.plot()创建折线图，使用plt.title()添加标题。',
        correctAnswer: 'import matplotlib.pyplot as plt\nimport numpy as np\n\n# 创建数据\nx = np.linspace(0, 10, 100)\ny = np.sin(x)\n\n# 创建图表\nplt.plot(x, y)\nplt.title(\'正弦函数\')\nplt.xlabel(\'x\')\nplt.ylabel(\'sin(x)\')\n\n# 显示图表\nplt.show()',
        explanation: 'plt.plot()用于创建折线图，plt.title()、plt.xlabel()和plt.ylabel()用于添加标题和标签。'
      }
    ]
  },
  {
    id: 'exercise-ml-1',
    title: '机器学习概述练习',
    description: '练习机器学习的基本概念',
    courseId: 'course-2',
    chapterId: 'chapter-ml-1',
    questions: [
      {
        id: 'exml1-q1',
        type: 'multiple_choice',
        question: '以下哪个是机器学习的主要类型？',
        options: ['监督学习', '无监督学习', '强化学习', '以上都是'],
        correctAnswer: 3,
        explanation: '监督学习、无监督学习和强化学习都是机器学习的主要类型。'
      },
      {
        id: 'exml1-q2',
        type: 'true_false',
        question: '监督学习不需要标记数据。',
        correctAnswer: false,
        explanation: '监督学习需要有标记的数据来训练模型。'
      }
    ]
  },
  {
    id: 'exercise-ml-2',
    title: '线性回归练习',
    description: '练习线性回归算法',
    courseId: 'course-2',
    chapterId: 'chapter-ml-2',
    questions: [
      {
        id: 'exml2-q1',
        type: 'code',
        question: '使用Scikit-learn实现线性回归模型。',
        codeTemplate: 'from sklearn.linear_model import LinearRegression\nimport numpy as np\n\n# 准备数据\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([2, 4, 5, 4, 6])\n\n# 创建模型\nmodel = \n\n# 训练模型\n\n# 预测\npredictions = \nprint(predictions)',
        codeHint: '创建LinearRegression实例，使用fit()方法训练模型，使用predict()方法进行预测。',
        correctAnswer: 'from sklearn.linear_model import LinearRegression\nimport numpy as np\n\n# 准备数据\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([2, 4, 5, 4, 6])\n\n# 创建模型\nmodel = LinearRegression()\n\n# 训练模型\nmodel.fit(X, y)\n\n# 预测\npredictions = model.predict([[6]])\nprint(predictions)',
        explanation: 'LinearRegression类用于创建线性回归模型，fit()方法用于训练模型，predict()方法用于预测新数据。'
      }
    ]
  },
  {
    id: 'exercise-sql-1',
    title: 'SQL基础概念练习',
    description: '练习SQL的基本概念和语法',
    courseId: 'course-3',
    chapterId: 'chapter-sql-1',
    questions: [
      {
        id: 'exsql1-q1',
        type: 'multiple_choice',
        question: 'SQL中用于查询数据的语句是？',
        options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
        correctAnswer: 2,
        explanation: 'SELECT语句用于从数据库表中查询数据。'
      },
      {
        id: 'exsql1-q2',
        type: 'true_false',
        question: 'SQL语句区分大小写。',
        correctAnswer: false,
        explanation: 'SQL语句不区分大小写，但通常关键字使用大写，表名和列名使用小写。'
      }
    ]
  },
  {
    id: 'exercise-sql-2',
    title: 'SELECT语句练习',
    description: '练习使用SELECT语句查询数据',
    courseId: 'course-3',
    chapterId: 'chapter-sql-2',
    questions: [
      {
        id: 'exsql2-q1',
        type: 'multiple_choice',
        question: '如何查询表中的所有列？',
        options: ['SELECT columns FROM table', 'SELECT * FROM table', 'SELECT ALL FROM table', 'SELECT EVERYTHING FROM table'],
        correctAnswer: 1,
        explanation: '使用SELECT * FROM table可以查询表中的所有列。'
      },
      {
        id: 'exsql2-q2',
        type: 'code',
        question: '编写一个SQL查询，从employees表中选择first_name和last_name列，并且salary大于5000。',
        codeTemplate: '-- 在这里编写SQL查询',
        codeHint: '使用SELECT语句选择列，使用WHERE子句添加条件。',
        correctAnswer: 'SELECT first_name, last_name FROM employees WHERE salary > 5000;',
        explanation: '这个查询从employees表中选择first_name和last_name列，并且只返回salary大于5000的记录。'
      }
    ]
  },
  {
    id: 'exercise-sql-3',
    title: '数据修改语句练习',
    description: '练习使用INSERT、UPDATE和DELETE语句',
    courseId: 'course-3',
    chapterId: 'chapter-sql-3',
    questions: [
      {
        id: 'exsql3-q1',
        type: 'code',
        question: '编写一个SQL语句，向employees表中插入一条新记录，first_name为John，last_name为Doe，salary为6000，department_id为1。',
        codeTemplate: '-- 在这里编写SQL语句',
        codeHint: '使用INSERT INTO语句插入新记录。',
        correctAnswer: 'INSERT INTO employees (first_name, last_name, salary, department_id) VALUES (\'John\', \'Doe\', 6000, 1);',
        explanation: '这个语句向employees表中插入一条新记录，指定了first_name、last_name、salary和department_id列的值。'
      }
    ]
  },
  {
    id: 'exercise-sql-4',
    title: '表连接练习',
    description: '练习使用JOIN语句连接多个表',
    courseId: 'course-3',
    chapterId: 'chapter-sql-4',
    questions: [
      {
        id: 'exsql4-q1',
        type: 'code',
        question: '编写一个SQL查询，从employees表和departments表中获取员工的first_name、last_name和department_name。',
        codeTemplate: '-- 在这里编写SQL查询',
        codeHint: '使用INNER JOIN连接两个表，通过department_id关联。',
        correctAnswer: 'SELECT e.first_name, e.last_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;',
        explanation: '这个查询使用INNER JOIN连接employees表和departments表，通过department_id字段关联，获取员工的姓名和所属部门。'
      }
    ]
  },
  {
    id: 'exercise-sql-5',
    title: '聚合函数和分组练习',
    description: '练习使用聚合函数和GROUP BY语句',
    courseId: 'course-3',
    chapterId: 'chapter-sql-5',
    questions: [
      {
        id: 'exsql5-q1',
        type: 'code',
        question: '编写一个SQL查询，计算每个部门的平均薪资。',
        codeTemplate: '-- 在这里编写SQL查询',
        codeHint: '使用AVG()聚合函数和GROUP BY语句。',
        correctAnswer: 'SELECT department_id, AVG(salary) as avg_salary FROM employees GROUP BY department_id;',
        explanation: '这个查询使用AVG()函数计算平均薪资，并按department_id分组，得到每个部门的平均薪资。'
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
      },
      {
        id: 'ml-q1-4',
        text: '机器学习工作流程的正确顺序是？',
        options: ['数据收集 → 模型训练 → 特征工程 → 模型评估', '数据收集 → 数据预处理 → 特征工程 → 模型训练 → 模型评估', '特征工程 → 数据收集 → 模型训练 → 模型评估', '模型选择 → 数据收集 → 模型训练 → 模型评估'],
        correctAnswer: 1,
        explanation: '标准的机器学习工作流程是：数据收集 → 数据预处理 → 特征工程 → 模型选择 → 模型训练 → 模型评估 → 模型部署。',
        points: 10
      },
      {
        id: 'ml-q1-5',
        text: '以下哪个不是机器学习的应用场景？',
        options: ['图像识别', '自然语言处理', '推荐系统', '手动数据录入'],
        correctAnswer: 3,
        explanation: '手动数据录入是人工操作，不是机器学习的应用场景。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-ml-2',
    title: '线性回归测验',
    type: 'chapter',
    courseId: 'course-2',
    chapterId: 'chapter-ml-2',
    description: '测试你对线性回归算法的掌握程度',
    questions: [
      {
        id: 'ml-q2-1',
        text: '线性回归的基本假设是什么？',
        options: ['输入特征与输出之间存在非线性关系', '输入特征与输出之间存在线性关系', '输入特征之间必须完全独立', '输出变量必须是分类变量'],
        correctAnswer: 1,
        explanation: '线性回归假设输入特征与输出之间存在线性关系。',
        points: 10
      },
      {
        id: 'ml-q2-2',
        text: '线性回归模型训练的目标是什么？',
        options: ['最大化预测值与实际值之间的差异', '最小化预测值与实际值之间的差异', '使模型复杂度最小', '使模型在训练集上100%正确'],
        correctAnswer: 1,
        explanation: '线性回归使用最小二乘法最小化预测值与实际值之间的误差。',
        points: 10
      },
      {
        id: 'ml-q2-3',
        text: '以下哪个不是线性回归的评估指标？',
        options: ['均方误差 (MSE)', '均方根误差 (RMSE)', '平均绝对误差 (MAE)', '精确率 (Precision)'],
        correctAnswer: 3,
        explanation: '精确率是分类模型的评估指标，不是回归模型的评估指标。',
        points: 10
      },
      {
        id: 'ml-q2-4',
        text: '在Scikit-learn中，如何创建线性回归模型？',
        options: ['from sklearn.linear_model import LinearRegression', 'from sklearn.linear_model import LogisticRegression', 'from sklearn.tree import DecisionTreeRegressor', 'from sklearn.ensemble import RandomForestRegressor'],
        correctAnswer: 0,
        explanation: 'LinearRegression类位于sklearn.linear_model模块中。',
        points: 10
      },
      {
        id: 'ml-q2-5',
        text: 'R²评分的取值范围是？',
        options: ['0到1', '-∞到1', '0到∞', '-1到1'],
        correctAnswer: 3,
        explanation: 'R²评分的取值范围是-1到1，越接近1表示模型性能越好。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-ml-3',
    title: '分类算法测验',
    type: 'chapter',
    courseId: 'course-2',
    chapterId: 'chapter-ml-3',
    description: '测试你对分类算法的掌握程度',
    questions: [
      {
        id: 'ml-q3-1',
        text: '以下哪个算法不是分类算法？',
        options: ['逻辑回归', '决策树', '随机森林', '线性回归'],
        correctAnswer: 3,
        explanation: '线性回归是回归算法，用于预测连续值，不是分类算法。',
        points: 10
      },
      {
        id: 'ml-q3-2',
        text: '逻辑回归的输出是什么？',
        options: ['连续值', '离散类别', '概率值', '布尔值'],
        correctAnswer: 2,
        explanation: '逻辑回归输出的是概率值，表示样本属于某个类别的概率。',
        points: 10
      },
      {
        id: 'ml-q3-3',
        text: '随机森林是一种什么类型的算法？',
        options: ['单一模型算法', '集成学习算法', '深度学习算法', '强化学习算法'],
        correctAnswer: 1,
        explanation: '随机森林是由多个决策树组成的集成学习算法。',
        points: 10
      },
      {
        id: 'ml-q3-4',
        text: '支持向量机的核心思想是什么？',
        options: ['寻找最优超平面来分离不同类别', '通过树状结构进行决策', '使用神经网络进行学习', '通过聚类分析发现数据模式'],
        correctAnswer: 0,
        explanation: '支持向量机通过寻找最优超平面来分离不同类别。',
        points: 10
      },
      {
        id: 'ml-q3-5',
        text: '在Scikit-learn中，如何创建决策树分类器？',
        options: ['from sklearn.tree import DecisionTreeClassifier', 'from sklearn.tree import DecisionTreeRegressor', 'from sklearn.ensemble import RandomForestClassifier', 'from sklearn.linear_model import LogisticRegression'],
        correctAnswer: 0,
        explanation: 'DecisionTreeClassifier类位于sklearn.tree模块中。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-ml-4',
    title: '模型评估与优化测验',
    type: 'chapter',
    courseId: 'course-2',
    chapterId: 'chapter-ml-4',
    description: '测试你对模型评估与优化的掌握程度',
    questions: [
      {
        id: 'ml-q4-1',
        text: '以下哪个不是分类模型的评估指标？',
        options: ['准确率 (Accuracy)', '精确率 (Precision)', '召回率 (Recall)', '均方误差 (MSE)'],
        correctAnswer: 3,
        explanation: '均方误差是回归模型的评估指标，不是分类模型的评估指标。',
        points: 10
      },
      {
        id: 'ml-q4-2',
        text: '交叉验证的主要目的是什么？',
        options: ['减少计算时间', '提高模型的泛化能力', '增加模型复杂度', '减少数据量'],
        correctAnswer: 1,
        explanation: '交叉验证通过使用不同的训练和测试集组合，提高模型的泛化能力。',
        points: 10
      },
      {
        id: 'ml-q4-3',
        text: '网格搜索的作用是什么？',
        options: ['数据预处理', '特征选择', '超参数调优', '模型训练'],
        correctAnswer: 2,
        explanation: '网格搜索用于超参数调优，通过尝试不同的参数组合找到最优参数。',
        points: 10
      },
      {
        id: 'ml-q4-4',
        text: '过拟合的表现是什么？',
        options: ['模型在训练数据和测试数据上表现都差', '模型在训练数据上表现好，但在测试数据上表现差', '模型在训练数据上表现差，但在测试数据上表现好', '模型在所有数据上表现都好'],
        correctAnswer: 1,
        explanation: '过拟合是指模型在训练数据上表现好，但在测试数据上表现差的现象。',
        points: 10
      },
      {
        id: 'ml-q4-5',
        text: '以下哪个不是防止过拟合的方法？',
        options: ['增加数据量', '特征选择', '正则化', '增加模型复杂度'],
        correctAnswer: 3,
        explanation: '增加模型复杂度会加重过拟合，不是防止过拟合的方法。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-ml-comp-1',
    title: '机器学习综合考试',
    type: 'comprehensive',
    courseId: 'course-2',
    description: '综合测试你对机器学习课程的掌握程度',
    questions: [
      {
        id: 'ml-cq1',
        text: '机器学习的核心目标是什么？',
        options: ['让计算机执行预定义的规则', '让计算机从数据中学习规律', '让计算机模拟人类思维', '让计算机解决所有问题'],
        correctAnswer: 1,
        explanation: '机器学习的核心目标是让计算机从数据中学习规律，而不是执行预定义的规则。',
        points: 10
      },
      {
        id: 'ml-cq2',
        text: '以下哪个算法属于无监督学习？',
        options: ['线性回归', '逻辑回归', 'K-means聚类', '决策树'],
        correctAnswer: 2,
        explanation: 'K-means聚类是无监督学习算法，其他选项都是监督学习算法。',
        points: 10
      },
      {
        id: 'ml-cq3',
        text: '在Scikit-learn中，如何划分训练集和测试集？',
        options: ['from sklearn.model_selection import train_test_split', 'from sklearn.model_selection import cross_val_score', 'from sklearn.model_selection import GridSearchCV', 'from sklearn.preprocessing import train_test_split'],
        correctAnswer: 0,
        explanation: 'train_test_split函数位于sklearn.model_selection模块中。',
        points: 10
      },
      {
        id: 'ml-cq4',
        text: 'F1分数是哪两个指标的调和平均？',
        options: ['准确率和召回率', '精确率和召回率', '准确率和精确率', '精确率和FPR'],
        correctAnswer: 1,
        explanation: 'F1分数是精确率和召回率的调和平均。',
        points: 10
      },
      {
        id: 'ml-cq5',
        text: '以下哪个不是机器学习的常见挑战？',
        options: ['数据质量问题', '过拟合', '欠拟合', '数据量过多'],
        correctAnswer: 3,
        explanation: '数据量过多通常不是挑战，反而更多的数据有助于提高模型性能。',
        points: 10
      },
      {
        id: 'ml-cq6',
        text: '特征工程的目的是什么？',
        options: ['减少数据量', '提高模型性能', '降低模型复杂度', '加快模型训练速度'],
        correctAnswer: 1,
        explanation: '特征工程的目的是通过创建更有意义的特征来提高模型性能。',
        points: 10
      },
      {
        id: 'ml-cq7',
        text: '集成学习的基本思想是什么？',
        options: ['使用单个复杂模型', '使用多个简单模型的组合', '使用深度学习模型', '使用规则引擎'],
        correctAnswer: 1,
        explanation: '集成学习通过组合多个简单模型的预测来提高整体性能。',
        points: 10
      },
      {
        id: 'ml-cq8',
        text: '在机器学习中，数据预处理的主要步骤不包括？',
        options: ['数据清洗', '特征标准化', '特征选择', '模型训练'],
        correctAnswer: 3,
        explanation: '模型训练是数据预处理之后的步骤，不属于数据预处理的主要步骤。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-sql-1',
    title: 'SQL基础概念测验',
    type: 'chapter',
    courseId: 'course-3',
    chapterId: 'chapter-sql-1',
    description: '测试你对SQL基本概念的理解',
    questions: [
      {
        id: 'sql-q1-1',
        text: 'SQL的全称是什么？',
        options: ['Structured Query Language', 'Standard Query Language', 'Simple Query Language', 'System Query Language'],
        correctAnswer: 0,
        explanation: 'SQL的全称是Structured Query Language（结构化查询语言）。',
        points: 10
      },
      {
        id: 'sql-q1-2',
        text: '以下哪个不是SQL的主要类型？',
        options: ['DDL', 'DML', 'DQL', 'DML'],
        correctAnswer: 3,
        explanation: 'DDL（数据定义语言）、DML（数据操作语言）和DQL（数据查询语言）都是SQL的主要类型。',
        points: 10
      },
      {
        id: 'sql-q1-3',
        text: '用于创建表的SQL语句是？',
        options: ['CREATE TABLE', 'INSERT TABLE', 'MAKE TABLE', 'BUILD TABLE'],
        correctAnswer: 0,
        explanation: 'CREATE TABLE语句用于创建新表。',
        points: 10
      },
      {
        id: 'sql-q1-4',
        text: '表中的一行数据被称为？',
        options: ['列', '字段', '记录', '属性'],
        correctAnswer: 2,
        explanation: '表中的一行数据被称为记录（Record）。',
        points: 10
      },
      {
        id: 'sql-q1-5',
        text: '用于唯一标识表中每一行的字段是？',
        options: ['外键', '主键', '索引', '约束'],
        correctAnswer: 1,
        explanation: '主键（Primary Key）用于唯一标识表中每一行。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-sql-2',
    title: 'SELECT语句测验',
    type: 'chapter',
    courseId: 'course-3',
    chapterId: 'chapter-sql-2',
    description: '测试你对SELECT语句的掌握程度',
    questions: [
      {
        id: 'sql-q2-1',
        text: '如何查询表中的所有列？',
        options: ['SELECT columns FROM table', 'SELECT * FROM table', 'SELECT ALL FROM table', 'SELECT EVERYTHING FROM table'],
        correctAnswer: 1,
        explanation: '使用SELECT * FROM table可以查询表中的所有列。',
        points: 10
      },
      {
        id: 'sql-q2-2',
        text: '用于过滤数据的子句是？',
        options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'],
        correctAnswer: 2,
        explanation: 'WHERE子句用于过滤数据。',
        points: 10
      },
      {
        id: 'sql-q2-3',
        text: '用于排序结果的子句是？',
        options: ['ORDER BY', 'SORT BY', 'ARRANGE BY', 'SEQUENCE BY'],
        correctAnswer: 0,
        explanation: 'ORDER BY子句用于排序结果。',
        points: 10
      },
      {
        id: 'sql-q2-4',
        text: '在MySQL中，限制结果数量的关键字是？',
        options: ['TOP', 'LIMIT', 'RANGE', 'NUMBER'],
        correctAnswer: 1,
        explanation: '在MySQL中，使用LIMIT关键字限制结果数量。',
        points: 10
      },
      {
        id: 'sql-q2-5',
        text: '用于模糊匹配的运算符是？',
        options: ['=', 'LIKE', 'IN', 'BETWEEN'],
        correctAnswer: 1,
        explanation: 'LIKE运算符用于模糊匹配。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-sql-3',
    title: '数据修改语句测验',
    type: 'chapter',
    courseId: 'course-3',
    chapterId: 'chapter-sql-3',
    description: '测试你对INSERT、UPDATE和DELETE语句的掌握程度',
    questions: [
      {
        id: 'sql-q3-1',
        text: '用于插入新记录的SQL语句是？',
        options: ['INSERT', 'ADD', 'CREATE', 'PUT'],
        correctAnswer: 0,
        explanation: 'INSERT语句用于插入新记录。',
        points: 10
      },
      {
        id: 'sql-q3-2',
        text: '用于更新记录的SQL语句是？',
        options: ['UPDATE', 'MODIFY', 'CHANGE', 'ALTER'],
        correctAnswer: 0,
        explanation: 'UPDATE语句用于更新记录。',
        points: 10
      },
      {
        id: 'sql-q3-3',
        text: '用于删除记录的SQL语句是？',
        options: ['DELETE', 'REMOVE', 'DROP', 'ERASE'],
        correctAnswer: 0,
        explanation: 'DELETE语句用于删除记录。',
        points: 10
      },
      {
        id: 'sql-q3-4',
        text: '在UPDATE语句中，用于指定要更新的列和值的关键字是？',
        options: ['SET', 'WHERE', 'VALUES', 'UPDATE'],
        correctAnswer: 0,
        explanation: 'SET子句用于指定要更新的列和值。',
        points: 10
      },
      {
        id: 'sql-q3-5',
        text: '在INSERT语句中，用于指定要插入的值的关键字是？',
        options: ['SET', 'WHERE', 'VALUES', 'INSERT'],
        correctAnswer: 2,
        explanation: 'VALUES子句用于指定要插入的值。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-sql-4',
    title: '表连接测验',
    type: 'chapter',
    courseId: 'course-3',
    chapterId: 'chapter-sql-4',
    description: '测试你对JOIN语句的掌握程度',
    questions: [
      {
        id: 'sql-q4-1',
        text: '返回两个表中匹配记录的连接类型是？',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'],
        correctAnswer: 0,
        explanation: 'INNER JOIN返回两个表中匹配的记录。',
        points: 10
      },
      {
        id: 'sql-q4-2',
        text: '返回左表所有记录和右表匹配记录的连接类型是？',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'],
        correctAnswer: 1,
        explanation: 'LEFT JOIN返回左表的所有记录和右表中匹配的记录。',
        points: 10
      },
      {
        id: 'sql-q4-3',
        text: '用于指定连接条件的关键字是？',
        options: ['ON', 'WHERE', 'USING', 'WITH'],
        correctAnswer: 0,
        explanation: 'ON关键字用于指定连接条件。',
        points: 10
      },
      {
        id: 'sql-q4-4',
        text: '连接多个表时，通常使用什么字段？',
        options: ['任意字段', '主键', '外键', '索引'],
        correctAnswer: 2,
        explanation: '连接多个表时，通常使用外键来关联。',
        points: 10
      },
      {
        id: 'sql-q4-5',
        text: '以下哪个是正确的连接语法？',
        options: ['JOIN table ON condition', 'JOIN table WHERE condition', 'JOIN table USING condition', 'JOIN table WITH condition'],
        correctAnswer: 0,
        explanation: '正确的连接语法是JOIN table ON condition。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-sql-5',
    title: '聚合函数和分组测验',
    type: 'chapter',
    courseId: 'course-3',
    chapterId: 'chapter-sql-5',
    description: '测试你对聚合函数和GROUP BY语句的掌握程度',
    questions: [
      {
        id: 'sql-q5-1',
        text: '用于计算平均值的聚合函数是？',
        options: ['SUM()', 'COUNT()', 'AVG()', 'MAX()'],
        correctAnswer: 2,
        explanation: 'AVG()函数用于计算平均值。',
        points: 10
      },
      {
        id: 'sql-q5-2',
        text: '用于按列分组的关键字是？',
        options: ['ORDER BY', 'GROUP BY', 'PARTITION BY', 'SORT BY'],
        correctAnswer: 1,
        explanation: 'GROUP BY关键字用于按列分组。',
        points: 10
      },
      {
        id: 'sql-q5-3',
        text: '用于过滤分组后结果的子句是？',
        options: ['WHERE', 'HAVING', 'FILTER', 'CONDITION'],
        correctAnswer: 1,
        explanation: 'HAVING子句用于过滤分组后的结果。',
        points: 10
      },
      {
        id: 'sql-q5-4',
        text: '用于计数的聚合函数是？',
        options: ['SUM()', 'COUNT()', 'AVG()', 'MAX()'],
        correctAnswer: 1,
        explanation: 'COUNT()函数用于计数。',
        points: 10
      },
      {
        id: 'sql-q5-5',
        text: '以下哪个是正确的分组语法？',
        options: ['GROUP BY column', 'GROUP column', 'BY GROUP column', 'GROUPING column'],
        correctAnswer: 0,
        explanation: '正确的分组语法是GROUP BY column。',
        points: 10
      }
    ]
  },
  {
    id: 'quiz-sql-comp-1',
    title: 'SQL数据库综合考试',
    type: 'comprehensive',
    courseId: 'course-3',
    description: '综合测试你对SQL数据库课程的掌握程度',
    questions: [
      {
        id: 'sql-cq1',
        text: 'SQL中用于查询数据的语句是？',
        options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
        correctAnswer: 2,
        explanation: 'SELECT语句用于从数据库表中查询数据。',
        points: 10
      },
      {
        id: 'sql-cq2',
        text: '以下哪个不是SQL的主要类型？',
        options: ['DDL', 'DML', 'DQL', 'DRL'],
        correctAnswer: 3,
        explanation: 'DDL、DML和DQL都是SQL的主要类型，DRL不是。',
        points: 10
      },
      {
        id: 'sql-cq3',
        text: '用于创建表的SQL语句是？',
        options: ['CREATE TABLE', 'INSERT TABLE', 'MAKE TABLE', 'BUILD TABLE'],
        correctAnswer: 0,
        explanation: 'CREATE TABLE语句用于创建新表。',
        points: 10
      },
      {
        id: 'sql-cq4',
        text: '返回两个表中匹配记录的连接类型是？',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'],
        correctAnswer: 0,
        explanation: 'INNER JOIN返回两个表中匹配的记录。',
        points: 10
      },
      {
        id: 'sql-cq5',
        text: '用于计算平均值的聚合函数是？',
        options: ['SUM()', 'COUNT()', 'AVG()', 'MAX()'],
        correctAnswer: 2,
        explanation: 'AVG()函数用于计算平均值。',
        points: 10
      },
      {
        id: 'sql-cq6',
        text: '在MySQL中，限制结果数量的关键字是？',
        options: ['TOP', 'LIMIT', 'RANGE', 'NUMBER'],
        correctAnswer: 1,
        explanation: '在MySQL中，使用LIMIT关键字限制结果数量。',
        points: 10
      },
      {
        id: 'sql-cq7',
        text: '用于过滤分组后结果的子句是？',
        options: ['WHERE', 'HAVING', 'FILTER', 'CONDITION'],
        correctAnswer: 1,
        explanation: 'HAVING子句用于过滤分组后的结果。',
        points: 10
      },
      {
        id: 'sql-cq8',
        text: 'SQL语句是否区分大小写？',
        options: ['是，严格区分', '否，不区分', '只区分关键字', '只区分表名和列名'],
        correctAnswer: 1,
        explanation: 'SQL语句不区分大小写，但通常关键字使用大写，表名和列名使用小写。',
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

export function getExerciseByChapter(courseId: string, chapterId: string): any | undefined {
  return exercises.find(exercise => exercise.courseId === courseId && exercise.chapterId === chapterId);
}

export function getExercisesByCourse(courseId: string): any[] {
  return exercises.filter(exercise => exercise.courseId === courseId);
}
