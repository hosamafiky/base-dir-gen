import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaDataSourceTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `part of '../data_imports.dart';

abstract class ${upperCamelCaseFeatureName}RemoteDataSource {
  Future<ApiResponse<PaginatedList<${upperCamelCaseFeatureName}Model>>> get${upperCamelCaseFeatureName}s(GetPaginatedListParams params);
}

class ${upperCamelCaseFeatureName}RemoteDataSourceImpl implements ${upperCamelCaseFeatureName}RemoteDataSource {
  @override
  Future<ApiResponse<PaginatedList<${upperCamelCaseFeatureName}Model>>> get${upperCamelCaseFeatureName}s(GetPaginatedListParams params) async {
    final request = ApiRequest(
      method: RequestMethod.get,
      path: ApiConstants.endPoints.${featureName.toUpperCase()}S,
      queryParameters: params.toMap(),
    );

    return await DependencyHelper.instance.get<ApiService>().callApi<PaginatedList<${upperCamelCaseFeatureName}Model>>(
          request,
          mapper: (json) => ApiResponse.fromMapSuccess(
            json,
            mapper: (data) => PaginatedList<${upperCamelCaseFeatureName}Model>.fromMap(data, mapper: (x) => ${upperCamelCaseFeatureName}Model.fromMap(x)),
          ),
        );
  }
}`;
}
