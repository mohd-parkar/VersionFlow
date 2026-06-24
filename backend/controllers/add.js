const fs = require("fs").promises;
const { copyFile } = require("fs");
const path = require("path");


async function addRepo(filePath){
const initPath = path.resolve(process.cwd(),".VersionFlow");
// path for stagging which is insider our hidden repo
const staggingPath = path.join(initPath, "staging");

try { 
    // creating the stagging folder
    await fs.mkdir(staggingPath,{recursive : true});
    // taking file from user and then copying inside the stagging folder
    const fileName = path.basename(filePath);

    await fs.copyFile(filePath,
        path.join(staggingPath, fileName)
    );

    console.log(`File ${fileName} was added into staging area`)
} catch (error) {
    console.log(`Error occured during add : ${error}`);
}

   
}

module.exports = {addRepo};
