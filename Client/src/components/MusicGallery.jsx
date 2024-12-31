import AlbumCover1 from "../assets/Pritm.jpg";
import AlbumCover2 from "../assets/AtifAslam.jpg";
import AlbumCover3 from "../assets/Darsahn.jpg";
import AlbumCover4 from "../assets/Rahat.jpg";
import AlbumCover5 from "../assets/Subh.jpg";

const MusicGallery = () => {
  const albums = [
    { id: 1, image: AlbumCover1, title: "Pritam" },
    { id: 2, image: AlbumCover2, title: "Atif Aslam" },
    { id: 3, image: AlbumCover3, title: "Darshan Raval" },
    { id: 4, image: AlbumCover4, title: "Rahat Fateh " },
    { id: 5, image: AlbumCover5, title: "Shubh" },
  ];

  return (
    <section className="bg-black py-16 text-white">
      {/* Content Section */}
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Explore the Latest Hits
        </h2>
        <p className="text-lg md:text-xl">
          Dive into your favorite tracks and discover new music.
        </p>
      </div>

      {/* Music Gallery */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {albums.map((album) => (
            <div key={album.id} className="group relative">
              {/* Album Cover */}
              <img
                src={album.image}
                alt={album.title}
                className="w-full h-full object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-center transition-opacity duration-300 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{album.title}</h3>
                <button className="bg-[#00ABE4] text-white py-2 px-6 rounded-full font-semibold hover:bg-[#b5e9faa1] transition duration-300">
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicGallery;
