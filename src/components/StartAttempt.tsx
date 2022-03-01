import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    const [progress, setProgress] = useState<boolean>(false);
    function beginAttempt(): void {
        setProgress(true);
        setAttempts(attempts - 1);
    }
    function stopAttempt(): void {
        setProgress(false);
    }
    function mulligan() {
        setAttempts(attempts + 1);
    }

    return (
        <div>
            <Button
                onClick={beginAttempt}
                disabled={progress || attempts === 0}
            >
                Start Quiz
            </Button>
            <Button onClick={stopAttempt} disabled={!progress}>
                Stop Quiz
            </Button>
            <Button onClick={mulligan} disabled={progress}>
                Mulligan
            </Button>
        </div>
    );
}
