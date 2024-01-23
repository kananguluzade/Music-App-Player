import React, { useEffect } from "react";
import data from "../data";

const Library = ({
  items,
  setItems,
  setFilteredItems,
  toggleLibrary,
  setIsPlaying,
}) => {
  useEffect(() => {
    setItems(data);
  }, []);

  const handleClick = (clickedItemId) => {
    setIsPlaying(false);
    const resultItem = items.filter((item) => item.id === clickedItemId);
    setFilteredItems(resultItem);
  };

  if (toggleLibrary) {
    return (
      <div className="h-screen flex flex-col gap-8 w-1/5 align-center min-w-fit shadow-2xl">
        <h2 className="my-4 text-2xl font-semibold mx-5">Library</h2>
        <div className="flex flex-col gap-3 pr-1 overflow-auto shadow-2xl pt-5 pb-5">
          {items.map((item) => {
            return (
              <div
                className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-blue-200"
                key={item.id}
                onClick={() => handleClick(item.id)}
              >
                <img className="w-16 h-16" src={item.cover} />
                <div className="flex flex-col justify-center">
                  <span className="text-gray-500">{item.name}</span>
                  <span className="text-xs text-gray-400">{item.artist}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Library;
