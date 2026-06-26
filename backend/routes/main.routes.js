// contains all three user routes , repo routes , issue routes then all in one push on our index.js app.use

const express = require("express");
const userRouter = require("../routes/user.routes");

const router = express.Router();

router.use(userRouter);


module.exports = router;