import React, { useState } from "react";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function MultipleChoiceQuestion({
    options,
    expectedAnswer
}: {
    options: string[];
    expectedAnswer: string;
}): JSX.Element {
    const [choice, setChoice] = useState<string>(options[0]);
    const firstVal = options[0];

    function updateChoice(event: ChangeEvent) {
        setChoice(event.target.value);
    }

    function prompts(): string {
        if (firstVal === "1") {
            return "What is the only even prime number?";
        } else if (firstVal === "Alpha") {
            return "What is the first letter of the greek alphabet?";
        } else {
            return "Which of these is not a greeting?";
        }
    }

    const prompt = prompts();

    return (
        <div>
            <h3>Multiple Choice Question</h3>
            <Form.Label>{prompt}</Form.Label>
            <Form.Group>
                <Form.Select onChange={updateChoice} value={choice}>
                    {options.map((opt: string) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <div>{choice === expectedAnswer ? "✔️" : "❌"}</div>
        </div>
    );
}
