import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect, useRef } from "react";
import css from "./index.module.css";
import FadeIn from "react-fade-in";
import { Button } from "@chakra-ui/react";

// a function to use in filter, which removes duplicates from the list of artists you can select from
function onlyUnique(value, index, self) {
  return index === self.findIndex((t) => t.artist === value.artist);
}

export function ArtistInput({ handleArtist, artist }) {
  const [artistList, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState("");
  let url = "https://my-spotify-summary.onrender.com/all";
  const { data } = useFetch(url);
  const searchFieldRef = useRef(null);

  const clearSearchField = () => {
    if (searchFieldRef.current) {
      searchFieldRef.current.value = "";
    }
  };

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
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (!loading) {
      setDots("");
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  const placeholder = loading
    ? `Loading${dots}`
    : "Search or choose an artist...";

  function handleInputClear(e) {
    e.target.value = "";
  }

  function handleChange(e) {
    const inputValue = e.target.value;
    const match = artistList.find((item) => item.artist === inputValue);
    if (match) {
      handleArtist(match.artist);
    }
  }

  if (artistList) {
    return (
      <FadeIn>
        <input
          ref={searchFieldRef}
          className={css.artistInput}
          list="browsers"
          onChange={handleChange}
          placeholder={placeholder}
          disabled={loading}
        />
        <div className={css.buttonWrapper}>
          <Button className={css.clearSearch} onClick={clearSearchField}>
            Clear Search Field
          </Button>
        </div>
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
