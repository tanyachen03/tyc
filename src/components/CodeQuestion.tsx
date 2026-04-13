import { useState } from 'react';
import { CodeQuestion as CodeQuestionType } from '../types/exercise';

interface CodeQuestionProps {
  question: CodeQuestionType;
  selectedAnswer: string | null;
  isAnswered: boolean;
  onSelectAnswer: (answer: string) => void;
}

export function CodeQuestion({
  question,
  selectedAnswer,
  isAnswered,
  onSelectAnswer,
}: CodeQuestionProps) {
  const [code, setCode] = useState(selectedAnswer || question.codeTemplate || '');

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-gray-900 mb-4">
        {question.question}
      </div>
      
      {question.codeHint && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-blue-700 font-medium mb-2">提示：</div>
          <div className="text-blue-600">{question.codeHint}</div>
        </div>
      )}
      
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="ml-2 text-gray-400 text-sm">Python</div>
        </div>
        <textarea
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            onSelectAnswer(e.target.value);
          }}
          className="w-full p-4 bg-gray-900 text-green-400 font-mono text-sm min-h-[200px] resize-none focus:outline-none"
          placeholder="在此输入你的代码..."
        />
      </div>
      
      {isAnswered && (
        <div className={`p-4 rounded-lg ${selectedAnswer === question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className={`font-medium mb-2 ${selectedAnswer === question.correctAnswer ? 'text-green-700' : 'text-red-700'}`}>
            {selectedAnswer === question.correctAnswer ? '答案正确！' : '答案不正确'}
          </div>
          <div className="text-gray-700">{question.explanation}</div>
          {selectedAnswer !== question.correctAnswer && (
            <div className="mt-3">
              <div className="font-medium text-gray-700 mb-2">正确答案：</div>
              <div className="bg-gray-100 p-3 rounded font-mono text-sm">{question.correctAnswer}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
