// contains all three user routes , repo routes , issue routes then all in one push on our index.js app.use

const express = require("express");
const userRouter = require("../routes/user.routes");
const repoRouter = require("../routes/repo.routes");
const issueRouter = require("../routes/issue.routes");

const router = express.Router();

router.use(userRouter);
router.use(repoRouter);
router.use(issueRouter);


module.exports = router;