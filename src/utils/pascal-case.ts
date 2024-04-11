export function getPascalCase(name: string): string {
  // Split the name by spaces or underscores
  let words = name.split(/[\s_]+/);

  // Capitalize the first letter of each word and join them
  let pascalCaseName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return pascalCaseName;
}
