import { useEffect, useState } from "react";

export const useGetGenres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGenresFetch();
  }, []);

  const handleGenresFetch = () => {
    setIsLoading(true);
    fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((json) => {
        setGenres(json);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  return { genres, isLoading };
};
