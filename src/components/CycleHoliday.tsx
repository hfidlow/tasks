import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function CycleHoliday(): JSX.Element {
    /* const holidayNames: string[] = [
        "New Year's Day",
        "Independence Day",
        "Halloween",
        "Hannukkah",
        "Christmas"
    ]; */
    const holidays: string[] = ["🎉", "🎆", "🎃", "🕎", "🎄"];

    const [currHol, newHol] = useState<string>(holidays[0]);
    function nextHolidayAlphabetically(): void {
        if (currHol === holidays[0]) {
            newHol(holidays[4]);
        } else if (currHol === holidays[1]) {
            newHol(holidays[0]);
        } else if (currHol === holidays[2]) {
            newHol(holidays[3]);
        } else if (currHol === holidays[3]) {
            newHol(holidays[1]);
        } else {
            newHol(holidays[2]);
        }
    }
    function nextHolidayChronologically(): void {
        if (currHol === holidays[0]) {
            newHol(holidays[1]);
        } else if (currHol === holidays[1]) {
            newHol(holidays[2]);
        } else if (currHol === holidays[2]) {
            newHol(holidays[3]);
        } else if (currHol === holidays[3]) {
            newHol(holidays[4]);
        } else {
            newHol(holidays[0]);
        }
    }
    return (
        <div>
            <Button onClick={nextHolidayAlphabetically}>
                Sort Alphabetically
            </Button>
            <Button onClick={nextHolidayChronologically}>Sort by Year</Button>
            <p>
                <span> Holiday: {currHol}</span>
            </p>
        </div>
    );
}
