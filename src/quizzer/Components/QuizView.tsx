import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
//import { Container, Row, Col, Button } from "react-bootstrap";
import { Quiz } from "../Interfaces/quizzes";
import { Question } from "../Interfaces/question";
import { QuestionList } from "./QuestionList";

export function QuizView({
    quiz,
    edit,
    deleteQuiz,
    editQuiz
}: {
    quiz: Quiz;
    edit: boolean;
    deleteQuiz: (id: number) => void;
    editQuiz: (id: number, newQuiz: Quiz) => void;
}): JSX.Element {
    const [selected, setSelected] = useState<boolean>(false);
    const [quests, setQuests] = useState<Question[]>(quiz.list);

    function updateSelected() {
        setSelected(!selected);
    }

    function deleteQuest(id: number) {
        setQuests(
            quests.filter((quest: Question): boolean => quest.idQuest !== id)
        );
        updateQuiz();
    }

    function addQuest(newQuestion: Question) {
        setQuests([...quests, newQuestion]);
        updateQuiz();
    }

    function updateQuestions(questID: number, quest: Question) {
        setQuests(
            quests.map(
                (question: Question): Question =>
                    question.idQuest === questID ? quest : question
            )
        );
    }

    function swapQuestions(quest1Ind: number, quest2Ind: number) {
        const questCopy = [...quests];
        [questCopy[quest1Ind], questCopy[quest2Ind]] = [
            questCopy[quest2Ind],
            questCopy[quest1Ind]
        ];
        setQuests(questCopy);
    }

    function updateQuiz() {
        editQuiz(quiz.id, { ...quiz, list: quests, length: length });
    }

    return (
        <Container>
            <Row>
                <h3>
                    {quiz.title} ({quiz.length} questions):
                </h3>
                <div>{quiz.description}</div>
            </Row>
            <Row>
                <div hidden={!selected}>
                    <QuestionList
                        questions={quests}
                        edit={edit}
                        deleteQuest={deleteQuest}
                        addQuest={addQuest}
                        updateQuestions={updateQuestions}
                        updateQuiz={updateQuiz}
                        swapQuestions={swapQuestions}
                    ></QuestionList>
                    <Button onClick={updateSelected}>Close</Button>
                </div>
                <div>
                    <Button onClick={updateSelected} hidden={selected}>
                        Select
                    </Button>
                </div>
            </Row>
            <Row>
                <div hidden={!edit}>
                    <Button onClick={() => deleteQuiz(quiz.id)}>Delete</Button>
                </div>
            </Row>
        </Container>
    );
}
