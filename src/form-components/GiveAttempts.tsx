import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function GiveAttempts(): JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    const [requested, setRequested] = useState<number>(1);

    function updateRequested(event: ChangeEvent) {
        const numRequested = parseInt(event.target.value)
            ? parseInt(event.target.value)
            : 0;
        setRequested(numRequested);
    }

    return (
        <div>
            <h3>Give Attempts</h3>
            <Form.Group as={Row}>
                <Form.Label column lg={6}>
                    How many attempts do you want to add? You have {attempts}{" "}
                    attempts left.
                </Form.Label>
                <Col lg={2}>
                    <Form.Control
                        value={requested}
                        onChange={updateRequested}
                    ></Form.Control>
                </Col>
            </Form.Group>
            <div>
                <Button
                    onClick={() => setAttempts(attempts - 1)}
                    disabled={attempts === 0}
                >
                    Use
                </Button>
                <Button onClick={() => setAttempts(attempts + requested)}>
                    Gain
                </Button>
            </div>
        </div>
    );
}
