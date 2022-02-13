import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";

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

            <Container>
                <Row>
                    <Col>
                        <h2>About me:</h2>
                        <ol>
                            <li>Senior Mechanical Engineer (CS minor)</li>
                            <li>Interest in environmental stewardship</li>
                            <li>Always sleepy!!!</li>
                        </ol>
                        <div id="rectangle"></div>
                    </Col>
                    <Col>
                        <Button onClick={() => console.log("Hello World!")}>
                            Log Hello World
                        </Button>
                        <div id="rectangle"></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
