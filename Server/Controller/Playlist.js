const Playlist = require('../Model/Playlist');
const Song = require('../Model/Song');

const createPlaylist = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const userId = req.user.id;

    const newPlaylist = await Playlist.create({
      name,
      description,
      songs: [],
      status,
      user: userId,
    });

    res.status(201).json({playlist:newPlaylist,success:true, message: 'Playlist created successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Failed to create playlist', error,success:false });
  }
};

const getUsersPlaylist = async (req, res) => {
  try {
    const userId = req.user.id;

    const playlists = await Playlist.find({ user: userId });
    if(!playlists){
      return res.status(404).json({ message: 'No playlist found for this user',success:false });
    }
    return res.json({playlists,success:true});
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch playlists', error });
  }
}

const addToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;
  // console.log(songId);

  const song = await Song.findOne({ id: songId });
  if (!song) {
    return res.status(404).json({ message: 'Song not found', success: false });
  }
  const songid = song._id;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found', success: false });
    }

    if (playlist.songs.includes(songid)) {
      return res.status(400).json({ message: 'Song already exists in the playlist', success: false });
    }

    playlist.songs.push(songid);
    await playlist.save();

    return res.json({ playlist, success: true, message: "Song added to playlist successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to add song to playlist', error });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findByIdAndDelete(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found', success: false });
    }


    return res.json({ success: true, message: 'Playlist deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

const deleteSongFromSelectedPlaylist = async (req, res) => {
  const { playlistId, songId } = req.params;

  // Your logic to delete the song from the playlist
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    const songIndex = playlist.songs.indexOf(songId);
    if (songIndex !== -1) {
      playlist.songs.splice(songIndex, 1);
      await playlist.save();
      return res.status(200).json({ success: true, message: "Song deleted successfully" });
    } else {
      return res.status(404).json({ message: "Song not found in playlist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllPlaylist = async (req, res) => {
  try {
    const playlists = await Playlist.find({});
    if (!playlists) {
      return res.status(404).json({ message: "No playlists found" });
    }
    return res.status(200).json(playlists);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};









module.exports = {
  createPlaylist,
  getUsersPlaylist,
  addToPlaylist,
  deletePlaylist,
  deleteSongFromSelectedPlaylist,
  getAllPlaylist,
};
