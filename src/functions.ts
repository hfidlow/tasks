/**
 * Consumes a single temperature in Fahrenheit (a number) and converts to Celsius
 * using this formula:
 *      C = (F - 32) * 5/9
 */
export function fahrenheitToCelius(temperature: number): number {
    const celcius: number = ((temperature - 32) * 5) / 9;
    return celcius;
}

/**
 * Consumes three numbers and produces their sum. BUT you should only add a number
 * if the number is greater than zero.
 */
export function add3(first: number, second: number, third: number): number {
    if (first > 0) {
        if (second > 0 && third > 0) {
            return first + second + third;
        } else if (second > 0) {
            return first + second;
        } else if (third > 0) {
            return first + third;
        } else {
            return first;
        }
    } else {
        if (second > 0 && third > 0) {
            return second + third;
        } else if (second > 0) {
            return second;
        } else if (third > 0) {
            return third;
        } else {
            return 0;
        }
    }
}

/**
 * Consumes a string and produces the same string in UPPERCASE and with an exclamation
 * mark added to the end.
 */
export function shout(message: string): string {
    return message.toUpperCase() + "!";
}

/**
 * Consumes a string (a message) and returns a boolean if the string ends in a question
 * mark. Do not use an `if` statement in solving this question.
 */
export function isQuestion(message: string): boolean {
    const strLen: number = message.length;
    if (message.charAt(strLen - 1) === "?") {
        return true;
    } else {
        return false;
    }
}

/**
 * Consumes a word (a string) and returns either `true`, `false`, or `null`. If the string
 * is "yes" (upper or lower case), then return `true`. If the string is "no" (again, either
 * upper or lower case), then return `false`. Otherwise, return `null`.
 */
export function convertYesNo(word: string): boolean | null {
    if (word === "yes" || word === "YES") {
        return true;
    } else if (word === "no" || word === "NO") {
        return false;
    } else {
        return null;
    }
}
