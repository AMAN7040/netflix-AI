import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/LanguageConstant";
import { API_OPTIONS, OPEN_AI_KEY, safetySettings } from "../utils/constant";
import {
  addAiMovies,
  removeAiMovies,
  removeMovieSuggestion,
  setToggleSuggestion,
  showMovieSuggestion,
} from "../utils/gbtSlice";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GbtSearchBar = () => {
  const searchText = useRef(null);
  const langType = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const genAI = new GoogleGenerativeAI(OPEN_AI_KEY);
  const movieSuggestion = useSelector((store) => store.gbt.movieSuggestion);
  const showSuggestion = useSelector((store) => store.gbt.toggleSuggestion);

  const searchTmdbMovie = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const data = await response.json();
    return data.results;
  };

  const handleSearchResult = async () => {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      body: JSON.stringify({
        safety_settings: safetySettings,
      }),
    });
    const query = `Act as a Movie Recommendation system and suggest some movies for the query: ${searchText.current.value}. Only give me names of 5 Movies, comma separated like the example result given ahead. Example Result: Golmaal, Dhol, Phir Hera Pheri, Hungama`;
    const result = await model.generateContent(query);

    if (!result) {
      // Handle this error
      return;
    }
    const response = await result.response;
    const text = await response.text();

    const movies = text.split(",");
    const movieData = movies.map((movie) => searchTmdbMovie(movie.trim()));

    const movieResolved = await Promise.all(movieData);

    dispatch(addAiMovies({ movieNames: movies, movieContent: movieResolved }));
  };

  const handleClearMovie = () => {
    dispatch(removeAiMovies());
    if (searchText.current) {
      searchText.current.value = "";
    }
    dispatch(removeMovieSuggestion());
    dispatch(setToggleSuggestion());
  };

  const handleInputChange = async () => {
    if (searchText.current && searchText.current.value.length > 0) {
      const input = searchText.current.value;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const data = await response.json();
      const filteredData =  data.results.slice(0, 10);
      const suggest = filteredData.map((movie) => movie.original_title);
      dispatch(showMovieSuggestion(suggest));
      dispatch(setToggleSuggestion());
    } else {
      dispatch(setToggleSuggestion());
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (searchText.current) {
      searchText.current.value = suggestion;
    }
    dispatch(removeMovieSuggestion());
    dispatch(setToggleSuggestion());
  };

  return (
    <div className="pt-[8%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black opacity-75 grid grid-cols-12 w-1/2 rounded-md"
      >
        <input
          type="text"
          ref={searchText}
          onChange={handleInputChange}
          placeholder={lang[langType].gptSearchPlaceholder}
          className="col-span-8 m-5 p-3 rounded-md text-black font-medium"
        />
        <button
          className="col-span-2 m-5 p-3 rounded-lg"
          onClick={handleSearchResult}
          style={{ backgroundColor: "#ff0000", color: "#ffffff" }}
        >
          {lang[langType].search}
        </button>
        <button
          className="col-span-2 m-5 p-3 rounded-lg"
          onClick={handleClearMovie}
          style={{ backgroundColor: "#ff0000", color: "#ffffff" }}
        >
          {lang[langType].clear}
        </button>
        {showSuggestion && movieSuggestion.length > 0 && (
          <div className="bg-black rounded-md text-white -mt-4 col-span-6 self-center mx-5 font-medium">
            {movieSuggestion.map((suggestion) => (
              <p
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="hover:bg-red-500 cursor-pointer"
              >
                {suggestion}
              </p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default GbtSearchBar;
