const express = require('express');
const router = express.Router();
const {createPlaylist,getUsersPlaylist,addToPlaylist,deletePlaylist,deleteSongFromSelectedPlaylist,getAllPlaylist} = require('../Controller/Playlist');
const authMiddleware = require('../Middleware/fetchUser');
const {getSongsByIds} = require("../Controller/Song")



router.post('/createplaylist',authMiddleware,createPlaylist)
router.get('/playlists',authMiddleware,getUsersPlaylist)
router.post('/addSongToPlaylist',addToPlaylist)
router.post('/getSongsByIds',getSongsByIds)
router.delete('/playlist/:playlistId', deletePlaylist)
router.delete('/deleteSong/:playlistId/:songId', deleteSongFromSelectedPlaylist)
router.get('/getAllPlaylist',getAllPlaylist)





module.exports = router;