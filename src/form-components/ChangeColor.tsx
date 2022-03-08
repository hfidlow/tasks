import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "cyan",
    "magenta",
    "white"
];

const DEFAULT_COLOR = COLORS[0];

export function ChangeColor(): JSX.Element {
    const [chosen, setChosen] = useState<string>(DEFAULT_COLOR);

    function updateChosen(event: ChangeEvent) {
        setChosen(event.target.value);
    }

    return (
        <div>
            <h3>Change Color</h3>
            <Row>
                {COLORS.map((color: string) => (
                    <Form.Group key={color}>
                        <Form.Check
                            inline
                            type="radio"
                            name="colors"
                            onChange={updateChosen}
                            value={color}
                            checked={chosen === color}
                        />
                        <Form.Label style={{ backgroundColor: color }}>
                            {color}
                        </Form.Label>
                    </Form.Group>
                ))}
            </Row>

            <div>
                The selected color is{" "}
                <span
                    style={{ backgroundColor: chosen }}
                    data-testid="colored-box"
                >
                    {chosen}
                </span>
            </div>
        </div>
    );
}
