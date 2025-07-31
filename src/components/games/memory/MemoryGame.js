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

    const gridSize = 2 + level; // Level 1 = 3x3, Level 2 = 4x4, etc.

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
        // const filtered = words.filter((w) => w.subject === subject);  //tutaj trzeba zmienic , zeby subject === w.subject ktore jest zawarte w liscie subjektow, jako ze kazde wyrazenie jest przypisane do kilku tematow (lista)
        const filtered = words.filter((w) =>
            Array.isArray()
        )
        const totalCards = gridSize * gridSize;
        const selectedPairs = shuffle(filtered).slice(0, totalCards / 2);

        // We create one card with a French expression and one card with an English one
        const cardList = shuffle(
            selectedPairs.flatMap((item, index) => [ //co robi flatMap?
                { 
                    id: index * 2,
                    content: item.french_expression,
                    pairId: index,
                    matched: false,
                },
                {
                    id: index * 2 + 1,
                    content: item.english_expression,
                    pairId: index,
                    matched: false,
                }
            ])            
            //[...selectedPairs, ...selectedPairs]).map(
            //(item, index) => ({
            //    id: index,
            //    content: item.french_expression || item.english_expression,
            //    matched: false,
            //})
        );

        setBoard(cardList);
        setFlipped([]);
        setMatched([]);
        setGameOver(false);
    };

    const handleFlip = (card) => {
        if (flipped.length === 2 || flipped.includes(card.id) || card.matched) return;

        const newFlipped = [...flipped, card.id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const[first, second] = newFlipped.map((id) => 
                board.find((c) => c.id === id)
            );

            if (first.pairId === second.pairId) {  
                setMatched([...matched, first.id, second.id]);
            }

            setTimeout(() => setFlipped([]), 800);
        }
    }

    useEffect(() => {
        if (matched.length > 0 && matched.length === board.length) { // Czy napewno board.length??
            setGameOver(true);
            saveProgress();
        }
    }, [matched, board]);

    function saveProgress() {
        const saved = JSON.parse(localStorage.getItem("memoryGameProgress")) || {};
        saved[subject] = Math.max(saved[subject] || 1, level + 1);  // Nie rozumiem tej linii
    }

    function shuffle(array) {
        return [...array].sort(() => Math.random() - 0.5); // Nie jestem pewna w jaki sposób
    }

    return (
        <div className="memory-game">
            <h2>Memory Game</h2>

            <div className="controls">
                <label>Choose Subject:</label>
                <select value = {subject} onChange={(e) => setSubject(e.target.value)}>  {// how does onChange work
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
                        onClick = {() => handleFlip(card)}
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
