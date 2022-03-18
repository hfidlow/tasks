import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
//import { Container, Row, Col, Button } from "react-bootstrap";
import { Quiz } from "../Interfaces/quizzes";
import { QuestionList } from "./QuestionList";

export function QuizView({
    quiz,
    edit,
    deleteQuiz
}: {
    quiz: Quiz;
    edit: boolean;
    deleteQuiz: (id: number) => void;
}): JSX.Element {
    const [selected, setSelected] = useState<boolean>(false);

    function updateSelected() {
        setSelected(!selected);
    }
    return (
        <Container>
            <Row>
                <h3>
                    {quiz.title} ({quiz.length} questions):
                </h3>
                <div>{quiz.description}</div>
            </Row>
            <Row>
                <div hidden={!selected}>
                    <QuestionList questions={quiz.list}></QuestionList>
                    <Button onClick={updateSelected}>Close</Button>
                </div>
                <div>
                    <Button onClick={updateSelected} hidden={selected}>
                        Select
                    </Button>
                </div>
            </Row>
            <Row>
                <div hidden={!edit}>
                    <Button onClick={() => deleteQuiz(quiz.id)}>Delete</Button>
                </div>
            </Row>
        </Container>
    );
}
