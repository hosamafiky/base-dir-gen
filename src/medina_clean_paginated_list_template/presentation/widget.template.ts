import { getLowerCamelCase } from "../../utils/lower-camel-case";
import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaPresentationWidgetTemplate(
  featureName: string
): string {
  let upperCamelCaseFeatureName = getPascalCase(featureName);
  let lowerCamelCaseFeatureName = getLowerCamelCase(featureName);
  return `part of '../presentation_imports.dart';

class ${upperCamelCaseFeatureName}Widget extends StatelessWidget {
  const ${upperCamelCaseFeatureName}Widget(this.${lowerCamelCaseFeatureName}, {super.key});

  final ${upperCamelCaseFeatureName} ${lowerCamelCaseFeatureName};

  @override
  Widget build(BuildContext context) {
    //TODO: Implement ${upperCamelCaseFeatureName}Widget build
    return Container();
  }
}
`;
}
