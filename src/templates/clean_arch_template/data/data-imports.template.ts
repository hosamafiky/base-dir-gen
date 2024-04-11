export function getDataImportsTemplate(featureName: string) {
  return `import 'package:flutter_base/src/core/error/failure.dart';
import 'package:flutter_base/src/core/extensions/error_handler_extension.dart';
import 'package:multiple_result/multiple_result.dart';
import 'package:flutter_base/src/config/res/constans_manager.dart';
import '../../domain/imports/${featureName}_domain_imports.dart';

part '../data_sources/${featureName}_data_source.dart';
part '../models/${featureName}_model.dart';
part '../repositories/${featureName}_repository.dart';
part '../di/${featureName}_di.dart';
`;
}
