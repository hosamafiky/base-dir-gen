import { getLowerCamelCase } from "../../../utils/lower-camel-case";
import { getPascalCase } from "../../../utils/pascal-case";

export function getPresentationListTemplate(featureName: string): string {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  const lowerCamelCaseFeatureName = getLowerCamelCase(featureName);
  return `part of '../imports/${featureName}_presentation_imports.dart';
  
class _${upperCamelCaseFeatureName}List extends StatelessWidget {
  final List<${upperCamelCaseFeatureName}Entity> ${lowerCamelCaseFeatureName}s;
  const _${upperCamelCaseFeatureName}List({required this.${lowerCamelCaseFeatureName}s});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: ${lowerCamelCaseFeatureName}s.length,
      itemBuilder: (context, index) {
        final ${lowerCamelCaseFeatureName} = ${lowerCamelCaseFeatureName}s[index];
        return ListTile(
          title: Text(${lowerCamelCaseFeatureName}.id.toString()),
          subtitle: Text(${lowerCamelCaseFeatureName}.name),
        );
      },
    );
  }
}
`;
}
