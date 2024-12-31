import React, { useState, useEffect } from "react";
import { AutocompleteProps, Item } from "../interfaces/celulares.interface";

const Autocomplete: React.FC<AutocompleteProps> = ({ data, onSelect }) => {
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const filterDataAsync = async (query: string, data: Item[]): Promise<Item[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          data.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          )
        );
      }, 300);
    });
  };
  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const result = await filterDataAsync(query, data);
      if (active) setFilteredData(result);
    };

    if (query.trim() === "") {
      setFilteredData([]);
    } else {
      fetchData();
    }

    return () => {
      active = false;
    };
  }, [query, data]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) =>
        prev < filteredData.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      onSelect(filteredData[highlightIndex]);
      setQuery("");
      setFilteredData([]);
    }
  };

  const handleClick = (item: Item) => {
    onSelect(item);
    setQuery("");
    setFilteredData([]);
  };

  const highlightText = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} style={{ fontWeight: "bold", color: "blue" }}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ej: iphone 13"
      />
      {filteredData.length > 0 && (
        <ul className="autocomplete-list">
          {filteredData.map((item, index) => (
            <li
              key={item.id}
              className={`autocomplete-item ${
                index === highlightIndex ? "highlighted" : ""
              }`}
              onClick={() => handleClick(item)}
            >
              {highlightText(item.name, query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;