import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
//import { Container, Row, Col, Button } from "react-bootstrap";
import { Quiz } from "../Interfaces/quizzes";
import { Question } from "../Interfaces/question";
import { QuestionList } from "./QuestionList";

export function QuizView({
    quiz,
    edit,
    deleteQuiz
}: {
    quiz: Quiz;
    edit: boolean;
    deleteQuiz: (id: number) => void;
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
    }

    function addQuest(newQuestion: Question) {
        setQuests([...quests, newQuestion]);
    }

    function editQuest(id: number, newQuestion: Question) {
        setQuests(
            quests.map(
                (quest: Question): Question =>
                    quest.idQuest === id ? newQuestion : quest
            )
        );
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
                        questions={quiz.list}
                        edit={edit}
                        deleteQuest={deleteQuest}
                        addQuest={addQuest}
                        editQuest={editQuest}
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
