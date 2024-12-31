import React, { useContext } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import CategoryContext from "../context/CategoryContext";
import AlbumsContext from "../context/AlbumsContext";
import CircularHighlights from "./Highlights";
import AudioAuroLoader from "./AudioAuroLoader";

const DisplayHome = () => {
  const { category } = useContext(CategoryContext);
  const { albums, loading, songs, SongsLoading,historysongs } = useContext(AlbumsContext);
  const artists = [
    { name: "Arijit Singh", image: "https://i.scdn.co/image/ab676161000051745ba2d75eb08a2d672f9b69b7" },
    { name: "Atif Aslam", image: "https://i.scdn.co/image/ab6761610000101fc40600e02356cc86f0debe84" },
    { name: "Leann Rimes", image: " https://i.scdn.co/image/ab67616100005174e3cf96c38c8421e7c3a10cc1" },
    { name: "Shubh", image: "https://i.scdn.co/image/ab676161000051748f553f96d564d1005a92d131" },
    { name: "Pritam", image: "https://i.scdn.co/image/ab67616100005174cb6926f44f620555ba444fca" },
    { name: "Vishal Mishra", image: "https://i.scdn.co/image/ab67616100005174fb13d10be20fdcb5a670f551" },
    { name: "Diljit Dosanjh", image: "https://i.scdn.co/image/ab67616100005174fc043bea91ac91c222d235c9" },
    { name: "Marisa Monte", image: "https://i.scdn.co/image/ab676161000051749025be465ccc783f74e0c575" },
    { name: "Paula Fernandes", image: " https://i.scdn.co/image/ab67616100005174433dc6a228eba43cfd0ff071" },
    
  ];
  
 

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-extrabold text-2xl md:text-3xl lg:text-4xl"><span className="text-[#00ABE4]">Recome</span>nded<span className="text-[#00ABE4]"> Songs</span></h1>
        {loading ? (
          <AudioAuroLoader /> // Loader outside div
        ) : (
          <div className="flex overflow-auto">
            {historysongs.map((item, index) => (
              <SongItem
                key={index}
                name={item.name}
                description={item.description}
                id={item.id}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-extrabold text-2xl md:text-3xl lg:text-4xl"><span className="text-[#00ABE4]">Featu</span>red Cha<span className="text-[#00ABE4]">rts</span></h1>
        {loading ? (
          <AudioAuroLoader /> // Loader outside div
        ) : (
          <div className="flex overflow-auto">
            {albums.map((item) => (
              <AlbumItem
                key={item._id} // Use unique id instead of index
                albumid={item._id}
                name={item.name}
                desc={item.description}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-extrabold text-2xl md:text-3xl lg:text-4xl"><span className="text-[#00ABE4]">Today's</span> Bigg<span className="text-[#00ABE4]">est H</span>it</h1>
        {SongsLoading ? (
          <AudioAuroLoader /> // Loader outside div
        ) : (
          <div className="flex overflow-auto">
            {songs.map((item, index) => (
              <SongItem
                key={index}
                name={item.name}
                description={item.description}
                id={item.id}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mb-4">
      <h1 className="my-5 font-extrabold text-2xl md:text-3xl lg:text-4xl"><span className="text-[#00ABE4]">Best</span> HighLig<span className="text-[#00ABE4]">hts</span></h1>
        <CircularHighlights />
      </div>
      <div className="mb-8">
  <h1 className="my-5 font-extrabold text-2xl md:text-3xl lg:text-4xl">
    <span className="text-[#00ABE4]">Top</span> Artists
  </h1>
  {/* Scrollable Container */}
  <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#00ABE4] scrollbar-track-gray-700">
    <div className="flex space-x-6">
      {artists.map((artist, index) => (
        <div
          key={index}
          className="flex flex-col items-center space-y-3 group"
        >
          {/* Artist Image */}
          <div className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-gray-800 rounded-full overflow-hidden shadow-xl transform group-hover:scale-105 transition-transform duration-300">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Artist Name */}
          <span className="text-sm md:text-base text-gray-200 font-semibold group-hover:text-[#00ABE4] transition-colors duration-300">
            {artist.name}
          </span>
        </div>
      ))}
    </div>
  </div>
      </div>


    </>
  );
};

export default DisplayHome;
