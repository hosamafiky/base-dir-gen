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
    if (state.${lowerCamelCaseFeatureName}s.data?.hasReachedEnd == true) return;
    if (state.${lowerCamelCaseFeatureName}s.data?.currentPage == 0) emit(state.copyWith(${lowerCamelCaseFeatureName}sStatus: UsecaseStatus.running));
    final params = GetPaginatedListParams(page: (state.${lowerCamelCaseFeatureName}s.data!.currentPage) + 1, perPage: 5);
    final result = await get${upperCamelCaseFeatureName}sUsecase(params);
    result.fold(
      (failure) => emit(state.copyWith(
        ${lowerCamelCaseFeatureName}sStatus: UsecaseStatus.error,
        ${lowerCamelCaseFeatureName}sFailure: failure,
      )),
      (${lowerCamelCaseFeatureName}s) {
        if (${lowerCamelCaseFeatureName}s.data!.data.isEmpty) {
          emit(state.copyWith(
            ${lowerCamelCaseFeatureName}sStatus: UsecaseStatus.completed,
            ${lowerCamelCaseFeatureName}s: ${lowerCamelCaseFeatureName}s.copyWith(
              data: state.${lowerCamelCaseFeatureName}s.data!.copyWith(
                hasReachedEnd: true,
              ),
            ),
          ));
        } else {
          final new${upperCamelCaseFeatureName}s = List<${upperCamelCaseFeatureName}>.from(${lowerCamelCaseFeatureName}s.data!.data);
          emit(state.copyWith(
            ${lowerCamelCaseFeatureName}sStatus: UsecaseStatus.completed,
            ${lowerCamelCaseFeatureName}s: ${lowerCamelCaseFeatureName}s.copyWith(
              data: state.${lowerCamelCaseFeatureName}s.data!.copyWith(
                data: [...state.${lowerCamelCaseFeatureName}s.data!.data, ...new${upperCamelCaseFeatureName}s],
                currentPage: ${lowerCamelCaseFeatureName}s.data!.currentPage,
                hasReachedEnd: ${lowerCamelCaseFeatureName}s.data!.hasReachedEnd,
              ),
            ),
          ));
        }
      },
    );
  }
}
`;
}
