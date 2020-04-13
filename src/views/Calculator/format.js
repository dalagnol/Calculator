const locale = {
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

const localised = locale[process.argv[3] || "en"];

export default function format(x) {
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

console.log(format(process.argv[2]));
