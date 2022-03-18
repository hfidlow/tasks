import React, { useState } from "react";
import { Form } from "react-bootstrap";
//import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import startQuizzes from "./quizzer/Data/starting_quizzes.json";
import { Quiz } from "./quizzer/Interfaces/quizzes";
import { ShowHideTasks } from "./ShowHide";
import { QuizList } from "./quizzer/Components/QuizList";
import img1 from "./Images/img1.png";
import img2 from "./Images/img2.png";
import img3 from "./Images/img3.png";
import img4 from "./Images/img4.png";

const QUIZZES = startQuizzes.map((quiz): Quiz => quiz as Quiz);

function App(): JSX.Element {
    const [edit, setEdit] = useState<boolean>(false);
    const [quizzes, setQuizzes] = useState<Quiz[]>(QUIZZES);

    function deleteQuiz(id: number) {
        setQuizzes(quizzes.filter((quiz: Quiz): boolean => quiz.id !== id));
    }

    return (
        <div className="App">
            <header className="App-header">
                <span style={{ color: "yellow" }}>
                    Henry Fidlow UD CISC275 with React Hooks and TypeScript
                </span>
                <img
                    src="https://i.pinimg.com/originals/c2/18/a0/c218a0dd7c4829d03d1e89cb824f3459.jpg"
                    alt="Objectively the best snack"
                    width="200"
                    height="200"
                />
                <Form.Check
                    inline
                    type="switch"
                    id="in-edit"
                    label={edit ? "Edit Mode" : "Play Mode"}
                    checked={edit}
                    onChange={(e) => setEdit(e.target.checked)}
                />
            </header>
            <div>
                <QuizList
                    quizzes={quizzes}
                    edit={edit}
                    deleteQuiz={deleteQuiz}
                ></QuizList>
            </div>
            <ShowHideTasks></ShowHideTasks>
            <div>
                <img src={img1} alt="img1" width={300} height={380} />
                <img src={img2} alt="img2" width={300} height={380} />
                <img src={img3} alt="img3" width={300} height={380} />
                <img src={img4} alt="img4" width={300} height={380} />
            </div>
            <div className="App-text1">
                Requirements:
                <li> Added sketches ✔️</li>
                <li> Visible Quizzes ✔️</li>
                <li> Questions in Quizzes ✔️</li>
                <li> Short answer and Multiple Choice ✔️</li>
                <li> Check correctness ✔️</li>
                <li> Sum points ❌</li>
                <li> Clear Answers ❌</li>
                <li> Publish Questions ❌</li>
                <li> Filter Questions ❌</li>
                <li> Edit Questions ❌</li>
                <li> Add Questions ❌</li>
                <li> Delete Questions ❌</li>
                <li> Reorder Questions ❌</li>
                <li> Add Quizzes ❌</li>
                <li> Delete Quizzes ✔️</li>
            </div>
        </div>
    );
}

export default App;
