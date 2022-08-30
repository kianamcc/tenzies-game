import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Die from "./components/Die";

function App() {
  const randomNum = () => {
    const randomNumArr = [];
    for (let i = 0; i < 10; i++) {
      randomNumArr.push(Math.floor(Math.random() * 6) + 1);
    }
    return randomNumArr;
  };

  const [numArr, setNumArr] = useState(randomNum());

  const generateDice = () => {
    return numArr.map((item) => <Die value={item} />);
  };

  return (
    <main className="App">
      <div className="container">
        <h1 className="title">Tenzies</h1>
        <p className="game-description">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{generateDice()}</div>
      </div>
    </main>
  );
}

export default App;
