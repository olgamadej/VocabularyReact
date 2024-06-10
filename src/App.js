import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/ui/Header";
import FlashcardGrid from "./components/flashcards/FlashcardGrid";
import Search from "./components/ui/Search";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `https://raw.githubusercontent.com/olgamadej/JSONs/main/french.json?french_expression=${query}`
      );

      setItems(result.data);
      setIsLoading(false);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.french_expression.toLowerCase().includes(query.toLowerCase()) ||
      item.english_expression.toLowerCase().includes(query.toLowerCase())

    
    );
    setFilteredItems(filtered);
  }, [query, items]);

  return (
    <div className="container">
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <FlashcardGrid isLoading={isLoading} items={filteredItems} />
    </div>
  );
}

export default App;
