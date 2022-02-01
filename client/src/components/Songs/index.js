export function Songs({ songs }) {
  return songs.map((item) => {
    return <p>{item.track}</p>;
  });
}
