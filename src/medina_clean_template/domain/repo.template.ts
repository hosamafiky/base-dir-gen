import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaRepositoryTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `part of '../domain_imports.dart';

abstract class ${upperCamelCaseFeatureName}Repository {
  Future<Either<Failure, List<${upperCamelCaseFeatureName}>>> get${upperCamelCaseFeatureName}s();
  Future<Either<Failure, ${upperCamelCaseFeatureName}>> add${upperCamelCaseFeatureName}(Add${upperCamelCaseFeatureName}Params params);
}
`;
}
