const express =require("express")
const {register,login,purchasePremium,searchUser,getAllUsers,deleteUser,getUserWithId,updateUser,updateUserStatus,addToHistory,searchHistorySongs} = require("../Controller/User")
const authMiddleware = require('../Middleware/fetchUser');
const router = express.Router()
const Song = require('../Model/Song'); // Replace with your Song model
const Album = require('../Model/Album'); // Replace with your Album model
const Playlist = require('../Model/Playlist'); // Replace with your Playlist model
const User = require('../Model/User'); // Replace with your User model





router.post("/register",register )
router.post("/login", login)
router.post("/purchasepremium",authMiddleware,purchasePremium)
router.get("/searchuser",searchUser)
router.get("/getalluser",getAllUsers)
router.delete("/deleteuser",deleteUser)
router.get("/getuserwithid",authMiddleware,getUserWithId)
router.put("/updateUser",authMiddleware,updateUser)
router.put("/updateUserStatus",updateUserStatus)
router.put("/historyUpdate",authMiddleware,addToHistory)
router.get("/searchHistorySongs",authMiddleware,searchHistorySongs)
router.get('/counts', async (req, res) => {
    try {
      const songsCount = await Song.countDocuments(); // Counts the number of songs in the database
      const albumsCount = await Album.countDocuments(); // Counts the number of albums in the database
      const playlistsCount = await Playlist.countDocuments(); // Counts the number of playlists in the database
      const usersCount = await User.countDocuments(); // Counts the number of users in the database
  
      // Respond with the counts
      res.json({
        success: true,
        data: {
          songsCount,
          albumsCount,
          playlistsCount,
          usersCount,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error fetching counts',
      });
    }
  });


module.exports = router