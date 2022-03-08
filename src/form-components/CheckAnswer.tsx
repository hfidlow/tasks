import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function CheckAnswer({
    expectedAnswer
}: {
    expectedAnswer: string;
}): JSX.Element {
    const [answer, changeAnswer] = useState<string>("");

    function updateAnswer(event: ChangeEvent) {
        changeAnswer(event.target.value);
    }

    return (
        <div>
            <h3>Check Answer</h3>

            <Form.Group as={Row} controlId="answer-area">
                <Form.Label column lg={6}>
                    Howdy! Have you been keeping up with arithmetic? Surpise
                    test!! Whats 6*6+66-(6*2-2)*6?
                </Form.Label>
                <Col lg={2}>
                    <Form.Control value={answer} onChange={updateAnswer} />
                </Col>
            </Form.Group>
            <div>{answer === expectedAnswer ? "✔️" : "❌"}</div>
        </div>
    );
}
