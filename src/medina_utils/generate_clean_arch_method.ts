import { Uri, window } from "vscode";
import { promptForFeatureName } from "../utils/ask-for-feature-name";
import { getTargetDirectory } from "../utils/get-target-directory";
import { isNameValid } from "../utils/name-validation";
import { getPascalCase } from "../utils/pascal-case";
import { generateFeatureCleanArchitecture } from "./generate_feature_arch_method";

export async function generateMedinaCleanArchitecture(uri: Uri) {
  // Show feature prompt
  let featureName = await promptForFeatureName();

  // Abort if name is not valid
  if (!isNameValid(featureName)) {
    window.showErrorMessage("The name must not be empty");
    return;
  }

  featureName = `${featureName}`;

  const pascalCaseFeatureName = getPascalCase(featureName.toLowerCase());

  let targetDirectory = "";
  try {
    targetDirectory = await getTargetDirectory(uri);
  } catch (error) {
    window.showErrorMessage((error as Error).message);
  }

  generateFeatureCleanArchitecture(featureName, targetDirectory).finally(() =>
    window.showInformationMessage(
      `Successfully Generated ${pascalCaseFeatureName} Feature`
    )
  );
}
