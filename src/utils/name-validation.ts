import lodash from "lodash";

export function isNameValid(featureName: string | undefined): boolean {
  // Check if feature name exists
  if (!featureName) {
    return false;
  }
  // Check if feature name is null or white space
  if (lodash.isNil(featureName) || featureName.trim() === "") {
    return false;
  }

  // Check if feature name contains Arabic characters
  if (/[\u0600-\u06FF]/.test(featureName)) {
    return false;
  }

  // Return true if feature name is valid
  return true;
}
