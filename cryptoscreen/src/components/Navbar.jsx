import React from "react";
import { useContext, useState, useEffect } from "react";
import { RiCoinsLine } from "react-icons/ri";
import { FaSearchDollar } from "react-icons/fa";
import { CryptoContext } from "../context/CryptoContext";

const Navbar = () => {
  const [input, setInput] = React.useState("");
  const [filteredCoins, setFilteredCoins] = React.useState([]);
  const { cryptoList = [], setSearchTerm } = useContext(CryptoContext);

  const searchHandler = (e) => {
    e.preventDefault();
    setFilteredCoins([]);
    setSearchTerm(input);
  };

  const inputHandler = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value === "") {
      setSearchTerm("");
      setFilteredCoins([]);
    } else {
      const suggestedCoins = cryptoList.filter((coin) =>
        coin.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCoins(suggestedCoins.slice(0, 5));
    }
  };
  return (
    <nav className="flex items-center justify-between bg-transparent border-b border-fuchsia-600/30 shadow-md p-4 pb-6 mt-6 max-w-full px-16">
      <div className="flex items-center gap-2">
        <RiCoinsLine className="text-3xl text-fuchsia-800 drop-shadow-[0_2px_8px_rgba(192,38,211,0.5)]" />
        <h1 className="bg-gradient-to-r from-fuchsia-800 to-violet-600 bg-clip-text text-transparent text-xl font-bold">
          CryptoScreen
        </h1>
      </div>

      <form onSubmit={searchHandler} className="flex-1 max-w-2xl mx-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-800/30 to-violet-600/40 rounded-full opacity-0 group-hover:opacity-100 transition duration-1000" />
          <input
            type="text"
            placeholder="Search for a coin..."
            value={input}
            onChange={inputHandler}
            className="w-full px-6 py-3 bg-transparent border border-fuchsia-600/70 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-fuchsia-600/60 focus:border-transparent backdrop-blur-sm"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white rounded-full px-4 py-2 transition duration-300"
          >
            <FaSearchDollar />
          </button>
        </div>
        {filteredCoins.length > 0 && (
          <div className="absolute z-10 mt-2 w-2xl bg-fuchsia-300/20 backdrop-blur-lg rounded-lg shadow-lg border border-fuchsia-600/30">
            <ul className="max-h-60 overflow-y-auto">
              {filteredCoins.map((coin) => (
                <li
                  key={coin.id}
                  className="px-4 py-2 hover:bg-fuchsia-600/30 cursor-pointer"
                  onClick={() => {
                    setInput(coin.name);
                    setFilteredCoins([]);
                    setSearchTerm(coin.name);
                  }}
                >
                  {coin.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </nav>
  );
};

export default Navbar;
