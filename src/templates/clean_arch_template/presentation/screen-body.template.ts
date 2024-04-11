import { getLowerCamelCase } from "../../../utils/lower-camel-case";
import { getPascalCase } from "../../../utils/pascal-case";

export function getScreenBodyTemplate(featureName: string): string {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  const lowerCamelCaseFeatureName = getLowerCamelCase(featureName);
  return `part of '../imports/${featureName}_presentation_imports.dart';

class ${upperCamelCaseFeatureName}sBody extends StatelessWidget {
  const ${upperCamelCaseFeatureName}sBody({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<${upperCamelCaseFeatureName}Cubit, ${upperCamelCaseFeatureName}State>(
      builder: (context, state) {
        return switch (state.baseState) {
          BaseState.initial ||
          BaseState.loading =>
            CustomLoading.showLoadingView(),
          BaseState.error => Center(child: Text(state.errorMessage)),
          BaseState.success => _${upperCamelCaseFeatureName}List(${lowerCamelCaseFeatureName}s: state.${lowerCamelCaseFeatureName}s)
        };
      },
    );
  }
}
`;
}
