import React from "react";
import { Stack, Row, Col, Button } from "react-bootstrap";
import { Question } from "../Interfaces/question";
import { QuestionView } from "./QuestionView";

export function QuestionList({
    questions,
    edit,
    deleteQuest,
    addQuest,
    updateQuestions,
    updateQuiz,
    swapQuestions
}: {
    questions: Question[];
    edit: boolean;
    deleteQuest: (idQuest: number) => void;
    addQuest: (newQuestion: Question) => void;
    updateQuestions: (idQuest: number, newQuestion: Question) => void;
    updateQuiz: () => void;
    swapQuestions: (ind1: number, ind2: number) => void;
}): JSX.Element {
    function moveQUp(index: number) {
        swapQuestions(index, index - 1);
    }
    function moveQDown(index: number) {
        swapQuestions(index, index + 1);
    }

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

    return (
        <Stack gap={2}>
            {questions.map((question: Question) => (
                <div key={question.idQuest} className="bg-light border m-2 p-2">
                    <QuestionView
                        question={question}
                        edit={edit}
                        deleteQuest={deleteQuest}
                        updateQuestions={updateQuestions}
                        updateQuiz={updateQuiz}
                    ></QuestionView>
                    <Button
                        hidden={!edit}
                        disabled={question.idQuest === questions[0].idQuest}
                        onClick={() => moveQUp(questions.indexOf(question))}
                    >
                        Move Up
                    </Button>
                    <Button
                        hidden={!edit}
                        disabled={
                            question.idQuest ===
                            questions[questions.length - 1].idQuest
                        }
                        onClick={() => moveQDown(questions.indexOf(question))}
                    >
                        Move Down
                    </Button>
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
