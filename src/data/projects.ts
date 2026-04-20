export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tasks: string[];
  datasetCode: string;
  hints: string[];
  standardSolution?: string;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: '数据基础认知',
    description: '了解数据的基本概念和结构，学习如何查看和理解数据',
    difficulty: 'beginner',
    tasks: [
      '生成并查看数据集的基本信息',
      '分析数据的基本统计特征',
      '识别数据中的异常值'
    ],
    datasetCode: `
import pandas as pd
import numpy as np

# 生成模拟销售数据
data = {
    'date': pd.date_range('2024-01-01', periods=100),
    'sales': np.random.normal(1000, 200, 100),
    'customer_id': np.random.randint(1, 100, 100),
    'product_id': np.random.randint(1, 20, 100)
}

df = pd.DataFrame(data)
# 添加一些异常值
df.loc[10, 'sales'] = 5000
df.loc[50, 'sales'] = -100

print("数据基本信息:")
print(df.info())
print("\n数据前5行:")
print(df.head())
print("\n数据统计信息:")
print(df.describe())

# 返回数据集
df
`,
    hints: [
      '使用df.info()查看数据基本信息',
      '使用df.describe()查看数据统计特征',
      '使用箱线图或IQR方法识别异常值'
    ]
  },
  {
    id: 'project-2',
    title: '数据清洗',
    description: '学习如何处理缺失值、重复值和异常值，准备干净的数据集',
    difficulty: 'beginner',
    tasks: [
      '处理缺失值',
      '处理重复值',
      '处理异常值'
    ],
    datasetCode: `
import pandas as pd
import numpy as np

# 生成带缺失值和异常值的数据
data = {
    'date': pd.date_range('2024-01-01', periods=100),
    'sales': np.random.normal(1000, 200, 100),
    'customer_id': np.random.randint(1, 100, 100),
    'product_id': np.random.randint(1, 20, 100)
}

df = pd.DataFrame(data)

# 添加缺失值
df.loc[10:20, 'sales'] = np.nan
df.loc[30:40, 'customer_id'] = np.nan

# 添加重复值
df = pd.concat([df, df.iloc[5:10]], ignore_index=True)

# 添加异常值
df.loc[50, 'sales'] = 5000
df.loc[60, 'sales'] = -100

print("数据基本信息:")
print(df.info())
print("\n缺失值情况:")
print(df.isnull().sum())
print("\n重复值数量:")
print(df.duplicated().sum())

# 返回数据集
df
`,
    hints: [
      '使用df.dropna()或df.fillna()处理缺失值',
      '使用df.drop_duplicates()处理重复值',
      '使用条件过滤处理异常值'
    ]
  },
  {
    id: 'project-3',
    title: '数据可视化基础',
    description: '学习使用Matplotlib和Seaborn创建基本的数据可视化图表',
    difficulty: 'beginner',
    tasks: [
      '创建销售趋势折线图',
      '创建产品销售分布直方图',
      '创建产品销售对比条形图'
    ],
    datasetCode: `
import pandas as pd
import numpy as np

# 生成销售数据
data = {
    'date': pd.date_range('2024-01-01', periods=100),
    'sales': np.random.normal(1000, 200, 100),
    'product_id': np.random.randint(1, 5, 100)
}

df = pd.DataFrame(data)

print("数据基本信息:")
print(df.info())
print("\n数据前5行:")
print(df.head())

# 返回数据集
df
`,
    hints: [
      '使用plt.plot()创建折线图',
      '使用plt.hist()创建直方图',
      '使用sns.barplot()创建条形图'
    ]
  },
  {
    id: 'project-4',
    title: '数据聚合与分组',
    description: '学习使用Pandas进行数据聚合和分组操作',
    difficulty: 'intermediate',
    tasks: [
      '按产品ID分组计算销售总和',
      '按月份分组计算平均销售额',
      '创建销售透视表'
    ],
    datasetCode: `
import pandas as pd
import numpy as np

# 生成销售数据
data = {
    'date': pd.date_range('2024-01-01', periods=365),
    'sales': np.random.normal(1000, 200, 365),
    'product_id': np.random.randint(1, 10, 365),
    'region': np.random.choice(['North', 'South', 'East', 'West'], 365)
}

df = pd.DataFrame(data)

print("数据基本信息:")
print(df.info())
print("\n数据前5行:")
print(df.head())

# 返回数据集
df
`,
    hints: [
      '使用df.groupby()进行分组',
      '使用agg()进行聚合计算',
      '使用pivot_table()创建透视表'
    ]
  },
  {
    id: 'project-5',
    title: '时间序列分析',
    description: '学习分析时间序列数据，识别趋势和季节性',
    difficulty: 'intermediate',
    tasks: [
      '分析销售时间序列趋势',
      '识别销售的季节性模式',
      '预测未来销售'
    ],
    datasetCode: `
import pandas as pd
import numpy as np

# 生成带趋势和季节性的时间序列数据
dates = pd.date_range('2023-01-01', periods=365)

# 添加趋势
trend = np.linspace(1000, 2000, 365)

# 添加季节性
seasonality = 100 * np.sin(np.arange(365) * 2 * np.pi / 30)  # 30天周期

# 添加随机噪声
noise = np.random.normal(0, 50, 365)

sales = trend + seasonality + noise

df = pd.DataFrame({
    'date': dates,
    'sales': sales
})

print("数据基本信息:")
print(df.info())
print("\n数据前5行:")
print(df.head())

# 返回数据集
df
`,
    hints: [
      '使用df.resample()进行时间重采样',
      '使用移动平均线识别趋势',
      '使用简单的线性回归进行预测'
    ]
  },
  {
    id: 'project-6',
    title: '客户分群分析',
    description: '学习使用聚类算法对客户进行分群分析',
    difficulty: 'intermediate',
    tasks: [
      '基于消费行为对客户进行分群',
      '分析不同客户群体的特征',
      '为不同客户群体制定营销策略'
    ],
    datasetCode: `
import pandas as pd
import numpy as np

# 生成客户数据
np.random.seed(42)

# 生成4个客户群体
n_customers = 200

# 群体1: 高消费频率，高消费金额
group1 = {
    'customer_id': range(1, 51),
    'purchase_frequency': np.random.normal(20, 5, 50),
    'average_order_value': np.random.normal(500, 100, 50),
    'total_spent': np.random.normal(8000, 2000, 50)
}

# 群体2: 低消费频率，高消费金额
group2 = {
    'customer_id': range(51, 101),
    'purchase_frequency': np.random.normal(5, 2, 50),
    'average_order_value': np.random.normal(800, 150, 50),
    'total_spent': np.random.normal(3000, 1000, 50)
}

# 群体3: 高消费频率，低消费金额
group3 = {
    'customer_id': range(101, 151),
    'purchase_frequency': np.random.normal(15, 4, 50),
    'average_order_value': np.random.normal(200, 50, 50),
    'total_spent': np.random.normal(2500, 800, 50)
}

# 群体4: 低消费频率，低消费金额
group4 = {
    'customer_id': range(151, 201),
    'purchase_frequency': np.random.normal(3, 1, 50),
    'average_order_value': np.random.normal(100, 30, 50),
    'total_spent': np.random.normal(500, 200, 50)
}

# 合并数据
df1 = pd.DataFrame(group1)
df2 = pd.DataFrame(group2)
df3 = pd.DataFrame(group3)
df4 = pd.DataFrame(group4)

df = pd.concat([df1, df2, df3, df4], ignore_index=True)

print("数据基本信息:")
print(df.info())
print("\n数据前5行:")
print(df.head())

# 返回数据集
df
`,
    hints: [
      '使用StandardScaler对数据进行标准化',
      '使用KMeans进行聚类分析',
      '使用散点图可视化不同客户群体'
    ]
  },
  {
    id: 'project-7',
    title: '销售预测模型',
    description: '学习使用机器学习算法预测销售数据',
    difficulty: 'intermediate',
    tasks: [
      '构建销售预测模型',
      '评估模型性能',
      '优化模型参数'
    ],
    datasetCode: `
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# 生成销售数据
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=365)

# 特征
X = np.array(range(1, 366)).reshape(-1, 1)  # 时间索引

# 目标变量（带噪声的线性趋势）
y = 1000 + 5 * X.flatten() + np.random.normal(0, 200, 365)

df = pd.DataFrame({
    'date': dates,
    'day': X.flatten(),
    'sales': y
})

print("数据基本信息:")
print(df.info())
print("\n数据前5行:")
print(df.head())

# 返回数据集
df
`,
    hints: [
      '使用train_test_split划分训练集和测试集',
      '使用LinearRegression构建模型',
      '使用mean_squared_error评估模型性能'
    ]
  },
  {
    id: 'project-8',
    title: '产品推荐系统',
    description: '学习构建简单的产品推荐系统',
    difficulty: 'advanced',
    tasks: [
      '基于用户购买历史构建推荐系统',
      '计算产品相似度',
      '生成个性化推荐'
    ],
    datasetCode: `
import pandas as pd
import numpy as np

# 生成用户-产品购买数据
np.random.seed(42)

n_users = 50
n_products = 20

# 生成用户购买历史
data = []
for user_id in range(1, n_users + 1):
    # 每个用户购买3-8个产品
    n_purchases = np.random.randint(3, 9)
    purchased_products = np.random.choice(range(1, n_products + 1), n_purchases, replace=False)
    for product_id in purchased_products:
        # 购买次数
        purchase_count = np.random.randint(1, 5)
        data.append([user_id, product_id, purchase_count])

df = pd.DataFrame(data, columns=['user_id', 'product_id', 'purchase_count'])

print("数据基本信息:")
print(df.info())
print("\n数据前10行:")
print(df.head(10))

# 返回数据集
df
`,
    hints: [
      '使用pivot_table创建用户-产品矩阵',
      '使用cosine_similarity计算产品相似度',
      '基于相似度生成推荐'
    ]
  },
  {
    id: 'project-9',
    title: '异常检测',
    description: '学习使用机器学习算法检测异常销售数据',
    difficulty: 'advanced',
    tasks: [
      '使用统计方法检测异常',
      '使用Isolation Forest检测异常',
      '评估异常检测性能'
    ],
    datasetCode: `
import pandas as pd
import numpy as np

# 生成正常销售数据
np.random.seed(42)
dates = pd.date_range('2024-01-01', periods=300)
normal_sales = np.random.normal(1000, 100, 300)

# 添加异常值
anomaly_indices = [50, 100, 150, 200, 250]
anomaly_values = [3000, 5000, -500, 4000, 2500]

for i, idx in enumerate(anomaly_indices):
    normal_sales[idx] = anomaly_values[i]

df = pd.DataFrame({
    'date': dates,
    'sales': normal_sales
})

print("数据基本信息:")
print(df.info())
print("\n数据前5行:")
print(df.head())
print("\n异常值位置:", anomaly_indices)
print("异常值:", anomaly_values)

# 返回数据集
df
`,
    hints: [
      '使用IQR方法检测异常',
      '使用IsolationForest进行异常检测',
      '使用混淆矩阵评估检测性能'
    ]
  },
  {
    id: 'project-10',
    title: '综合数据分析项目',
    description: '综合运用所学知识，完成一个完整的数据分析项目',
    difficulty: 'advanced',
    tasks: [
      '数据获取和清洗',
      '探索性数据分析',
      '构建预测模型',
      '生成分析报告'
    ],
    datasetCode: `
import pandas as pd
import numpy as np

# 生成综合数据集
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=365)

# 生成特征
X1 = np.random.normal(50, 10, 365)  # 广告支出
X2 = np.random.normal(20, 5, 365)   # 促销活动强度
X3 = np.random.normal(30, 8, 365)   # 竞争对手价格

# 生成目标变量（销售）
y = 1000 + 5 * X1 + 10 * X2 - 3 * X3 + np.random.normal(0, 50, 365)

# 添加一些缺失值
y[10:20] = np.nan
X1[50:60] = np.nan

# 添加一些异常值
y[100] = 5000
y[200] = -500

df = pd.DataFrame({
    'date': dates,
    'advertising': X1,
    'promotion': X2,
    'competitor_price': X3,
    'sales': y
})

print("数据基本信息:")
print(df.info())
print("\n数据前5行:")
print(df.head())
print("\n缺失值情况:")
print(df.isnull().sum())

# 返回数据集
df
`,
    hints: [
      '先处理缺失值和异常值',
      '使用相关性分析识别重要特征',
      '使用多种模型进行预测',
      '使用可视化工具生成报告'
    ]
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjects(): Project[] {
  return projects;
}
