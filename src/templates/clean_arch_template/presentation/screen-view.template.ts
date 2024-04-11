import { getPascalCase } from "../../../utils/pascal-case";

export function getScreenViewTemplate(featureName: string): string {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  return `part of '../imports/${featureName}_presentation_imports.dart';

class ${upperCamelCaseFeatureName}Screen extends StatelessWidget {
  const ${upperCamelCaseFeatureName}Screen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => ${upperCamelCaseFeatureName}Cubit(
        ConstantManager.serviceLocator<Fetch${upperCamelCaseFeatureName}UseCase>(),
      )..fetch${upperCamelCaseFeatureName}(),
      child: const ${upperCamelCaseFeatureName}View(),
    );
  }
}

class ${upperCamelCaseFeatureName}View extends StatelessWidget {
  const ${upperCamelCaseFeatureName}View({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: ColorManager.scaffoldBackground,
      body: SizedBox(),
    );
  }
}`;
}
