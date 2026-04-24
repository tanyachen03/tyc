export interface TrainingProject {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  stars: number;
  learningObjectives: string[];
  coreFeatures: string[];
  extensionChallenges: string[];
  starterCode: string;
}

export const trainingProjects: TrainingProject[] = [
  {
    id: "training-1",
    title: "个人计算器",
    description: "开发一个命令行版本的简易计算器，支持基本的算术运算。",
    difficulty: "初级",
    stars: 1,
    learningObjectives: [
      "基本输入输出操作",
      "算术运算符的使用",
      "条件判断和循环结构",
      "异常处理"
    ],
    coreFeatures: [
      "支持加减乘除四则运算",
      "支持连续计算",
      "错误处理（如除零错误）",
      "友好的用户界面"
    ],
    extensionChallenges: [
      "添加科学计算功能（平方根、幂运算等）",
      "添加括号支持",
      "实现图形界面（使用tkinter）"
    ],
    starterCode: `# 个人计算器项目
# 在这里开始编写你的代码

print("欢迎使用个人计算器！")
print("输入 'exit' 退出程序")

while True:
    # 你的代码
    pass
`
  },
  {
    id: "training-2",
    title: "猜数字游戏",
    description: "开发一个猜数字游戏，程序随机生成一个数字，用户来猜。",
    difficulty: "初级",
    stars: 1,
    learningObjectives: [
      "随机数生成",
      "用户输入处理",
      "条件判断",
      "循环控制"
    ],
    coreFeatures: [
      "随机生成1-100之间的数字",
      "提示用户输入猜测的数字",
      "根据猜测给出提示（大了/小了）",
      "记录猜测次数",
      "游戏结束后询问是否再玩"
    ],
    extensionChallenges: [
      "添加难度级别（不同范围的数字）",
      "记录历史最高分数（最少猜测次数）",
      "添加图形界面"
    ],
    starterCode: `# 猜数字游戏
# 在这里开始编写你的代码

import random

print("欢迎来到猜数字游戏！")
print("我已经想好了一个1-100之间的数字，快来猜一猜吧！")

# 生成随机数
target = random.randint(1, 100)
guess_count = 0

# 你的代码
`
  },
  {
    id: "training-3",
    title: "个人记账本",
    description: "开发一个命令行版本的简易记账本，帮助用户记录日常收支。",
    difficulty: "初级",
    stars: 2,
    learningObjectives: [
      "文件读写操作（txt或csv格式）",
      "日期时间处理（datetime模块）",
      "列表和字典的数据组织",
      "基本数据统计"
    ],
    coreFeatures: [
      "添加收支记录（金额、类别、备注、日期）",
      "查看当月/全部流水",
      "统计收支总额和结余",
      "按类别分类统计"
    ],
    extensionChallenges: [
      "添加数据可视化（matplotlib绘制饼图）",
      "支持导出Excel报表",
      "添加图形界面"
    ],
    starterCode: `# 个人记账本项目
# 在这里开始编写你的代码

import datetime
import csv

# 提示：你可以使用CSV文件来存储数据
# 数据结构可以包含：日期、金额、类别、备注、类型（收入/支出）

print("欢迎使用个人记账本！")
`
  },
  {
    id: "training-4",
    title: "文本词频统计",
    description: "开发一个程序，统计文本文件中单词出现的频率。",
    difficulty: "初级",
    stars: 2,
    learningObjectives: [
      "文件读写操作",
      "字符串处理",
      "字典的使用",
      "排序算法"
    ],
    coreFeatures: [
      "读取文本文件",
      "统计每个单词出现的次数",
      "按频率排序并显示",
      "支持指定文件路径"
    ],
    extensionChallenges: [
      "添加停用词过滤功能",
      "支持中文文本分析",
      "生成词云图（使用wordcloud库）"
    ],
    starterCode: `# 文本词频统计
# 在这里开始编写你的代码

import string

print("文本词频统计工具")
print("请输入要分析的文本文件路径：")

# 你的代码
`
  },
  {
    id: "training-5",
    title: "批量文件重命名",
    description: "开发一个程序，批量重命名指定目录下的文件。",
    difficulty: "中级",
    stars: 2,
    learningObjectives: [
      "文件系统操作（os模块）",
      "路径处理（pathlib模块）",
      "正则表达式应用",
      "批量处理逻辑"
    ],
    coreFeatures: [
      "指定目录路径",
      "支持自定义命名规则",
      "预览重命名结果",
      "执行重命名操作"
    ],
    extensionChallenges: [
      "支持按文件类型过滤",
      "支持批量添加前缀/后缀",
      "支持文件排序后重命名"
    ],
    starterCode: `# 批量文件重命名
# 在这里开始编写你的代码

import os
from pathlib import Path

print("批量文件重命名工具")
print("请输入要处理的目录路径：")

# 你的代码
`
  },
  {
    id: "training-6",
    title: "爬虫获取网页信息",
    description: "开发一个简单的网页爬虫，获取指定网页的信息。",
    difficulty: "中级",
    stars: 3,
    learningObjectives: [
      "requests库发送HTTP请求",
      "BeautifulSoup解析HTML",
      "数据提取和处理",
      "异常处理"
    ],
    coreFeatures: [
      "指定URL爬取网页",
      "提取网页标题、段落等信息",
      "保存提取的信息到文件",
      "简单的反爬措施"
    ],
    extensionChallenges: [
      "支持多页面爬取",
      "支持图片下载",
      "添加数据存储到数据库"
    ],
    starterCode: `# 爬虫获取网页信息
# 在这里开始编写你的代码

import requests
from bs4 import BeautifulSoup

print("网页爬虫工具")
print("请输入要爬取的URL：")

# 你的代码
`
  },
  {
    id: "training-7",
    title: "数据可视化图表",
    description: "使用matplotlib库创建各种数据可视化图表。",
    difficulty: "中级",
    stars: 3,
    learningObjectives: [
      "matplotlib库的使用",
      "数据处理和准备",
      "图表类型选择",
      "图表美化"
    ],
    coreFeatures: [
      "创建折线图、柱状图、饼图等基本图表",
      "添加标题、标签和图例",
      "自定义图表样式",
      "保存图表为图片"
    ],
    extensionChallenges: [
      "添加交互式图表（使用plotly）",
      "支持从CSV文件读取数据",
      "创建复合图表"
    ],
    starterCode: `# 数据可视化图表
# 在这里开始编写你的代码

import matplotlib.pyplot as plt
import numpy as np

print("数据可视化工具")

# 你的代码
`
  },
  {
    id: "training-8",
    title: "学生成绩管理系统",
    description: "开发一个学生成绩管理系统，支持成绩的录入、查询和统计。",
    difficulty: "中级",
    stars: 3,
    learningObjectives: [
      "面向对象编程",
      "数据结构设计",
      "文件存储",
      "数据统计和分析"
    ],
    coreFeatures: [
      "学生信息管理（姓名、学号、班级）",
      "课程成绩录入和修改",
      "成绩查询（按学生、按课程）",
      "成绩统计（平均分、排名等）",
      "数据保存和加载"
    ],
    extensionChallenges: [
      "添加图形界面（使用tkinter）",
      "支持Excel导入导出",
      "添加数据可视化统计"
    ],
    starterCode: `# 学生成绩管理系统
# 在这里开始编写你的代码

class Student:
    def __init__(self, name, student_id, class_name):
        self.name = name
        self.student_id = student_id
        self.class_name = class_name
        self.grades = {}  # {course_name: score}

class GradeManager:
    def __init__(self):
        self.students = {}

print("欢迎使用学生成绩管理系统！")
`
  },
  {
    id: "training-9",
    title: "简易待办清单（本地存储）",
    description: "开发一个简易的待办清单应用，支持本地存储功能。",
    difficulty: "中级",
    stars: 3,
    learningObjectives: [
      "文件读写操作",
      "JSON数据处理",
      "用户交互设计",
      "数据持久化"
    ],
    coreFeatures: [
      "添加待办事项",
      "标记待办事项为已完成",
      "删除待办事项",
      "查看所有待办事项",
      "自动保存到本地文件"
    ],
    extensionChallenges: [
      "添加待办事项优先级",
      "添加截止日期",
      "添加搜索和过滤功能"
    ],
    starterCode: `# 简易待办清单
# 在这里开始编写你的代码

import json
import os

print("欢迎使用待办清单！")

# 你的代码
`
  },
  {
    id: "training-10",
    title: "综合实战项目（自选主题完整小工具）",
    description: "根据所学知识，开发一个完整的小工具，可以选择自己感兴趣的主题。",
    difficulty: "进阶",
    stars: 4,
    learningObjectives: [
      "综合运用所学知识",
      "项目规划和设计",
      "代码组织和模块化",
      "用户体验优化"
    ],
    coreFeatures: [
      "功能完整的小工具",
      "良好的用户界面",
      "错误处理和异常捕获",
      "详细的注释和文档"
    ],
    extensionChallenges: [
      "添加更多功能扩展",
      "优化性能",
      "部署到网络或打包为可执行文件"
    ],
    starterCode: `# 综合实战项目
# 在这里开始编写你的代码

print("综合实战项目")
print("请选择一个你感兴趣的主题，开发一个完整的小工具。")
print("例如：天气查询工具、密码生成器、文件加密工具等")

# 你的代码
`
  }
];

export function getTrainingProjectById(id: string): TrainingProject | undefined {
  return trainingProjects.find(project => project.id === id);
}

export function getTrainingProjects(): TrainingProject[] {
  return trainingProjects;
}
