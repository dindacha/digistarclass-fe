import React, { useState, useContext } from "react";
import "./Counter.css";
import { ThemeContext } from "../../contexts/ThemeContext";


const Counter = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);
  const { theme } = useContext(ThemeContext);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <div className="container">
      <div className={`counter ${theme}`}>
        <p style={{ color: theme === "dark" ? "white" : "darkblue" }}>Count: {count}</p>
        <div>
          <button onClick={decrementCount}>Decrement</button>
          <button onClick={incrementCount}>Increment</button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
