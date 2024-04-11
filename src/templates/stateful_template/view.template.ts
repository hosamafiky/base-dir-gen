import { getPascalCase } from "../../utils/pascal-case";
import { getSnakeCase } from "../../utils/snake-case";

export function getFeatureMainStfulTemplate(featureName: string) {
  const pascalCaseFeatureName = getPascalCase(featureName);
  const snakeCaseFeatureName = getSnakeCase(featureName);

  return `part of '${snakeCaseFeatureName}_imports.dart';

class ${pascalCaseFeatureName}View extends StatefulWidget {
  const ${pascalCaseFeatureName}View({super.key});

  @override
  State<${pascalCaseFeatureName}View> createState() => _${pascalCaseFeatureName}ViewState();
}

class _${pascalCaseFeatureName}ViewState extends State<${pascalCaseFeatureName}View> {
  final ${pascalCaseFeatureName}Data data = ${pascalCaseFeatureName}Data();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Placeholder();
  }
}
`;
}
