export interface Answer {
    // The ID of the question within the quiz
    questionId: number;
    // The text currently written by the student
    text: string;
    // Whether the 'submit' button has been pressed
    submitted: boolean;
    // Whether the students answer is correct
    correct: boolean;
}
