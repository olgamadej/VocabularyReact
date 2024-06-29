import React from "react";

const Autocomplete = ({  suggestions, onSelect }) => {
    return (
        <ul className="autocomplete-list">
            {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => onSelect(suggestion)}>
                    {suggestion}
                </li>
            ))}
        </ul>
    );
};

export default Autocomplete;