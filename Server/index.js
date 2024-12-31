const express = require("express")
const {connectToDb} = require("./db")
const UserRouter = require("./Routes/User")
const AlbumRouter = require("./Routes/Album")
const playlistRouter = require("./Routes/Playlist")
const FavouriteRouter = require("./Routes/Favourite")
const paymentRoutes = require('./Routes/paymentRoutes')
// const Count = require("./Routes/count")
const Song = require("./Model/Song")
const path =  require("path")
const multer = require("multer")
const cors = require("cors")
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/",UserRouter)
app.use("/admin",AlbumRouter)
app.use("/user",playlistRouter)
app.use("/user",FavouriteRouter)
app.use('/payement', paymentRoutes); 
// app.use('/', Count); 




const storage = multer.diskStorage({
    destination: './Upload/AlbumImages',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });
app.use('/albumimages', express.static("Upload/AlbumImages"));
app.post("/uploadalbum", upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    res.json({
        success: true,
        image_url: `http://localhost:${port}/albumimages/${req.file.filename}`
    });
});


// #  UPLOAD FILES 

const storageAudio = multer.diskStorage({
    destination: './Upload/AudioFiles',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadAudio = multer({ storage: storageAudio });

app.use('/audiofiles', express.static("Upload/AudioFiles"));

app.post("/uploadaudio", uploadAudio.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    res.json({
        success: true,
        file_url: `http://localhost:${port}/audiofiles/${req.file.filename}`
    });
});


// Connect to the database and sync indexes
connectToDb().then(async () => {
    console.log("Connected to database");

    // Sync indexes for the Song model
    await Song.syncIndexes();
    console.log("Indexes synced for Song model");
}).catch((err) => {
    console.error("Database not connected", err);
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})