const Joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const Song = require("../Model/Song");

const register = async (req, res) => {
  const body = req.body;

  const schema = Joi.object({
    firstname: Joi.string().min(1).required(),
    lastname: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),

  });

  const { error } = schema.validate(body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  try {
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User already exists", success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const user = await User.create({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: hashedPassword,
      role: body.role,
      history:[]
    });
    return res
      .status(201)
      .json({ msg: "User registered successfully", user: user, success: true });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};
const login = async (req, res) => {
  const body = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(400).json({
        msg: "Please Login with the correct credentials",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Please Login with the correct credentials",
        success: false,
      });
    }

    if(user.status === "0"){
      return res.status(400).json({msg:'You donot have access to this page. Please contact to admin for access', success:false})
    }

    const data = {
      id: user._id,
      role: user.role,
      name: user.firstname + " " + user.lastname,
      status: user.status,
    };
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "24h" });
    return res.status(200).json({
      msg: "Login successful",
      token,
      role: user.role,
      name: user.firstname + " " + user.lastname,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const purchasePremium = async (req, res) => {
  const { subscriptionType } = req.body;
  const userId = req.user.id;
  console.log(subscriptionType, userId);
  if (!["monthly", "yearly"].includes(subscriptionType)) {
    return res
      .status(400)
      .json({ msg: "Invalid subscription type", success: false });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    if(user.premium === "monthly" || user.premium === "yearly"){
      return res.status(400).json({msg:"You already have a premium subscription", success:false})
    }

    user.premium = subscriptionType;

    if (subscriptionType === "monthly") {
      user.premiumExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    } else if (subscriptionType === "yearly") {
      user.premiumExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    }

    await user.save();
    return res.status(200).json({
      msg: "Premium subscription purchased successfully",
      user,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};
const searchUser = async (req, res) => {
  let { query } = req.query;

  if (typeof query !== "string" || query.trim() === "") {
    return res
      .status(400)
      .json({ msg: "Query must be a non-empty string", success: false });
  }

  try {
    const users = await User.find({
      $or: [
        { email: { $regex: query, $options: "i" } },
        { firstname: { $regex: query, $options: "i" } },
        { lastname: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json({ users, success: true });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getUserWithId = async (req, res) => {
    const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const updateUser = async (req, res) => {
    const id = req.user.id;
    const {...data} = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, data,{new:true});
    if (!user) {
      return res.status(404).json({ message: "User not found",success:false });
    }
    return res.status(200).json({ user, message:"user updated Successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error",success:false });
  }
}
const updateUserStatus = async (req, res) => {
  const { id, status } = req.body;
  console.log(req.body);

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({ user, message: "User updated successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const addToHistory = async (req,res) => {
  const searchQuery = req.body.songn;
  console.log("Search query:", searchQuery);
  const userId = req.user.id;
  try {
      await User.findByIdAndUpdate(
          userId,
          {
              $push: {
                  history: { query: searchQuery },
              },
          },
          { new: true }
      );
      console.log("Search history updated.");
  } catch (error) {
      console.error("Error updating search history:", error);
  }
};
const searchHistorySongs = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find the user by ID and get the history
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Retrieve the history of queries for the user
    const userHistory = user.history.map((entry) => entry.query);

    // If the history is empty, fetch 5 random songs from the database
    if (userHistory.length === 0) {
      const randomSongs = await Song.aggregate([{ $sample: { size: 5 } }]);
      return res.status(200).json({ success: true, message: "Random songs", results: randomSongs });
    }

    // Check if any song's name or singer matches any of the queries in userHistory
    const matchingSongs = await Song.find({
      $or: [
        { name: { $in: userHistory } },  // Match song names
        { singer: { $in: userHistory } },  // Match singer names
      ],
    });

    // Return the matching songs
    if (matchingSongs.length > 0) {
      return res.status(200).json({ success: true, results: matchingSongs });
    } else {
      return res.status(200).json({ success: false, message: "No matching songs found" });
    }
  } catch (error) {
    console.error("Error fetching songs from history:", error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};



module.exports = {
  register,
  login,
  purchasePremium,
  searchUser,
  getAllUsers,
  deleteUser,
  getUserWithId,
  updateUser,
  updateUserStatus,
  addToHistory,
  searchHistorySongs
};
