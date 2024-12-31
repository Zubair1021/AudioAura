const Joi = require("joi");
const Album = require("../Model/Album");

const addAlbum = async (req, res) => {
  const albumSchema = Joi.object({
    name: Joi.string().min(3).required(),
    image: Joi.string().uri().required(),
    description: Joi.string().min(10).required(),
    bgColor: Joi.string().min(3).required(),
    category: Joi.string().required(),
    // song:Joi.array()
  });

  try {
    const { error } = albumSchema.validate(req.body);
    if (error) {
      return res.status(400).json({success:false, message: "Validation error", details: error.details });
    }

    const { name, image, category, description, bgColor } = req.body;
    const existingAlbum = await Album.findOne({ name });
    if (existingAlbum) {
      return res.status(400).json({ success:false,message: "Album with this name already exists" });
    }

    const lastAlbum = await Album.findOne().sort({ id: -1 });
    const id = lastAlbum ? lastAlbum.id + 1 : 1;

    const newAlbum = await Album.create({
      id,
      name,
      image,
      category,
      description,
      bgColor,
      songs: [],
    });

    res.status(201).json({ success:true,message: "Album added successfully", album: newAlbum });
  }
   catch (error) {
    res.status(500).json({success:false, message: "Error adding album", error });
  }
};

const getalbums = async (req,res) => {
  try {
    const albums = await Album.find({}); // Get only the name field
    res.json({ success: true, albums });
  } catch (error) {
    console.error("Error fetching albums:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedAlbum = await Album.findOneAndDelete({ id });
    if (!deletedAlbum) {
      return res.status(404).json({ message: 'Album not found' });
    }

    res.status(200).json({ message: 'Album deleted successfully', album: deletedAlbum });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting album', error });
  }
};

const updateAlbumBySong = async (songId, albumId) => {
  try {
    const updatedAlbum = await Album.findByIdAndUpdate(
      albumId,
      { $push: { songs: songId } },
      { new: true }
    );

    if (!updatedAlbum) {
      throw new Error("Album not found");
    }

    return updatedAlbum;
  } catch (error) {
    console.error("Error updating album:", error);
    throw error;
  }
};

module.exports = { addAlbum, deleteAlbum,getalbums,updateAlbumBySong};
