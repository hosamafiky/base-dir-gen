import { getLowerCamelCase } from "../../utils/lower-camel-case";
import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaCubitClassTemplate(featureName: string): string {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  const lowerCamelCaseFeatureName = getLowerCamelCase(featureName);
  return `
part of '../presentation_imports.dart';

class ${upperCamelCaseFeatureName}Cubit extends Cubit<${upperCamelCaseFeatureName}State> {
  ${upperCamelCaseFeatureName}Cubit({
    required this.get${upperCamelCaseFeatureName}sUsecase,
    required this.add${upperCamelCaseFeatureName}Usecase,
  }) : super(const ${upperCamelCaseFeatureName}State());

  final Get${upperCamelCaseFeatureName}sUsecase get${upperCamelCaseFeatureName}sUsecase;
  final Add${upperCamelCaseFeatureName}Usecase add${upperCamelCaseFeatureName}Usecase;

  Future<void> get${upperCamelCaseFeatureName}s() async {
    emit(state.copyWith(${lowerCamelCaseFeatureName}sStatus: UsecaseStatus.running));
    final result = await get${upperCamelCaseFeatureName}sUsecase();
    result.fold(
      (failure) {
        emit(state.copyWith(${lowerCamelCaseFeatureName}sStatus: UsecaseStatus.error, ${lowerCamelCaseFeatureName}sFailure: failure));
      },
      (${lowerCamelCaseFeatureName}s) {
        emit(state.copyWith(${lowerCamelCaseFeatureName}sStatus: UsecaseStatus.completed, ${lowerCamelCaseFeatureName}s: ${lowerCamelCaseFeatureName}s));
      },
    );
  }

  Future<void> add${upperCamelCaseFeatureName}(Add${upperCamelCaseFeatureName}Params params) async {
    emit(state.copyWith(add${upperCamelCaseFeatureName}Status: UsecaseStatus.running));
    final result = await add${upperCamelCaseFeatureName}Usecase(params);
    result.fold(
      (failure) {
        emit(state.copyWith(add${upperCamelCaseFeatureName}Status: UsecaseStatus.error, add${upperCamelCaseFeatureName}Failure: failure));
      },
      (${lowerCamelCaseFeatureName}) {
        final old${upperCamelCaseFeatureName}s = List<${upperCamelCaseFeatureName}>.from(state.${lowerCamelCaseFeatureName}s);
        emit(state.copyWith(add${upperCamelCaseFeatureName}Status: UsecaseStatus.completed, ${lowerCamelCaseFeatureName}s: old${upperCamelCaseFeatureName}s..insert(0, ${lowerCamelCaseFeatureName})));
      },
    );
  }
}
`;
}
