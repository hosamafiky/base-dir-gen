import lodash from "lodash";
import { OpenDialogOptions, window } from "vscode";

export async function promptForTargetDirectory(): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Select a folder to create the feature in",
    canSelectFolders: true,
  };

  return window.showOpenDialog(options).then((uri) => {
    if (lodash.isNil(uri) || lodash.isEmpty(uri)) {
      return undefined;
    }
    return uri![0].fsPath ?? undefined; // Added null check for 'uri' and accessed fsPath property of the first element
  });
}
