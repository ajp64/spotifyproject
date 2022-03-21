import css from "./App.module.css";
import { useState } from "react";
import { Songs } from "./components/Songs";
import { ArtistInput } from "./components/ArtistInput";
import FadeIn from "react-fade-in";
import { Container } from "@chakra-ui/react";

function App() {
  const [artist, setArtist] = useState(null);

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
            <Songs artist={artist} />
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
