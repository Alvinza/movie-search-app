import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams();   // Get movie ID from URL
  const [movie, setMovie] = useState(null);  // store movie details

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY; //  OMDB API key

  // Fetch movie details when component loads or ID changes
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
      );
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  // Show loading message until data is fetched
  if (!movie)
    return (
      <p className="text-center font-semibold text-2xl text-gray-400">
        Loading...
      </p>
    );

  return (
    <div className="p-5 bg-black  min-h-screen">
      {/* Back button */}
      <Link to="/" className="font-bold text-lg no-underline text-white">
        ⬅ Back to Search
      </Link>

      {/* Movie detail layout */}
      <div className="flex flex-wrap gap-6 mt-5 bg-white p-5 rounded-lg shadow-md">
        {/* Poster */}
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300"
          }
          alt={movie.Title}
          className="w-72 rounded-lg border-[3px] border-[#FFD700]"
        />
        {/* Info Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold border-b-2 border-[#FFD700] pb-2">
            {movie.Title}
          </h1>
          <p>
            <span className="font-bold text-[#FFD700]">Year:</span> {movie.Year}
          </p>
          <p>
            <span className="font-bold text-[#FFD700]">Genre:</span>{" "}
            {movie.Genre}
          </p>
          <p>
            <span className="font-bold text-[#FFD700]">Director:</span>{" "}
            {movie.Director}
          </p>
          <p>
            <span className="font-bold text-[#FFD700]">Actors:</span>{" "}
            {movie.Actors}
          </p>
          <p>
            <span className="font-bold text-[#FFD700]">Plot:</span> {movie.Plot}
          </p>
          <p>
            <span className="font-bold text-[#FFD700]">IMDB Rating:</span>{" "}
            {movie.imdbRating}
          </p>
        </div>
      </div>
    </div>
  );
}
