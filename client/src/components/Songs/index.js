import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

function onlyUnique(value, index, self) {
  return index === self.findIndex((t) => t.track === value.track);
}

export function Songs({ artist }) {
  const [songs, setSongs] = useState([]);
  const [plays, setPlays] = useState([]);
  const url = `https://my-spotify-2021.herokuapp.com/artist?name=${artist}`;
  const { data } = useFetch(url);

  useEffect(() => {
    if (data) {
      let filteredSongs = data.payload.filter(onlyUnique);
      let countedNames = data.payload.reduce(function (allNames, name) {
        if (name.track in allNames) {
          allNames[name.track]++;
        } else {
          allNames[name.track] = 1;
        }
        return allNames;
      }, {});
      console.log(countedNames);
      let playsArray = [];
      for (let i in countedNames) {
        playsArray.push([i, countedNames[i]]);
      }
      playsArray.sort(function (a, b) {
        return b[1] - a[1];
      });
      setSongs(filteredSongs);
      setPlays([...playsArray]);
    }
  }, [data]);

  if (data) {
    return (
      <>
        <h1>{artist}</h1>
        <h2>{songs.length ? `Total plays: ${data.payload.length}` : ""}</h2>
        {plays.map((item, i) => {
          return (
            <h3 key={i}>
              {item[1] === 1
                ? `${item[0]} : ${item[1]} play`
                : `${item[0]} : ${item[1]} plays`}
            </h3>
          );
        })}
      </>
    );
  } else {
    return null;
  }
}
