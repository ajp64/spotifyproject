import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

function onlyUnique(value, index, self) {
  return index === self.findIndex((t) => t.track === value.track);
}

export function Songs({ artist }) {
  const [songs, setSongs] = useState([]);
  const url = `https://my-spotify-2021.herokuapp.com/artist?name=${artist}`;
  const { data } = useFetch(url);

  useEffect(() => {
    if (data) {
      let filteredSongs = data.payload.filter(onlyUnique);
      setSongs(filteredSongs);
    }
  }, [data]);

  if (data) {
    return (
      <>
        <h1>{artist}</h1>
        <h2>{songs.length ? `Number of plays: ${data.payload.length}` : ""}</h2>
        {songs.map((item, index) => {
          return <h3 key={index}>{item.track}</h3>;
        })}
      </>
    );
  } else {
    return null;
  }
}
