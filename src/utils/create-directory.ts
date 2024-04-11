import { mkdirp } from "mkdirp";

export function createDirectory(targetDirectory: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      mkdirp(targetDirectory).finally(() => resolve());
    } catch (error) {
      reject(error);
      return;
    }
  });
}
