export function getPresentationImportsTemplate(featureName: string): string {
  return `import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import '../../../../core/shared/base_state.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../config/res/color_manager.dart';
import '../../../../config/res/constants_manager.dart';
import '../../../../core/widgets/custom_loading.dart';
import '../../domain/imports/${featureName}_domain_imports.dart';

part '../cubit/${featureName}_cubit.dart';
part '../cubit/${featureName}_state.dart';
part '../screens/${featureName}_screen.dart';
part '../widgets/${featureName}_body.dart';
part '../widgets/${featureName}_list.dart';
`;
}
