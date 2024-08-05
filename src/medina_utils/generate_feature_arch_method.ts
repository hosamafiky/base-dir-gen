import path from "path";
import { createDirectories } from "../utils/create-directories";
import { createFeatureCleanArchitectureDataTemplate } from "./generate_data_method";
import { createFeatureCleanArchitectureDomainTemplate } from "./generate_domain_method";
import { createFeatureCleanArchitecturePresentationTemplate } from "./generate_presentation_method";

export async function generateFeatureCleanArchitecture(
  featureName: string,
  targetDirectory: string
) {
  // Create the feature directory
  const featureDirectoryPath = path.join(
    targetDirectory,
    featureName.toLowerCase()
  );
  await createDirectories(featureDirectoryPath, [
    "data",
    "di",
    "domain",
    "presentation",
  ]);

  Promise.all([
    createFeatureCleanArchitectureDataTemplate(
      featureName,
      path.join(featureDirectoryPath, "data")
    ),
    createFeatureCleanArchitectureDomainTemplate(
      featureName,
      path.join(featureDirectoryPath, "domain")
    ),
    createFeatureCleanArchitecturePresentationTemplate(
      featureName,
      path.join(featureDirectoryPath, "presentation")
    ),
  ]);
}
