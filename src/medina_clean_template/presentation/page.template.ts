import { getLowerCamelCase } from "../../utils/lower-camel-case";
import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaScreenViewTemplate(featureName: string): string {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  const lowerCamelCaseFeatureName = getLowerCamelCase(featureName);
  return `part of '../presentation_imports.dart';

class ${upperCamelCaseFeatureName}sPage extends StatelessWidget {
  const ${upperCamelCaseFeatureName}sPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => DependencyHelper.instance.get<${upperCamelCaseFeatureName}Cubit>()..get${upperCamelCaseFeatureName}s(),
      child: const ${upperCamelCaseFeatureName}sPageBody(),
    );
  }
}

class ${upperCamelCaseFeatureName}sPageBody extends StatelessWidget {
  const ${upperCamelCaseFeatureName}sPageBody({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MainAppBar(),
      body: BlocSelector<${upperCamelCaseFeatureName}Cubit, ${upperCamelCaseFeatureName}State, ({UsecaseStatus status, Failure? failure, PaginatedList<${upperCamelCaseFeatureName}> ${lowerCamelCaseFeatureName}es})>(
        selector: (state) => (status: state.${lowerCamelCaseFeatureName}sStatus, failure: state.${lowerCamelCaseFeatureName}sFailure, ${lowerCamelCaseFeatureName}es: state.${lowerCamelCaseFeatureName}s.data!),
        builder: (context, state) {
          if (state.status == UsecaseStatus.running && state.${lowerCamelCaseFeatureName}es.data.isEmpty) {
            return const Center(child: CircularProgressIndicator());
          }
          return ListView.separated(
            itemCount: state.${lowerCamelCaseFeatureName}es.data.length,
            separatorBuilder: (context, index) => SizedBox(height: 16.h),
            itemBuilder: (context, index) {
              final ${lowerCamelCaseFeatureName} = state.${lowerCamelCaseFeatureName}es.data[index];
              return ListTile(
                leading: Text(${lowerCamelCaseFeatureName}.id.toString()),
                title: Text(${lowerCamelCaseFeatureName}.title),
                subtitle: Text(
                  ${lowerCamelCaseFeatureName}.body,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              );
            },
          );
        },
      ),
    );
  }
}
`;
}
