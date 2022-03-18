import React from "react";
import { Stack } from "react-bootstrap";
import { Question } from "../Interfaces/question";
import { QuestionView } from "./QuestionView";

export function QuestionList({
    questions
}: {
    questions: Question[];
}): JSX.Element {
    const pointArray = questions.map(
        (question: Question): number => question.points
    );
    const totalPts = pointArray.reduce(
        (currentPts: number, num: number) => currentPts + num,
        0
    );
    const questionsCorrect = questions.filter(
        (question: Question): boolean => question.correct === true
    );
    let earnedPts: number;
    if (questionsCorrect.length > 0) {
        const correctPointArray = questionsCorrect.map(
            (question: Question): number => question.points
        );
        earnedPts = correctPointArray.reduce(
            (currentPts: number, num: number) => currentPts + num,
            0
        );
    } else {
        earnedPts = 0;
    }

    return (
        <Stack gap={2}>
            <div>
                Points earned: {earnedPts}/{totalPts}
            </div>
            {questions.map((question: Question) => (
                <div key={question.id} className="bg-light border m-2 p-2">
                    <QuestionView question={question}></QuestionView>
                </div>
            ))}
        </Stack>
    );
}
