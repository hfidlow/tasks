import React from "react";
import { Stack } from "react-bootstrap";
import { Quiz } from "../Interfaces/quizzes";
import { QuizView } from "./QuizView";

export function QuizList({
    quizzes,
    edit,
    deleteQuiz
}: {
    quizzes: Quiz[];
    edit: boolean;
    deleteQuiz: (id: number) => void;
}): JSX.Element {
    return (
        <Stack gap={2}>
            {quizzes.map((quiz: Quiz) => (
                <div key={quiz.id} className="bg-light border m-2 p-2">
                    <QuizView
                        quiz={quiz}
                        edit={edit}
                        deleteQuiz={deleteQuiz}
                    ></QuizView>
                </div>
            ))}
        </Stack>
    );
}
