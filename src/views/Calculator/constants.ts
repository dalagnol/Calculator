type flag = "en" | "pt" | "fr";
type spot = "dec" | "sep";
type character = "," | "." | " ";

const locale: {
  [x in flag]: {
    [y in spot]: character;
  };
} = {
  en: {
    dec: ",",
    sep: ".",
  },
  pt: {
    dec: ".",
    sep: ",",
  },
  fr: {
    dec: " ",
    sep: ",",
  },
};

const localised: { [y in spot]: character } =
  locale[(process.argv[3] as flag) || "en"];

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
  191: "divide",
};

export function format(x: number | string) {
  x = String(x);
  let y = "";

  if (x.includes(".")) {
    y = x.substring(x.indexOf(".") + 1);
    x = x.substring(0, x.indexOf("."));
  }

  const arr = [];
  for (let i = x.length - 3; i >= -2; i -= 3) {
    arr.push(x.substring(i, i + 3));
  }

  arr.reverse();

  return `${arr.join(localised.dec)}${Number(y) ? `${localised.sep}${y}` : ""}`;
}

export const opcodes: { [x: number]: string } = {
  2: "divide",
  3: "multiply",
  4: "subtract",
  5: "sum",
};

export const table: any = [
  ["C", 27],
  ["±", 189, true],
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
];
