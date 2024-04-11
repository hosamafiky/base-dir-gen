export function getPresentationImportsTemplate(featureName: string): string {
  return `import 'package:flutter/material.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_base/src/config/res/constans_manager.dart';
import 'package:flutter_base/src/core/shared/base_state.dart';
import 'package:flutter_base/src/core/widgets/custom_loading.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../domain/imports/${featureName}_domain_imports.dart';
import 'package:flutter_base/src/config/res/color_manager.dart';

part '../cubit/${featureName}_cubit.dart';
part '../cubit/${featureName}_state.dart';
part '../screens/${featureName}_screen.dart';
part '../widgets/${featureName}_body.dart';
part '../widgets/${featureName}_list.dart';
`;
}
