import { MultipleChoiceQuestion as MultipleChoiceQuestionType } from '../types/exercise';

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onSelectAnswer: (index: number) => void;
}

export function MultipleChoiceQuestion({
  question,
  selectedAnswer,
  isAnswered,
  onSelectAnswer,
}: MultipleChoiceQuestionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{question.question}</h3>
      <div className="space-y-3">
        {question.options.map((option: string, index: number) => {
          let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-200';
          
          if (isAnswered) {
            if (index === question.correctAnswer) {
              buttonClass += ' border-green-500 bg-green-50';
            } else if (index === selectedAnswer) {
              buttonClass += ' border-red-500 bg-red-50';
            } else {
              buttonClass += ' border-gray-200 bg-gray-50 opacity-60';
            }
          } else {
            if (index === selectedAnswer) {
              buttonClass += ' border-blue-500 bg-blue-50';
            } else {
              buttonClass += ' border-gray-200 hover:border-blue-300 hover:bg-blue-50';
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => !isAnswered && onSelectAnswer(index)}
              disabled={isAnswered}
              className={buttonClass}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-medium ${
                  isAnswered
                    ? index === question.correctAnswer
                      ? 'bg-green-500 text-white'
                      : index === selectedAnswer
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                    : index === selectedAnswer
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {isAnswered ? (
                    index === question.correctAnswer ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : index === selectedAnswer ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      String.fromCharCode(65 + index)
                    )
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </div>
                <span className="text-gray-700">{option}</span>
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
