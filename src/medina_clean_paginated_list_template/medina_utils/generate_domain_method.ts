import path from "path";
import { createDirectory } from "../../utils/create-directory";
import { writeContent } from "../../utils/write-content";
import { getMedinaDomainImportsTemplate } from "../domain/domain_imports.template";
import { getMedinaEntityTemplate } from "../domain/entity.template";
import { getMedinaGetUsecaseTemplate } from "../domain/get_usecase.template";
import { getMedinaRepositoryTemplate } from "../domain/repo.template";

export async function createFeatureCleanArchitectureDomainTemplate(
  featureName: string,
  targetDirectory: string
) {
  let subDirectories = ["entities", "usecases", "repositories"];
  let templates = [
    getMedinaEntityTemplate(featureName),
    ``,
    getMedinaRepositoryTemplate(featureName),
  ];
  let fileNames = [`${featureName}`, ``, `${featureName}_repository`];
  for (let index = 0; index < subDirectories.length; index++) {
    const directory = subDirectories[index];
    let targetDir = path.join(targetDirectory, directory);
    if (index == 1) {
      let usecasesNames = [`get_${featureName}s_usecase`];
      let usecasesTemplates = [getMedinaGetUsecaseTemplate(featureName)];

      for (let i = 0; i < usecasesNames.length; i++) {
        const template = usecasesTemplates[i];
        const fileName = usecasesNames[i];

        createDirectory(targetDir).finally(() => {
          writeContent(fileName, targetDir, template);
        });
      }
    } else {
      const template = templates[index];
      const fileName = fileNames[index];

      createDirectory(targetDir).finally(() => {
        writeContent(fileName, targetDir, template);
      });
    }
  }

  createDirectory(targetDirectory).finally(() => {
    writeContent(
      `domain_imports`,
      targetDirectory,
      getMedinaDomainImportsTemplate(featureName)
    );
  });
}
