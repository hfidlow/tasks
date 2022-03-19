import React from "react";
import { render, screen } from "@testing-library/react";
import { Quizzer } from "./Quizzer";

describe("Quizzer Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
    });
    test("Visible Quizzes (title, desc, # of questions)", () => {
        const Quizzes = screen.getAllByRole("Quiz");
        const firstQuiz = Quizzes[0];
        expect(firstQuiz).toBeInTheDocument();
        //const firstDesc = firstQuiz
        expect(Quizzes[1]).toBeInTheDocument();
        expect(
            screen.getByText(
                "Are your math skills better than a 5th grader? Play this to find out."
            )
        ).toBeInTheDocument();
    });
    //
    // Questions in Quizzes (can select quiz and see questions with name, body, and points)
    // SA and MC questions (two types of questions)
    // Correctness of Answer (can choose an answer and see if they are right)
    // Sum points (user can see total points for a quiz)
    // Clear Answer (users can clear their existing answers for a quiz)
    // Publish Questions (users can publish or unpublish a question)
    // Filter Questions (users can filter questiosn such that only published questions are shown)
    // Edit Questions (users can edit the questions and fields of a quiz)
    // Add Questions (users can add questions)
    // Delete Questions (users can delete questions)
    // Reorder Questions (users can reorder questions)
    // Add Quizzes (users can add quizzes)
    // Delete Quizzes (users can delete quizzes)
});
