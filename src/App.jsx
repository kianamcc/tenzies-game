import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Die from "./components/Die";

function App() {
  const getRandomNumbers = () => {
    const randomNumArr = [];
    for (let i = 0; i < 10; i++) {
      randomNumArr.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
      });
    }
    return randomNumArr;
  };

  const [numArr, setNumArr] = useState(getRandomNumbers());
  console.log(numArr);

  const diceElements = numArr.map((item, index) => (
    <Die value={item.value} key={index} />
  ));

  const handleRollBtnClick = () => {
    setNumArr(getRandomNumbers);
  };

  return (
    <main className="App">
      <div className="container">
        <h1 className="title">Tenzies</h1>
        <p className="game-description">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice-btn" onClick={handleRollBtnClick}>
          Roll
        </button>
      </div>
    </main>
  );
}

export default App;
