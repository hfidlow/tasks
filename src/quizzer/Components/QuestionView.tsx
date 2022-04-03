import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Question } from "../Interfaces/question";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function QuestionView({
    question,
    edit,
    deleteQuest,
    updateQuestions,
    updateQuiz
}: {
    question: Question;
    edit: boolean;
    deleteQuest: (idQuest: number) => void;
    updateQuestions: (idQuest: number, newQuestion: Question) => void;
    updateQuiz: () => void;
}): JSX.Element {
    const [answer, setAnswer] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(question.name);
    const [ansCorrect, setAnsCorrect] = useState<string>(question.answer);
    const [pts, setPts] = useState<number>(question.points);
    const [desc, setDesc] = useState<string>(question.body);
    const [pub, setPub] = useState<boolean>(question.published);
    const [optionsMC, setOptionsMC] = useState<string[]>(question.options);
    const [edited, setEdited] = useState<boolean>(false);

    function updateAnswer(event: ChangeEvent) {
        setAnswer(event.target.value);
    }

    function updateSubmitted() {
        setSubmitted(!submitted);
    }

    function updateMC() {
        updateQuestions(question.idQuest, {
            ...question,
            name: title,
            body: desc,
            answer: ansCorrect,
            points: pts,
            options: optionsMC,
            published: pub
        });
        updateQuiz();
        setEdited(false);
    }

    function updateSA() {
        updateQuestions(question.idQuest, {
            ...question,
            name: title,
            body: desc,
            answer: ansCorrect,
            points: pts,
            published: pub
        });
        updateQuiz();
        setEdited(false);
    }

    function updateTitle(event: ChangeEvent) {
        setTitle(event.target.value);
        setEdited(true);
    }

    function updateCorrectAns(event: ChangeEvent) {
        setAnsCorrect(event.target.value);
        setEdited(true);
    }

    function updatePts(event: ChangeEvent) {
        const numPts = parseInt(event.target.value)
            ? parseInt(event.target.value)
            : 0;
        setPts(numPts);
        setEdited(true);
    }

    function updatePub() {
        setPub(!pub);
        setEdited(true);
    }

    function updateOpts1(event: ChangeEvent) {
        const newOpts = [...optionsMC];
        const newVal = [event.target.value];
        setOptionsMC(newVal.concat(newOpts.slice(1)));
        setEdited(true);
    }

    function updateOpts2(event: ChangeEvent) {
        const newOpts = [...optionsMC];
        setOptionsMC(
            newOpts.slice(0, 1).concat(event.target.value, newOpts.slice(2))
        );
        setEdited(true);
    }

    function updateOpts3(event: ChangeEvent) {
        const newOpts = [...optionsMC];
        setOptionsMC(
            newOpts.slice(0, 2).concat(event.target.value, newOpts.slice(3))
        );
        setEdited(true);
    }

    function updateOpts4(event: ChangeEvent) {
        const newOpts = [...optionsMC];
        setOptionsMC(newOpts.slice(0, 3).concat(event.target.value));
        setEdited(true);
    }

    function updateDesc(event: ChangeEvent) {
        setDesc(event.target.value);
        setEdited(true);
    }

    if (edit) {
        if (question.type === "multiple_choice_question") {
            return (
                <Container>
                    <Row>
                        <Col>
                            <Form.Check
                                inline
                                type="switch"
                                id="is-published"
                                label={pub ? "Published" : "Unpublished"}
                                checked={pub}
                                onChange={updatePub}
                            />
                        </Col>
                        <Col>
                            <Button
                                onClick={() => deleteQuest(question.idQuest)}
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <div>
                            Title:
                            <Form.Control
                                value={title}
                                onChange={updateTitle}
                            />
                        </div>
                    </Row>
                    <Row>
                        <div>
                            Points:
                            <Form.Control value={pts} onChange={updatePts} />
                        </div>
                    </Row>
                    <Row>
                        <div>
                            Prompt:
                            <Form.Control value={desc} onChange={updateDesc} />
                        </div>
                    </Row>
                    <Row>
                        <div>
                            Answer:
                            <Form.Control
                                value={ansCorrect}
                                onChange={updateCorrectAns}
                            />
                        </div>
                    </Row>
                    <Row>
                        <div>
                            Option 1:
                            <Form.Control
                                value={optionsMC[0]}
                                onChange={updateOpts1}
                            />
                        </div>
                    </Row>
                    <Row>
                        <div>
                            Option 2:
                            <Form.Control
                                value={optionsMC[1]}
                                onChange={updateOpts2}
                            />
                        </div>
                    </Row>
                    <Row>
                        <div>
                            Option 3:
                            <Form.Control
                                value={optionsMC[2]}
                                onChange={updateOpts3}
                            />
                        </div>
                    </Row>
                    <Row>
                        <div>
                            Option 4:
                            <Form.Control
                                value={optionsMC[3]}
                                onChange={updateOpts4}
                            />
                        </div>
                    </Row>
                    <Row>
                        <Button onClick={updateMC} hidden={!edited}>
                            Confirm Edits
                        </Button>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Row>
                        <Col>
                            <Form.Check
                                inline
                                type="switch"
                                id="is-published"
                                label={pub ? "Published" : "Unpublished"}
                                checked={pub}
                                onChange={updatePub}
                            />
                        </Col>
                        <Col>
                            <Button
                                onClick={() => deleteQuest(question.idQuest)}
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <div>
                            Title:
                            <Form.Control
                                value={title}
                                onChange={updateTitle}
                            />
                        </div>
                    </Row>
                    <Row>
                        <div>
                            Points:
                            <Form.Control value={pts} onChange={updatePts} />
                        </div>
                    </Row>
                    <Row>
                        <div>
                            Prompt:
                            <Form.Control value={desc} onChange={updateDesc} />
                        </div>
                    </Row>
                    <Row>
                        <div>
                            Answer:
                            <Form.Control
                                value={ansCorrect}
                                onChange={updateCorrectAns}
                            />
                        </div>
                    </Row>
                    <Row>
                        <Button onClick={updateSA} hidden={!edited}>
                            Confirm Edits
                        </Button>
                    </Row>
                </Container>
            );
        }
    } else {
        if (
            question.type === "multiple_choice_question" &&
            question.published === true
        ) {
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
        } else if (
            question.type === "short_answer_question" &&
            question.published === true
        ) {
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
        } else {
            return <div></div>;
        }
    }
}
