import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListMovie = ({ search }) => {

  //nyimpen data film
  const [movies, setMovies] = useState([]);

  //pertama kali tampil
  useEffect(() => {
    fetchMovies();
    //cleanup
    return () => {
      setMovies([]); 
    };
  }, []); 

  //perubahan props search
  useEffect(() => {
    if (search) {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d64465f835d027114fd469afd4e2de72&query=${search}`)
        .then(response => {
          setMovies(response.data.results); 
        });
    } else {
      fetchMovies();
    }
  }, [search]); 

  //datafilm populer
  const fetchMovies = () => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=d64465f835d027114fd469afd4e2de72')
      .then(response => {
        setMovies(response.data.results); 
      });
  };

  return (
    <div className="container-card-movie">
      {movies.slice(0, 30).map(movie => (
        <div className="card" key={movie.id}>
          <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <div>
              <h5>{movie.title}</h5>
              <p>{movie.overview.slice(0, 30)}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

ListMovie.propTypes = {
  search: PropTypes.string
};

export default ListMovie;
