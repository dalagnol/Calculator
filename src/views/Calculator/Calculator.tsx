import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from "react";

import { useTheme } from "theme";

import Operations from "../../operations";

import { Container, Screen, Result } from "./styles";
import { Button } from "../../components";
import { themejson } from "./json";

import {
  format as formatted,
  table,
  opcodes,
  byKeycode,
  numberWithoutShift,
  e as event
} from "./constants";

export default function Calculator() {
  const { theme } = useTheme("calculator", themejson);
  const ref: any = useRef(null);

  const [editing, setEditing] = useState("x");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [operation, setOperation] = useState("");
  const [comma, setComma] = useState(1);
  const [row, setRow] = useState(false);
  const [newNumber, setNewNumber] = useState(false);
  const [displayY, setDisplayY] = useState(false);
  const [pressed, setPressed] = useState<number>(0);
  const [willBeNegative, setWillBeNegative] = useState(false);

  useEffect(() => {
    if (theme.current === "light") {
      document.body.style.backgroundColor = "";
      document.body.style.backgroundImage =
        "url('https://images.template.net/wp-content/uploads/2016/04/22084512/Light-Colored-Wooden-Background.jpg')";
      document.body.style.backgroundSize = "";
    } else if (theme.current === "dark") {
      document.body.style.backgroundColor = "#CD9143";
      document.body.style.backgroundImage =
        "linear-gradient(90deg, rgba(206,145,67,.07) 50%, transparent 50%), linear-gradient(90deg, rgba(255,224,185,.13) 50%, transparent 50%), linear-gradient(90deg, rgba(135,79,6,.17) 50%, transparent 50%), linear-gradient(90deg, rgba(90,51,3,.19) 50%, transparent 50%)";
      document.body.style.backgroundSize = "13px, 29px, 37px, 53px";
    }
  }, [theme.current]);

  const clear = () => {
    setEditing("x");
    setX(0);
    setY(0);
    setOperation("");
    setComma(1);
    setRow(false);
    setDisplayY(false);
    setWillBeNegative(false);

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

        if (willBeNegative) {
          result = String(Operations.change(value, 0));
        }
      }

      if (comma === 2) {
        result = result.concat(`.${value}`);
        setComma(0);
      } else if (!willBeNegative) {
        result = result.concat(value);
        setNewNumber(false);
      }
      setWillBeNegative(false);

      if (row || editing === "y") {
        setY(Number(result));
        setDisplayY(true);
      } else {
        setX(Number(result));
      }

      return result;
    },
    [comma, editing, newNumber, row, x, y, willBeNegative]
  );

  const submitOperation = (op: string) => {
    if (!x) {
      if (op === "subtract") {
        setWillBeNegative(true);
      }
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

  const backspace = () => {
    const vars: { [x: string]: number } = { x, y };
    const setters: { [y: string]: Function } = { x: setX, y: setY };

    setters[editing](
      Number(
        String(vars[editing]).substring(0, String(vars[editing]).length - 1)
      )
    );
  };

  const display = useMemo(
    () => (editing === "y" && displayY ? formatted(y) : formatted(x)),
    [displayY, editing, x, y]
  );

  const handlers: { [x: number]: Function } = {
    188: submitComma,
    190: submitComma,
    27: clear,
    67: clear,
    8: backspace,
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
    187(e: any) {
      if (e.shiftKey) {
        submitOperation("sum");
      } else {
        operateTwoNumbers(x, y, operation);
        setEditing("x");
      }
    }
  };

  const handle = useCallback(
    (e: any, click = false) => {
      if (!e.metaKey && !e.ctrlKey) {
        if (handlers[e.keyCode] || numberWithoutShift(e)) {
          if (!click) {
            setPressed((e.shiftKey ? 500 : 1) * e.keyCode);
          }

          if (handlers[e.keyCode]) {
            handlers[e.keyCode](e);
          } else if (numberWithoutShift(e)) {
            submitNumber(table.find(byKeycode(e.keyCode))[0]);
          }
        }
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
              onClick={() => handle(event(code, shift), true)}
              pressed={pressed === (shift ? code * 500 : code)}
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
  }, [operation, handle, pressed]);

  ref.current?.select();

  return (
    <Container>
      <Screen>
        <Result>{display}</Result>
      </Screen>
      <input
        ref={ref}
        autoFocus={true}
        readOnly={true}
        style={{ opacity: 0 }}
        onBlur={() => ref.current?.focus()}
        onKeyDown={handle}
        onKeyUp={() => setPressed(0)}
        value={display}
        onPaste={(e: any) => {
          let data = e.clipboardData.getData("text");

          if (String(Number(data)) === String(data)) {
            editing === "x" ? setX(Number(data)) : setY(Number(data));
            if (editing === "y") {
              setDisplayY(true);
            }
          }
        }}
      />
      {Buttons}
    </Container>
  );
}
