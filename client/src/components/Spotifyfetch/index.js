import { useState, useEffect } from "react";
import css from "./spotify.module.css";
import base64 from "base-64";
import FadeIn from "react-fade-in";
import { AspectRatio } from "@chakra-ui/react";

let url = "https://accounts.spotify.com/api/token";
let username = process.env.REACT_APP_CLIENT_ID;
let password = process.env.REACT_APP_CLIENT_SECRET;

//let headers = new Headers();

//headers.append('Content-Type', 'text/json');
const header = {
  Authorization: "Basic " + base64.encode(username + ":" + password),
  "Content-Type": "application/x-www-form-urlencoded",
};

export function Spotifyfetch({ artist, data }) {
  const [artistInfo, setInfo] = useState(null);
  const [artistArray, setArray] = useState([]);
  const [accessToken, setToken] = useState(null);

  async function authGet() {
    const authdata = await fetch(url, {
      method: "POST",
      headers: header,
      body: "grant_type=client_credentials",
    });
    const auth = await authdata.json();
    setToken(auth.access_token);
  }

  useEffect(() => {
    authGet();
  }, []);

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
        <h1>{artistInfo["name"]}</h1>
        <AspectRatio ratio={4 / 4}>
          <img
            className={css.artistpic}
            src={artistArray[1]["url"]}
            alt={artist}
          />
        </AspectRatio>
        <h2>
          Genres:&nbsp;
          {artistInfo["genres"].map((genre) => {
            return `${genre}, `;
          })}
        </h2>
      </FadeIn>
    );
  } else {
    return <></>;
  }
}
