const mongoose = require("mongoose");
const RepoModel = require("../models/repoModel");
const UserModel = require("../models/userModel");
const IssueModel = require("../models/issueModel");
const httpStatus = require("http-status");

const createRepository = async (req, res) => {
  const {name, description , content , visibility,owner,issues} = req.body;

  try{
    // validation 
    if(!name){
      return res.status(404).json({message : "Required Name"});
    };

    if(!mongoose.Types.ObjectId.isValid(owner)){
      return res.status(404).jcson({message : "User ID invalid"});
    };

    // now the real game of inserting the user given data into out repo collection of db
    const newrepo = new RepoModel({
      name : name,
      description : description,
      content : content,
      visibility : visibility,
      owner : owner,
      issues : issues,
    });

    let result =  await newrepo.save();

    res.status(201).json(result);
  }catch(error){
    console.error("Error during the creation of repo", error.message);
    res.status(500).json({message : "Server Error"});
  };

};

const getAllRepositories = async (req, res) => {
  try{
    const repositories = await RepoModel.find({}).populate("owner").populate("issues");

    if(!repositories){
      return res.status(404).json({messgae : "Didn't found the repositories"});
    }

    res.json(repositories);
  }catch(error){
    console.error("Error during the fetching all the repos",error.message);
    res.status(500).json({message : "Server Error"});
  };
};

const fetchRepositoryById = async (req, res) => {
  const id = req.params.id;

  try{
    const repo = await RepoModel.find({_id : id}).populate("owner").populate("issues");

    if(!repo){
      return res.status(404).json({message : "Repo not found"});
    };

    res.json(repo);

  }catch(err){
    console.error("Error during the fetching repo by id");
    res.status(500).json({message : "Server Error"});
  }

};

const fetchRepositoryByName = async (req, res) => {
  const name = req.params.name;
  
  try{
    const repo = await RepoModel.find({name});

    if(!repo){
      return res.status(404).json({message : "Repo not found"});
    };

    res.json(repo);
  }catch(err){
    console.error("Error during the fetching the repo using name",err.message);
    res.status(500).json({message : "Internal server error"});
  };
};

const fetchRepositoryForCurrentUser = async (req, res) => {
  const UserId = req.user;

  try{
    const repositories = await RepoModel.find({owner : UserId});

    if(!repositories){
      return res.status(404).json({message : "user repositories not found"});
    };

    res.json(repositories);
  }catch(error){
    console.error("Error during fetching user repo", error.message);
    res.status(500).json({message : "Server Error"});
  };


};

const updateRepositoryById = async (req, res) => {
  const id = req.params.id;
  const {content, description} = req.body;

  try{
    let repository = await RepoModel.findById(id);

    if(!repository){
      return res.status(404).json({message : "Repository not found"});
    };

    repository.content.push(content);
    repository.description = description;

    const result = await repository.save();

    res.json({message : "Repository updated succesfully , repository : result"});


  }catch(error){
    console.error("Error during updating the repo",error.message);
    res.status(500).json({message : "Server Error"});
  }

};

const toggleVisibilityById = async(req, res) => {
  const id = req.params.id;

  try{
    let repository = await RepoModel.findById(id);

    if(!repository){
      return res.status(404).json({message : "Repository not found"});
    };

    repository.visibility = !repository.visibility;

    const result = await repository.save();

    res.json({message : "Repository toggle  succesfully , repository : result"});


  }catch(error){
    console.error("Error during toggling the repo",error.message);
    res.status(500).json({message : "Server Error"});
  }
};

const deleteRepositoryById = async(req, res) => {
  const id = req.params.id;

  try{
    const repository = await RepoModel.findByIdAndDelete(id);

    if(!repository){
      return res.status(404).json({message : "repo not found"});
    };

    res.json({message :"Repository deleted"})
  }catch(error){ 
    console.error("Error occured during deletion of repo",error.message);
    res.status(500).json({message : "Server Error"});
  }
};


module.exports = {
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById,
};