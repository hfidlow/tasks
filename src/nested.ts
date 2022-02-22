import { urlToHttpOptions } from "url";
import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    const pubQ = questions.filter(
        (quest: Question): boolean => quest.published === true
    );
    return pubQ;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    const nonEmptyQ = questions.filter(
        (quest: Question): boolean =>
            !(
                quest.body === "" &&
                quest.expected === "" &&
                quest.options !== []
            )
    );
    return nonEmptyQ;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    const correctID = questions.find(
        (quest: Question): boolean => quest.id === id
    );
    if (correctID === undefined) {
        return null;
    } else {
        return correctID;
    }
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const newQ = questions.filter(
        (quest: Question): boolean => quest.id !== id
    );
    return newQ;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    const names = questions.map((quest: Question): string => quest.name);
    return names;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    const pTotal = questions.reduce(
        (currTot: number, quest: Question) => currTot + quest.points,
        0
    );
    return pTotal;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    const pQuest = getPublishedQuestions(questions);
    const questTotal = pQuest.reduce(
        (currTot: number, quest: Question) => currTot + quest.points,
        0
    );
    return questTotal;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    const qFormat = questions.map(
        (quest: Question): string =>
            quest.id +
            "," +
            quest.name +
            "," +
            quest.options.length +
            "," +
            quest.points +
            "," +
            quest.published
    );
    return "id,name,options,points,published\n" + qFormat.join("\n");
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    const ans = questions.map(
        (quest: Question): Answer => ({
            questionId: quest.id,
            text: "",
            submitted: false,
            correct: false
        })
    );
    return ans;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    const pubQ = questions.map(
        (quest: Question): Question => ({ ...quest, published: true })
    );
    return pubQ;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    const sameTM = questions.every(
        (quest: Question): boolean => quest.type === "multiple_choice_question"
    );
    const sameTS = questions.every(
        (quest: Question): boolean => quest.type === "short_answer_question"
    );
    return sameTM || sameTS;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    const newQs = [...questions, makeBlankQuestion(id, name, type)];
    return newQs;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    const renamed = questions.map(
        (quest: Question): Question =>
            quest.id === targetId ? { ...quest, name: newName } : quest
    );
    return renamed;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    const newTarget = questions.map(
        (quest: Question): Question =>
            quest.id === targetId ? { ...quest, type: newQuestionType } : quest
    );
    const changeOptions = newTarget.map(
        (quest: Question): Question =>
            quest.id === targetId && quest.type !== "multiple_choice_question"
                ? { ...quest, options: [] }
                : quest
    );
    return changeOptions;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
) {
    if (targetOptionIndex === -1) {
        const newTarget = questions.map(
            (quest: Question): Question =>
                quest.id === targetId
                    ? { ...quest, options: [...quest.options, newOption] }
                    : quest
        );
        return newTarget;
    } else {
        const newTarget = questions.map(
            (quest: Question): Question =>
                quest.id === targetId
                    ? { ...quest, options: [...quest.options] }
                    : quest
        );
        return newTarget;
    }
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    const newQ = questions.find(
        (quest: Question): boolean => quest.id === targetId
    );
    const newQUp = { ...newQ, id: newId };
    const quests = questions.splice(targetId, 0, newQUp);
    return quests;
}
