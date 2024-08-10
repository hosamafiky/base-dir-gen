import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaDataSourceTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `part of '../data_imports.dart';

abstract class ${upperCamelCaseFeatureName}RemoteDataSource {
  Future<ApiResponse<List<${upperCamelCaseFeatureName}Model>>> get get${upperCamelCaseFeatureName}s;
  Future<ApiResponse<${upperCamelCaseFeatureName}Model>> add${upperCamelCaseFeatureName}(Add${upperCamelCaseFeatureName}Params params);
}

class ${upperCamelCaseFeatureName}RemoteDataSourceImpl implements ${upperCamelCaseFeatureName}RemoteDataSource {
  @override
  Future<ApiResponse<List<${upperCamelCaseFeatureName}Model>>> get get${upperCamelCaseFeatureName}s async {
    final request = ApiRequest(
      method: RequestMethod.get,
      path: "/dashboard/branches",
    );

    return await DependencyHelper.instance.get<ApiService>().callApi<List<${upperCamelCaseFeatureName}Model>>(
          request,
          mapper: (json) => ApiResponse.fromMapSuccess(
            json,
            mapper: (data) => List<${upperCamelCaseFeatureName}Model>.from(data['data'].map((x) => ${upperCamelCaseFeatureName}Model.fromMap(x))),
          ),
        );
  }

  @override
  Future<ApiResponse<${upperCamelCaseFeatureName}Model>> add${upperCamelCaseFeatureName}(Add${upperCamelCaseFeatureName}Params params) async {
    final request = ApiRequest(
      method: RequestMethod.post,
      path: "/dashboard/branches",
      body: params.toMap(),
    );

    return await DependencyHelper.instance.get<ApiService>().callApi<${upperCamelCaseFeatureName}Model>(
          request,
          mapper: (json) => ApiResponse.fromMapSuccess(
            json,
            mapper: (data) => ${upperCamelCaseFeatureName}Model.fromMap(data),
          ),
        );
  }
}`;
}
