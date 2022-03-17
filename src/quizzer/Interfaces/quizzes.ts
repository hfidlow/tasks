import { Question } from "./question";

export interface Quiz {
    // ID of quiz
    id: number;
    // Name of the quiz
    title: string;
    // List of questions contained in the quiz
    list: Question[];
    // Number of Published questions in the quiz
    length: number;
    // Description about the quiz
    description: string;
}
