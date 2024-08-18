import { getLowerCamelCase } from "../../utils/lower-camel-case";
import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaCubitStateTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  const lowerCamelCaseFeatureName = getLowerCamelCase(featureName);
  return `part of '../presentation_imports.dart';

class ${upperCamelCaseFeatureName}State extends Equatable {
  const ${upperCamelCaseFeatureName}State({
    this.${lowerCamelCaseFeatureName}sStatus = UsecaseStatus.idle,
    this.${lowerCamelCaseFeatureName}sFailure,
    this.${lowerCamelCaseFeatureName}s = const ApiResponse.success(data: PaginatedList(data: [])),
  });

  final UsecaseStatus ${lowerCamelCaseFeatureName}sStatus;
  final Failure? ${lowerCamelCaseFeatureName}sFailure;
  final ApiResponse<PaginatedList<${upperCamelCaseFeatureName}>> ${lowerCamelCaseFeatureName}s;

  ${upperCamelCaseFeatureName}State copyWith({
    UsecaseStatus? ${lowerCamelCaseFeatureName}sStatus,
    Failure? ${lowerCamelCaseFeatureName}sFailure,
    ApiResponse<PaginatedList<${upperCamelCaseFeatureName}>>? ${lowerCamelCaseFeatureName}s,
  }) {
    return ${upperCamelCaseFeatureName}State(
      ${lowerCamelCaseFeatureName}sStatus: ${lowerCamelCaseFeatureName}sStatus ?? this.${lowerCamelCaseFeatureName}sStatus,
      ${lowerCamelCaseFeatureName}sFailure: ${lowerCamelCaseFeatureName}sFailure ?? this.${lowerCamelCaseFeatureName}sFailure,
      ${lowerCamelCaseFeatureName}s: ${lowerCamelCaseFeatureName}s ?? this.${lowerCamelCaseFeatureName}s,
    );
  }

  @override
  String toString() {
    return '${upperCamelCaseFeatureName}State(${lowerCamelCaseFeatureName}sStatus: $${lowerCamelCaseFeatureName}sStatus, ${lowerCamelCaseFeatureName}sFailure: $${lowerCamelCaseFeatureName}sFailure, ${lowerCamelCaseFeatureName}s: $${lowerCamelCaseFeatureName}s)';
  }

  @override
  List<Object?> get props => [
        ${lowerCamelCaseFeatureName}sStatus,
        ${lowerCamelCaseFeatureName}sFailure,
        ${lowerCamelCaseFeatureName}s,
      ];
}
`;
}
