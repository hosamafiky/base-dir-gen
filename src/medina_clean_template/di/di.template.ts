import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaServiceLoctorTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `import '../../../core/helpers/dependency_helper.dart';
import '../data/data_imports.dart';
import '../domain/domain_imports.dart';
import '../presentation/presentation_imports.dart';

void setUp${upperCamelCaseFeatureName}Dependencies() async {
  // CUBIT
  DependencyHelper.instance.serviceLocator.registerFactory(
    () => ${upperCamelCaseFeatureName}Cubit(
      get${upperCamelCaseFeatureName}sUsecase: DependencyHelper.instance.serviceLocator(),
      add${upperCamelCaseFeatureName}Usecase: DependencyHelper.instance.serviceLocator(),
    ),
  );

  // USECASES
  DependencyHelper.instance.serviceLocator.registerLazySingleton(
    () => Get${upperCamelCaseFeatureName}sUsecase(repository: DependencyHelper.instance.serviceLocator()),
  );

  DependencyHelper.instance.serviceLocator.registerLazySingleton(
    () => Add${upperCamelCaseFeatureName}Usecase(repository: DependencyHelper.instance.serviceLocator()),
  );

  // REPOSITORIES
  DependencyHelper.instance.serviceLocator.registerLazySingleton<${upperCamelCaseFeatureName}Repository>(
    () => ${upperCamelCaseFeatureName}RepositoryImpl(remoteDataSource: DependencyHelper.instance.serviceLocator()),
  );

  // DATASOURCES
  DependencyHelper.instance.serviceLocator.registerLazySingleton<${upperCamelCaseFeatureName}RemoteDataSource>(
    () => ${upperCamelCaseFeatureName}RemoteDataSourceImpl(),
  );
}`;
}
