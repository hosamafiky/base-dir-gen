import { getLowerCamelCase } from "../../../utils/lower-camel-case";
import { getPascalCase } from "../../../utils/pascal-case";

export function getCubitStateTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  const lowerCamelCaseFeatureName = getLowerCamelCase(featureName);
  return `part of '../imports/${featureName}_presentation_imports.dart';
final class ${upperCamelCaseFeatureName}State extends Equatable {
  final BaseStatus baseStatus;
  final List<${upperCamelCaseFeatureName}Entity> ${lowerCamelCaseFeatureName}s;
  final String errorMessage;

  const ${upperCamelCaseFeatureName}State({
    required this.baseStatus,
    required this.${lowerCamelCaseFeatureName}s,
    this.errorMessage = ConstantManager.emptyText,
  });

  factory ${upperCamelCaseFeatureName}State.initial() {
    return const ${upperCamelCaseFeatureName}State(
      baseStatus: BaseStatus.initial,
      ${lowerCamelCaseFeatureName}s: [],
    );
  }

  ${upperCamelCaseFeatureName}State copyWith({
    BaseStatus? baseStatus,
    List<${upperCamelCaseFeatureName}Entity>? ${lowerCamelCaseFeatureName}s,
    String? errorMessage,
  }) {
    return ${upperCamelCaseFeatureName}State(
      baseStatus: baseStatus ?? this.baseStatus,
      ${lowerCamelCaseFeatureName}s: ${lowerCamelCaseFeatureName}s ?? this.${lowerCamelCaseFeatureName}s,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }

  @override
  List<Object> get props => [${lowerCamelCaseFeatureName}s,baseStatus, errorMessage];
}`;
}
