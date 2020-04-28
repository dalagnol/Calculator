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
    sep: "."
  },
  pt: {
    dec: ".",
    sep: ","
  },
  fr: {
    dec: " ",
    sep: ","
  }
};

const localised: { [y in spot]: character } = locale["en"];

export function format(x: number | string) {
  x = String(x);
  let y = "";
  let z = "";

  if (x.includes(".")) {
    y = x.substring(x.indexOf(".") + 1);
    x = x.substring(0, x.indexOf("."));
  }

  if (x.includes("-")) {
    z = x.substring(1, x.indexOf("-"));
    x = x.substring(x.indexOf("-") + 1);
  }

  const arr = [];
  for (let i = x.length - 3; i >= -2; i -= 3) {
    arr.push(x.substring(i, i + 3));
  }

  arr.reverse();

  return `${z}${arr.join(localised.dec)}${
    Number(y) ? `${localised.sep}${y}` : ""
  }`;
}

export const opcodes: { [x: number]: string } = {
  2: "divide",
  3: "multiply",
  4: "subtract",
  5: "sum"
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
  ["=", 187]
];

export const byKeycode = (keyCode: number) => (entry: any) =>
  entry[1] === keyCode;

export const byKeyLabel = (byKeyLabel: string) => (entry: any) =>
  entry[0] === byKeyLabel;

export const numberWithoutShift = ({ keyCode, shiftKey }: any) =>
  keyCode >= 48 && keyCode <= 57 && !shiftKey;

export const e = (keyCode: number, shiftKey = false) => ({ keyCode, shiftKey });
