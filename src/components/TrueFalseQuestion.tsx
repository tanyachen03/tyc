import { TrueFalseQuestion as TrueFalseQuestionType } from '../types/exercise';

interface TrueFalseQuestionProps {
  question: TrueFalseQuestionType;
  selectedAnswer: boolean | null;
  isAnswered: boolean;
  onSelectAnswer: (answer: boolean) => void;
}

export function TrueFalseQuestion({
  question,
  selectedAnswer,
  isAnswered,
  onSelectAnswer,
}: TrueFalseQuestionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{question.question}</h3>
      <div className="grid grid-cols-2 gap-4">
        {[true, false].map((answer) => {
          const key = answer ? 'true' : 'false';
          let buttonClass = 'p-6 rounded-lg border-2 transition-all duration-200 text-center font-semibold text-lg';
          
          if (isAnswered) {
            if (answer === question.correctAnswer) {
              buttonClass += ' border-green-500 bg-green-50 text-green-700';
            } else if (answer === selectedAnswer) {
              buttonClass += ' border-red-500 bg-red-50 text-red-700';
            } else {
              buttonClass += ' border-gray-200 bg-gray-50 text-gray-400 opacity-60';
            }
          } else {
            if (answer === selectedAnswer) {
              buttonClass += ' border-blue-500 bg-blue-50 text-blue-700';
            } else {
              buttonClass += ' border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700';
            }
          }
          
          return (
            <button
              key={key}
              onClick={() => !isAnswered && onSelectAnswer(answer)}
              disabled={isAnswered}
              className={buttonClass}
            >
              <div className="flex items-center justify-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isAnswered
                    ? answer === question.correctAnswer
                      ? 'bg-green-500 text-white'
                      : answer === selectedAnswer
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                    : answer === selectedAnswer
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {isAnswered ? (
                    answer === question.correctAnswer ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : answer === selectedAnswer ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      answer ? '✓' : '✗'
                    )
                  ) : (
                    answer ? '✓' : '✗'
                  )}
                </div>
                <span>{answer ? '正确' : '错误'}</span>
              </div>
            </button>
          );
        })}
      </div>
      
      {isAnswered && question.explanation && (
        <div className={`mt-4 p-4 rounded-lg ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-50 border border-green-200'
            : 'bg-orange-50 border border-orange-200'
        }`}>
          <h4 className={`font-semibold mb-2 ${
            selectedAnswer === question.correctAnswer ? 'text-green-800' : 'text-orange-800'
          }`}>
            {selectedAnswer === question.correctAnswer ? '回答正确！' : '回答错误'}
          </h4>
          <p className={`text-sm ${
            selectedAnswer === question.correctAnswer ? 'text-green-700' : 'text-orange-700'
          }`}>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
