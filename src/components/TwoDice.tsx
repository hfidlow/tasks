import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): JSX.Element {
    const [roll1, newRoll1] = useState<number>(5);
    const [roll2, newRoll2] = useState<number>(6);
    function rollLeft(): void {
        newRoll1(d6());
    }
    function rollRight(): void {
        newRoll2(d6());
    }
    function winLoseMessage(): string {
        if (roll1 === roll2 && roll1 === 1) {
            return "Oh nooooo, snake eyes. Welp, you lose.";
        } else if (roll1 === roll2) {
            return "Ayyyyy, you win!!";
        } else {
            return "You can still do this! Roll again.";
        }
    }
    return (
        <div>
            <div>
                <span data-testid="left-die">
                    <Button
                        onClick={rollLeft}
                        //disabled={roll1 === roll2}
                    >
                        Roll Left
                    </Button>
                    {roll1}
                </span>
            </div>
            <div>
                <span data-testid="right-die">
                    <Button
                        onClick={rollRight}
                        //disabled={roll1 === roll2}
                    >
                        Roll Right
                    </Button>
                    {roll2}
                </span>
            </div>
            <div>{winLoseMessage()}</div>
        </div>
    );
}
