import path from "path";
import { createDirectory } from "./create-directory";

export async function createDirectories(
  targetDirectory: string,

  childDirectories: string[]
): Promise<void> {
  // Create the parent directory
  createDirectory(targetDirectory).finally(() => {
    // Creat the children
    childDirectories.map(
      async (directory) =>
        await createDirectory(path.join(targetDirectory, directory))
    );
  });
}
