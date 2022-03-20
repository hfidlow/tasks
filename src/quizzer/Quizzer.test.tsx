import React from "react";
import { render, screen } from "@testing-library/react";
import { Quizzer } from "./Quizzer";
import userEvent from "@testing-library/user-event";

describe("Quizzer Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
    });
    test("Visible Quizzes (title, desc, # of questions)", () => {
        expect(screen.getByText("Math (3 questions):")).toBeInTheDocument();
        expect(
            screen.getByText(
                "Are your math skills better than a 5th grader? Play this to find out."
            )
        ).toBeInTheDocument();
    });
    test("Questions in Quizzes (can select quiz and see questions with name, body, and points)", () => {
        const selectButtons = screen.getAllByRole("button", {
            name: /Select/i
        });
        const firstButton = selectButtons[0];
        firstButton.click(); // Opens the first quiz
        expect(
            screen.getByText("Simple Addition 1 (2 points):")
        ).toBeInTheDocument();
        expect(
            screen.getByText("Simple Addition 2 (2 points):")
        ).toBeInTheDocument();
        expect(screen.getByText("What is 7+19?")).toBeInTheDocument();
        const closeButton = screen.getByRole("button", { name: /Close/i });
        closeButton.click();
        expect(
            screen.getByText("Simple Addition 1 (2 points):")
        ).not.toBeVisible();
    });
    test("SA and MC questions (two types of questions)", () => {
        const selectButtons = screen.getAllByRole("button", {
            name: /Select/i
        });
        const firstButton = selectButtons[0];
        const secondButton = selectButtons[1];
        firstButton.click(); // Opens the first quiz
        secondButton.click();
        const textBoxes = screen.getAllByDisplayValue("");
        const firstBox = textBoxes[0];
        expect(firstBox).toBeInTheDocument();
        const mcBoxes = screen.getAllByRole("radio");
        const firstMC = mcBoxes[0];
        expect(firstMC).toBeInTheDocument();
    });
    test("Correctness of Answer (can choose an answer and see if they are right)", () => {
        const selectButtons = screen.getAllByRole("button", {
            name: /Select/i
        });
        const firstButton = selectButtons[0];
        const secondButton = selectButtons[1];
        firstButton.click(); // Opens the first quiz
        secondButton.click(); // Opens the second quiz
        const wrongAs = screen.getAllByText("Dang, not quite.");

        // Test SA correctness
        const textBoxes = screen.getAllByDisplayValue("");
        const firstBox = textBoxes[0];
        userEvent.type(firstBox, "12");
        const subButtons = screen.getAllByRole("button", { name: /Submit/i });
        const subButton = subButtons[0];
        subButton.click();
        const resetButtons = screen.getAllByRole("button", {
            name: /Reset/i
        });
        const resetButton = resetButtons[0];
        expect(wrongAs[0]).toBeVisible();
        expect(screen.queryByText("Correct!")).toBeNull();
        resetButton.click();
        expect(wrongAs[0]).not.toBeVisible();
        userEvent.clear(firstBox);
        userEvent.type(firstBox, "26");
        subButton.click();
        expect(screen.queryByText("Correct!")).not.toBeNull();
        userEvent.clear(firstBox);
        resetButton.click();

        // Test MC correctness
        const mcBoxes = screen.getAllByRole("radio");
        const firstMC = mcBoxes[0];
        const correctMC = mcBoxes[1];
        const subButtonMC = subButtons[4];
        firstMC.click();
        subButtonMC.click();
        expect(wrongAs[4]).toBeVisible();
        expect(screen.queryByText("Correct!")).toBeNull();
        resetButton.click();
        correctMC.click();
        subButtonMC.click();
        expect(screen.queryByText("Correct!")).not.toBeNull();
        resetButton.click();
    });
    // Sum points (user can see total points for a quiz)
    // Clear Answer (users can clear their existing answers for a quiz)
    // Publish Questions (users can publish or unpublish a question)
    // Filter Questions (users can filter questiosn such that only published questions are shown)
    // Edit Questions (users can edit the questions and fields of a quiz)
    // Add Questions (users can add questions)
    // Delete Questions (users can delete questions)
    // Reorder Questions (users can reorder questions)
    test("Add Quizzes (users can add quizzes)", () => {
        const selectButtons = screen.getAllByRole("button", {
            name: /Select/i
        });
        selectButtons[0].click(); // Opens the first quiz
        selectButtons[1].click(); // Opens the second quiz
        selectButtons[2].click();

        const editSlider = screen.getByRole("checkbox");
        const textBoxes = screen.getAllByDisplayValue("");
        const numBoxes = textBoxes.length;
        const mcBoxes = screen.getAllByRole("radio");
        const numMC = mcBoxes.length;
        editSlider.click();
        const addSA = screen.getByRole("button", {
            name: /Add Short Answer Quiz/i
        });
        const addMC = screen.getByRole("button", {
            name: /Add Multiple Choice Quiz/i
        });
        addSA.click();
        addMC.click();
        editSlider.click();
        const selectButtons2 = screen.getAllByRole("button", {
            name: /Select/i
        });
        selectButtons2[0].click();
        selectButtons2[1].click();
        const textBoxes2 = screen.getAllByDisplayValue("");
        const numBoxes2 = textBoxes2.length;
        const mcBoxes2 = screen.getAllByRole("radio");
        const numMC2 = mcBoxes2.length;
        expect(numBoxes2).toBeGreaterThan(numBoxes);
        expect(numMC2).toBeGreaterThan(numMC);
    });

    test("Delete Quizzes (users can delete quizzes)", () => {
        const editSlider = screen.getByRole("checkbox");
        editSlider.click();
        expect(screen.getByText("Math (3 questions):")).toBeInTheDocument();
        expect(
            screen.getByText(
                "Are your math skills better than a 5th grader? Play this to find out."
            )
        ).toBeInTheDocument();
        const deleteButtons = screen.getAllByRole("button", {
            name: /Delete/i
        });
        deleteButtons[0].click();
        editSlider.click();
        expect(
            screen.queryByText("Math (3 questions):")
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(
                "Are your math skills better than a 5th grader? Play this to find out."
            )
        ).not.toBeInTheDocument();
    });
});
