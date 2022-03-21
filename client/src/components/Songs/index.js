import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Spotifyfetch } from "../Spotifyfetch";
import { SimpleBarChart } from "../SongChart/songchart";
import FadeIn from "react-fade-in";
import { Container, Flex, Box, Spacer } from "@chakra-ui/react";

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
  // if (data) {
  //   console.log(`Logging songs data`, data.payload);
  //   console.log(`Logging plays`, plays, counted);
  //   console.log(`logging count`, counted);
  // }

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
      setPlays([...playsArray.slice(0, 10)]);
      setTotal(data.payload.length);
    } else {
      setSongs([]); // seems to occasionally cause a memory leak?
    }
  }, [data]);

  useEffect(() => {
    const countMap = plays.map(([name, count]) => ({ name, count }));
    if (plays.length > 0) {
      setCount(countMap.slice(0, 10));
    }
  }, [plays, data]);

  if (songs.length > 0) {
    return (
      <FadeIn>
        <Flex justifyContent="space-around">
          <Box flexShrink={0} w="30%">
            <Spotifyfetch
              artist={artist}
              data={data}
              borderRadius="lg"
              width={{ md: 40 }}
            />
          </Box>
          <Spacer />
          <Box flexShrink={0} w="50%">
            <h2>{songs.length ? `Total plays: ${totalPlays}` : ""}</h2>
            {counted ? (
              <h2>
                {counted.length === 1
                  ? `The only song I listened to for ${artist}:`
                  : `My ${counted.length} most played tracks for ${artist}:`}
              </h2>
            ) : (
              <></>
            )}
            {/* {plays.map((item, i) => {
          return (
            <h3 key={i}>
              {item[1] === 1
                ? `${item[0]} : ${item[1]} play`
                : `${item[0]} : ${item[1]} plays`}
            </h3>
          );
        })} code used for text list of play count */}
            {counted ? (
              <SimpleBarChart songdata={counted} artist={artist} />
            ) : (
              <></>
            )}
          </Box>
        </Flex>
      </FadeIn>
    );
  } else {
    return <h1>{`Is that an artist? I guess I didn't listen to them...`}</h1>;
  }
}
