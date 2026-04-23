export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const codeExamples: CodeExample[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    description: '最基础的Python程序，输出Hello World',
    code: `print("Hello, World!")`,
    category: '基础语法',
    difficulty: 'beginner'
  },
  {
    id: 'variables',
    title: '变量和数据类型',
    description: '学习Python中的变量和基本数据类型',
    code: `name = "Python"
age = 30
pi = 3.14159
is_python_fun = True

print(name)
print(age)
print(pi)
print(is_python_fun)`,
    category: '基础语法',
    difficulty: 'beginner'
  },
  {
    id: 'control-flow',
    title: '条件语句和循环',
    description: '学习if语句和for循环',
    code: `# 条件语句
age = 18
if age >= 18:
    print("成年人")
else:
    print("未成年人")

# 循环
print("1到5的数字:")
for i in range(1, 6):
    print(i)`,
    category: '基础语法',
    difficulty: 'beginner'
  },
  {
    id: 'functions',
    title: '函数定义和调用',
    description: '学习如何定义和调用函数',
    code: `def greet(name):
    """问候函数"""
    return f"Hello, {name}!"

# 调用函数
message = greet("Alice")
print(message)

# 带默认参数的函数
def calculate_area(length, width=1):
    """计算面积"""
    return length * width

print(calculate_area(5))
print(calculate_area(5, 3))`,
    category: '函数',
    difficulty: 'beginner'
  },
  {
    id: 'lists',
    title: '列表操作',
    description: '学习Python列表的基本操作',
    code: `fruits = ["apple", "banana", "cherry"]

# 访问元素
print(fruits[0])

# 添加元素
fruits.append("orange")
print(fruits)

# 遍历列表
print("所有水果:")
for fruit in fruits:
    print(fruit)

# 列表推导式
squares = [x**2 for x in range(1, 6)]
print("平方数:", squares)`,
    category: '数据结构',
    difficulty: 'beginner'
  },
  {
    id: 'dictionaries',
    title: '字典操作',
    description: '学习Python字典的基本操作',
    code: `person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# 访问值
print(person["name"])

# 添加新键值对
person["job"] = "Engineer"
print(person)

# 遍历字典
print("个人信息:")
for key, value in person.items():
    print(f"{key}: {value}")`,
    category: '数据结构',
    difficulty: 'intermediate'
  },
  {
    id: 'classes',
    title: '类和对象',
    description: '学习Python的面向对象编程',
    code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, my name is {self.name} and I am {self.age} years old."

# 创建对象
person1 = Person("Alice", 25)
person2 = Person("Bob", 30)

# 调用方法
print(person1.greet())
print(person2.greet())`,
    category: '面向对象',
    difficulty: 'intermediate'
  },
  {
    id: 'file-io',
    title: '文件读写',
    description: '学习如何读写文件',
    code: `# 写入文件
with open("example.txt", "w") as f:
    f.write("Hello, File!")
    f.write("\nThis is a test.")

# 读取文件
with open("example.txt", "r") as f:
    content = f.read()
    print(content)`,
    category: '文件操作',
    difficulty: 'intermediate'
  },
  {
    id: 'modules',
    title: '模块和包',
    description: '学习如何使用Python模块',
    code: `import math
import random

# 使用math模块
print("π的值:", math.pi)
print("平方根:", math.sqrt(16))

# 使用random模块
print("随机数:", random.randint(1, 10))
print("随机选择:", random.choice(["apple", "banana", "cherry"]))`,
    category: '模块',
    difficulty: 'intermediate'
  },
  {
    id: 'exception-handling',
    title: '异常处理',
    description: '学习如何处理Python中的异常',
    code: `try:
    # 可能会出错的代码
    result = 10 / 0
except ZeroDivisionError:
    print("错误: 除数不能为零")
except Exception as e:
    print(f"发生错误: {e}")
finally:
    print("无论如何都会执行")`,
    category: '错误处理',
    difficulty: 'intermediate'
  },
  {
    id: 'decorators',
    title: '装饰器',
    description: '学习Python装饰器的使用',
    code: `def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"函数 {func.__name__} 运行时间: {end_time - start_time:.4f} 秒")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    print("函数执行完成")

slow_function()`,
    category: '高级特性',
    difficulty: 'advanced'
  },
  {
    id: 'generators',
    title: '生成器',
    description: '学习Python生成器的使用',
    code: `def fibonacci(n):
    """生成斐波那契数列"""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# 使用生成器
print("斐波那契数列前10项:")
for num in fibonacci(10):
    print(num)`,
    category: '高级特性',
    difficulty: 'advanced'
  },
  {
    id: 'context-managers',
    title: '上下文管理器',
    description: '学习Python上下文管理器的使用',
    code: `class Timer:
    def __enter__(self):
        import time
        self.start_time = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        end_time = time.time()
        print(f"执行时间: {end_time - self.start_time:.4f} 秒")

# 使用上下文管理器
with Timer():
    import time
    time.sleep(1)
    print("代码执行完成")`,
    category: '高级特性',
    difficulty: 'advanced'
  },
  {
    id: 'lambda-functions',
    title: 'lambda函数',
    description: '学习Python lambda函数的使用',
    code: `# 普通函数
def add(a, b):
    return a + b

# lambda函数
add_lambda = lambda a, b: a + b

print("普通函数:", add(5, 3))
print("lambda函数:", add_lambda(5, 3))

# lambda函数在排序中的应用
students = [
    {"name": "Alice", "grade": 85},
    {"name": "Bob", "grade": 92},
    {"name": "Charlie", "grade": 78}
]

# 按成绩排序
students.sort(key=lambda x: x["grade"], reverse=True)
print("按成绩排序:")
for student in students:
    print(f"{student['name']}: {student['grade']}")`,
    category: '函数式编程',
    difficulty: 'intermediate'
  },
  {
    id: 'list-comprehensions',
    title: '列表推导式',
    description: '学习Python列表推导式的使用',
    code: `# 普通方法
numbers = [1, 2, 3, 4, 5]
squares = []
for num in numbers:
    squares.append(num ** 2)
print("普通方法:", squares)

# 列表推导式
squares_comp = [num ** 2 for num in numbers]
print("列表推导式:", squares_comp)

# 带条件的列表推导式
even_squares = [num ** 2 for num in numbers if num % 2 == 0]
print("偶数的平方:", even_squares)

# 嵌套列表推导式
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print("展平矩阵:", flattened)`,
    category: '高级特性',
    difficulty: 'intermediate'
  }
];