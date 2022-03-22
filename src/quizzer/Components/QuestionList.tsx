import React from "react";
import { Stack, Row, Col, Button } from "react-bootstrap";
import { Question } from "../Interfaces/question";
import { QuestionView } from "./QuestionView";

export function QuestionList({
    questions,
    edit,
    deleteQuest,
    addQuest,
    editQuest
}: {
    questions: Question[];
    edit: boolean;
    deleteQuest: (idQuest: number) => void;
    addQuest: (newQuestion: Question) => void;
    editQuest: (id: number, newQuestion: Question) => void;
}): JSX.Element {
    const pointArray = questions.map(
        (question: Question): number => question.points
    );
    const totalPts = pointArray.reduce(
        (currentPts: number, num: number) => currentPts + num,
        0
    );
    const questionsCorrect = questions.filter(
        (question: Question): boolean => question.correct === true
    );
    const questSA = {
        idQuest: questions[questions.length - 1].idQuest + 1,
        name: "<Question Name>",
        body: "<Prompt>",
        type: "short_answer_question",
        answer: "<Correct Answer>",
        options: [],
        points: 2,
        correct: false,
        published: false
    } as Question;
    const questMC = {
        idQuest: questions[questions.length - 1].idQuest + 1,
        name: "<Question Name>",
        body: "<Prompt>",
        type: "multiple_choice_question",
        answer: "<Correct Answer>",
        options: ["<Option 1>", "<Option 2>", "<Option 3>", "<Option 4>"],
        points: 2,
        correct: false,
        published: false
    } as Question;
    let earnedPts: number;
    if (questionsCorrect.length > 0) {
        const correctPointArray = questionsCorrect.map(
            (question: Question): number => question.points
        );
        earnedPts = correctPointArray.reduce(
            (currentPts: number, num: number) => currentPts + num,
            0
        );
    } else {
        earnedPts = 0;
    }

    return (
        <Stack gap={2}>
            <div>
                Points earned: {earnedPts}/{totalPts}
            </div>
            {questions.map((question: Question) => (
                <div key={question.idQuest} className="bg-light border m-2 p-2">
                    <QuestionView
                        question={question}
                        edit={edit}
                        deleteQuest={deleteQuest}
                        editQuest={editQuest}
                    ></QuestionView>
                </div>
            ))}
            <div hidden={!edit}>
                <Row>
                    <Col>
                        <Button onClick={() => addQuest(questSA)}>
                            Add Short Answer Question
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={() => addQuest(questMC)}>
                            Add Multiple Choice Question
                        </Button>
                    </Col>
                </Row>
            </div>
        </Stack>
    );
}
