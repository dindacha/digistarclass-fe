import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d64465f835d027114fd469afd4e2de72`)
      .then(response => {
        setMovie(response.data);
      });
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <div className='movie-title'>
        <button onClick={() => window.history.back()}>
            Back        
        </button>

      </div>
        <div className='movie-overview'>
            <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <div className='movie-body'>
                <h1>{movie.title}</h1>
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
                <p>{movie.overview}</p>
            </div>
        </div>
    </div>
  );
};

export default MovieDetail;
