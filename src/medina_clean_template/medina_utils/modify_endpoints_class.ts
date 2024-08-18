import { workspace } from "vscode";
import { getFileContent } from "../../utils/get_file_content";

export async function modifyEndpointsClass(featureName: String) {
  let upperCasedFeatureName = featureName.toUpperCase();

  workspace.findFiles("**/api_constants.dart").then((files) => {
    files.forEach((file) => {
      getFileContent(file.fsPath).then(async (content) => {
        if (
          content.includes("class ApiEndPoints {") &&
          !content.includes(`final String ${upperCasedFeatureName}S`)
        ) {
          content = content.replace(
            "class ApiEndPoints {",
            `class ApiEndPoints {
  final String ${featureName.toUpperCase()}S = '/${featureName}s';`
          );
          const contentArray = new TextEncoder().encode(content);
          await workspace.fs.writeFile(file, contentArray);
        }
      });
    });
  });
}
