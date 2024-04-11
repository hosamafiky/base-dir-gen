import { getPascalCase } from "../../utils/pascal-case";
import { getSnakeCase } from "../../utils/snake-case";

export function getProviderFeatureDataTemplate(featureName: string) {
  const pascalCaseFeatureName = getPascalCase(featureName);
  const snakeCaseFeatureName = getSnakeCase(featureName);
  return `part of '${snakeCaseFeatureName}_imports.dart';

class ${pascalCaseFeatureName}Data {
  const ${pascalCaseFeatureName}Data(this.context);

  final BuildContext context;
  
}`;
}
