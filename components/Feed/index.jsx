"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [prompts, setPrompts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPrompts(data);
    };

    fetchPrompts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-sensitive search
    return prompts.filter(
      (prompt) =>
        regex.test(prompt.creator.username) ||
        regex.test(prompt.creator.email) ||
        regex.test(prompt.tag) ||
        regex.test(prompt.prompt)
    );
  };

  const handleSearchChange = (e) => {
    const text = e.target.value;

    clearTimeout(searchTimeout);
    setSearchText(text);

    //debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(text);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResults = filterPrompts(tagName);
    setSearchedResults(searchResults);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchText ? searchedResults : prompts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
