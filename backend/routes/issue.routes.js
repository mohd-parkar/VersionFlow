const express = require("express");
const issueController = require("../controllers/issue.controller");

const router = express.Router();

router.post("/issue/create/:id", issueController.createIssue);
router.put("/issue/update/:id", issueController.updateIssue);
router.delete("/issue/delete/:id", issueController.deleteIssueById);
router.get("/issue/all", issueController.getAllIssues);
router.get("/issue/:id", issueController.getIssuesById);


module.exports = router;