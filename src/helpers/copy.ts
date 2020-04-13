export default function copy(str: string) {
  const el = document.createElement("textarea");
  el.value = JSON.stringify(str, null, 2);
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
