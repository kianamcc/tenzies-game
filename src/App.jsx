import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const generateDie = () => {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  };

  const allNewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDie());
    }
    return newDice;
  };

  const getRandomNumbers = () => {
    const randomNumArr = [];
    for (let i = 0; i < 10; i++) {
      randomNumArr.push(generateDie());
    }
    return randomNumArr;
  };

  const [dice, setDice] = useState(getRandomNumbers());
  const [tenzies, setTenzies] = useState(false); // represents whether the user won the game or not

  const holdDie = (id) => {
    setDice((prevArr) => {
      return prevArr.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  };

  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      isHeld={die.isHeld}
      key={die.id}
      holdDie={() =>
        holdDie(die.id)
      } /* pass function and die id at the same time */
    />
  ));

  const handleBtnClick = () => {
    if (tenzies) {
      setDice(allNewDice());
    } else {
      setDice((prevArr) => {
        return prevArr.map((die) => {
          // if held is true leave as is
          return die.isHeld ? die : generateDie();
        });
      });
    }
  };

  // * Challenge: Check the dice array for these winning conditions:
  // * 1. All dice are held, and
  // * 2. all dice have the same value
  useEffect(() => {
    // check if all dice are held
    const allDiceHeld = dice.every((die) => die.isHeld);
    // pick a arbitrary value
    const diceVal = dice[0].value;
    // check if all dice have the same value
    const allDiceSameVal = dice.every((die) => die.value === diceVal);

    if (allDiceHeld && allDiceSameVal) {
      setTenzies(true);
    } else {
      setTenzies(false);
    }
  }, [dice]);

  return (
    <main className="App">
      <div className="container">
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="game-description">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice-btn" onClick={handleBtnClick}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}

export default App;
