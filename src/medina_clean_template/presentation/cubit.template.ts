import { getLowerCamelCase } from "../../utils/lower-camel-case";
import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaCubitClassTemplate(featureName: string): string {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  const lowerCamelCaseFeatureName = getLowerCamelCase(featureName);
  return `part of '../presentation_imports.dart';

class ${upperCamelCaseFeatureName}Cubit extends Cubit<${upperCamelCaseFeatureName}State> {
  ${upperCamelCaseFeatureName}Cubit({
    required this.get${upperCamelCaseFeatureName}sUsecase,
  }) : super(const ${upperCamelCaseFeatureName}State());

  final Get${upperCamelCaseFeatureName}sUsecase get${upperCamelCaseFeatureName}sUsecase;

  Future<void> get${upperCamelCaseFeatureName}s() async {
    emit(state.copyWith(${lowerCamelCaseFeatureName}sStatus: UsecaseStatus.running));
    final params = GetPaginatedListParams(page: (state.${lowerCamelCaseFeatureName}s.data?.currentPage ?? 0) + 1);
    final result = await get${upperCamelCaseFeatureName}sUsecase(params);
    result.fold(
      (failure) => emit(state.copyWith(
        ${lowerCamelCaseFeatureName}sStatus: UsecaseStatus.error,
        ${lowerCamelCaseFeatureName}sFailure: failure,
      )),
      (${lowerCamelCaseFeatureName}s) => emit(state.copyWith(
        ${lowerCamelCaseFeatureName}sStatus: UsecaseStatus.completed,
        ${lowerCamelCaseFeatureName}s: ${lowerCamelCaseFeatureName}s,
      )),
    );
  }
}
`;
}
