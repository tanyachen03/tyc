export interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'code';
  question: string;
  options?: string[];
  correctAnswer: number | boolean | string;
  explanation: string;
  codeTemplate?: string;
  codeHint?: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  courseId: string;
  chapterId?: string;
  timeLimit?: number;
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

export interface CodeQuestion extends Question {
  type: 'code';
  correctAnswer: string;
  codeTemplate?: string;
  codeHint?: string;
}
