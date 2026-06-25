const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    // now we read the file from the s3 bucket and write inside the commits folder
    const data = await s3
      .listObjectsV2({
        Bucket: S3_BUCKET,
        Prefix: "commits/",
      })
      .promise();

    const objects = data.Contents;

    // we create commit folder as per out commit_id name
    for (const object of objects) {
      const key = object.Key;
      const commitDir = path.join(
        commitsPath,
        path.dirname(key).split("/").pop()
      );

      await fs.mkdir(commitDir, { recursive: true });

      const params = {
        Bucket: S3_BUCKET,
        Key: key,
      };

      //finally create the file inside it  
      const fileContent = await s3.getObject(params).promise();
      await fs.writeFile(path.join(repoPath, key), fileContent.Body);

      console.log("All commits pulled from S3.");
    }
  } catch (err) {
    console.error("Unable to pull : ", err);
  }
}

module.exports = { pullRepo };