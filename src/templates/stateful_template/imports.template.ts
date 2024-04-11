import { getSnakeCase } from "../../utils/snake-case";

export function getFeatureImportsTemplate(featureName: string) {
  const snakeCaseFeatureName = getSnakeCase(featureName);

  return `import 'package:flutter/material.dart';

part '${snakeCaseFeatureName}_data.dart';
part '${snakeCaseFeatureName}.dart';
`;
}
