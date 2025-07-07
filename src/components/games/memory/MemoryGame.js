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

        }
    })

    return (
        <>
        </>
    );
}

export default MemoryGame;
