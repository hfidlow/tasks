import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Question } from "../Interfaces/question";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function QuestionView({
    question
}: {
    question: Question;
}): JSX.Element {
    const [answer, setAnswer] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    function updateAnswer(event: ChangeEvent) {
        setAnswer(event.target.value);
    }

    function updateSubmitted() {
        setSubmitted(!submitted);
        if (submitted && answer === question.answer) {
            question.correct = true;
        } else {
            question.correct = false;
        }
    }

    if (question.type === "multiple_choice_question") {
        return (
            <Container>
                <Row>
                    <h3>
                        {question.name} ({question.points} points):
                    </h3>
                    <div>{question.body}</div>
                </Row>
                <Row>
                    {question.options.map((opt: string) => (
                        <Form.Group key={question.idQuest}>
                            <Form.Check
                                inline
                                type="radio"
                                name="options"
                                onChange={updateAnswer}
                                value={opt}
                                checked={answer === opt}
                            />
                            <Form.Label>{opt}</Form.Label>
                        </Form.Group>
                    ))}
                </Row>
                <Row>
                    <Col>
                        <div hidden={!submitted}>
                            {answer === question.answer
                                ? "Correct!"
                                : "Dang, not quite."}
                        </div>{" "}
                    </Col>
                    <Col>
                        <div>
                            <Button
                                onClick={updateSubmitted}
                                disabled={submitted}
                            >
                                Submit
                            </Button>
                            <Button
                                onClick={updateSubmitted}
                                hidden={!submitted}
                            >
                                Reset
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return (
            <Container>
                <Row>
                    <h3>
                        {question.name} ({question.points} points):
                    </h3>
                    <div>{question.body}</div>
                </Row>
                <Row>
                    <Form.Control value={answer} onChange={updateAnswer} />
                </Row>
                <Row>
                    <Col>
                        <div hidden={!submitted}>
                            {answer === question.answer
                                ? "Correct!"
                                : "Dang, not quite."}
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <Button
                                onClick={updateSubmitted}
                                disabled={submitted}
                            >
                                Submit
                            </Button>
                            <Button
                                onClick={updateSubmitted}
                                hidden={!submitted}
                            >
                                Reset
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
