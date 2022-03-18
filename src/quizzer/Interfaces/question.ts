export type QuestionType = "multiple_choice_question" | "short_answer_question";

export interface Question {
    // ID of question
    id: number;
    // Name of the question
    name: string;
    // Prompt of the question
    body: string;
    // Short answer or multiple choice question
    type: QuestionType;
    // Correct answer to the question
    answer: string;
    // Possible choices for each answer
    options: string[];
    // Number of points the question is worth
    points: number;
    // Whether the question has been correctly answered
    correct: boolean;
    // Whether the question has been published
    published: boolean;
}
