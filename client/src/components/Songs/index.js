import { useFetch } from "../../hooks/useFetch";

export function Songs({ artist }) {
  const url = `https://my-spotify-2021.herokuapp.com/artist?name=${artist}`;
  const { data } = useFetch(url);

  if (data) {
    return (
      <>
        <h1>{artist}</h1>
        <h2>
          {data.payload.length ? `Number of plays: ${data.payload.length}` : ""}
        </h2>
        {data.payload.map((item, index) => {
          return <h3 key={index}>{item.track}</h3>;
        })}
      </>
    );
  } else {
    return null;
  }
}
