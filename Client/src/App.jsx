import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Users/Home";
import MainPage from "./Pages/Users/MainPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Premium from "./components/Premium";
import ShowAlbum from "./components/ShowAlbum";
import AdminMain from "./Pages/Admins/AdminMain";
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedPage from "./components/UnAuthorized";
import CategoryContext from "./context/CategoryContext";
import { useState } from "react";
import Album from "./Pages/Admins/Pages/Albums";
import AddSong from "./Pages/Admins/Pages/AddSongs";
import { AlbumsProvider } from "./context/AlbumsContext";
import PlayerContextProvider from "./context/Playercontext.jsx";
import Playlist from "./Pages/Admins/Pages/Playlist.jsx";
import User from "./Pages/Admins/Pages/User.jsx";
import CreatePlaylist from "./components/CreatePlaylist.jsx";
import UserProfile from "./components/UserProfile.jsx";
import UserPlaylist from "./components/UserPlaylists.jsx";
import UserFavourite from "./components/UserFavourite.jsx";
import SongContext from "./context/SongContext.jsx";
import About from "./components/About.jsx"
import Contact from './components/Contact.jsx'
import Features from './components/Features.jsx'
import ProtectedPremium from "./components/ProtectedPremium.jsx";


const App = () => {
  const [category, setCategory] = useState("all");
  const [Song, setSong] = useState(null);
  const [FavouriteCount, setFavouriteCount] = useState(null);
  const [PlaylistCount, setPlaylistCount] = useState(null);
  
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      <AlbumsProvider> {/* Wrap with AlbumsProvider */}
      <PlayerContextProvider>
        <SongContext.Provider value={{Song,setSong,FavouriteCount,setFavouriteCount,PlaylistCount,setPlaylistCount}}>
        <div className="h-screen">
          <Routes>
            <Route path="/" element={<Features />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-playlist" element={<UserPlaylist />} />
            <Route path="/user-favourite" element={<UserFavourite/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/features" element={<Home/>}/>
            <Route
              path="/spotify"
              element={
                <ProtectedRoute requiredRole="user">
                  <MainPage />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/playlists"
              element={
                <ProtectedPremium>
                  <Playlist />
                </ProtectedPremium>
              }
            /> */}
            <Route path="/spotify/premium" element={<Premium />} />
            <Route path="/spotify/album/:id" element={<ShowAlbum />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminMain />
                </ProtectedRoute>
              }
            />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/albums" element={<Album />} />
            <Route path="/songs" element={<AddSong />} />
            <Route path="/playlists" element={<Playlist />} />
            <Route path="/users" element={<User />} />
          </Routes>
         
        </div>
        </SongContext.Provider>
        </PlayerContextProvider>
      </AlbumsProvider>
    </CategoryContext.Provider>
  );
};

export default App;
