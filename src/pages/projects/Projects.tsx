import React, { useState } from 'react';
import { useProgress } from '../../hooks/useProgress';

// 10个Python项目数据
const projects = [
  {
    id: 'proj1',
    title: '猜数字游戏',
    description: '创建一个简单的猜数字游戏，玩家需要在有限的次数内猜出计算机生成的随机数',
    difficulty: 'beginner',
    skills: ['基础语法', '随机数', '条件判断', '循环'],
    template: `import random

def guess_number():
    # 生成1-100之间的随机数
    secret_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 10
    
    print("欢迎来到猜数字游戏！")
    print("我已经想好了一个1-100之间的数字，你有10次机会猜它。")
    
    while attempts < max_attempts:
        try:
            guess = int(input("请输入你的猜测: "))
            attempts += 1
            
            if guess < secret_number:
                print("太小了！")
            elif guess > secret_number:
                print("太大了！")
            else:
                print(f"恭喜你！你用了{attempts}次猜对了数字{secret_number}！")
                return
        except ValueError:
            print("请输入有效的数字！")
    
    print(f"很遗憾，你没有在{max_attempts}次内猜中数字。答案是{secret_number}。")

if __name__ == "__main__":
    guess_number()`
  },
  {
    id: 'proj2',
    title: '简单计算器',
    description: '创建一个简单的命令行计算器，支持基本的加减乘除运算',
    difficulty: 'beginner',
    skills: ['基础语法', '函数', '条件判断', '用户输入'],
    template: `def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        return "错误：除数不能为零！"
    return x / y

def calculator():
    print("简单计算器")
    print("请选择操作：")
    print("1. 加法")
    print("2. 减法")
    print("3. 乘法")
    print("4. 除法")
    
    choice = input("请输入你的选择(1/2/3/4): ")
    
    try:
        num1 = float(input("请输入第一个数字: "))
        num2 = float(input("请输入第二个数字: "))
        
        if choice == '1':
            print(f"{num1} + {num2} = {add(num1, num2)}")
        elif choice == '2':
            print(f"{num1} - {num2} = {subtract(num1, num2)}")
        elif choice == '3':
            print(f"{num1} * {num2} = {multiply(num1, num2)}")
        elif choice == '4':
            result = divide(num1, num2)
            print(f"{num1} / {num2} = {result}")
        else:
            print("无效的选择")
    except ValueError:
        print("请输入有效的数字！")

if __name__ == "__main__":
    calculator()`
  },
  {
    id: 'proj3',
    title: '待办事项列表',
    description: '创建一个待办事项列表应用，支持添加、删除和标记完成任务',
    difficulty: 'beginner',
    skills: ['列表操作', '函数', '循环', '条件判断'],
    template: `def todo_list():
    todos = []
    
    while True:
        print("\n待办事项列表")
        print("1. 查看所有待办事项")
        print("2. 添加待办事项")
        print("3. 标记待办事项为完成")
        print("4. 删除待办事项")
        print("5. 退出")
        
        choice = input("请输入你的选择: ")
        
        if choice == '1':
            print("\n你的待办事项：")
            if not todos:
                print("没有待办事项")
            else:
                for i, todo in enumerate(todos, 1):
                    status = "[完成]" if todo['completed'] else "[未完成]"
                    print(f"{i}. {status} {todo['task']}")
        
        elif choice == '2':
            task = input("请输入待办事项: ")
            todos.append({'task': task, 'completed': False})
            print(f"已添加待办事项: {task}")
        
        elif choice == '3':
            if not todos:
                print("没有待办事项")
                continue
            try:
                index = int(input("请输入要标记为完成的待办事项编号: ")) - 1
                if 0 <= index < len(todos):
                    todos[index]['completed'] = True
                    print(f"已标记待办事项为完成: {todos[index]['task']}")
                else:
                    print("无效的编号")
            except ValueError:
                print("请输入有效的编号")
        
        elif choice == '4':
            if not todos:
                print("没有待办事项")
                continue
            try:
                index = int(input("请输入要删除的待办事项编号: ")) - 1
                if 0 <= index < len(todos):
                    deleted_task = todos.pop(index)
                    print(f"已删除待办事项: {deleted_task['task']}")
                else:
                    print("无效的编号")
            except ValueError:
                print("请输入有效的编号")
        
        elif choice == '5':
            print("再见！")
            break
        
        else:
            print("无效的选择")

if __name__ == "__main__":
    todo_list()`
  },
  {
    id: 'proj4',
    title: '文件读写操作',
    description: '创建一个程序，读取文本文件内容，统计单词数量，并将结果写入新文件',
    difficulty: 'intermediate',
    skills: ['文件操作', '字符串处理', '函数'],
    template: `def count_words(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            content = file.read()
            # 简单的单词计数（按空格分割）
            words = content.split()
            return len(words)
    except FileNotFoundError:
        print(f"错误：文件 '{filename}' 不存在")
        return 0

def write_result(input_file, output_file):
    word_count = count_words(input_file)
    
    try:
        with open(output_file, 'w', encoding='utf-8') as file:
            file.write(f"文件 '{input_file}' 中的单词数量: {word_count}")
        print(f"结果已写入文件 '{output_file}'")
    except Exception as e:
        print(f"写入文件时出错: {e}")

def main():
    input_file = input("请输入要读取的文件路径: ")
    output_file = input("请输入要写入结果的文件路径: ")
    write_result(input_file, output_file)

if __name__ == "__main__":
    main()`
  },
  {
    id: 'proj5',
    title: '简单的Web服务器',
    description: '使用Python的http.server模块创建一个简单的Web服务器，提供静态文件访问',
    difficulty: 'intermediate',
    skills: ['网络编程', '模块使用', '命令行参数'],
    template: `import http.server
import socketserver
import argparse
import os

def start_server(port, directory):
    # 切换到指定目录
    os.chdir(directory)
    
    # 创建服务器
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"服务器启动在 http://localhost:{port}")
        print(f"提供目录: {os.getcwd()}")
        print("按 Ctrl+C 停止服务器")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n服务器已停止")

def main():
    parser = argparse.ArgumentParser(description='简单的Web服务器')
    parser.add_argument('--port', type=int, default=8000, help='服务器端口')
    parser.add_argument('--dir', type=str, default='.', help='要提供的目录')
    args = parser.parse_args()
    
    start_server(args.port, args.dir)

if __name__ == "__main__":
    main()`
  },
  {
    id: 'proj6',
    title: '数据可视化',
    description: '使用matplotlib库创建简单的数据可视化图表，展示一组数据的趋势',
    difficulty: 'intermediate',
    skills: ['第三方库', '数据处理', '可视化'],
    template: `import matplotlib.pyplot as plt
import numpy as np

def create_line_chart():
    # 生成示例数据
    x = np.arange(1, 11)
    y1 = np.random.randint(1, 100, 10)
    y2 = np.random.randint(1, 100, 10)
    
    # 创建图表
    plt.figure(figsize=(10, 6))
    plt.plot(x, y1, label='数据集1', marker='o')
    plt.plot(x, y2, label='数据集2', marker='s')
    
    # 添加标题和标签
    plt.title('数据趋势图')
    plt.xlabel('X轴')
    plt.ylabel('Y轴')
    
    # 添加图例
    plt.legend()
    
    # 添加网格
    plt.grid(True)
    
    # 显示图表
    plt.show()

def create_bar_chart():
    # 生成示例数据
    categories = ['A', 'B', 'C', 'D', 'E']
    values = np.random.randint(1, 100, 5)
    
    # 创建图表
    plt.figure(figsize=(10, 6))
    plt.bar(categories, values, color='skyblue')
    
    # 添加标题和标签
    plt.title('分类数据条形图')
    plt.xlabel('类别')
    plt.ylabel('值')
    
    # 显示图表
    plt.show()

def main():
    print("1. 线图")
    print("2. 条形图")
    choice = input("请选择要创建的图表类型: ")
    
    if choice == '1':
        create_line_chart()
    elif choice == '2':
        create_bar_chart()
    else:
        print("无效的选择")

if __name__ == "__main__":
    main()`
  },
  {
    id: 'proj7',
    title: '简单的爬虫',
    description: '使用requests和beautifulsoup库创建一个简单的网页爬虫，获取网页内容并提取信息',
    difficulty: 'intermediate',
    skills: ['网络请求', 'HTML解析', '第三方库'],
    template: `import requests
from bs4 import BeautifulSoup

def crawl_website(url):
    try:
        # 发送请求
        response = requests.get(url)
        response.raise_for_status()  # 检查请求是否成功
        
        # 解析HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 提取标题
        title = soup.title.string if soup.title else '无标题'
        print(f"网页标题: {title}")
        
        # 提取所有链接
        links = soup.find_all('a')
        print(f"\n找到 {len(links)} 个链接:")
        for i, link in enumerate(links[:10]):  # 只显示前10个链接
            href = link.get('href')
            text = link.text.strip()
            print(f"{i+1}. {text} - {href}")
        
        if len(links) > 10:
            print(f"... 还有 {len(links) - 10} 个链接未显示")
            
    except requests.exceptions.RequestException as e:
        print(f"请求错误: {e}")
    except Exception as e:
        print(f"错误: {e}")

def main():
    url = input("请输入要爬取的网页URL: ")
    crawl_website(url)

if __name__ == "__main__":
    main()`
  },
  {
    id: 'proj8',
    title: '面向对象编程 - 银行账户',
    description: '使用面向对象编程创建一个银行账户类，支持存款、取款和查询余额等操作',
    difficulty: 'advanced',
    skills: ['面向对象编程', '类和对象', '方法', '属性'],
    template: `class BankAccount:
    def __init__(self, account_holder, initial_balance=0):
        self.account_holder = account_holder
        self.balance = initial_balance
    
    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"已存入 {amount} 元，当前余额: {self.balance} 元")
        else:
            print("存款金额必须大于0")
    
    def withdraw(self, amount):
        if amount > 0:
            if amount <= self.balance:
                self.balance -= amount
                print(f"已取出 {amount} 元，当前余额: {self.balance} 元")
            else:
                print("余额不足")
        else:
            print("取款金额必须大于0")
    
    def check_balance(self):
        print(f"{self.account_holder} 的账户余额: {self.balance} 元")
    
    def __str__(self):
        return f"账户持有人: {self.account_holder}, 余额: {self.balance} 元"

def main():
    # 创建账户
    account = BankAccount("张三", 1000)
    print(account)
    
    # 存款
    account.deposit(500)
    
    # 取款
    account.withdraw(200)
    
    # 检查余额
    account.check_balance()
    
    # 尝试超额取款
    account.withdraw(2000)

if __name__ == "__main__":
    main()`
  },
  {
    id: 'proj9',
    title: '简单的数据库应用',
    description: '使用SQLite创建一个简单的数据库应用，存储和管理用户信息',
    difficulty: 'advanced',
    skills: ['数据库操作', 'SQL', '文件IO'],
    template: `import sqlite3

def create_database():
    # 连接到数据库（如果不存在则创建）
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    # 创建用户表
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER
    )
    ''')
    
    conn.commit()
    conn.close()
    print("数据库创建成功")

def add_user(name, email, age):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
        INSERT INTO users (name, email, age) VALUES (?, ?, ?)
        ''', (name, email, age))
        conn.commit()
        print(f"用户 {name} 添加成功")
    except sqlite3.IntegrityError:
        print("错误：邮箱已存在")
    finally:
        conn.close()

def view_users():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM users')
    users = cursor.fetchall()
    
    if not users:
        print("没有用户记录")
    else:
        print("\n用户列表:")
        print("ID | 姓名 | 邮箱 | 年龄")
        print("-" * 50)
        for user in users:
            print(f"{user[0]} | {user[1]} | {user[2]} | {user[3]}")
    
    conn.close()

def update_user(user_id, name, email, age):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
        UPDATE users SET name=?, email=?, age=? WHERE id=?
        ''', (name, email, age, user_id))
        if cursor.rowcount > 0:
            conn.commit()
            print(f"用户 ID {user_id} 更新成功")
        else:
            print("用户不存在")
    except sqlite3.IntegrityError:
        print("错误：邮箱已存在")
    finally:
        conn.close()

def delete_user(user_id):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    cursor.execute('DELETE FROM users WHERE id=?', (user_id,))
    if cursor.rowcount > 0:
        conn.commit()
        print(f"用户 ID {user_id} 删除成功")
    else:
        print("用户不存在")
    
    conn.close()

def main():
    create_database()
    
    while True:
        print("\n用户管理系统")
        print("1. 添加用户")
        print("2. 查看所有用户")
        print("3. 更新用户信息")
        print("4. 删除用户")
        print("5. 退出")
        
        choice = input("请输入你的选择: ")
        
        if choice == '1':
            name = input("请输入姓名: ")
            email = input("请输入邮箱: ")
            age = int(input("请输入年龄: "))
            add_user(name, email, age)
        
        elif choice == '2':
            view_users()
        
        elif choice == '3':
            user_id = int(input("请输入要更新的用户ID: "))
            name = input("请输入新姓名: ")
            email = input("请输入新邮箱: ")
            age = int(input("请输入新年龄: "))
            update_user(user_id, name, email, age)
        
        elif choice == '4':
            user_id = int(input("请输入要删除的用户ID: "))
            delete_user(user_id)
        
        elif choice == '5':
            print("再见！")
            break
        
        else:
            print("无效的选择")

if __name__ == "__main__":
    main()`
  },
  {
    id: 'proj10',
    title: '机器学习入门 - 线性回归',
    description: '使用scikit-learn库创建一个简单的线性回归模型，预测房价',
    difficulty: 'advanced',
    skills: ['机器学习', '数据处理', '模型训练', '预测'],
    template: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

def create_sample_data():
    # 创建示例数据：房屋面积与价格
    np.random.seed(42)
    X = 2 * np.random.rand(100, 1)
    y = 4 + 3 * X + np.random.randn(100, 1)
    return X, y

def train_model(X, y):
    # 分割数据
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # 创建并训练模型
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    # 预测
    y_pred = model.predict(X_test)
    
    # 评估模型
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"模型系数: {model.coef_[0][0]}")
    print(f"模型截距: {model.intercept_[0]}")
    print(f"均方误差: {mse}")
    print(f"R² 评分: {r2}")
    
    return model, X_train, y_train, X_test, y_test, y_pred

def visualize_results(model, X_train, y_train, X_test, y_test, y_pred):
    # 绘制训练数据和回归线
    plt.figure(figsize=(10, 6))
    plt.scatter(X_train, y_train, color='blue', label='训练数据')
    plt.scatter(X_test, y_test, color='green', label='测试数据')
    plt.plot(X_train, model.predict(X_train), color='red', linewidth=2, label='回归线')
    plt.xlabel('房屋面积 (平方米)')
    plt.ylabel('房价 (万元)')
    plt.title('线性回归模型 - 房价预测')
    plt.legend()
    plt.show()

def predict_new_data(model):
    # 预测新数据
    while True:
        try:
            area = float(input("请输入房屋面积 (平方米)，输入0退出: "))
            if area == 0:
                break
            price = model.predict([[area]])[0][0]
            print(f"预测房价: {price:.2f} 万元")
        except ValueError:
            print("请输入有效的数字")

def main():
    # 创建数据
    X, y = create_sample_data()
    
    # 训练模型
    model, X_train, y_train, X_test, y_test, y_pred = train_model(X, y)
    
    # 可视化结果
    visualize_results(model, X_train, y_train, X_test, y_test, y_pred)
    
    # 预测新数据
    predict_new_data(model)

if __name__ == "__main__":
    main()`
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [code, setCode] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 获取和更新项目进度
  const { progress, completed, updateProgress } = useProgress(
    selectedProject?.id || 'projects',
    'project'
  );

  const handleProjectSelect = (project: any) => {
    setSelectedProject(project);
    setCode(project.template);
    setResult('');
  };

  const handleRunCode = async () => {
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/code/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.result);
      } else {
        setResult(`错误: ${data.error}`);
      }
    } catch (err) {
      setResult('运行代码时发生错误');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProject = () => {
    updateProgress(100, true);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
    setCode('');
    setResult('');
  };

  // 渲染项目列表
  if (!selectedProject) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">项目实践</h1>
            <p className="text-gray-600">通过实战项目巩固Python技能</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => {
              const { progress: projProgress, completed: projCompleted } = useProgress(
                project.id,
                'project'
              );

              return (
                <div 
                  key={project.id} 
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleProjectSelect(project)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      project.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {project.difficulty === 'beginner' ? '基础' :
                       project.difficulty === 'intermediate' ? '中级' : '高级'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">所需技能:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">项目 {projects.indexOf(project) + 1}/10</span>
                    {projCompleted ? (
                      <span className="text-sm text-green-600 font-medium">已完成</span>
                    ) : (
                      <span className="text-sm text-gray-600">{projProgress}% 完成</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 渲染项目详情
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToList}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300"
          >
            ← 返回项目列表
          </button>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            selectedProject.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            selectedProject.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {selectedProject.difficulty === 'beginner' ? '基础' :
             selectedProject.difficulty === 'intermediate' ? '中级' : '高级'}
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedProject.title}</h2>
          <p className="text-gray-600 mb-6">{selectedProject.description}</p>

          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-2">所需技能:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.skills.map((skill: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-3">代码模板</h4>
            <div className="mb-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 border border-gray-300 rounded-md font-mono text-sm"
                placeholder="编写Python代码..."
              />
            </div>
            <div className="flex justify-center mb-6">
              <button
                onClick={handleRunCode}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '运行中...' : '运行代码'}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-2">运行结果</h4>
            <div className="bg-gray-100 rounded-md p-4 min-h-32 font-mono text-sm">
              {result || '运行代码查看结果'}
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            {!completed && (
              <button
                onClick={handleCompleteProject}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                标记为完成
              </button>
            )}
            {completed && (
              <span className="px-6 py-3 bg-green-100 text-green-800 font-medium rounded-md">
                已完成
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;