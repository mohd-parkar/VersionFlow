const createIssue = (req,res)=>{
    res.send("Issue created");
};

const updateIssue = (req,res)=>{
    res.send("Issue updated");
};

const deleteIssueById = (req,res)=>{
    res.send("Issue deleted");
};

const getAllIssues = (req,res)=>{
    res.send("All issues fetched");
};

const getIssuesById = (req,res)=>{
    res.send("Issue details fetched");
};

module.exports = {
    createIssue,
    updateIssue,
    deleteIssueById,
    getAllIssues,
    getIssuesById,
};



