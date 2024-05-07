import { getPascalCase } from "../../../utils/pascal-case";

export function getDataSourceTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `part  of '../imports/${featureName}_data_imports.dart';
abstract class ${upperCamelCaseFeatureName}DataSource {
  Future<List<${upperCamelCaseFeatureName}Model>> fetch${upperCamelCaseFeatureName}Data();
}

class ${upperCamelCaseFeatureName}DataSourceImpl implements ${upperCamelCaseFeatureName}DataSource {
  @override
  Future<List<${upperCamelCaseFeatureName}Model>> fetch${upperCamelCaseFeatureName}Data() async {
    return await Future.value([
      const ${upperCamelCaseFeatureName}Model(id: 1, name: 'First ${upperCamelCaseFeatureName}'),
      const ${upperCamelCaseFeatureName}Model(id: 2, name: 'Second ${upperCamelCaseFeatureName}'),
      const ${upperCamelCaseFeatureName}Model(id: 3, name: 'Third ${upperCamelCaseFeatureName}'),
    ]);
  }
}`;
}
