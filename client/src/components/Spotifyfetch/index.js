import { useState, useEffect } from "react";
import css from "./spotify.module.css";
import FadeIn from "react-fade-in";
import { AspectRatio } from "@chakra-ui/react";

export function Spotifyfetch({ artist, data, accessToken }) {
  const [artistInfo, setInfo] = useState(null);
  const [artistArray, setArray] = useState([]);

  //test code for spotify
  async function spotFetch() {
    if (artist) {
      const res = await fetch(
        `	https://api.spotify.com/v1/search?q=${artist}&type=artist`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const spotData = await res.json();

      if (spotData) {
        setArray(spotData["artists"]["items"][0]["images"]);
        setInfo(spotData["artists"]["items"][0]);
      }
    }
  }

  useEffect(() => {
    if (data) {
      console.log(data.payload);
      if (data.payload.length > 0) {
        spotFetch();
      }
    }

    // if (artist) {
    //   console.log(artistArray);
    // }
  }, [data, artist]);

  if (artistArray[0] && artistInfo) {
    return (
      <FadeIn>
        <h1 className={css.artisttitle}>{artistInfo["name"]}</h1>
        <AspectRatio ratio={4 / 4}>
          <img
            className={css.artistpic}
            src={artistArray[1]["url"]}
            alt={artist}
          />
        </AspectRatio>
        <br></br>
        <h2 className={css.genretitle}>Genres:</h2>
        <br></br>
        <ul className={css.genres}>
          {artistInfo["genres"].map((genre, index) => {
            return <li key={index}>{genre}</li>;
          })}
        </ul>
      </FadeIn>
    );
  } else {
    return (
      <h1
        className={css.genretitle}
      >{`Spotify seems to having trouble with info about ${artist} at the moment... try another band for now!`}</h1>
    );
  }
}
