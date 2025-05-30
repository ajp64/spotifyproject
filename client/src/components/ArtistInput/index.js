import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import css from "./index.module.css";
import FadeIn from "react-fade-in";

// a function to use in filter, which removes duplicates from the list of artists you can select from
function onlyUnique(value, index, self) {
  return index === self.findIndex((t) => t.artist === value.artist);
}

export function ArtistInput({ handleArtist, artist }) {
  const [artistList, setList] = useState([]);
  let url = "https://my-spotify-summary.onrender.com/all";
  const { data } = useFetch(url);
  // if (data) {
  //   console.log(data);
  // }

  // function to sort list alphabetically by artist
  function sortArtist(a, b) {
    if (a.artist < b.artist) {
      return -1;
    }
    if (a.artist > b.artist) {
      return 1;
    }
    return 0;
  }

  // data is filtered to unique items, then ordered alphabetically
  useEffect(() => {
    if (data) {
      let filteredArray = data.payload.filter(onlyUnique);
      setList(filteredArray.sort(sortArtist));
    }
  }, [data]);

  function handleInputClear(e) {
    e.target.value = "";
  }

  if (artistList) {
    return (
      <FadeIn>
        <input
          className={css.artistInput}
          list="browsers"
          onChange={(e) => handleArtist(e)}
          placeholder={`Search or choose an artist...`}
          onClick={(e) => handleInputClear(e)}
        />
        <datalist id="browsers">
          {artistList.map((item, index) => {
            return <option value={item.artist} key={index} />;
          })}
        </datalist>
      </FadeIn>
    );
  } else {
    return (
      <FadeIn>
        <input
          list="browsers"
          onUpdate={(e) => handleArtist(e.target.value)}
          placeholder={`Enter an artist!`}
        />
      </FadeIn>
    );
  }
}
