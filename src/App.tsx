import React from "react";
//import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { ShowHideTasks } from "./ShowHide";
// import img1 from "./Images/img1.png";
// import img2 from "./Images/img2.png";
// import img3 from "./Images/img3.png";
// import img4 from "./Images/img4.png";

function App(): JSX.Element {
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
            </header>
            <ShowHideTasks></ShowHideTasks>
            {/* <div>
                <img src={img1} alt="img1" width={300} height={380} />
                <img src={img2} alt="img2" width={300} height={380} />
                <img src={img3} alt="img3" width={300} height={380} />
                <img src={img4} alt="img4" width={300} height={380} />
            </div> */}
            <div>
                Completed Requirements:
                <li> Added sketch</li>
            </div>
        </div>
    );
}

export default App;
