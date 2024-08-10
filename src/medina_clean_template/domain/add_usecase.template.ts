import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaAddUsecaseTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);

  return `part of '../domain_imports.dart';

class Add${upperCamelCaseFeatureName}Usecase implements UseCase<ApiResponse<${upperCamelCaseFeatureName}>, Add${upperCamelCaseFeatureName}Params> {
  final ${upperCamelCaseFeatureName}Repository repository;

  const Add${upperCamelCaseFeatureName}Usecase({required this.repository});

  @override
  Future<Either<Failure, ApiResponse<${upperCamelCaseFeatureName}>>> call(Add${upperCamelCaseFeatureName}Params params) async {
    return repository.add${upperCamelCaseFeatureName}(params);
  }
}

class Add${upperCamelCaseFeatureName}Params {
  Map<String, dynamic> toMap() {
    return {};
  }
}
`;
}
