export default function Map(data: any, Component: any) {
  return (
    data &&
    Object.entries(data).map(([name, value]: [string, any], key: number) =>
      Component({ key, name, value })
    )
  );
}
