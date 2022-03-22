import React from "react";
import { Button, Stack, Row, Col } from "react-bootstrap";
import { Quiz } from "../Interfaces/quizzes";
import { QuizView } from "./QuizView";

export function QuizList({
    quizzes,
    edit,
    deleteQuiz,
    addQuiz
}: {
    quizzes: Quiz[];
    edit: boolean;
    deleteQuiz: (id: number) => void;
    addQuiz: (newQuiz: Quiz) => void;
}): JSX.Element {
    const quizSA = {
        id: quizzes[quizzes.length - 1].id + 1,
        title: "<Add Title>",
        list: [
            {
                idQuest: 1,
                name: "<Q1>",
                body: "<Prompt>",
                type: "short_answer_question",
                answer: "<Correct Answer>",
                options: [],
                points: 2,
                correct: false,
                published: true
            },
            {
                idQuest: 2,
                name: "<Q2>",
                body: "<Prompt>",
                type: "short_answer_question",
                answer: "<Correct Answer>",
                options: [],
                points: 2,
                correct: false,
                published: true
            },
            {
                idQuest: 3,
                name: "<Q3>",
                body: "<Prompt>",
                type: "short_answer_question",
                answer: "<Correct Answer>",
                options: [],
                points: 2,
                correct: false,
                published: true
            }
        ],
        length: 3,
        description: "<Quiz Description>"
    } as Quiz;
    const quizMC = {
        id: quizzes[quizzes.length - 1].id + 1,
        title: "<Add Title>",
        list: [
            {
                idQuest: 1,
                name: "<Q1>",
                body: "<Prompt>",
                type: "multiple_choice_question",
                answer: "<Correct Answer>",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                points: 2,
                correct: false,
                published: true
            },
            {
                idQuest: 2,
                name: "<Q2>",
                body: "<Prompt>",
                type: "multiple_choice_question",
                answer: "<Correct Answer>",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                points: 2,
                correct: false,
                published: true
            },
            {
                idQuest: 3,
                name: "<Q3>",
                body: "<Prompt>",
                type: "multiple_choice_question",
                answer: "<Correct Answer>",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                points: 2,
                correct: false,
                published: true
            }
        ],
        length: 3,
        description: "<Quiz Description>"
    } as Quiz;

    function newQ(newQuiz: Quiz) {
        addQuiz(newQuiz);
        <QuizView
            quiz={newQuiz}
            edit={edit}
            deleteQuiz={deleteQuiz}
        ></QuizView>;
    }

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
            <div hidden={!edit}>
                <Row>
                    <Col>
                        <Button onClick={() => newQ(quizSA)}>
                            Add Short Answer Quiz
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={() => newQ(quizMC)}>
                            Add Multiple Choice Quiz
                        </Button>
                    </Col>
                </Row>
            </div>
        </Stack>
    );
}
