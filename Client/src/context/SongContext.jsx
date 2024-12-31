import {createContext,useState } from "react";

const SongContext = createContext({
    Song:null,
    setSong:()=>{},
    FavouriteCount:null,
    setFavouriteCount:()=>{},
    PlaylistCount:null,
    setPlaylistCount:()=>{}
});

export default SongContext;