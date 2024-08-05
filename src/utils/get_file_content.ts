import * as fs from "fs";

export async function getFileContent(filePath: string) {
  return fs.promises.readFile(filePath, "utf8");
}
