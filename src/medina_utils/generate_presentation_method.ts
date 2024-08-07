import path from "path";
import { getMedinaAddSheetTemplate } from "../medina_clean_template/presentation/add_sheet.template";
import { getMedinaCubitClassTemplate } from "../medina_clean_template/presentation/cubit.template";
import { getMedinaCubitStateTemplate } from "../medina_clean_template/presentation/cubit_state.template";
import { getMedinaScreenViewTemplate } from "../medina_clean_template/presentation/page.template";
import { getMedinaPresentationImportsTemplate } from "../medina_clean_template/presentation/presentation_imports.template";
import { createDirectory } from "../utils/create-directory";
import { writeContent } from "../utils/write-content";

export async function createFeatureCleanArchitecturePresentationTemplate(
  featureName: string,
  targetDirectory: string
) {
  let subDirectories = ["cubit", "pages", "widgets"];

  for (let index = 0; index < subDirectories.length; index++) {
    const directory = subDirectories[index];

    if (index == 0) {
      let targetDir = path.join(targetDirectory, directory);
      let fileNames = [`${featureName}_cubit`, `${featureName}_state`];
      for (let i = 0; i < fileNames.length; i++) {
        const template =
          i == 0
            ? getMedinaCubitClassTemplate(featureName)
            : getMedinaCubitStateTemplate(featureName);
        const fileName = fileNames[i];
        createDirectory(targetDir).finally(() => {
          writeContent(fileName, targetDir, template);
        });
      }
    } else if (index == 1) {
      let targetDir = path.join(targetDirectory, directory);

      createDirectory(targetDir).finally(() => {
        writeContent(
          `${featureName}s_page`,
          targetDir,
          getMedinaScreenViewTemplate(featureName)
        );
      });
    } else {
      const template = getMedinaAddSheetTemplate(featureName);
      const fileName = `add_${featureName}_sheet`;

      let targetDir = path.join(targetDirectory, directory);

      createDirectory(targetDir).finally(() => {
        writeContent(fileName, targetDir, template);
      });
    }
  }
  createDirectory(targetDirectory).finally(() => {
    writeContent(
      `presentation_imports`,
      targetDirectory,
      getMedinaPresentationImportsTemplate(featureName)
    );
  });
}
