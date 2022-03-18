import React from "react";
import { Button, Stack, Row, Col } from "react-bootstrap";
import { Quiz } from "../Interfaces/quizzes";
import { QuizView } from "./QuizView";
import SAQuiz from "../Data/new_quizSA.json";
import MCQuiz from "../Data/new_quizMC.json";

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
    const quizSA: Quiz = SAQuiz;
    const quizMC: Quiz = MCQuiz;

    function newQ(newQuiz: Quiz) {
        addQuiz(newQuiz);
        newQuiz = { ...newQuiz, id: quizzes.length };
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
