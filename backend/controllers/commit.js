const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function commitRepo(message) {
  const initPath = path.resolve(process.cwd(), ".VersionFlow");
  const staggingPath = path.join(initPath, "staging");
  const commitsPath = path.join(initPath, "commits");
  // all the folders are already created , we are just defining there path (commits folder gets created inside the init command logic)

  // now we created a folder for a commit inside commits folder
  // and that single commit folder will be name after its uniquely generated id -> will contain the file whhich we will move from staging folder to this folder

  try {
    const commitID = uuidv4();
    // single commit folder inside commits folder
    const commitDir = path.join(commitsPath, commitID); // folder named after its commit id
    await fs.mkdir(commitDir, { recursive: true });

    // read staging folder files so that we can transfer
    const files = await fs.readdir(staggingPath);
    for (const file of files) {
      await fs.copyFile(
        path.join(staggingPath, file), // from
        path.join(commitDir, file), // where
      );
    }

    // create an json file that keeps track of the all commits
    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message, date: new Date().toISOString() }),
    );

    console.log(`Commit ${commitID} created with the message : ${message}`);
  } catch (e) {
    console.log(`Error occured within commit commnad : ${e}`);
  }
}

module.exports = { commitRepo };
