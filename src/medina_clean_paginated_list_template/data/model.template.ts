import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaEntityModelTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `part of '../data_imports.dart';

class ${upperCamelCaseFeatureName}Model extends ${upperCamelCaseFeatureName} {
  const ${upperCamelCaseFeatureName}Model({
    required super.userId,
    required super.id,
    required super.title,
    required super.body,
  });

  factory ${upperCamelCaseFeatureName}Model.fromMap(Map<String, dynamic> map) {
    return ${upperCamelCaseFeatureName}Model(
      userId: map['userId'] ?? 0,
      id: map['id'],
      title: map['title'],
      body: map['body'],
    );
  }

  factory ${upperCamelCaseFeatureName}Model.fromJson(String source) => ${upperCamelCaseFeatureName}Model.fromMap(json.decode(source));

  Map<String, dynamic> toMap() {
    return {
      'userId': userId,
      'id': id,
      'title': title,
      'body': body,
    };
  }

  String toJson() => json.encode(toMap());
}`;
}
