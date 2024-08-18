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

class ${upperCamelCaseFeatureName}sPageBody extends StatefulWidget {
  const ${upperCamelCaseFeatureName}sPageBody({super.key});

  @override
  State<${upperCamelCaseFeatureName}sPageBody> createState() => _${upperCamelCaseFeatureName}sPageBodyState();
}

class _${upperCamelCaseFeatureName}sPageBodyState extends State<${upperCamelCaseFeatureName}sPageBody> {
  final _scrollController = ScrollController();

  void _onScroll() {
    final currentScroll = _scrollController.position.pixels;
    final maxScroll = _scrollController.position.maxScrollExtent;

    if (currentScroll == maxScroll) {
      context.read<${upperCamelCaseFeatureName}Cubit>().get${upperCamelCaseFeatureName}s();
    }
  }

  @override
  void initState() {
    _scrollController.addListener(_onScroll);
    super.initState();
  }

  @override
  void dispose() {
    _scrollController
      ..removeListener(_onScroll)
      ..dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MainAppBar(),
      body: BlocSelector<${upperCamelCaseFeatureName}Cubit, ${upperCamelCaseFeatureName}State, ({UsecaseStatus status, Failure? failure, PaginatedList<${upperCamelCaseFeatureName}> ${lowerCamelCaseFeatureName}s})>(
        selector: (state) => (status: state.${lowerCamelCaseFeatureName}sStatus, failure: state.${lowerCamelCaseFeatureName}sFailure, ${lowerCamelCaseFeatureName}s: state.${lowerCamelCaseFeatureName}s.data!),
        builder: (context, state) {
          return state.status.when(
            context,
            idle: (context) => const Center(child: CircularProgressIndicator.adaptive()),
            running: (context) => const Center(child: CircularProgressIndicator.adaptive()),
            completed: (context) => ListView.separated(
              controller: _scrollController,
              itemCount: !state.${lowerCamelCaseFeatureName}s.hasReachedEnd ? state.${lowerCamelCaseFeatureName}s.data.length + 1 : state.${lowerCamelCaseFeatureName}s.data.length,
              separatorBuilder: (context, index) => SizedBox(height: 16.h),
              itemBuilder: (context, index) {
                if (index >= state.${lowerCamelCaseFeatureName}s.data.length) {
                  return const Center(child: CircularProgressIndicator.adaptive());
                }

                final ${lowerCamelCaseFeatureName} = state.${lowerCamelCaseFeatureName}s.data[index];
                return ${upperCamelCaseFeatureName}Widget(${lowerCamelCaseFeatureName});
              },
            ),
            error: (context) => Center(child: Text(state.failure!.response.message)),
          );
        },
      ),
    );
  }
}
`;
}
