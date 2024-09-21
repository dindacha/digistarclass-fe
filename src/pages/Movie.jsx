import React, { useState, useContext } from "react";
import ListMovie from "../ListMovie";
import "./Movie.css";
import { ThemeContext } from "../contexts/ThemeContext";

const Movie = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onClickSearch = () => {
    setSearch(text);
  };

  return (
    <div className={`movie-page ${theme}`}>
      <div className="search">
        <label>
          Search movie
          <input onChange={onChangeText} type="text" />
        </label>
        <button onClick={onClickSearch}>Search</button>
      </div>
      <ListMovie search={search} />
    </div>
  );
};

export default Movie;
