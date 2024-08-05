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
    this.${lowerCamelCaseFeatureName}s = const [],
    this.add${upperCamelCaseFeatureName}Status = UsecaseStatus.idle,
    this.add${upperCamelCaseFeatureName}Failure,
  });

  final UsecaseStatus ${lowerCamelCaseFeatureName}sStatus;
  final Failure? ${lowerCamelCaseFeatureName}sFailure;
  final List<${upperCamelCaseFeatureName}> ${lowerCamelCaseFeatureName}s;

  final UsecaseStatus add${upperCamelCaseFeatureName}Status;
  final Failure? add${upperCamelCaseFeatureName}Failure;

  ${upperCamelCaseFeatureName}State copyWith({
    UsecaseStatus? ${lowerCamelCaseFeatureName}sStatus,
    Failure? ${lowerCamelCaseFeatureName}sFailure,
    List<${upperCamelCaseFeatureName}>? ${lowerCamelCaseFeatureName}s,
    UsecaseStatus? add${upperCamelCaseFeatureName}Status,
    Failure? add${upperCamelCaseFeatureName}Failure,
  }) {
    return ${upperCamelCaseFeatureName}State(
      ${lowerCamelCaseFeatureName}sStatus: ${lowerCamelCaseFeatureName}sStatus ?? this.${lowerCamelCaseFeatureName}sStatus,
      ${lowerCamelCaseFeatureName}sFailure: ${lowerCamelCaseFeatureName}sFailure ?? this.${lowerCamelCaseFeatureName}sFailure,
      ${lowerCamelCaseFeatureName}s: ${lowerCamelCaseFeatureName}s ?? this.${lowerCamelCaseFeatureName}s,
      add${upperCamelCaseFeatureName}Status: add${upperCamelCaseFeatureName}Status ?? this.add${upperCamelCaseFeatureName}Status,
      add${upperCamelCaseFeatureName}Failure: add${upperCamelCaseFeatureName}Failure ?? this.add${upperCamelCaseFeatureName}Failure,
    );
  }

  @override
  String toString() {
    return '${upperCamelCaseFeatureName}State(${lowerCamelCaseFeatureName}sStatus: $${lowerCamelCaseFeatureName}sStatus, ${lowerCamelCaseFeatureName}sFailure: $${lowerCamelCaseFeatureName}sFailure, ${lowerCamelCaseFeatureName}s: $${lowerCamelCaseFeatureName}s, add${upperCamelCaseFeatureName}Status: $add${upperCamelCaseFeatureName}Status, add${upperCamelCaseFeatureName}Failure: $add${upperCamelCaseFeatureName}Failure)';
  }

  @override
  List<Object?> get props => [
        ${lowerCamelCaseFeatureName}sStatus,
        ${lowerCamelCaseFeatureName}sFailure,
        ${lowerCamelCaseFeatureName}s,
        add${upperCamelCaseFeatureName}Status,
        add${upperCamelCaseFeatureName}Failure,
      ];
}
`;
}
