import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaEntityTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `part of '../domain_imports.dart';

class ${upperCamelCaseFeatureName} extends Equatable {
  final int userId;
  final int id;
  final String title;
  final String body;

  const ${upperCamelCaseFeatureName}({
    required this.userId,
    required this.id,
    required this.title,
    required this.body,
  });

  ${upperCamelCaseFeatureName} copyWith({
    int? userId,
    int? id,
    String? title,
    String? body,
  }) {
    return ${upperCamelCaseFeatureName}(
      userId: userId ?? this.userId,
      id: id ?? this.id,
      title: title ?? this.title,
      body: body ?? this.body,
    );
  }

  @override
  List<Object?> get props => [userId, id, title, body];
}
`;
}
