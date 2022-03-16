import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Spotifyfetch } from "../Spotifyfetch";
import { SimpleBarChart } from "../SongChart/songchart";

function onlyUnique(value, index, self) {
  return index === self.findIndex((t) => t.track === value.track);
}

export function Songs({ artist }) {
  const [songs, setSongs] = useState([]);
  const [plays, setPlays] = useState([]);
  const [totalPlays, setTotal] = useState();
  const [counted, setCount] = useState(null);
  const url = `https://my-spotify-2021.herokuapp.com/artist?name=${artist}`;
  const { data } = useFetch(url);
  if (data) {
    console.log(`Logging songs data`, data.payload);
    console.log(`Logging plays`, plays, counted);
    console.log(`logging count`, counted);
    let playCount = data.payload.length;
  }

  useEffect(() => {
    if (data && data.payload.length > 0) {
      let filteredSongs = data.payload.filter(onlyUnique);
      let countedNames = data.payload.reduce(function (allNames, name) {
        if (name.track in allNames) {
          allNames[name.track]++;
        } else {
          allNames[name.track] = 1;
        }
        return allNames;
      }, {});

      let playsArray = [];
      for (let i in countedNames) {
        playsArray.push([i, countedNames[i]]);
      }
      playsArray.sort(function (a, b) {
        return b[1] - a[1];
      });
      setSongs(filteredSongs);
      setPlays([...playsArray]);

      setTotal(data.payload.length);
    }
  }, [data]);

  useEffect(() => {
    const countMap = plays.map(([name, count]) => ({ name, count }));
    setCount(countMap);
  }, [plays, data]);

  if (songs) {
    return (
      <>
        <Spotifyfetch artist={artist} data={data} />
        <h2>{songs.length ? `Total plays: ${totalPlays}` : ""}</h2>
        {plays.map((item, i) => {
          return (
            <h3 key={i}>
              {item[1] === 1
                ? `${item[0]} : ${item[1]} play`
                : `${item[0]} : ${item[1]} plays`}
            </h3>
          );
        })}
        {counted ? (
          <SimpleBarChart songdata={counted} xKey="name" yKey="count" />
        ) : (
          <></>
        )}
      </>
    );
  } else {
    return null;
  }
}
