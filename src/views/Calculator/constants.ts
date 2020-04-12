export const keys: any = [
  ["C", 27],
  ["±", 189],
  ["%", 53, true],
  ["÷", 191],
  ["7", 55],
  ["8", 56],
  ["9", 57],
  ["×", 56, true],
  ["4", 52],
  ["5", 53],
  ["6", 54],
  ["-", 189],
  ["1", 49],
  ["2", 50],
  ["3", 51],
  ["+", 187, true],
  ["0", 48],
  [",", 190],
  ["=", 187],
]

export const keyCodes: {
  [x: number]: any;
} = {
  8: (x: number) => {
    let res = String(x);
    res = res.substring(0, res.length - 1);

    return Number(res);
  },
  48: 0,
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6,
  55: 7,
  56: 8,
  57: 9,
  187: "operate",
  189: "subtract",
  191: "divide"
};


export const op: {
  [x: number]: string;
} = {
  2: "divide",
  3: "multiply",
  4: "subtract",
  5: "sum"
};