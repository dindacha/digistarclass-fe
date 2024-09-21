import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./App.css";
import ThemeProvider from "./contexts/ThemeContext";
import Component from "./Component";
import Navbar from "./components/Navbar";
import Counter from "./components/Counter/Counter";
import Movie from "./pages/Movie";
import MovieDetail from "./pages/MovieDetail";
import ToDo from "./pages/ToDo";
import Finance from "./pages/Finance";
import WalletItem from "./components/Wallet/WalletItem";
import ExpenseItem from "./components/Expense/ExpenseItem";
import CategoryItem from "./components/Category/CategoryItem";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <h1>Digistar 2024 FE Dinda</h1>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/counter" element={<Counter initialCount={0} />} />
            <Route path="/todo" element={<ToDo />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/wallet/:walletId" element={<WalletItem />} />
            <Route path="/expense/:expenseItemId" element={<ExpenseItem />} />
            <Route path="/category/:categoryId" element={<CategoryItem />} />

          </Routes>

          <Component />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
