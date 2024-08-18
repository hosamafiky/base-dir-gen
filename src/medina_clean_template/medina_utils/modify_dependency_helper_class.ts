import { window, workspace } from "vscode";
import { getFileContent } from "../../utils/get_file_content";
import { getPascalCase } from "../../utils/pascal-case";
export async function modifyDependencyHelperClass(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);

  let files = await workspace.findFiles("**/dependency_helper.dart");

  files.forEach(async (file) => {
    let content = await getFileContent(file.fsPath);
    if (
      content.includes("void registerDependencies() {") &&
      !content.includes(`setUp${upperCamelCaseFeatureName}sDependencies();`)
    ) {
      let mContent = content.replace(
        `setUpGeneralDependencies();`,
        `setUpGeneralDependencies();
    setUp${upperCamelCaseFeatureName}Dependencies();`
      );

      let modContent = mContent.replace(
        `import 'package:get_it/get_it.dart';`,
        `import 'package:get_it/get_it.dart';
import '../../features/${featureName}/di/setup_${featureName}_dependencies.dart';`
      );

      window.showInformationMessage(modContent);

      const contentArray = new TextEncoder().encode(modContent);
      await workspace.fs.writeFile(file, contentArray);
    }
  });
}
