import { InputBoxOptions, window } from "vscode";

export function promptForFeatureName(): Thenable<string | undefined> {
  const featureNamePromptOptions: InputBoxOptions = {
    prompt: "Feature Name",
    placeHolder: "counter",
  };
  return window.showInputBox(featureNamePromptOptions);
}
