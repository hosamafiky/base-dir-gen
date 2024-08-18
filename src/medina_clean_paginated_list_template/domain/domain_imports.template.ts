export function getMedinaDomainImportsTemplate(featureName: string): string {
  return `import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:medina_stores/core/standards/paginated_list.dart';

import '../../../core/error/failures.dart';
import '../../../core/standards/response_model.dart';
import '../../../core/standards/use_case.dart';

part '../domain/entities/${featureName}.dart';
part '../domain/repositories/${featureName}_repository.dart';
part '../domain/usecases/get_${featureName}s_usecase.dart';
`;
}
