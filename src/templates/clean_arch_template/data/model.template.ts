import { getPascalCase } from "../../../utils/pascal-case";

export function getEntityModelTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `part of '../imports/${featureName}_data_imports.dart';
class ${upperCamelCaseFeatureName}Model extends ${upperCamelCaseFeatureName}Entity {
  const ${upperCamelCaseFeatureName}Model({required super.id, required super.name});
}`;
}
