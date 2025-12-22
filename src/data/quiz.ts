export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
    explanation: string;
}

export interface ModuleQuiz {
    moduleId: string;
    title: string;
    description: string;
    questions: QuizQuestion[];
}
