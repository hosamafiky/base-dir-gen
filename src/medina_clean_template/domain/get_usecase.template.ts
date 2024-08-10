import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaGetUsecaseTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);

  return `part of '../domain_imports.dart';

class Get${upperCamelCaseFeatureName}sUsecase implements UseCaseWithoutParam<ApiResponse<List<${upperCamelCaseFeatureName}>>> {
  final ${upperCamelCaseFeatureName}Repository repository;

  const Get${upperCamelCaseFeatureName}sUsecase({required this.repository});

  @override
  Future<Either<Failure, ApiResponse<List<${upperCamelCaseFeatureName}>>>> call() async {
    return await repository.get${upperCamelCaseFeatureName}s();
  }
}

`;
}
