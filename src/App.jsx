import React, { useState, useRef, useEffect } from 'react';
import './css/app.css';
import './css/theme1.css';
import './css/theme2.css';
import './css/theme3.css';

function App() {
  const [currentOperation, setCurrentOperation] = useState("");
  const [theme, setTheme] = useState(1);
  const themeInput = useRef();

  useEffect(() => {
    const handleInputChange = () => {
      setTheme(themeInput.current.value);
    };

    themeInput.current.addEventListener("change", handleInputChange);

    return () => {
      themeInput.current.removeEventListener("change", handleInputChange);
    };
  }, []);

  const handleNumberClick = (value) => {
    const lastChar = currentOperation.slice(-1);
    const operators = [" + ", " - ", " x ", " / "];
    if ((currentOperation === "" || lastChar.endsWith(" ")) && operators.includes(value)) {
      return;
    }

    setCurrentOperation(currentOperation + value);
  };

  const handleResetClick = () => {
    setCurrentOperation("");
  };

  const handleDeleteClick = () => {
    const lastChar = currentOperation.slice(-1);
    const numCharsToDelete = lastChar.endsWith(" ") ? 3 : 1;
    setCurrentOperation(currentOperation.slice(0, -numCharsToDelete));
  };

  const handleEqualClick = () => {
    const lastChar = currentOperation.slice(-1);

    if (!lastChar.endsWith(" ") && currentOperation !== "") {
      let finalOperation = currentOperation;
      finalOperation = finalOperation.replace(/x/g, "*")
      const result = eval(finalOperation);
      setCurrentOperation(String(result));
    }
  };

  return (
    <div id="calculatorSubContainer" className={`theme${theme}`}>
      <div id="calculatorContainer">
        <header>
          <h1>calc</h1>
          <div id="theme">
            <div id="rangeInput">
              <div></div>
              <div id="inputIndicators">
                <p>1</p>
                <p>2</p>
                <p>3</p>
              </div>
              <div id="themeTitle">
                <h3>THEME</h3>
              </div>
              <input ref={themeInput} type="range" min={1} max={3} defaultValue={1} />
            </div>
          </div>
        </header>
        <div id="calculatorInput">
          <div id="input">
            <h2>{currentOperation}</h2>
          </div>
        </div>
        <div id="calculatorNumbers">
          <div id="topNumbers">
            {[7, 8, 9, "DEL", 4, 5, 6, "+", 1, 2, 3, "-", ".", 0, "/", "x"].map((value) => (
              <div className={value === "DEL" || value === "RESET" ? "delOrReset" : "classicNumber"} key={value} onClick={() => {
                if (value === "DEL") {
                  handleDeleteClick();
                } else if (value === "+" || value === "-" || value === "x" || value === "/") {
                  handleNumberClick(` ${value} `);
                } else {
                  handleNumberClick(value);
                }
              }}>
                <p>{value}</p>
              </div>
            ))}
          </div>
          <div id="bottomNumbers">
            <div className="delOrReset" onClick={handleResetClick}>
              <p>RESET</p>
            </div>
            <div className="equal" onClick={handleEqualClick}>
              <p>=</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
