import React, { useEffect, useState } from "react";
import Library from "./components/Library";
import Audio from "./components/Audio";

const App = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [toggleLibrary, setToggleLibrary] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex">
      <Library
        setItems={setItems}
        items={items}
        setFilteredItems={setFilteredItems}
        toggleLibrary={toggleLibrary}
        setIsPlaying={setIsPlaying}
      />
      <Audio
        filteredItems={filteredItems}
        items={items}
        setFilteredItems={setFilteredItems}
        setToggleLibrary={setToggleLibrary}
        toggleLibrary={toggleLibrary}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default App;
