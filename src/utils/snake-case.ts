export function getSnakeCase(name: string): string {
  // Split the name by spaces or underscores
  let words = name.split(/[\s_]+/);

  // Lowercase the words and join them with underscores
  let snakeCaseName = words.map((word) => word.toLowerCase()).join("_");

  return snakeCaseName;
}
