const sum = (x: number, y: number) => {
  let r = x + y;

  return r;
};

const subtract = (x: number, y: number) => {
  let r = x - y;

  return r;
};

const multiply = (x: number, y: number) => {
  let r = x * y;

  return r;
};

const divide = (x: number, y: number) => {
  let r = x / y;

  return r;
};

const percentage = (x: number, y: number = 0) => {
  let r = 0;

  if (!y) {
    r = x / 100;
  } else {
    r = x / 100 * y;
  };

  return r;
};

const change = (x: number) => {
  let r = String(x);
  if (r.includes("-")) {
    r = r.slice(1);
  } else {
    r = `-${r}`;
  }
};

let operations: any = {
  sum,
  subtract,
  multiply,
  divide,
  percentage,
  change,
}

export default operations;
