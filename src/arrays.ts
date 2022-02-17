import { getValue } from "@testing-library/user-event/dist/utils";
import { isNumberObject } from "util/types";

/**
 * Consume an array of numbers, and return a new array containing
 * JUST the first and last number. If there are no elements, return
 * an empty array. If there is one element, the resulting list should
 * the number twice.
 */
export function bookEndList(numbers: number[]): number[] {
    if (numbers.length === 0) {
        return numbers;
    } else if (numbers.length === 1) {
        return [...numbers, ...numbers];
    } else {
        const middle = numbers.length - 2;
        const numbers2 = [...numbers];
        numbers2.splice(1, middle);
        return numbers2;
    }
}

/**
 * Consume an array of numbers, and return a new array where each
 * number has been tripled (multiplied by 3).
 */
export function tripleNumbers(numbers: number[]): number[] {
    const tripled = numbers.map((numb: number): number => numb * 3);
    return tripled;
}

/**
 * Consume an array of strings and convert them to integers. If
 * the number cannot be parsed as an integer, convert it to 0 instead.
 */
export function stringsToIntegers(numbers: string[]): number[] {
    const strVals = numbers.map((val: string): string =>
        isNaN(val) ? (val = "0") : val
    );
    const intvals = strVals.map((numb: string): number => parseInt(numb));
    return intvals;
}

/**
 * Consume an array of strings and return them as numbers. Note that
 * the strings MAY have "$" symbols at the beginning, in which case
 * those should be removed. If the result cannot be parsed as an integer,
 * convert it to 0 instead.
 */
// Remember, you can write functions as lambdas too! They work exactly the same.
export const removeDollars = (amounts: string[]): number[] => {
    const strVals = amounts.map((val: string): string =>
        isNaN(val) ? val.replace("$", "0") : val
    );
    const intvals = strVals.map((numb: string): number => parseInt(numb));
    const intvals2 = intvals.map((numb: number): number =>
        isNaN(numb) ? (numb = 0) : numb
    );
    return intvals2;
};

/**
 * Consume an array of messages and return a new list of the messages. However, any
 * string that ends in "!" should be made uppercase. Also, remove any strings that end
 * in question marks ("?").
 */
export const shoutIfExclaiming = (messages: string[]): string[] => {
    const noQuestions = messages.filter(
        (message: string): boolean => message.charAt(message.length - 1) !== "?"
    );
    const shout = noQuestions.map((val: string): string =>
        val.charAt(val.length - 1) === "!" ? val.toUpperCase() : val
    );
    return shout;
};

/**
 * Consumes an array of words and returns the number of words that are LESS THAN
 * 4 letters long.
 */
export function countShortWords(words: string[]): number {
    const wordsUnder = words.filter((word: string): string => word.length < 4);
    return wordsUnder.length;
}

/**
 * Consumes an array of colors (e.g., 'red', 'purple') and returns true if ALL
 * the colors are either 'red', 'blue', or 'green'. If an empty list is given,
 * then return true.
 */
export function allRGB(colors: string[]): boolean {
    if (colors.length === 0) {
        return true;
    } else {
        const nonRGB = colors.filter(
            (word: string): string =>
                word !== "red" && word !== "green" && word !== "blue"
        );
        if (nonRGB.length > 0) {
            return false;
        } else {
            return true;
        }
    }
}

/**
 * Consumes an array of numbers, and produces a string representation of the
 * numbers being added together along with their actual sum.
 *
 * For instance, the array [1, 2, 3] would become "6=1+2+3".
 * And the array [] would become "0=0".
 */
export function makeMath(addends: number[]): string {
    if (addends.length === 0) {
        addends = [0];
    }
    const sum = addends.reduce(
        (currentTotal: number, num: number) => currentTotal + num,
        0
    );
    sum.toString;
    const adding = addends.join("+");
    const final = sum + "=" + adding;
    return final;
}

/**
 * Consumes an array of numbers and produces a new array of the same numbers,
 * with one difference. After the FIRST negative number, insert the sum of all
 * previous numbers in the list. If there are no negative numbers, then append
 * the sum to the list.
 *
 * For instance, the array [1, 9, -5, 7] would become [1, 9, -5, 10, 7]
 * And the array [1, 9, 7] would become [1, 9, 7, 17]
 */
export function injectPositive(values: number[]): number[] {
    let firstNegative = values.findIndex(
        (values: number): boolean => values < 0
    );
    const values2 = [...values];
    if (firstNegative === -1) {
        const sum = values.reduce(
            (currentTotal: number, num: number) => currentTotal + num,
            0
        );
        return [...values2, sum];
    } else {
        values2.splice(firstNegative, values.length - firstNegative);
        const sum = values2.reduce(
            (currentTotal: number, num: number) => currentTotal + num,
            0
        );
        const values3 = [...values];
        values3.splice(firstNegative + 1, 0, sum);
        return values3;
    }
}
