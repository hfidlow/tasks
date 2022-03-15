import React from "react";
//import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { ShowHideTasks } from "./ShowHide";
import img1 from "./Images/img1.png";

function App(): JSX.Element {
    return (
        <div>
            <ShowHideTasks></ShowHideTasks>
            <div>
                <img src={img1} alt="img1" />
            </div>
        </div>
    );
}

export default App;
