import { getPascalCase } from "../../utils/pascal-case";
import { getSnakeCase } from "../../utils/snake-case";

export function getFeatureMainTemplate(featureName: string) {
  const pascalCaseFeatureName = getPascalCase(featureName);
  const snakeCaseFeatureName = getSnakeCase(featureName);
  return `part of '${snakeCaseFeatureName}_imports.dart';

class ${pascalCaseFeatureName} extends StatelessWidget {
  const ${pascalCaseFeatureName}({super.key});

  @override
  Widget build(BuildContext context) {
    return RepositoryProvider(
      create: (context) => ${pascalCaseFeatureName}Data(context),
      child: const ${pascalCaseFeatureName}View(),
    );
  }
}

class ${pascalCaseFeatureName}View extends StatelessWidget {
  const ${pascalCaseFeatureName}View({super.key});

  @override
  Widget build(BuildContext context) {
    final data = context.read<${pascalCaseFeatureName}Data>();
    return Scaffold(
      appBar: AppBar(
        title: const Text('${pascalCaseFeatureName}'),
      ),
      body: const Center(
        child: Text('Hello, ${pascalCaseFeatureName}!'),
      ),
    );
  }
}`;
}
