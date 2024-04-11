import { getPascalCase } from "../../utils/pascal-case";
import { getSnakeCase } from "../../utils/snake-case";

export function getFeatureWidgetTemplate(featureName: string) {
  const pascalCaseFeatureName = getPascalCase(featureName);
  const snakeCaseFeatureName = getSnakeCase(featureName);
  return `part of '${snakeCaseFeatureName}_widgets_imports.dart';

class ${pascalCaseFeatureName}Widget extends StatelessWidget {
  const ${pascalCaseFeatureName}Widget({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text('Hello, ${pascalCaseFeatureName}Widget!');
  }
}`;
}
