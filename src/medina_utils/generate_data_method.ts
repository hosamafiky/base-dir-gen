import path from "path";
import { getMedinaDataImportsTemplate } from "../medina_clean_paginated_list_template/data/data_imports.template";
import { getMedinaEntityModelTemplate } from "../medina_clean_paginated_list_template/data/model.template";
import { getMedinaDataSourceTemplate } from "../medina_clean_paginated_list_template/data/remote_datasource.template";
import { getMedinaRepositoryImplTemplate } from "../medina_clean_paginated_list_template/data/repo_impl.template";
import { createDirectory } from "../utils/create-directory";
import { writeContent } from "../utils/write-content";

export async function createFeatureCleanArchitectureDataTemplate(
  featureName: string,
  targetDirectory: string
) {
  let subDirectories = ["datasources", "models", "repositories"];
  let templates = [
    getMedinaDataSourceTemplate(featureName),
    getMedinaEntityModelTemplate(featureName),
    getMedinaRepositoryImplTemplate(featureName),
  ];
  let fileNames = [
    `${featureName}_remote_data_source`,
    `${featureName}_model`,
    `${featureName}_repository_impl`,
  ];
  for (let index = 0; index < subDirectories.length; index++) {
    const directory = subDirectories[index];
    const template = templates[index];
    const fileName = fileNames[index];

    let targetDir = path.join(targetDirectory, directory);

    createDirectory(targetDir).finally(() => {
      writeContent(fileName, targetDir, template);
    });
  }

  createDirectory(targetDirectory).finally(() => {
    writeContent(
      `data_imports`,
      targetDirectory,
      getMedinaDataImportsTemplate(featureName)
    );
  });
}
