import { getPascalCase } from "../../utils/pascal-case";
import { getSnakeCase } from "../../utils/snake-case";

export function getFeatureDataTemplate(featureName: string) {
  const pascalCaseFeatureName = getPascalCase(featureName);
  const snakeCaseFeatureName = getSnakeCase(featureName);
  return `part of '${snakeCaseFeatureName}_imports.dart';

class ${pascalCaseFeatureName}Data {}
`;
}
