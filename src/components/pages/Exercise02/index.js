/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useMemo, useState } from "react";
import { useGetMovies } from "./hooks/useGetMovies";
import { useGetGenres } from "./hooks/useGetGenres";
import { MovieCard } from "./components/MovieCard";

export default function Exercise02() {
  const [selectedGenre, setSelectedGenre] = useState();
  const [sortByMovies, setSortByMovies] = useState("asc");
  const { isLoading, movies, fetchCount } = useGetMovies();
  const { genres, isLoading: isLoadingGenres } = useGetGenres();

  const movieSearch = useMemo(() => {
    const sort = sortByMovies === "asc" ? 1 : -1;
    return movies
      .filter(({ genres }) => !selectedGenre || genres.includes(selectedGenre))
      .sort((a, b) => (a.year > b.year ? sort : a.year < b.year ? -sort : 0));
  }, [movies, selectedGenre, sortByMovies]);

  const handleSelectChange = (e) => setSelectedGenre(e.target.value);

  const handleChangeSortOrder = () =>
    setSortByMovies(sortByMovies === "asc" ? "desc" : "asc");

  return (
    <section className="movie-library">
      <header className="movie-library__header">
        <h1 className="movie-library__title">Movie Library</h1>
        <div className="movie-library__actions">
          <select
            onChange={handleSelectChange}
            name="genre"
            placeholder="Search by genre..."
          >
            <option value="">Search by genre...</option>
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button onClick={() => handleChangeSortOrder()}>
            Year {sortByMovies === "asc" ? "Descending" : "Ascending"}
          </button>
        </div>
      </header>
      <main className="movie-library__main">
        {isLoading || isLoadingGenres ? (
          <div className="movie-library__loading">
            <p>Loading...</p>
            <p>Fetched {fetchCount} times</p>
          </div>
        ) : (
          <ul className="movie-library__list">
            {movieSearch.map(({ posterUrl, title, year, genres, id }) => (
              <MovieCard
                key={id}
                posterUrl={posterUrl}
                title={title}
                year={year}
                genres={genres}
              />
            ))}
          </ul>
        )}
      </main>
    </section>
  );
}
