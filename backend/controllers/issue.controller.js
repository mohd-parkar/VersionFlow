const mongoose = require("mongoose");
const IssueModel = require("../models/issueModel");
const Issue = require("../models/issueModel");


const createIssue = async(req,res)=>{
    // now the issue is created as per the repository 
    // so we take the repo id and create issue as per it

    const id = req.params.id; // this is repo id
    const {title, description} = req.body;


    try{
    const newIssue = await new IssueModel({
        title : title,
        description : description,
        repository : id,
    });

    let result = await newIssue.save();

    res.json(result);

    }catch(error){
        console.error("Error during creation of issue",error.message);
        res.status(500).json({message : "Server Error"});
    }
};

const updateIssue = async(req,res)=>{
    // updating existing issue
    const id = req.params.id;
    const {title,description,status} = req.body;


    try{
        const issue = await IssueModel.findById(id);

         if(!issue){
            return res.status(404).json({message : "issue not found"});
        }

        // overwriting 
        issue.title = title;
        issue.description = description;
        issue.status = status ;

        let result = await issue.save();

        res.json(result);

    }catch(error){
        console.error("Error during the updation of issue",error.message);
        res.status(500).json({message : "Error Server"});
    }
};

const deleteIssueById = async (req,res)=>{
    const id = req.params.id;
    
    try{
        const issue = await IssueModel.findByIdAndDelete(id);

        if(!issue){
            return res.status(404).json({message : "issue not found"});
        }

        res.json({message : "issue was deleted succesfully"});

    }catch(error){
        console.error("Error during deletion of issue", error.message);
        res.status(500).json({message : "server error"});
    };
};

const getAllIssues = async (req,res)=>{
   
    try{
        const issues = await IssueModel.find({});

        if(!issues){
            return res.status(400).json({message : "no issues found"});
            // haven't populated the repository field in this issue collection or object means an object reference id will be seen in the issue object for the repository filed . 
            // might add the populate later
        };

        res.json(issues);

    }catch(error){
        console.error("Error during fetching all issues", error.message);
        res.status(500).json({message : "server error"});
    }
};

const getIssuesById = async(req,res)=>{
    const id = req.params.id;

    try{
        const issue = await IssueModel.findById(id).populate("repository");

        if(!issue){
            return res.status(404).json({message :" Issue not found"});
        };

        res.json(issue);


    }catch(error){
        console.error("Error during fetching certain issue", error.message);
        res.status(500).json({message : "Server Error"});
    }
};

module.exports = {
    createIssue,
    updateIssue,
    deleteIssueById,
    getAllIssues,
    getIssuesById,
};



