import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/ui/Header";
import FlashcardGrid from "./components/flashcards/FlashcardGrid";
import Search from "./components/ui/Search";
import "./App.css";
import "./scss/main.scss";

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `https://raw.githubusercontent.com/olgamadej/JSONs/main/vocabulary.json?french_expression=${query}`
      );

      setItems(result.data);
      setIsLoading(false);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const filtered = items.filter(item =>
      normalizeString(item.french_expression).toLowerCase().includes(normalizeString(query).toLowerCase()) ||
      normalizeString(item.english_expression).toLowerCase().includes(normalizeString(query).toLowerCase())    
    );
    setFilteredItems(filtered);
  }, [query, items]);

  return (
    <div className="container caveat-medium">
      <Header />
      <Search getQuery={(q) => setQuery(q)} allExpressions={items.map(item => item.french_expression)}/>
      <FlashcardGrid isLoading={isLoading} items={filteredItems} />
    </div>
  );
}

export default App;

function normalizeString(str){
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
