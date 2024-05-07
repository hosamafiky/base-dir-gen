import { getLowerCamelCase } from "../../../utils/lower-camel-case";
import { getPascalCase } from "../../../utils/pascal-case";

export function getServiceLoctorTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  const lowerCamelCaseFeatureName = getLowerCamelCase(featureName);
  return `part of '../imports/${featureName}_data_imports.dart';
void setUp${upperCamelCaseFeatureName}Dependencies() {
  ConstantManager.serviceLocator.registerLazySingleton<Fetch${upperCamelCaseFeatureName}UseCase>(
    () => Fetch${upperCamelCaseFeatureName}UseCase(
      ${lowerCamelCaseFeatureName}Repository: ConstantManager.serviceLocator<${upperCamelCaseFeatureName}Repository>(),
    ),
  );

  ConstantManager.serviceLocator.registerLazySingleton<${upperCamelCaseFeatureName}Repository>(
    () => ${upperCamelCaseFeatureName}RepositoryImpl(
      dataSource: ConstantManager.serviceLocator<${upperCamelCaseFeatureName}DataSource>(),
    ),
  );

  ConstantManager.serviceLocator.registerLazySingleton<${upperCamelCaseFeatureName}DataSource>(
    () => ${upperCamelCaseFeatureName}DataSourceImpl(),
  );
}`;
}
