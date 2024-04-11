import { getSnakeCase } from "../../utils/snake-case";

export function getProviderFeatureImportsTemplate(featureName: string) {
  const snakeCaseFeatureName = getSnakeCase(featureName);

  return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part '${snakeCaseFeatureName}_data.dart';
part '${snakeCaseFeatureName}.dart';
`;
}
