export function getMedinaPresentationImportsTemplate(
  featureName: string
): string {
  return `import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:medina_stores/core/standards/paginated_list.dart';
import 'package:medina_stores/core/standards/response_model.dart';

import '../../../core/error/failures.dart';
import '../../../core/helpers/dependency_helper.dart';
import '../../../core/shared_widgets/core_widgets/main_app_bar.dart';
import '../../../core/standards/usecase_status.dart';
import '../domain/domain_imports.dart';

part '../presentation/cubit/${featureName}_cubit.dart';
part '../presentation/cubit/${featureName}_state.dart';
part '../presentation/pages/${featureName}s_page.dart';
part 'widgets/${featureName}_widget.dart';
`;
}
