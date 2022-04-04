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

    test("Correctness of Answer and Clear (can choose an answer and see if they are right, and clear if incorrect to try again)", () => {
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

    test("Publish and Filter Questions (users can publish/unpublish a question to alter view)", () => {
        const editSlider = screen.getByRole("checkbox");
        const selectButtons = screen.getAllByRole("button", {
            name: /Select/i
        });
        selectButtons[0].click(); // Opens the first quiz
        const subButtons = screen.getAllByRole("button", {
            name: /Submit/i
        });
        expect(subButtons.length).toEqual(3);
        editSlider.click();
        const allSliders = screen.getAllByRole("checkbox");
        allSliders[allSliders.length - 1].click(); // Change the last question from unpublished to published
        const updateButton = screen.getByRole("button", {
            name: /Confirm Edits/i
        });
        updateButton.click();
        editSlider.click();
        const subButtons2 = screen.getAllByRole("button", {
            name: /Submit/i
        });
        expect(subButtons2.length).toEqual(4);
        editSlider.click();
        const allSliders2 = screen.getAllByRole("checkbox");
        allSliders2[1].click();
        const updateButton2 = screen.getByRole("button", {
            name: /Confirm Edits/i
        });
        updateButton2.click();
        allSliders2[2].click();
        const updateButton3 = screen.getByRole("button", {
            name: /Confirm Edits/i
        });
        updateButton3.click();
        editSlider.click();
        const subButtons3 = screen.getAllByRole("button", {
            name: /Submit/i
        });
        expect(subButtons3.length).toEqual(2);
    });

    test("Edit Questions (users can edit the questions and fields of a quiz)", () => {
        const selectButtons = screen.getAllByRole("button", {
            name: /Select/i
        });
        selectButtons[1].click(); // Opens the second quiz
        expect(
            screen.getByText("Presidents 1 (2 points):")
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                "Who was the 3rd president of the United States of America?"
            )
        ).toBeInTheDocument();
        const mcBoxes = screen.getAllByRole("radio");
        const thirdPres = mcBoxes[1];
        thirdPres.click();
        const subButton = screen.getAllByRole("button", {
            name: /Submit/i
        });
        subButton[0].click();
        expect(screen.queryByText("Correct!")).not.toBeNull();
        const resetButtons = screen.getAllByRole("button", {
            name: /Reset/i
        });
        const resetButton = resetButtons[0];
        resetButton.click();
        const editSlider = screen.getByRole("checkbox");
        editSlider.click();
        const textBoxes = screen.getAllByRole("textbox");
        const pts = textBoxes[1];
        const prompt = textBoxes[2];
        const ans = textBoxes[3];
        userEvent.clear(pts);
        userEvent.type(pts, "3");
        userEvent.clear(prompt);
        userEvent.type(
            prompt,
            "Who was the 2nd president of the United States of America?"
        );
        userEvent.clear(ans);
        userEvent.type(ans, "John Adams");
        const updateButton = screen.getByRole("button", {
            name: /Confirm Edits/i
        });
        updateButton.click();
        editSlider.click();
        const mcBoxes2 = screen.getAllByRole("radio");
        const secondPres = mcBoxes2[2];
        secondPres.click();
        expect(screen.queryByText("Correct!")).not.toBeVisible();
        const subButton2 = screen.getAllByRole("button", {
            name: /Submit/i
        });
        subButton2[0].click();
        expect(
            screen.queryByText("Presidents 1 (2 points):")
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(
                "Who was the 3rd president of the United States of America?"
            )
        ).not.toBeInTheDocument();
        expect(
            screen.getByText("Presidents 1 (3 points):")
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                "Who was the 2nd president of the United States of America?"
            )
        ).toBeInTheDocument();
        expect(screen.queryByText("Correct!")).not.toBeNull();
    });

    test("Add Questions (users can add questions)", () => {
        const selectButtons = screen.getAllByRole("button", {
            name: /Select/i
        });
        selectButtons[0].click(); // Opens the first quiz
        const subButtons = screen.getAllByRole("button", {
            name: /Submit/i
        });
        expect(subButtons.length).toEqual(3);
        const editSlider = screen.getByRole("checkbox");
        editSlider.click();
        const addMC = screen.getByRole("button", {
            name: /Add Multiple Choice Question/i
        });
        const addSA = screen.getByRole("button", {
            name: /Add Short Answer Question/i
        });
        addMC.click();
        addSA.click();
        const allSliders = screen.getAllByRole("checkbox");
        allSliders[5].click();
        const updateButton = screen.getByRole("button", {
            name: /Confirm Edits/i
        });
        updateButton.click();
        allSliders[6].click();
        const updateButton2 = screen.getByRole("button", {
            name: /Confirm Edits/i
        });
        updateButton2.click();
        editSlider.click();
        const subButtons2 = screen.getAllByRole("button", {
            name: /Submit/i
        });
        expect(subButtons2.length).toEqual(5);
    });

    test("Delete Questions (users can delete questions)", () => {
        const selectButtons = screen.getAllByRole("button", {
            name: /Select/i
        });
        selectButtons[0].click(); // Opens the first quiz
        const subButtons = screen.getAllByRole("button", {
            name: /Submit/i
        });
        expect(subButtons.length).toEqual(3);
        const editSlider = screen.getByRole("checkbox");
        editSlider.click();
        const delButtons = screen.getAllByRole("button", {
            name: /Delete/i
        });
        delButtons[0].click();
        delButtons[1].click();
        editSlider.click();
        const subButtons2 = screen.getAllByRole("button", {
            name: /Submit/i
        });
        expect(subButtons2.length).toEqual(1);
    });

    test("Reorder Questions (users can reorder questions)", () => {
        const selectButtons = screen.getAllByRole("button", {
            name: /Select/i
        });
        selectButtons[0].click(); // Opens the first quiz
        const editSlider = screen.getByRole("checkbox");
        editSlider.click();
        const textBoxes = screen.getAllByRole("textbox");
        expect(textBoxes[0]).toHaveDisplayValue("Simple Addition 1");
        expect(textBoxes[4]).toHaveDisplayValue("Simple Addition 2");
        const downButtons = screen.getAllByRole("button", {
            name: /Move Down/i
        });
        downButtons[0].click();
        const textBoxes2 = screen.getAllByRole("textbox");
        expect(textBoxes2[4]).toHaveDisplayValue("Simple Addition 1");
        expect(textBoxes2[0]).toHaveDisplayValue("Simple Addition 2");
        const upButton = screen.getAllByRole("button", {
            name: /Move Up/i
        });
        upButton[1].click();
        const textBoxes3 = screen.getAllByRole("textbox");
        expect(textBoxes3[0]).toHaveDisplayValue("Simple Addition 1");
        expect(textBoxes3[4]).toHaveDisplayValue("Simple Addition 2");
    });

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
