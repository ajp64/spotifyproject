import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState();

  async function loadData() {
    const response = await fetch(url);
    setData(await response.json());
    console.log(data);
  }

  useEffect(() => {
    loadData();
  }, [url]);

  return { data };
}
