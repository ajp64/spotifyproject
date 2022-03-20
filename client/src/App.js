import css from "./App.module.css";
import { useState } from "react";
import { Songs } from "./components/Songs";
import { ArtistInput } from "./components/ArtistInput";
import FadeIn from "react-fade-in";

function App() {
  const [artist, setArtist] = useState(null);

  function handleArtist(e) {
    if (e.key === "Enter") {
      setArtist(e.target.value);
    }
  }

  return (
    <div>
      <header className={css.appHeader}>The Music of Antony's 2021</header>
      {artist ? (
        <FadeIn>
          {" "}
          <ArtistInput
            className={css.app}
            handleArtist={handleArtist}
            artist={artist}
          />
          <Songs artist={artist} />
        </FadeIn>
      ) : (
        <FadeIn>
          <ArtistInput
            className={css.app}
            handleArtist={handleArtist}
            artist={artist}
          />
          <h1>
            Pick an artist above and hit enter to find out my listening habits!
          </h1>
        </FadeIn>
      )}
    </div>
  );
}

export default App;
