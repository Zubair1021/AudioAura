const express = require("express")
const router = express.Router()
const {addToFavorites,getFavourites,removeFavourite} = require("../Controller/Favourite")
const authMiddleware = require("../Middleware/fetchUser")

router.post("/addfavourite",authMiddleware,addToFavorites)

router.get("/favorites", authMiddleware,getFavourites);

router.delete("/favorites/:songId", authMiddleware,removeFavourite);

module.exports = router;