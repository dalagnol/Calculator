import React, { useState, useEffect } from "react";
import { useTheme } from "../../themes";
import Operations from "../../operations";

import { Container, Screen, Result } from "./styles";
import { Button } from "../../components";
import { theme } from "./json";
import { keyCodes, op, keys } from "./constants";
import { format } from "./format";

export default function Calculator({ setBodyColor }: any) {
  useTheme("calculator", theme);

  const [editing, setEditing] = useState("x");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [operation, setOperation] = useState("");
  const [comma, setComma] = useState(1);
  const [row, setRow] = useState(false);
  const [newNumber, setNewNumber] = useState(false);
  const [displayY, setDisplayY] = useState(false);

  useEffect(() => {
    if (window.getComputedStyle(document.body, null).getPropertyValue("background-color") === "rgb(0, 0, 0)") {
      setBodyColor("black");
    } else {
      setBodyColor("white");
    }
  }, [window.getComputedStyle(document.body, null).getPropertyValue("background-color")]);

  const clear = () => {
    setEditing("x");
    setX(0);
    setY(0);
    setOperation("");
    setComma(1);
    setRow(false);
    setDisplayY(false);

    return true;
  };

  const operateTwoNumbers = (x: number, y: number, operation: string) => {
    if (x && y && operation) {
      const result = Operations[operation](x, y);
      clear();
      setNewNumber(true);
      setX(result);

      return true;
    }

    return x;
  };

  const operateOneNumber = (operation: string) => {
    if (x && editing === "x") {
      const result = Operations[operation](x);
      setY(0);
      setOperation("");
      setRow(false);
      setX(result);

      return true;
    } else if (y && editing === "y") {
      const result = Operations[operation](x, y);
      setY(result);
    }
  };

  const submitNumber = (value: string) => {
    let result = "";

    if (row || editing === "y") {
      result = String(y);
      setEditing("y");
    } else if (!newNumber && editing === "x") {
      result = String(x);
    } else {
      setX(0);
      result = "0";
    }

    if (result === "0") {
      result = "";
    }

    if (comma === 2) {
      result = result.concat(`.${value}`);
      setComma(0);
    } else if (result.length < 9) {
      result = result.concat(value);
      setNewNumber(false);
    }

    if (row || editing === "y") {
       setY(Number(result));
       setDisplayY(true);
      } else {
       setX(Number(result));
      }

    return result;
  };

  const submitOperation = (op: string) => {
    if (!x) {
      return true;
    } else if (operation) {
      operateTwoNumbers(x, y, operation);
      setOperation(op);
      setEditing("x");
      setRow(true);

      return true;
    } else {
      setOperation(op);
      setEditing("y");
      setComma(1);

      return true;
    }
  };

  const submitComma = () => {
    let result = comma;
    result = result + 1;

    setComma(result);
  };

  const keyHandler = (e: any) => {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      submitNumber(keyCodes[e.keyCode]);
    } else if (e.keyCode === 188 || e.keyCode === 190) {
      submitComma();
    } else if (e.keyCode === 189 || e.keyCode === 191) {
      submitOperation(keyCodes[e.keyCode])
    } else if (e.shiftKey && e.keyCode === 187) {
      submitOperation("sum");
    } else if (e.shiftKey && e.keyCode === 56) {
      submitOperation("multiply");
    } else if (e.keyCode === 13 || e.keyCode === 187) {
      operateTwoNumbers(x, y, operation);
      setEditing("x");
    } else if (e.keyCode === 27 || e.keyCode === 67) {
      clear();
    } else if (e.keyCode === 8) {
      const res = keyCodes[e.keyCode](editing === "x" ? x : y);
      editing === "x" ? setX(res) : setY(res);
    }
  }

  const Buttons = () => {
    const result = [];
    let i = 0;

    for (let row = 2; row < 7; row++) {
      for (let column = 1; column < 5; column++) {
        let zero = false;

        if (keys[i].content === "0") {
          zero = true;
        }

        let [content, code, shift] = keys[i];
        i++;

        result.push(
          <Button 
          position={{column, row, zero}} 
          color={row === 2 && column < 4 ? 
          "secondary" 
          : column === 4 && operation === op[column] ? 
          "selected" 
          : column === 4 ? 
          "main" 
          : "number"}
          >
          {content}
          </Button>
        );

        if (zero) {
          column++;
          zero = false;
        }
      }
    }
  }
    
  return (
    <Container>
      <Screen>
        <Result>{editing === "y" && displayY ? format(y) : format(x)}</Result>
      </Screen>
      <Button color={"secondary"} position={{column: 1, row: 2}} onClick={() => clear()} onKeyUp={keyHandler}>
        C
      </Button>
      <Button
        color={"secondary"}
        position={{column: 2, row: 2}}
        onClick={() => operateOneNumber("change")}
        onKeyUp={keyHandler}
      >
        ±
      </Button>
      <Button
        color={"secondary"}
        position={{column: 3, row: 2}}
        onClick={() => operateOneNumber("percentage")}
        onKeyUp={keyHandler}
      >
        %
      </Button>
      <Button
        color={operation === "divide" ? "selected" : "main"}
        position={{column: 4, row: 2}}
        onClick={() => submitOperation("divide")}
        onKeyUp={keyHandler}
      >
        ÷
      </Button>
      <Button
        color={"number"}
        position={{column: 1, row: 3}}
        onClick={() => submitNumber("7")}
        onKeyUp={keyHandler}
      >
        7
      </Button>
      <Button
        color={"number"}
        position={{column: 2, row: 3}}
        onClick={() => submitNumber("8")}
        onKeyUp={keyHandler}
      >
        8
      </Button>
      <Button
        color={"number"}
        position={{column: 3, row: 3}}
        onClick={() => submitNumber("9")}
        onKeyUp={keyHandler}
      >
        9
      </Button>
      <Button
        color={operation === "multiply" ? "selected" : "main"}
        position={{column: 4, row: 3}}
        onClick={() => submitOperation("multiply")}
        onKeyUp={keyHandler}
      >
        ×
      </Button>
      <Button
        color={"number"}
        position={{column: 1, row: 4}}
        onClick={() => submitNumber("4")}
        onKeyUp={keyHandler}
      >
        4
      </Button>
      <Button
        color={"number"}
        position={{column: 2, row: 4}}
        onClick={() => submitNumber("5")}
        onKeyUp={keyHandler}
      >
        5
      </Button>
      <Button
        color={"number"}
        position={{column: 3, row: 4}}
        onClick={() => submitNumber("6")}
        onKeyUp={keyHandler}
      >
        6
      </Button>
      <Button
        color={operation === "subtract" ? "selected" : "main"}
        position={{column: 4, row: 4}}
        onClick={() => submitOperation("subtract")}
        onKeyUp={keyHandler}
      >
        -
      </Button>
      <Button
        color={"number"}
        position={{column: 1, row: 5}}
        onClick={() => submitNumber("1")}
        onKeyUp={keyHandler}
      >
        1
      </Button>
      <Button
        color={"number"}
        position={{column: 2, row: 5}}
        onClick={() => submitNumber("2")}
        onKeyUp={keyHandler}
      >
        2
      </Button>
      <Button
        color={"number"}
        position={{column: 3, row: 5}}
        onClick={() => submitNumber("3")}
        onKeyUp={keyHandler}
      >
        3
      </Button>
      <Button
        color={operation === "sum" ? "selected" : "main"}
        position={{column: 4, row: 5}}
        onClick={() => submitOperation("sum")}
        onKeyUp={keyHandler}
      >
        +
      </Button>
      <Button
        color={"number"}
        position={{column: 1, row: 6, zero: true}}
        onClick={() => submitNumber("0")}
        onKeyUp={keyHandler}
      >
        0
      </Button>
      <Button color={"number"} position={{column: 3, row: 6}} onClick={() => submitComma()} onKeyUp={keyHandler}>
        ,
      </Button>
      <Button
        color={"main"}
        position={{column: 4, row: 6}}
        onClick={() => {
          operateTwoNumbers(x, y, operation);
          setEditing("x");
        }}
        onKeyUp={keyHandler}
      >
        =
      </Button>
    </Container>
  );
}
