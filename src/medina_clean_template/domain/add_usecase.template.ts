import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaAddUsecaseTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);

  return `part of '../domain_imports.dart';

class Add${upperCamelCaseFeatureName}Usecase implements UseCase<${upperCamelCaseFeatureName}, Add${upperCamelCaseFeatureName}Params> {
  final ${upperCamelCaseFeatureName}Repository repository;

  const Add${upperCamelCaseFeatureName}Usecase({required this.repository});

  @override
  Future<Either<Failure, ${upperCamelCaseFeatureName}>> call(Add${upperCamelCaseFeatureName}Params params) async {
    return repository.add${upperCamelCaseFeatureName}(params);
  }
}

class Add${upperCamelCaseFeatureName}Params {
  final String title;
  final String body;

  const Add${upperCamelCaseFeatureName}Params({
    required this.title,
    required this.body,
  });

  Map<String, dynamic> toMap() {
    return {
      'title': title,
      'body': body,
      'userId': 1,
    };
  }
}
`;
}
