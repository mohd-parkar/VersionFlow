const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pushRepo() {
  const initPath = path.resolve(process.cwd(), ".VersionFlow");
  const commitsPath = path.join(initPath, "commits");

  try {
    // reading the (multiple)commit folder inside the commits folder 
    const commitDirs = await fs.readdir(commitsPath);
    for(const commitDir of commitDirs){
        const commitPath = path.join(commitsPath, commitDir);
        const files = await fs.readdir(commitPath);

        // now reading the each file of the each commit folder within commits folder (nested loopoing) 
        for (const file of files) {
            const filePath = path.join(commitPath,file);
            const fileContent = await fs.readFile(filePath);
            

            // now uploading the file into s3 bucket 
            const params = {
                Bucket : S3_BUCKET,
                Key : `commits/${commitDir}/${file}`,
                Body : fileContent,
            };

            await s3.upload(params).promise(); 

            console.log("The file were pushed to the S3 bucket");
            
        }
    }

  } catch (error) {
    throw error;
};
}

module.exports = { pushRepo };
