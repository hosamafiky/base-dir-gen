import { createDirectory } from "../../utils/create-directory";
import { writeContent } from "../../utils/write-content";
import { getMedinaServiceLoctorTemplate } from "../di/di.template";

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
