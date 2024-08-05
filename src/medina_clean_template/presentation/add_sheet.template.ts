import { getLowerCamelCase } from "../../utils/lower-camel-case";
import { getPascalCase } from "../../utils/pascal-case";

export function getMedinaAddSheetTemplate(featureName: string) {
  const upperCamelCaseFeatureName = getPascalCase(featureName);
  const lowerCamelCaseFeatureName = getLowerCamelCase(featureName);

  return `part of '../presentation_imports.dart';

class Add${upperCamelCaseFeatureName}Sheet extends StatefulWidget {
  const Add${upperCamelCaseFeatureName}Sheet({super.key, required this.${lowerCamelCaseFeatureName}Cubit});

  final ${upperCamelCaseFeatureName}Cubit ${lowerCamelCaseFeatureName}Cubit;

  @override
  State<Add${upperCamelCaseFeatureName}Sheet> createState() => _Add${upperCamelCaseFeatureName}SheetState();
}

class _Add${upperCamelCaseFeatureName}SheetState extends State<Add${upperCamelCaseFeatureName}Sheet> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _bodyController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: widget.${lowerCamelCaseFeatureName}Cubit,
      child: BlocConsumer<${upperCamelCaseFeatureName}Cubit, ${upperCamelCaseFeatureName}State>(
        listener: (context, state) {
          if (state.add${upperCamelCaseFeatureName}Status == UsecaseStatus.completed) {
            AppNavigator.pop();
          }
        },
        builder: (context, state) {
          return Padding(
            padding: REdgeInsets.all(16.0).copyWith(
              bottom: context.bottomBarHeight + 16.h,
            ),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  TextField(
                    controller: _titleController,
                    decoration: const InputDecoration(labelText: 'Title'),
                  ),
                  TextField(
                    controller: _bodyController,
                    decoration: const InputDecoration(labelText: 'Body'),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      if (!_formKey.currentState!.validate()) return;
                      if (state.add${upperCamelCaseFeatureName}Status == UsecaseStatus.running) return;

                      widget.${lowerCamelCaseFeatureName}Cubit.add${upperCamelCaseFeatureName}(Add${upperCamelCaseFeatureName}Params(
                        title: _titleController.text,
                        body: _bodyController.text,
                      ));
                    },
                    child: state.add${upperCamelCaseFeatureName}Status == UsecaseStatus.running ? const CircularProgressIndicator.adaptive() : const Text('Add'),
                  ),
                ],
              ).withSpacing(spacing: 16.h),
            ),
          );
        },
      ),
    );
  }
}
`;
}
