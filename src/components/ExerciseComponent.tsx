import { useState } from 'react';
import { Exercise, Question, CodeQuestion as CodeQuestionType } from '../types/exercise';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { TrueFalseQuestion } from './TrueFalseQuestion';
import { CodeQuestion } from './CodeQuestion';

interface ExerciseComponentProps {
  exercise: Exercise;
  courseId: string;
  chapterId?: string;
  isQuiz: boolean;
  onComplete: (score: number, maxScore: number) => void;
  onClose: () => void;
}

interface QuestionState {
  selectedAnswer: number | boolean | string | null;
  isAnswered: boolean;
  isCorrect: boolean;
}

export function ExerciseComponent({
  exercise,
  courseId: _courseId,
  chapterId: _chapterId,
  isQuiz,
  onComplete,
  onClose,
}: ExerciseComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState<QuestionState[]>(
    exercise.questions.map(() => ({
      selectedAnswer: null,
      isAnswered: false,
      isCorrect: false,
    }))
  );
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = exercise.questions[currentQuestionIndex];
  const currentState = questionStates[currentQuestionIndex];

  const handleSelectAnswer = (answer: number | boolean | string) => {
    const newStates = [...questionStates];
    newStates[currentQuestionIndex] = {
      ...newStates[currentQuestionIndex],
      selectedAnswer: answer,
    };
    setQuestionStates(newStates);
  };

  const handleSubmitAnswer = () => {
    if (currentState.selectedAnswer === null) return;

    const isCorrect = checkAnswer(currentQuestion, currentState.selectedAnswer);
    const newStates = [...questionStates];
    newStates[currentQuestionIndex] = {
      ...newStates[currentQuestionIndex],
      isAnswered: true,
      isCorrect,
    };
    setQuestionStates(newStates);
  };

  const checkAnswer = (question: Question, answer: number | boolean | string): boolean => {
    if (question.type === 'code') {
      // 对于代码问题，我们去除空格和换行符后比较
      const normalizeCode = (code: string) => code.trim().replace(/\s+/g, ' ');
      return normalizeCode(answer as string) === normalizeCode(question.correctAnswer as string);
    } else {
      return answer === question.correctAnswer;
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishExercise();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishExercise = () => {
    const correctCount = questionStates.filter(state => state.isCorrect).length;
    const maxScore = exercise.questions.length;
    const score = correctCount;
    setShowResults(true);
    onComplete(score, maxScore);
  };

  const renderQuestion = (question: Question, state: QuestionState, _index: number) => {
    if (question.type === 'multiple_choice') {
      return (
        <MultipleChoiceQuestion
          question={question as any}
          selectedAnswer={state.selectedAnswer as number | null}
          isAnswered={state.isAnswered}
          onSelectAnswer={(answer) => handleSelectAnswer(answer)}
        />
      );
    } else if (question.type === 'true_false') {
      return (
        <TrueFalseQuestion
          question={question as any}
          selectedAnswer={state.selectedAnswer as boolean | null}
          isAnswered={state.isAnswered}
          onSelectAnswer={(answer) => handleSelectAnswer(answer)}
        />
      );
    } else {
      return (
        <CodeQuestion
          question={question as CodeQuestionType}
          selectedAnswer={state.selectedAnswer as string | null}
          isAnswered={state.isAnswered}
          onSelectAnswer={(answer) => handleSelectAnswer(answer)}
        />
      );
    }
  };

  const progress = ((currentQuestionIndex + 1) / exercise.questions.length) * 100;
  const correctCount = questionStates.filter(state => state.isCorrect).length;

  if (showResults) {
    const percentage = Math.round((correctCount / exercise.questions.length) * 100);
    const resultMessage = percentage >= 80 ? '太棒了！' : percentage >= 60 ? '还不错！' : '继续努力！';
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8">
          <div className="text-center">
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
              percentage >= 60 ? 'bg-green-100' : 'bg-orange-100'
            }`}>
              <svg className={`w-12 h-12 ${
                percentage >= 60 ? 'text-green-600' : 'text-orange-600'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {percentage >= 60 ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                )}
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{resultMessage}</h2>
            <p className="text-gray-600 mb-6">{isQuiz ? '测验' : '练习'}已完成</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {correctCount} / {exercise.questions.length}
              </div>
              <div className="text-xl text-gray-600">{percentage}% 正确</div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                完成
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{exercise.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 mb-4">{exercise.description}</p>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>题目进度</span>
              <span>{currentQuestionIndex + 1} / {exercise.questions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {exercise.questions.map((_: Question, index: number) => {
              const state = questionStates[index];
              let dotClass = 'w-3 h-3 rounded-full transition-all duration-200';
              
              if (index === currentQuestionIndex) {
                dotClass += ' ring-2 ring-blue-500 ring-offset-2';
              }
              
              if (state.isAnswered) {
                dotClass += state.isCorrect ? ' bg-green-500' : ' bg-red-500';
              } else {
                dotClass += ' bg-gray-300';
              }
              
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={dotClass}
                />
              );
            })}
          </div>
        </div>
        
        <div className="p-6">
          {renderQuestion(currentQuestion, currentState, currentQuestionIndex)}
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentQuestionIndex === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              上一题
            </button>
            
            {!currentState.isAnswered ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={currentState.selectedAnswer === null}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  currentState.selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                提交答案
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                {currentQuestionIndex === exercise.questions.length - 1 ? '完成' : '下一题'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
