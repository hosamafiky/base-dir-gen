import { existsSync, writeFile } from "fs";

export async function writeContent(
  fileName: string,
  targetDirectory: string,
  template: string
) {
  const targetPath = `${targetDirectory}/${fileName}.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${fileName}.dart already exists`);
  }
  return new Promise(async (resolve, reject) => {
    await writeFile(targetPath, template, "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(true);
    });
  });
}
