export default function U(string: string) {
  return `${string.substring(0, 1).toUpperCase()}${string
    .substring(1)
    .toLowerCase()}`;
}
