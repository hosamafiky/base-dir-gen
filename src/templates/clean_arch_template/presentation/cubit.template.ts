import { getLowerCamelCase } from "../../../utils/lower-camel-case";
import { getPascalCase } from "../../../utils/pascal-case";

export function getCubitClassTemplate(featureName: string): string {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  const lowerCamelCaseFeatureName = getLowerCamelCase(featureName);
  const usecaseName = `Fetch${upperCamelCaseFeatureName}UseCase`;
  return `part of '../imports/${featureName}_presentation_imports.dart';

class ${upperCamelCaseFeatureName}Cubit extends Cubit<${upperCamelCaseFeatureName}State> {
  final ${usecaseName} _fetch${upperCamelCaseFeatureName}UseCase;
  ${upperCamelCaseFeatureName}Cubit(this._fetch${upperCamelCaseFeatureName}UseCase) : super(${upperCamelCaseFeatureName}State.initial());

  void fetch${upperCamelCaseFeatureName}() async {
    final result = await _fetch${upperCamelCaseFeatureName}UseCase.call();
    result.when(
      (${lowerCamelCaseFeatureName}s) => emit(
        state.copyWith(
          baseState: BaseState.success,
          ${lowerCamelCaseFeatureName}s: ${lowerCamelCaseFeatureName}s,
        ),
      ),
      (error) => emit(
        state.copyWith(
          baseState: BaseState.error,
          errorMessage: error.message,
        ),
      ),
    );
  }
}`;
}
