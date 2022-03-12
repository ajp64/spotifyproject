import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import css from "./spotify.module.css";

//REMOVE BEFORE PUSH
const accessToken =
  "BQAQ6qpaodPpffVv20u-QyG11QhqN-fYxCKRp7CJ_HgXsIc5eS0eglWFT6Wcc2OpCm02osYUqtRA-dxROCYT_OHGVbIZuEMxmOSq3xCzXKlj5fOHpEftZy8AOQtDiPAY597pOubDV-U";

export function Spotifyfetch({ artist, data }) {
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
      console.log(spotData);

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

    if (artist) {
      //   setArray(artistInfo["items"]);
      console.log(artistArray);
      //   console.log(spotData["items"]);
    }
  }, [data, artist]);

  if (artistArray[0] && artistInfo) {
    return (
      <>
        <h1>{artistInfo["name"]}</h1>
        <h2>{`Genres: ${artistInfo["genres"][0]} , ${artistInfo["genres"][1]} , ${artistInfo["genres"][2]}`}</h2>
        <img
          className={css.artistpic}
          src={artistArray[1]["url"]}
          alt={artist}
        />
      </>
    );
  } else {
    return <></>;
  }
}
