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
  .command("start", "Start the server", {}, startServer)// this is additional command which we created to write app server or start it 
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
    (argv)=>{
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
    (argv)=>{
      commitRepo(argv.message)
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
     (argv)=>{
      revertRepo(argv.CommitID)
    },
  )
  .demandCommand(1, "You need atleast one command")
  .help().argv;


  // Our Express (app)server logic will be writen here - which was defaultly writen insider the index.js file
  function startServer(){
    console.log("our app server logic called");
  }