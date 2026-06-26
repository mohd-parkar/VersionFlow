const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

// Index.js -> 1. Handles reading all command for out git creation
//             2. ALso will behave like actual express server (app) - default functionalities

// creating init command
yargs(hideBin(process.argv))
  .command("start", "Start the server", {}, startServer) // this is additional command which we created to write app server or start it
  .command("init", "Initialize the repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add in stagging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    },
  )
  .command(
    "commit <message>",
    "Commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    },
  )
  .command("push", "Push files to S3", {}, pushRepo)
  .command("pull", "Pull files from S3", {}, pullRepo)
  .command(
    "revert <CommitID>",
    "Revert to specific commit",
    (yargs) => {
      yargs.positional("CommitID", {
        describe: "Commit ID to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.CommitID);
    },
  )
  .demandCommand(1, "You need atleast one command")
  .help().argv;

// Our Express (app)server logic will be writen here - which was defaultly writen insider the index.js file
function startServer() {
  const app = express();

  const port = process.env.PORT || 3000;
  const mongouri = process.env.MONGO_URI;

  app.use(bodyParser.json());
  app.use(express.json());

  mongoose
    .connect(mongouri)
    .then(() => {
      console.log("Mongodb connected successfully");
    })
    .catch((err) => {
      console.error("got and error", err);
    });

  app.use(cors({ origin: "*" }));

  app.get("/",(req,res)=>{
    console.log("Route is working ");
  })

  let user = "test";

  // connecting our server to our socket (here our normal server gets the websocket connection)
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // socket connected logic
  io.on("connection", (socket) => {
    socket.on("joinRoom", (userID) => {
      user = userID;
      console.log(user);
      console.log("======");
      console.log(userID);
      console.log("======");

      socket.join(userID);
    });
  });

  const db = mongoose.connection;

  db.once("open", async () => {
    console.log("CRUD operations called");
  });

  app.get("/", (req, res) => {
    res.status(200).json("Home route is get");
  });

  // now we on the server
  server.listen(port, () => {
    console.log(`Server is running from port : ${port}`);
  });
}