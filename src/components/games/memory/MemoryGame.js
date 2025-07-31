import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MemoryGame.scss";

function MemoryGame() {
  const [words, setWords] = useState([]);
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState(1);
  const [board, setBoard] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  let gridSize = 2 + level; // Level 1 = 3x3, Level 2 = 4x4, etc.
  let totalCards = gridSize * gridSize;

  // Make sure totalCards is even (it should be, if gridSize is even)
  if (totalCards % 2 !== 0) {
    // If odd, increase grid size by 1
    gridSize += 1;
  }

  useEffect(() => {
    const fetchWords = async () => {
      const result = await axios.get(
        "https://raw.githubusercontent.com/olgamadej/JSONs/main/vocabulary.json"
      );
      setWords(result.data);
    };

    fetchWords();
  }, []);

  useEffect(() => {
    if (subject && words.length > 0) {
      startNewGame();
    }
  }, [subject, level, words]);

  function startNewGame() {
    const filtered = words.filter((w) => w.subject === subject);
    const totalCards = gridSize * gridSize;
    const selectedPairs = shuffle(filtered).slice(0, totalCards / 2);

    const duplicated = [...selectedPairs, ...selectedPairs];
    const shuffled = shuffle(duplicated);

    const cardList = shuffled.map((item, index) => ({
      id: index,
      content: item.french_expression || item.english_expression,
      pairId: item.id,
      matched: false,
    }));

    setBoard(cardList);
    setFlipped([]);
    setMatched([]);
    setGameOver(false);
  }

  const handleFlip = (card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || card.matched)
      return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped.map((id) =>
        board.find((c) => c.id === id)
      );

      if (first.pairId === second.pairId) {
        //tutaj chyba id ma sie zgadzac, bo nie ma czegos takiego jak kontent (chyba, ze to wpudowana cecha js).
        setMatched([...matched, first.id, second.id]);
      }

      setTimeout(() => setFlipped([]), 800);
    }
  };

  useEffect(() => {
    if (matched.length > 0 && matched.length === board.length) {
      // Czy napewno board.length??
      setGameOver(true);
      saveProgress();
    }
  }, [matched, board]);

  function saveProgress() {
    const saved = JSON.parse(localStorage.getItem("memoryGameProgress")) || {};
    saved[subject] = Math.max(saved[subject] || 1, level + 1); // Nie rozumiem tej linii
    localStorage.setItem("memoryGameProgress", JSON.stringify(saved));
  }

  function shuffle(array) {
    // unbiased algorithm
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]]; // swap
    }
    return copy;
  }

  return (
    <div className="memory-game">
      <h2>Memory Game</h2>

      <div className="controls">
        <label>Choose Subject:</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          {" "}
          {
            // how does onChange work
          }
          <option value="">--Select--</option>
          {[...new Set(words.map((w) => w.subject))].map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>

        {subject && (
          <>
            <p>Level: {level}</p>
            <button onClick={() => startNewGame()}>Restart Level</button>
          </>
        )}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {board.map((card) => (
          <div
            key={card.id}
            className={`card ${
              flipped.includes(card.id) || matched.includes(card.id)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleFlip(card)}
          >
            <div className="card-inner">
              <div className="card-front"></div>
              <div className="card-back">{card.content}</div>
            </div>
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="game-over">
          <h3>Level Complete!</h3>
          <button onClick={() => setLevel(level + 1)}>Next Level</button>
        </div>
      )}
    </div>
  );
}

export default MemoryGame;
