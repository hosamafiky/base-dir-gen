import path from "path";
import { createDirectories } from "../utils/create-directories";
import { createFeatureCleanArchitectureDataTemplate } from "./generate_data_method";
import { createFeatureCleanArchitectureDITemplate } from "./generate_di_method";
import { createFeatureCleanArchitectureDomainTemplate } from "./generate_domain_method";
import { createFeatureCleanArchitecturePresentationTemplate } from "./generate_presentation_method";
import { modifyDependencyHelperClass } from "./modify_dependency_helper_class";
import { modifyEndpointsClass } from "./modify_endpoints_class";

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
    createFeatureCleanArchitectureDITemplate(
      featureName,
      path.join(featureDirectoryPath, "di")
    ),
  ]);

  Promise.all([
    modifyEndpointsClass(featureName),
    modifyDependencyHelperClass(featureName),
  ]);
}
