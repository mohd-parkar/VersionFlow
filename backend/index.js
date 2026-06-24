const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

// creating init command
yargs(hideBin(process.argv))
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
    commitRepo,
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
    revertRepo,
  )
  .demandCommand(1, "You need atleast one command")
  .help().argv;
