 const fs = require("fs").promises;
 const path = require("path");

 
 async function initRepo(){
    // path
    const initPath = path.resolve(process.cwd(),".VersionFlow");
    const commitsPath = path.join(initPath,"commits");


    // create the folder as per path (nested folder)
    try{
        await fs.mkdir(initPath, {recursive : true}); // hidden 
        await fs.mkdir(commitsPath, {recursive : true}); // >commmits

        // additional file for config
        await fs.writeFile(
            path.join(initPath, "config.json"),
            JSON.stringify({bucket : process.env.S3_BUCKET}),
        ); 

        console.log("Repository is initialized")

    }catch(e){
        console.log(`Error occurred during repo initialize  ${e}`);
    }

    console.log("init was called");
}

module.exports = {initRepo};