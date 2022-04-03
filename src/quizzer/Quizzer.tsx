import React, { useState } from "react";
import "../App.css";
import { Form } from "react-bootstrap";
import { Quiz } from "./Interfaces/quizzes";
import { QuizList } from "./Components/QuizList";
import startQuizzes from "./Data/starting_quizzes.json";

const QUIZZES = startQuizzes.map((quiz): Quiz => quiz as Quiz);

export function Quizzer(): JSX.Element {
    const [edit, setEdit] = useState<boolean>(false);
    const [quizzes, setQuizzes] = useState<Quiz[]>(QUIZZES);

    function deleteQuiz(id: number) {
        setQuizzes(quizzes.filter((quiz: Quiz): boolean => quiz.id !== id));
    }

    function addQuiz(newQuiz: Quiz) {
        setQuizzes([...quizzes, newQuiz]);
    }

    function editQuiz(id: number, newQuiz: Quiz) {
        setQuizzes(
            quizzes.map((quiz: Quiz): Quiz => (quiz.id === id ? newQuiz : quiz))
        );
    }

    return (
        <div className="App">
            <h3>Quizzer</h3>
            <div>
                <Form.Check
                    inline
                    type="switch"
                    id="in-edit"
                    label={edit ? "Edit Mode" : "Play Mode"}
                    checked={edit}
                    onChange={(e) => setEdit(e.target.checked)}
                />
            </div>
            <div>
                <QuizList
                    quizzes={quizzes}
                    edit={edit}
                    deleteQuiz={deleteQuiz}
                    addQuiz={addQuiz}
                    editQuiz={editQuiz}
                ></QuizList>
            </div>
        </div>
    );
}
