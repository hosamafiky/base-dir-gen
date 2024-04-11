export function getDomainImportsTemplate(featureName: string): string {
  return `import 'package:flutter_base/src/core/error/failure.dart';
import 'package:equatable/equatable.dart';
import 'package:multiple_result/multiple_result.dart';
import '../../../../core/standard/use_case.dart';
import '../../data/imports/${featureName}_data_imports.dart';
part '../use_case/fetch_${featureName}_use_case.dart';
part '../entities/${featureName}_entity.dart';`;
}
