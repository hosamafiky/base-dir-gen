import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaRepositoryTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `part of '../domain_imports.dart';

abstract class ${upperCamelCaseFeatureName}Repository {
  Future<Either<Failure, ApiResponse<PaginatedList<${upperCamelCaseFeatureName}>>>> get${upperCamelCaseFeatureName}s(GetPaginatedListParams params);
}
`;
}
