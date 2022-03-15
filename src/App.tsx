import React from "react";
//import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { ShowHideTasks } from "./ShowHide";
import img1 from "./Images/img1.png";
import img2 from "./Images/img2.png";
import img3 from "./Images/img3.png";
import img4 from "./Images/img4.png";

function App(): JSX.Element {
    return (
        <div className="App">
            <ShowHideTasks></ShowHideTasks>
            <div>
                <img src={img1} alt="img1" width={300} height={380} />
                <img src={img2} alt="img2" width={300} height={380} />
                <img src={img3} alt="img3" width={300} height={380} />
                <img src={img4} alt="img4" width={300} height={380} />
            </div>
            <div>
                Completed Requirements:
                <li> Added sketch</li>
            </div>
        </div>
    );
}

export default App;
