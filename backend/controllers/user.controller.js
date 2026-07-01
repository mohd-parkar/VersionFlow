const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const dotenv = require("dotenv");
var ObjectId = require("mongodb").ObjectId; // for searching the objectId in db

dotenv.config();

const getAllUsers = async (req, res) => {
  // fetching all the users then sending
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (error) {
    console.error("Error occured during fetching all users", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserProfile = async (req, res) => {
  const currentID = req.params.id;

  // fetching certain user profile
  try {
    const user = await UserModel.findOne({ _id: new ObjectId(currentID) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error occured during fetching", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  // update the user info given by him , first access his id from params
  const currentID = req.params.id;
  const { email, password } = req.body;

  try {
    const updatedInfo = { email };
    if(password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updatedInfo.password = hashedPassword;
    }
    const result = await UserModel.findByIdAndUpdate(
      {
        _id: currentID,
      },
      { $set: updatedInfo },
      {
        returnDocument: "after",
      },
    );

    if(!result){
     return  res.status(404).json({message : "User not found "});
    };

    res.send(result);

  } catch (err) {
    console.error("Error occured while updated", err.message);
    res.status(500).json({message : "Server error"})
  };


};

const deleteUserProfile = async(req, res) => {
  const currentID = req.params.id ;

  try{
    const result = await UserModel.findByIdAndDelete({_id : currentID});

    if(!result){
      return res.status(404).json({message : "User Not Found"});
    };

    res.json({
    message: "User profile deleted",
    user: result,
});

  }catch(error){
    console.error("Error occured during the deleting user", error.message);
    res.status(500).json({message : "Server Error"});
  }
};

async function signup(req, res) {
  const { username, password, email } = req.body;

  // now adding the user into our db (signup) -> creating token on that
  try {
    // check if already exist
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    // hashing the password before adding it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username: username,
      email: email,
      password: hashedPassword,
      repositories: [],
      starrepo: [], // intialize as empty will save in it later
    });

    let result = await newUser.save();

    // now the user is save let create a token (jwt)
    const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({token , userId : result._id});
  } catch (err) {
    console.error("Error occured", err.message);
  }
}

const login = async (req, res) => {
  // taking the email / userrname and password from the user
  const { email, password } = req.body;

  try {
    // Checking if the email or user is invalid or not signed in
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "bad email" });
    }

    // now we check the password matches with our db password (this bcrypt func check our hashed password from the db)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "incorrect password" });
    }

    // if password matches , means user credentail then we CREATE TOKEN
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("Error occured", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
