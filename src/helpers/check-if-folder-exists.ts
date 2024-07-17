import fs from "fs";

export default function checkIfFolderExists(folderName: string) {
  return new Promise((resolve) => {
    fs.access(folderName, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
