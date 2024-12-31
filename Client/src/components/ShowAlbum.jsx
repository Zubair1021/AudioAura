import React, { useContext } from "react";
import Sidebar from "./sidebar";
import Player from "./Player";
import { PlayerContext } from "../context/Playercontext";
import DisplayAlbum from "./DisplayAlbumGrid";

const MainPage = () => {
  const { audioRef, track } = useContext(PlayerContext);
  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <DisplayAlbum />
      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  );
};

export default MainPage;
