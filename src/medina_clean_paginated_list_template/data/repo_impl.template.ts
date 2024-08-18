import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaRepositoryImplTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `part of '../data_imports.dart';

class ${upperCamelCaseFeatureName}RepositoryImpl implements ${upperCamelCaseFeatureName}Repository {
  final ${upperCamelCaseFeatureName}RemoteDataSource remoteDataSource;

  const ${upperCamelCaseFeatureName}RepositoryImpl({required this.remoteDataSource});

  @override
  Future<Either<Failure, ApiResponse<PaginatedList<${upperCamelCaseFeatureName}>>>> get${upperCamelCaseFeatureName}s(GetPaginatedListParams params) async {
    return await remoteDataSource.get${upperCamelCaseFeatureName}s(params).handleCallbackWithFailure;
  }
}
`;
}
