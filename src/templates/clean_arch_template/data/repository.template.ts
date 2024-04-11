import { getPascalCase } from "../../../utils/pascal-case";

export function getRepositoryTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `part of '../imports/${featureName}_data_imports.dart';

abstract class ${upperCamelCaseFeatureName}Repository {
  Future<Result<List<${upperCamelCaseFeatureName}Entity>, Failure>> get${upperCamelCaseFeatureName}Data();
}

class ${upperCamelCaseFeatureName}RepositoryImpl implements ${upperCamelCaseFeatureName}Repository {
  final ${upperCamelCaseFeatureName}DataSource dataSource;

  ${upperCamelCaseFeatureName}RepositoryImpl({required this.dataSource});
  @override
  Future<Result<List<${upperCamelCaseFeatureName}Entity>, Failure>> get${upperCamelCaseFeatureName}Data() async {
    return await dataSource.fetch${upperCamelCaseFeatureName}Data().handleCallbackWithFailure();
  }
}`;
}
