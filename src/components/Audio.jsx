import React, { useEffect, useState, useRef } from "react";

const Audio = ({
  filteredItems,
  setFilteredItems,
  items,
  setToggleLibrary,
  toggleLibrary,
  setIsPlaying,
  isPlaying,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  
  const handleClick = () => {
    if (toggleLibrary) {
      setToggleLibrary(false);
      return;
    } else setToggleLibrary(true);
  };

  const play = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const playNext = () => {
    setIsPlaying(false);
    if (filteredItems.length > 0) {
      const currentItemId = filteredItems[0].id;
      const currentIndex = items.findIndex(item => item.id === currentItemId);
      if (currentIndex !== -1 && currentIndex < items.length - 1) {
        const nextMusic = items[currentIndex + 1];
        setFilteredItems([nextMusic]);
      }
    }
  };

  const playPrevious = () => {
    setIsPlaying(false);
    if (filteredItems.length > 0) {
      const currentItemId = filteredItems[0].id;
      const currentIndex = items.findIndex(item => item.id === currentItemId);
      if (currentIndex > 0) {
        const previousMusic = items[currentIndex - 1];
        setFilteredItems([previousMusic]);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  if (!filteredItems || filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center pt-5 h-screen w-screen">
        <div className="flex h-20 gap-96">
          <span className="font-semibold">Waves</span>
          <button
          onClick={() => handleClick()}
          className={`text-sm w-16 h-7 ${
            !toggleLibrary ? "bg-white text-black border-2 border-slate-600" : 'bg-slate-600 text-white'
          }`}
        >
          Library
        </button>
        </div>
        <div className="w-4/5 flex h-screen justify-center pt-60">
          <p className="text-xl font-semibold">please choose music</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-5 h-screen w-screen">
      <div className="flex h-20 gap-96">
        <span className="font-semibold">Waves</span>
        <button
          onClick={() => handleClick()}
          className={`text-sm w-16 h-7 ${
            !toggleLibrary ? "bg-white text-black  border-2 border-slate-600" : 'bg-slate-600 text-white'
          }`}
        >
          Library
        </button>
      </div>
      <div className="w-4/5 flex flex-col justify-center items-center gap-10">
        <img src={filteredItems[0].cover} className="w-52 rounded-full" />
        <div className="flex flex-col gap-2 items-center">
          <p className="text-xl font-semibold">{filteredItems[0].name}</p>
          <p className="text-xs">{filteredItems[0].artist}</p>
        </div>
        <audio
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          ref={audioRef}
          src={filteredItems[0].audio}
        ></audio>
        <input
          className="w-96 cursor-pointer"
          min={0}
          max={audioRef.current && audioRef.current.duration}
          type="range"
        />
        <div className="flex gap-8">
          <button onClick={playPrevious}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
            </svg>
          </button>
          <button onClick={play}>
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <button onClick={playNext}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
            </svg>
          </button>
          <button onClick={toggleMute}>
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Audio;
