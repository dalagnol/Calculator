import React, { useState, useRef, useCallback, useMemo } from "react";
import { useTheme } from "../../themes";
import Operations from "../../operations";

import { Container, Screen, Result } from "./styles";
import { Button } from "../../components";
import { theme } from "./json";

import {
  keyCodes,
  format as formatted,
  table,
  opcodes,
  byKeycode,
  numberWithoutShift,
  e as event,
} from "./constants";

export default function Calculator() {
  useTheme("calculator", theme);
  const ref: any = useRef(null);

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

  const submitNumber = useCallback(
    (value: string) => {
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
    },
    [comma, editing, newNumber, row, x, y]
  );

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

  const handlers: { [x: number]: Function } = {
    188: submitComma,
    190: submitComma,
    27: clear,
    67: clear,
    13() {
      operateTwoNumbers(x, y, operation);
      setEditing("x");
    },
    53(e: any) {
      if (e.shiftKey) {
        operateOneNumber("percentage");
      } else {
        submitNumber("5");
      }
    },
    56(e: any) {
      if (e.shiftKey) {
        submitOperation("multiply");
      } else {
        submitNumber("8");
      }
    },
    189(e: any) {
      if (e.shiftKey) {
        operateOneNumber("change");
      } else {
        submitOperation("subtract");
      }
    },
    191() {
      submitOperation("divide");
    },
    8(e: any) {
      const res = keyCodes[e.keyCode](editing === "x" ? x : y);
      editing === "x" ? setX(res) : setY(res);
    },
    187(e: any) {
      if (e.shiftKey) {
        submitOperation("sum");
      } else {
        operateTwoNumbers(x, y, operation);
        setEditing("x");
      }
    },
  };

  const handle = useCallback(
    (e: any) => {
      if (handlers[e.keyCode]) {
        handlers[e.keyCode](e);
      } else if (numberWithoutShift(e)) {
        submitNumber(table.find(byKeycode(e.keyCode))[0]);
      }
    },
    [handlers, submitNumber]
  );

  const Buttons = useMemo(() => {
    const result = [];
    let i = 0;

    let zero = false;

    for (let row = 2; row <= 6; row++) {
      for (let column = 1; column <= 4; column++) {
        if (i < table.length) {
          let justPassedZero = false;

          if (!zero) {
            zero = table[i][0] === "0";
            if (zero) {
              justPassedZero = true;
            }
          }

          const [key, code, shift]: [
            string,
            number,
            boolean | undefined
          ] = table[i++];

          result.push(
            <Button
              color={
                column === 4 && operation === opcodes[row]
                  ? "selected"
                  : column === 4
                  ? "main"
                  : row === 2
                  ? "secondary"
                  : "number"
              }
              position={{ column, row, zero }}
              onClick={() => handle(event(code, shift))}
            >
              {key}
            </Button>
          );

          if (justPassedZero) {
            column++;
          }
        }
      }
    }

    return result;
  }, [operation, handle]);

  return (
    <Container>
      <Screen>
        <Result>
          {editing === "y" && displayY ? formatted(y) : formatted(x)}
        </Result>
      </Screen>
      <input
        ref={ref}
        autoFocus={true}
        readOnly={true}
        style={{ opacity: 0 }}
        onBlur={() => ref.current?.focus()}
        onKeyDown={handle}
      />
      {Buttons}
    </Container>
  );
}
