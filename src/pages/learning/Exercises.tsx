import React, { useState, useEffect } from 'react';
import { useProgress } from '../../hooks/useProgress';

// 模拟练习数据
const exercises = [
  {
    id: 'ex1',
    title: 'Python基础语法练习',
    description: '练习Python的基本语法，包括变量、数据类型、运算符等',
    difficulty: 'beginner',
    questions: [
      {
        id: 'q1',
        question: '以下哪个是Python的正确变量命名？',
        options: ['123var', 'var123', 'var-123', 'var 123'],
        correctAnswer: 'var123',
        explanation: 'Python变量名不能以数字开头，不能包含连字符或空格'
      },
      {
        id: 'q2',
        question: 'Python中用于注释的符号是？',
        options: ['//', '/* */', '#', '--'],
        correctAnswer: '#',
        explanation: 'Python使用#符号进行单行注释'
      },
      {
        id: 'q3',
        question: '以下哪个是Python的列表？',
        options: ['{1, 2, 3}', '[1, 2, 3]', '(1, 2, 3)', '1, 2, 3'],
        correctAnswer: '[1, 2, 3]',
        explanation: 'Python使用方括号[]创建列表'
      }
    ]
  },
  {
    id: 'ex2',
    title: 'Python函数练习',
    description: '练习Python函数的定义、调用和参数传递',
    difficulty: 'intermediate',
    questions: [
      {
        id: 'q1',
        question: '以下哪个是正确的Python函数定义？',
        options: ['function my_func():', 'def my_func():', 'my_func():', 'func my_func()'],
        correctAnswer: 'def my_func():',
        explanation: 'Python使用def关键字定义函数'
      },
      {
        id: 'q2',
        question: 'Python函数可以返回多个值吗？',
        options: ['可以', '不可以', '只能返回一个值', '只能返回基本类型'],
        correctAnswer: '可以',
        explanation: 'Python函数可以返回多个值，以元组形式返回'
      }
    ]
  },
  {
    id: 'ex3',
    title: 'Python面向对象练习',
    description: '练习Python类的定义、继承和方法',
    difficulty: 'advanced',
    questions: [
      {
        id: 'q1',
        question: '以下哪个是正确的Python类定义？',
        options: ['class MyClass:', 'def MyClass():', 'class MyClass()', 'MyClass:'],
        correctAnswer: 'class MyClass:',
        explanation: 'Python使用class关键字定义类'
      },
      {
        id: 'q2',
        question: 'Python类的构造方法是？',
        options: ['__init__', 'constructor', 'init', 'initialize'],
        correctAnswer: '__init__',
        explanation: 'Python类的构造方法是__init__'
      }
    ]
  }
];

const Exercises: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // 获取和更新练习进度
  const { progress, completed, updateProgress } = useProgress(
    selectedExercise?.id || 'exercises',
    'exercise'
  );

  const handleExerciseSelect = (exercise: any) => {
    setSelectedExercise(exercise);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    if (!selectedExercise) return;

    // 计算得分
    let totalScore = 0;
    selectedExercise.questions.forEach((question: any) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        totalScore++;
      }
    });

    setScore(totalScore);
    setShowResults(true);

    // 更新进度
    const exerciseProgress = Math.round((totalScore / selectedExercise.questions.length) * 100);
    updateProgress(exerciseProgress, exerciseProgress === 100);
  };

  const handleBackToList = () => {
    setSelectedExercise(null);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
  };

  // 渲染练习列表
  if (!selectedExercise) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">互动练习</h1>
            <p className="text-gray-600">通过练习巩固Python知识点</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map(exercise => {
              const { progress: exProgress, completed: exCompleted } = useProgress(
                exercise.id,
                'exercise'
              );

              return (
                <div 
                  key={exercise.id} 
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleExerciseSelect(exercise)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{exercise.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      exercise.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {exercise.difficulty === 'beginner' ? '基础' :
                       exercise.difficulty === 'intermediate' ? '中级' : '高级'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{exercise.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{exercise.questions.length} 个问题</span>
                    {exCompleted ? (
                      <span className="text-sm text-green-600 font-medium">已完成</span>
                    ) : (
                      <span className="text-sm text-gray-600">{exProgress}% 完成</span>
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

  // 渲染练习详情
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToList}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300"
          >
            ← 返回练习列表
          </button>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            selectedExercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            selectedExercise.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {selectedExercise.difficulty === 'beginner' ? '基础' :
             selectedExercise.difficulty === 'intermediate' ? '中级' : '高级'}
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedExercise.title}</h2>
          <p className="text-gray-600 mb-6">{selectedExercise.description}</p>

          <div className="space-y-6">
            {selectedExercise.questions.map((question: any, index: number) => (
              <div key={question.id} className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-medium text-gray-900 mb-3">{index + 1}. {question.question}</h4>
                <div className="space-y-2">
                  {question.options.map((option: string, optIndex: number) => {
                    const isSelected = userAnswers[question.id] === option;
                    const isCorrect = option === question.correctAnswer;
                    const isWrong = showResults && isSelected && !isCorrect;

                    return (
                      <div key={optIndex}>
                        <label className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
                          showResults ? (
                            isCorrect ? 'bg-green-50 border border-green-200' :
                            isWrong ? 'bg-red-50 border border-red-200' :
                            'border border-gray-200'
                          ) : (
                            isSelected ? 'bg-blue-50 border border-blue-200' :
                            'border border-gray-200'
                          )
                        }`}>
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            checked={isSelected}
                            onChange={() => handleAnswerChange(question.id, option)}
                            disabled={showResults}
                            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="text-gray-900">{option}</span>
                          {showResults && isCorrect && (
                            <span className="ml-auto text-green-600 font-medium">✓ 正确</span>
                          )}
                          {showResults && isWrong && (
                            <span className="ml-auto text-red-600 font-medium">✗ 错误</span>
                          )}
                        </label>
                        {showResults && isCorrect && (
                          <div className="mt-2 p-3 bg-green-50 rounded-md text-sm text-green-800">
                            {question.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {showResults ? (
            <div className="mt-8 p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">练习结果</h3>
              <p className="text-gray-600 mb-2">
                得分: {score}/{selectedExercise.questions.length} ({Math.round((score / selectedExercise.questions.length) * 100)}%)
              </p>
              {score === selectedExercise.questions.length ? (
                <p className="text-green-600 font-medium">恭喜！你完成了所有问题，继续保持！</p>
              ) : (
                <p className="text-gray-600">继续练习，提高你的Python技能！</p>
              )}
            </div>
          ) : (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                提交答案
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercises;