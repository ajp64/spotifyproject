import css from "./App.module.css";
import { useState, useEffect } from "react";
import { Songs } from "./components/Songs";
import { ArtistInput } from "./components/ArtistInput";
import FadeIn from "react-fade-in";
import { Container } from "@chakra-ui/react";
import base64 from "base-64";

let url = "https://accounts.spotify.com/api/token";
let username = process.env.REACT_APP_CLIENT_ID;
let password = process.env.REACT_APP_CLIENT_SECRET;

//headers.append('Content-Type', 'text/json');
const header = {
  Authorization: "Basic " + base64.encode(username + ":" + password),
  "Content-Type": "application/x-www-form-urlencoded",
};

function App() {
  const [artist, setArtist] = useState(null);
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

  function handleArtist(e) {
    if (e.key === "Enter") {
      setArtist(e.target.value);
    }
  }

  return (
    <div className={css.app}>
      <header className={css.appHeader}>The Music of Antony's 2021</header>
      {artist ? (
        <FadeIn>
          {" "}
          <ArtistInput
            className={css.app}
            handleArtist={handleArtist}
            artist={artist}
          />
          <Container maxW="container.xl">
            <Songs artist={artist} accessToken={accessToken} />
          </Container>
        </FadeIn>
      ) : (
        <FadeIn>
          <ArtistInput
            className={css.app}
            handleArtist={handleArtist}
            artist={artist}
          />
          <Container maxW="container.xl">
            <h1 className={css.action}>
              Pick an artist above and hit enter to find out my listening
              habits!
            </h1>
          </Container>
        </FadeIn>
      )}
    </div>
  );
}

export default App;
