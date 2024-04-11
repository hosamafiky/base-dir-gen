import { getSnakeCase } from "../../utils/snake-case";

export function getFeatureWidgetsImportsTemplate(featureName: string) {
  const snakeCaseFeatureName = getSnakeCase(featureName);

  return `import 'package:flutter/material.dart';

part '${snakeCaseFeatureName}_widget.dart';
`;
}
