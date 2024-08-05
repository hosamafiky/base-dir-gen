import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaDataSourceTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `part of '../data_imports.dart';

abstract class ${upperCamelCaseFeatureName}RemoteDataSource {
  Future<List<${upperCamelCaseFeatureName}Model>> get get${upperCamelCaseFeatureName}s;
  Future<${upperCamelCaseFeatureName}Model> add${upperCamelCaseFeatureName}(Add${upperCamelCaseFeatureName}Params params);
}

class ${upperCamelCaseFeatureName}RemoteDataSourceImpl implements ${upperCamelCaseFeatureName}RemoteDataSource {
  @override
  Future<List<${upperCamelCaseFeatureName}Model>> get get${upperCamelCaseFeatureName}s async {
    final request = ApiRequest(
      method: RequestMethod.get,
      path: ApiConstants.endPoints.POSTS,
    );

    return await DependencyHelper.instance.get<ApiService>().callApi(
          request,
          mapper: (json) => List<${upperCamelCaseFeatureName}Model>.from(json.map((x) => ${upperCamelCaseFeatureName}Model.fromMap(x))),
        );
  }

  @override
  Future<${upperCamelCaseFeatureName}Model> add${upperCamelCaseFeatureName}(Add${upperCamelCaseFeatureName}Params params) async {
    final request = ApiRequest(
      method: RequestMethod.post,
      path: ApiConstants.endPoints.${featureName.toUpperCase()}S,
      body: params.toMap(),
    );

    return await DependencyHelper.instance.get<ApiService>().callApi(
          request,
          mapper: (json) => ${upperCamelCaseFeatureName}Model.fromMap(json),
        );
  }
}`;
}
