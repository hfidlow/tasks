import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function EditMode(): JSX.Element {
    const [edit, setEdit] = useState<boolean>(false);
    const [student, setStudent] = useState<boolean>(true);
    const [name, setName] = useState<string>("Your Name");

    return (
        <div>
            <h3>Edit Mode</h3>
            <Form.Group>
                <Form.Label>Enter your name.</Form.Label>
                <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!edit}
                ></Form.Control>
            </Form.Group>

            <Form.Check
                type="switch"
                id="in-edit"
                label="Edit Mode"
                checked={edit}
                onChange={(e) => setEdit(e.target.checked)}
            />
            <Form.Check
                type="switch"
                id="is-student"
                label="Student"
                checked={student}
                onChange={(e) => setStudent(e.target.checked)}
                disabled={!edit}
            />
            <div>
                {student
                    ? [name + " is a student"]
                    : [name + " is not a student"]}
            </div>
        </div>
    );
}
