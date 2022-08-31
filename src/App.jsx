import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

/*Other Feature Ideas
- Track number of rolls it took to win (COMPLETED)
- Track time it took to win
- Save best time to localStorage
*/

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
  const [rollCount, setRollCount] = useState(0);
  const [timeRecord, setTimeRecord] = useState(0); // save time to local storage
  const [timer, setTimer] = useState(0);
  const [minute, setMinute] = useState(0);
  const [timerOn, setTimerOn] = useState(true);

  const stopTimer = () => {
    clearInterval(setSeconds(0));
  };

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
      setRollCount(0);
      return;
    } else {
      setDice((prevArr) => {
        return prevArr.map((die) => {
          // if held is true leave as is
          return die.isHeld ? die : generateDie();
        });
      });
    }
    setRollCount((prevCount) => prevCount + 1);
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
      setTimerOn(false);
    } else {
      setTenzies(false);
    }
  }, [dice]);

  useEffect(() => {
    let interval = 0;
    formatTime();
    if (timerOn) {
      // start time
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      // stop timer
      clearInterval(interval);
    }
    return () => clearInterval(interval); // clean up
  }, [timerOn]);

  const formatTime = () => {
    if (timer > 59) {
      setMinute((prevMinute) => prevMinute + 1);
      setTimer(0);
    } else {
      return `${minute}:${timer}s`;
    }
  };

  return (
    <main className="App">
      <div className="container">
        {tenzies && <Confetti />}
        <div className="header">
          <p className="timer">Timer: {formatTime()}</p>
          <p className="roll-tracker">Number of rolls: {rollCount}</p>
        </div>
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
