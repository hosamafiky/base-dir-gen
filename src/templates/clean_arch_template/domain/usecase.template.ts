import { getLowerCamelCase } from "../../../utils/lower-camel-case";
import { getPascalCase } from "../../../utils/pascal-case";

export function getUsecaseTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  const lowerCamelCaseFeatureName = getLowerCamelCase(featureName);

  return `part of '../imports/${featureName}_domain_imports.dart';

class Fetch${upperCamelCaseFeatureName}UseCase extends UseCase<List<${upperCamelCaseFeatureName}Entity>, String> {
  final ${upperCamelCaseFeatureName}Repository ${lowerCamelCaseFeatureName}Repository;

  Fetch${upperCamelCaseFeatureName}UseCase({required this.${lowerCamelCaseFeatureName}Repository});
  @override
  Future<Result<List<${upperCamelCaseFeatureName}Entity>, Failure>> call([String? param]) {
    return ${lowerCamelCaseFeatureName}Repository.get${upperCamelCaseFeatureName}Data();
  }
}`;
}
