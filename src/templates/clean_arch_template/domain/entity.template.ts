import { getPascalCase } from "../../../utils/pascal-case";

export function getEntityTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `part of '../imports/${featureName}_domain_imports.dart';
class ${upperCamelCaseFeatureName}Entity extends Equatable{
  final int id;
  final String name;

  const ${upperCamelCaseFeatureName}Entity({required this.id, required this.name});

  @override
  List<Object> get props => [id, name];
}`;
}
