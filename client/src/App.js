import css from "./App.module.css";
import { useState } from "react";
import { Songs } from "./components/Songs";
import { ArtistInput } from "./components/ArtistInput";

function App() {
  const [artist, setArtist] = useState(null);

  function handleArtist(e) {
    if (e.key === "Enter") {
      setArtist(e.target.value);
      console.log(artist);
    }
  }

  return (
    <div>
      <header className={css.appHeader}>The Music of Antony's 2021</header>
      {artist ? (
        <>
          {" "}
          <ArtistInput
            className={css.app}
            handleArtist={handleArtist}
            artist={artist}
          />
          <Songs artist={artist} />
        </>
      ) : (
        <>
          <ArtistInput
            className={css.app}
            handleArtist={handleArtist}
            artist={artist}
          />
          <h1>
            Pick an artist above and hit enter to find out my listening habits!
          </h1>
        </>
      )}
    </div>
  );
}

export default App;
