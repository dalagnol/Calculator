import React, { useState } from "react";
import { useTheme } from "../../themes";
import Operations from "../../operations";

import { Container, Screen, Result } from "./styles";
import { Button } from "../../components";
import { theme } from "./json";
import { keyCodes } from "./constants";

export default function Calculator() {
  useTheme("calculator", theme);

  const [editing, setEditing] = useState("x");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [operation, setOperation] = useState("");
  const [comma, setComma] = useState(1);
  const [row, setRow] = useState(false);
  const [newNumber, setNewNumber] = useState(false);
  const [displayY, setDisplayY] = useState(false);

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

  const prepare = (n: number) => {
    let result = String(n);
    
    if (result.includes(".")) {
      result = result.replace(".", ",");
    }

    if (n >= 1000 && n <= 9999) {
      let part1 = result.substring(0, 1);
      let part2 = result.substring(1);

      result = `${part1}.${part2}`;
    } else if (n >= 10000 && n <= 99999) {
      let part1 = result.substring(0, 2);
      let part2 = result.substring(2);

      result = `${part1}.${part2}`;
    } else if (n >= 100000 && n <= 999999) {
      let part1 = result.substring(0, 3);
      let part2 = result.substring(3);

      result = `${part1}.${part2}`;
    } else if (n >= 1000000 && n <= 9999999) {
      let part1 = result.substring(0, 1);
      let part2 = result.substring(1, 4);
      let part3 = result.substring(4);

      result = `${part1}.${part2}.${part3}`;
    } else if (n >= 10000000 && n <= 99999999) {
      let part1 = result.substring(0, 2);
      let part2 = result.substring(2, 5);
      let part3 = result.substring(5);

      result = `${part1}.${part2}.${part3}`;
    } else if (n >= 100000000 && n <= 999999999) {
      let part1 = result.substring(0, 3);
      let part2 = result.substring(3, 6);
      let part3 = result.substring(6);

      result = `${part1}.${part2}.${part3}`;
    };

    return result;
  };

  const keyHandler = (e: any) => {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      submitNumber(keyCodes[e.keyCode]);
    } else if (e.keyCode === 188 || e.keyCode === 190) {
      submitComma();
    } else if (e.keyCode === 189 || e.keyCode === 170 || e.keyCode === 191) {
      submitOperation(keyCodes[e.keyCode])
    } else if (e.shiftKey && e.keyCode === 187) {
      submitOperation("sum");
    } else if (e.shiftKey && e.keyCode === 56) {
      submitOperation("multiply");
    } else if (e.keyCode === 187 || e.keyCode === 13) {
      operateTwoNumbers(x, y, operation);
      setEditing("x");
    } else if (e.keyCode === 27 || e.keyCode === 67) {
      clear();
    }
  }

  console.log(x, y, operation);
    
  return (
    <Container>
      <Screen>
        <Result>{editing === "y" && displayY ? prepare(y) : prepare(x)}</Result>
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
        color={"main"}
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
        color={"main"}
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
        color={"main"}
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
        color={"main"}
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
