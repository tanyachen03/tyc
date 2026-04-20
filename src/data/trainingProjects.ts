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
    title: "个人记账本",
    description: "开发一个命令行版本的简易记账本，帮助用户记录日常收支。",
    difficulty: "初级",
    stars: 2,
    learningObjectives: [
      "文件读写操作（txt或csv格式）",
      "日期时间处理（datetime模块）",
      "列表和字典的数据组织"
    ],
    coreFeatures: [
      "添加收支记录（金额、类别、备注、日期）",
      "查看当月/全部流水",
      "统计收支总额和结余",
      "按类别分类统计"
    ],
    extensionChallenges: [
      "添加数据可视化（matplotlib绘制饼图）",
      "支持导出Excel报表"
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
    id: "training-2",
    title: "单词背诵助手",
    description: "基于艾宾浩斯遗忘曲线的单词背诵工具，帮助用户有计划地复习单词。",
    difficulty: "初级",
    stars: 2,
    learningObjectives: [
      "随机数生成与随机抽取",
      "文件存储单词库",
      "时间计算与判断"
    ],
    coreFeatures: [
      "从单词库随机抽词测试",
      "根据用户自评结果安排复习时间",
      "记录每个单词的掌握程度",
      "每日推送待复习单词列表"
    ],
    extensionChallenges: [
      "使用SQLite数据库替代文件存储",
      "添加多用户支持"
    ],
    starterCode: `# 单词背诵助手项目
# 在这里开始编写你的代码

import random
import json
from datetime import datetime, timedelta

# 艾宾浩斯遗忘曲线复习间隔（天）
REVIEW_INTERVALS = [1, 2, 4, 7, 15, 30]

print("欢迎使用单词背诵助手！")
`
  },
  {
    id: "training-3",
    title: "Markdown 转 HTML 转换器",
    description: "实现一个简易的 Markdown 解析器，将 .md 文件转换为 .html 网页。",
    difficulty: "中级",
    stars: 3,
    learningObjectives: [
      "正则表达式深入应用",
      "字符串处理与替换",
      "文件读写与模板生成"
    ],
    coreFeatures: [
      "解析标题（# ## ###）",
      "解析粗体、斜体、代码块",
      "解析无序列表和有序列表",
      "解析链接和图片",
      "生成带基础样式的HTML"
    ],
    extensionChallenges: [
      "支持表格语法",
      "添加代码高亮"
    ],
    starterCode: `# Markdown 转 HTML 转换器
# 在这里开始编写你的代码

import re

HTML_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Markdown Document</title>
    <style>
        body {{ font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }}
    </style>
</head>
<body>
{{content}}
</body>
</html>
'''

def parse_markdown(text):
    """解析 Markdown 文本为 HTML"""
    # 你的解析逻辑
    return text

print("欢迎使用 Markdown 转 HTML 转换器！")
`
  },
  {
    id: "training-4",
    title: "命令行天气查询工具",
    description: "调用公开天气API，实现终端下的天气查询功能。",
    difficulty: "中级",
    stars: 3,
    learningObjectives: [
      "requests库发送HTTP请求",
      "JSON数据解析",
      "API调用与异常处理",
      "命令行参数解析（argparse）"
    ],
    coreFeatures: [
      "根据城市名查询实时天气",
      "显示温度、湿度、风力、天气状况",
      "查询未来3天天气预报",
      "支持保存常用城市"
    ],
    extensionChallenges: [
      "添加彩色终端输出（colorama）",
      "缓存查询结果减少API调用"
    ],
    starterCode: `# 命令行天气查询工具
# 在这里开始编写你的代码

import requests
import json
import argparse

# 你需要去申请一个免费的天气API
# 推荐：OpenWeatherMap、和风天气等
API_KEY = "YOUR_API_KEY_HERE"
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

print("欢迎使用天气查询工具！")
`
  },
  {
    id: "training-5",
    title: "简易版学生管理系统",
    description: "面向培训机构的学生信息管理系统，支持增删改查和成绩管理。",
    difficulty: "中级",
    stars: 3,
    learningObjectives: [
      "面向对象编程（类与对象设计）",
      "CRUD操作实践",
      "数据持久化"
    ],
    coreFeatures: [
      "学生信息管理（姓名、学号、班级、电话）",
      "课程成绩录入与修改",
      "按条件查询和排序",
      "导出成绩单"
    ],
    extensionChallenges: [
      "使用SQLite数据库",
      "添加图形界面（tkinter）"
    ],
    starterCode: `# 简易版学生管理系统
# 在这里开始编写你的代码

class Student:
    def __init__(self, name, student_id, class_name, phone):
        self.name = name
        self.student_id = student_id
        self.class_name = class_name
        self.phone = phone
        self.grades = {}  # {course_name: score}

class StudentManager:
    def __init__(self):
        self.students = {}  # {student_id: Student}
    
    def add_student(self, student):
        self.students[student.student_id] = student

print("欢迎使用学生管理系统！")
`
  },
  {
    id: "training-6",
    title: "网页内容监控器",
    description: "定时监控指定网页内容变化，发现更新时发送通知。",
    difficulty: "中级",
    stars: 3,
    learningObjectives: [
      "requests + BeautifulSoup 网页抓取",
      "定时任务（schedule库）",
      "哈希值计算判断内容变化",
      "邮件/桌面通知发送"
    ],
    coreFeatures: [
      "用户添加监控URL和关键词",
      "定时抓取网页内容",
      "对比内容变化并记录",
      "变化时发送邮件提醒"
    ],
    extensionChallenges: [
      "支持登录态抓取",
      "支持多线程并发监控"
    ],
    starterCode: `# 网页内容监控器
# 在这里开始编写你的代码

import requests
from bs4 import BeautifulSoup
import hashlib
import time

def get_content_hash(url):
    """获取网页内容的哈希值"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return hashlib.md5(response.content).hexdigest()
    except Exception as e:
        return None

print("欢迎使用网页内容监控器！")
`
  },
  {
    id: "training-7",
    title: "个人博客系统（Flask）",
    description: "使用 Flask 框架搭建一个轻量级个人博客网站。",
    difficulty: "进阶",
    stars: 4,
    learningObjectives: [
      "Flask Web框架基础",
      "Jinja2模板引擎",
      "路由设计与前后端交互",
      "Markdown内容渲染"
    ],
    coreFeatures: [
      "文章发布与编辑",
      "文章列表与详情页",
      "按分类/标签筛选",
      "简单评论功能",
      "管理员登录后台"
    ],
    extensionChallenges: [
      "部署到云服务器",
      "添加全文搜索"
    ],
    starterCode: `# 个人博客系统（Flask）
# 在这里开始编写你的代码

from flask import Flask, render_template, request, redirect, url_for, flash
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

# 临时存储文章
posts = []

@app.route('/')
def index():
    return render_template('index.html', posts=posts)

if __name__ == '__main__':
    app.run(debug=True)

print("欢迎使用个人博客系统！")
`
  },
  {
    id: "training-8",
    title: "批量图片处理工具",
    description: "用Pillow库实现批量图片处理，适合摄影师或电商从业者。",
    difficulty: "中级",
    stars: 3,
    learningObjectives: [
      "Pillow图像处理库",
      "文件批量操作",
      "多线程加速处理"
    ],
    coreFeatures: [
      "批量调整尺寸/压缩",
      "添加水印（文字或图片）",
      "格式转换（jpg/png/webp）",
      "保持原始文件夹结构输出"
    ],
    extensionChallenges: [
      "添加GUI界面",
      "支持AI抠图（rembg库）"
    ],
    starterCode: `# 批量图片处理工具
# 在这里开始编写你的代码

from PIL import Image, ImageDraw, ImageFont
import os
from pathlib import Path

def resize_image(input_path, output_path, width, height):
    """调整图片尺寸"""
    img = Image.open(input_path)
    img = img.resize((width, height), Image.Resampling.LANCZOS)
    img.save(output_path)

print("欢迎使用批量图片处理工具！")
`
  },
  {
    id: "training-9",
    title: "命令行贪吃蛇游戏",
    description: "在终端中运行的贪吃蛇游戏，使用键盘控制方向。",
    difficulty: "初级",
    stars: 2,
    learningObjectives: [
      "curses库终端图形绘制",
      "键盘监听与响应",
      "游戏循环与状态管理",
      "碰撞检测逻辑"
    ],
    coreFeatures: [
      "蛇的移动与控制（WASD或方向键）",
      "食物随机生成",
      "得分与等级（速度递增）",
      "撞墙/撞身体游戏结束"
    ],
    extensionChallenges: [
      "添加障碍物模式",
      "保存最高分记录"
    ],
    starterCode: `# 命令行贪吃蛇游戏
# 在这里开始编写你的代码

import random
import time
import sys

# 注意：Windows下可能需要安装 windows-curses 库
# pip install windows-curses

print("欢迎使用命令行贪吃蛇游戏！")
print("提示：在真正的终端中运行，需要使用 curses 库")
`
  },
  {
    id: "training-10",
    title: "RESTful API 服务开发",
    description: "使用 FastAPI 开发一个符合 RESTful 规范的图书管理 API。",
    difficulty: "进阶",
    stars: 4,
    learningObjectives: [
      "FastAPI 框架使用",
      "RESTful API 设计原则",
      "Pydantic 数据验证",
      "Swagger 自动文档生成",
      "JWT 身份认证"
    ],
    coreFeatures: [
      "图书的增删改查接口",
      "用户注册与登录（JWT认证）",
      "图书借阅/归还功能",
      "分页查询与模糊搜索",
      "接口限流保护"
    ],
    extensionChallenges: [
      "使用异步数据库操作（asyncpg）",
      "Docker 容器化部署"
    ],
    starterCode: `# RESTful API 服务开发（FastAPI）
# 在这里开始编写你的代码

from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(title="图书管理 API", version="1.0.0")

# 数据模型
class Book(BaseModel):
    id: Optional[int] = None
    title: str
    author: str
    isbn: str
    available: bool = True

# 临时存储
books_db = []

@app.get("/books", response_model=List[Book])
def get_books():
    return books_db

print("欢迎使用图书管理 API！")
print("运行：uvicorn filename:app --reload")
`
  }
];

export function getTrainingProjectById(id: string): TrainingProject | undefined {
  return trainingProjects.find(project => project.id === id);
}

export function getTrainingProjects(): TrainingProject[] {
  return trainingProjects;
}
