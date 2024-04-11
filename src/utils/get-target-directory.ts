import { lstatSync } from "fs";
import lodash from "lodash";
import { Uri } from "vscode";
import { promptForTargetDirectory } from "./ask-for-directory";

export async function getTargetDirectory(uri: Uri): Promise<string> {
  let targetDirectory;
  if (
    lodash.isNil(lodash.get(uri, "fsPath")) ||
    !lstatSync(uri.fsPath).isDirectory()
  ) {
    targetDirectory = await promptForTargetDirectory();
    if (lodash.isNil(targetDirectory)) {
      throw Error("Please select a valid directory");
    }
  } else {
    targetDirectory = uri.fsPath;
  }

  return targetDirectory as string;
}
