import { useEffect, useState } from "react";

export const useGetMovies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    handleMovieFetch();
  }, []);

  const handleMovieFetch = () => {
    setIsLoading(true);
    setFetchCount(fetchCount + 1);
    fetch("http://localhost:3001/movies?_limit=50")
      .then((res) => res.json())
      .then((json) => {
        setMovies(json);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  return { isLoading, fetchCount, movies };
};
