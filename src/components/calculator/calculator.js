import React, { useState } from 'react';
import Keypad from '../keypad';
import Screen from '../screen';
import s from './calculator.module.css';

export default function Calculator() {
  // TODO: Implement calculator logic here
  const [display, setDisplay] = useState("");
  const [l, setL] = useState([""]);

  const calculate = (l) => {
    let num1 = l.shift(), op = l.shift(), num2 = l.shift();
    l.unshift(operators[op](parseFloat(num1), parseFloat(num2)).toString());
  }

  const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    'x': (x, y) => x * y,
    '÷': (x, y) => x / y,
    '%': (x, y) => x % y,
  };

  const f = (input) => {
    switch (input) {
      case "C":
        l.length = 0;
        l.push("");
        break;
      case "+/-":
        let temp = l.pop();
        l.push(temp && temp.charAt(0) != "-" ? "-".concat(temp) : temp.substring(1));
        break;
      case "=":
        if (l.at(-1)) {
          calculate(l);
        }
        break;
      case "÷":
      case "+":
      case "-":
      case "x":
      case "%":
        if (!l.at(-1)) {
          l.pop();
          l.pop();
        }
        l.push(input);
        l.push("");
        break;
      case ".":
        if (l.at(-1).includes(".")) {
          break;
        }
      default:
        l.push(l.pop().concat(input));
        break;
    }

    if (l.length > 3) {
      calculate(l);
    }


    setDisplay(l.join(""));
    console.log(l);
  }
  return (
    <div className={s.calculator}>
      <Screen text={display} />
      <Keypad callback={f} />
    </div>
  );
}
