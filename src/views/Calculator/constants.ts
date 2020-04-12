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
  170: "multiply",
  187: "operate",
  189: "subtract",
  191: "divide"
};
