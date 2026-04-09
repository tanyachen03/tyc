export interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false';
  question: string;
  options?: string[];
  correctAnswer: number | boolean;
  explanation: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface MultipleChoiceQuestion extends Question {
  type: 'multiple_choice';
  options: string[];
  correctAnswer: number;
}

export interface TrueFalseQuestion extends Question {
  type: 'true_false';
  correctAnswer: boolean;
}
