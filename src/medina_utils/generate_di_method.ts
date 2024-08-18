import { getMedinaServiceLoctorTemplate } from "../medina_clean_paginated_list_template/di/di.template";
import { createDirectory } from "../utils/create-directory";
import { writeContent } from "../utils/write-content";

export async function createFeatureCleanArchitectureDITemplate(
  featureName: string,
  targetDirectory: string
) {
  createDirectory(targetDirectory).finally(() => {
    writeContent(
      `setup_${featureName}_dependencies`,
      targetDirectory,
      getMedinaServiceLoctorTemplate(featureName)
    );
  });
}
