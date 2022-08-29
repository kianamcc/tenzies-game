import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Die from "./components/Die";

function App() {
  const randomNum = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  return (
    <main className="App">
      <div className="container">
        <h1 className="title">Tenzies</h1>
        <p className="game-description">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="die-container">
          <Die value={randomNum()} />
          <Die value={randomNum()} />
          <Die value={randomNum()} />
          <Die value={randomNum()} />
          <Die value={randomNum()} />
          <Die value={randomNum()} />
          <Die value={randomNum()} />
          <Die value={randomNum()} />
          <Die value={randomNum()} />
          <Die value={randomNum()} />
        </div>
      </div>
    </main>
  );
}

export default App;
