import React, { useState, useEffect } from "react";
import Autocomplete from "./Autocomplete";
import "./Search.scss";

const accentCharacters = ["à", "â", "ä", "ç", "é", "è", "ê", "ë", "î", "ï", "ô", "ù", "û", "ü"];

const Search = ({ getQuery, allExpressions }) => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (q) => {
    setText(q);
    getQuery(q);
  };

  const addCharacter = (char) => {
    const newText = text + char;
    setText(newText);
    getQuery(newText);
  };

  useEffect(() => {
    if (text.length > 0) {
      const filteredSuggestions = allExpressions
        .filter(expression => expression.toLowerCase().includes(text.toLowerCase()))
        .slice(0, 10); // Limit to 10 suggestions
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [text, allExpressions]);

  const handleSelectSuggestion = (suggestion) => {
    setText(suggestion);
    getQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <section className="search">

      <form>
        <div className="accent-buttons">
          {accentCharacters.map((char) => (
            <div className="accent-button-outside">
            <button className="accent-button caveat-medium" type="button" key={char} onClick={() => addCharacter(char)}>
               {char}
            </button>
            </div>

          ))}
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search expressions..."
          value={text}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
              <Autocomplete suggestions={suggestions} onSelect={handleSelectSuggestion} />

      </form>
    </section>
  );
};

export default Search;
