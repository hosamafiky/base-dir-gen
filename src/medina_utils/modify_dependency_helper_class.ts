import { workspace } from "vscode";
import { getFileContent } from "../utils/get_file_content";
import { getPascalCase } from "../utils/pascal-case";

export async function modifyDependencyHelperClass(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);

  workspace.findFiles("**/dependency_helper.dart").then((files) => {
    files.forEach((file) => {
      getFileContent(file.fsPath).then(async (content) => {
        if (
          content.includes("void registerDependencies() {") &&
          !content.includes(`setUp${upperCamelCaseFeatureName}sDependencies();`)
        ) {
          content = content.replace(
            `void registerDependencies() {
    setUpGeneralDependencies();`,
            `void registerDependencies() {
    setUpGeneralDependencies();
    setUp${upperCamelCaseFeatureName}Dependencies();`
          );

          content = content.replace(
            `import 'package:get_it/get_it.dart';
`,
            `import 'package:get_it/get_it.dart';

import '../../features/${featureName}/di/setup_${featureName}_dependencies.dart';`
          );

          const contentArray = new TextEncoder().encode(content);
          await workspace.fs.writeFile(file, contentArray);
        }
      });
    });
  });
}
