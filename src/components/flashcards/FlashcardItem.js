import React from "react";

function FlashcardItem({ item }) {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <h1>{item.french_expression}</h1>
        </div>
        <div className="card-back">
          <h1>{item.english_expression}</h1>
        </div>
      </div>
    </div>
  );
}

export default FlashcardItem;
