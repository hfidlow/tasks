import React from "react";
//import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { ShowHideTasks } from "./ShowHide";

function App(): JSX.Element {
    return (
        <div>
            <ShowHideTasks></ShowHideTasks>
            <img src="./quizzer/Images/T11_quiz_edit.JPG" />
        </div>
    );
}

export default App;
