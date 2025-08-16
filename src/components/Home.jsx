import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // State to store the search input
  const [searchTerm, setSearchTerm] = useState("");
  // State to store movies returned from the API
  const [movies, setMovies] = useState([]);
  // State to filter movies by type (movie, series, episode)
  const [filter, setFilter] = useState("");
  // State to handle loading indicator while fetching data
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
  // Your OMDB API key

  // Function to fetch movies from the API based on searchTerm
  const searchMovies = async () => {
    if (!searchTerm) return; // Prevent empty searches
    setLoading(true); // Start loading before fetch
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
      );
      const data = await res.json();
      // If search results exist, update state, otherwise clear movies
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]); // Clear movies if there's an error
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  // Filter movies by type if selected (movie, series, episode)
  const filteredMovies = movies.filter((movie) =>
    filter ? movie.Type === filter : true
  );

  // Trigger search when pressing Enter
  const handleKey = (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  };

  return (
    <div className="text-center p-5 bg-black min-h-screen">
      {/* App Title */}
      <h1 className="text-3xl font-bold mb-5 text-[#FFD700]">
        🎬 Movie Search App
      </h1>

      {/* Search Input + Button */}
      <div className="flex justify-center gap-2 mb-5">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-72 border-2 border-[#FFD700] rounded"
          onKeyDown={handleKey}
        />
        <button
          onClick={searchMovies}
          className="p-2 bg-[#FFD700] rounded font-bold hover:bg-yellow-600 transition"
        >
          Search
        </button>
      </div>

      {/* Dropdown filter */}
      <div className="mb-5">
        <label>Filter by type: </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-1 border-2 border-[#FFD700] rounded"
        >
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </div>

      {/* Movies Grid */}
      <div className="flex flex-wrap justify-center gap-4">
        {/* Show loading message while fetching */}
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Link
              to={`/movie/${movie.imdbID}`} // Navigate to detail page
              key={movie.imdbID}
              className="no-underline"
            >
              <div className="bg-white p-4 rounded-lg shadow-md w-48 hover:scale-105 transition">
                {/* Movie Poster */}
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/200"
                  }
                  alt={movie.Title}
                  className="w-full rounded border-2 border-[#FFD700]"
                />
                {/* Movie Info */}
                <h3 className="text-gray-800 mt-2">{movie.Title}</h3>
                <p className="text-gray-600">{movie.Year}</p>
                <p className="italic text-[#FFD700]">{movie.Type}</p>
              </div>
            </Link>
          ))
        ) : (
          // Show "No movies found" only if not loading and no results
          !loading && <p className="text-gray-400">No movies found</p>
        )}
      </div>
    </div>
  );
}
