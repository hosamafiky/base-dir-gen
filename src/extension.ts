// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as lodash from "lodash";
import { mkdirp } from "mkdirp";
import { existsSync, lstatSync, writeFile } from "node:fs";
import path from "path";
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "base-dir-gen.createFolder",
    (uri) => Go(uri)
  );

  context.subscriptions.push(disposable);
}

export async function Go(uri: vscode.Uri) {
  // Show feature prompt
  let featureName = await promptForFeatureName();

  // Abort if name is not valid
  if (!isNameValid(featureName)) {
    vscode.window.showErrorMessage("The name must not be empty");
    return;
  }
  featureName = `${featureName}`;

  let targetDirectory = "";
  try {
    targetDirectory = await getTargetDirectory(uri);
  } catch (error) {
    vscode.window.showErrorMessage((error as Error).message + " Aborting1...");
  }

  const pascalCaseFeatureName = getPascalCase(featureName.toLowerCase());

  await generateFeatureArchitecture(`${featureName}`, targetDirectory);
  vscode.window.showInformationMessage(
    `Successfully Generated ${pascalCaseFeatureName} Feature`
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}

export async function getTargetDirectory(uri: vscode.Uri): Promise<string> {
  let targetDirectory;
  if (
    lodash.isNil(lodash.get(uri, "fsPath")) ||
    !lstatSync(uri.fsPath).isDirectory()
  ) {
    targetDirectory = await promptForTargetDirectory();
    if (lodash.isNil(targetDirectory)) {
      throw Error("Please select a valid directory");
    }
  } else {
    targetDirectory = uri.fsPath;
  }

  return targetDirectory as string;
}

export async function promptForTargetDirectory(): Promise<string | undefined> {
  const options: vscode.OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Select a folder to create the feature in",
    canSelectFolders: true,
  };

  return vscode.window.showOpenDialog(options).then((uri) => {
    if (lodash.isNil(uri) || lodash.isEmpty(uri)) {
      return undefined;
    }
    return uri![0].fsPath ?? undefined; // Added null check for 'uri' and accessed fsPath property of the first element
  });
}

export async function generateFeatureArchitecture(
  featureName: string,
  targetDirectory: string
) {
  // Create the feature directory
  const featureDirectoryPath = path.join(
    targetDirectory,
    featureName.toLowerCase()
  );

  // Create the feature widgets directory
  const featureWidgetsDirectoryPath = path.join(
    featureDirectoryPath,
    "widgets"
  );

  await createDirectory(featureDirectoryPath);
  await createDirectory(featureWidgetsDirectoryPath);
  await generateFeatureCode(featureName, featureDirectoryPath);
  await generateFeatureWidgetsCode(featureName, featureWidgetsDirectoryPath);
}

function createDirectory(targetDirectory: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      mkdirp(targetDirectory).finally(() => resolve());
    } catch (error) {
      reject(error);
      return;
    }
  });
}

async function generateFeatureCode(
  featureName: string,
  targetDirectory: string
) {
  await Promise.all([
    createMainFeatureTemplate(featureName, targetDirectory),
    createFeatureDataTemplate(featureName, targetDirectory),
    createFeatureImportsTemplate(featureName, targetDirectory),
  ]);
}

async function generateFeatureWidgetsCode(
  featureName: string,
  targetDirectory: string
) {
  await Promise.all([
    createFeatureWidgetsImportsTemplate(featureName, targetDirectory),
    createFeatureWidgetTemplate(featureName, targetDirectory),
  ]);
}

async function createFeatureWidgetTemplate(
  featureName: string,
  targetDirectory: string
) {
  const snakeCaseFeatureName = getSnakeCase(featureName);
  const targetPath = `${targetDirectory}/${snakeCaseFeatureName}_widget.dart`;

  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseFeatureName}_widget.dart already exists`);
  }

  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      getFeatureWidgetTemplate(featureName),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(true);
      }
    );
  });
}

async function createFeatureWidgetsImportsTemplate(
  featureName: string,
  targetDirectory: string
) {
  const snakeCaseFeatureName = getSnakeCase(featureName);
  const targetPath = `${targetDirectory}/${snakeCaseFeatureName}_widgets_imports.dart`;

  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseFeatureName}_widgets_imports.dart already exists`);
  }

  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      getFeatureWidgetsImportsTemplate(featureName),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(true);
      }
    );
  });
}

async function createFeatureImportsTemplate(
  featureName: string,
  targetDirectory: string
) {
  const snakeCaseFeatureName = getSnakeCase(featureName);
  const targetPath = `${targetDirectory}/${snakeCaseFeatureName}_imports.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseFeatureName}_imports.dart already exists`);
  }
  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      getFeatureImportsTemplate(featureName),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(true);
      }
    );
  });
}

async function createFeatureDataTemplate(
  featureName: string,
  targetDirectory: string
) {
  const snakeCaseFeatureName = getSnakeCase(featureName);
  const targetPath = `${targetDirectory}/${snakeCaseFeatureName}_data.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseFeatureName}_data.dart already exists`);
  }
  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      getFeatureDataTemplate(featureName),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(true);
      }
    );
  });
}

function createMainFeatureTemplate(
  featureName: string,
  targetDirectory: string
) {
  const snakeCaseFeatureName = getSnakeCase(featureName);
  const targetPath = `${targetDirectory}/${snakeCaseFeatureName}.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseFeatureName}.dart already exists`);
  }
  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      getFeatureMainTemplate(featureName),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(true);
      }
    );
  });

  function getFeatureMainTemplate(featureName: string) {
    const pascalCaseFeatureName = getPascalCase(featureName);
    const snakeCaseFeatureName = getSnakeCase(featureName);
    return `part of '${snakeCaseFeatureName}_imports.dart';

class ${pascalCaseFeatureName} extends StatelessWidget {
  const ${pascalCaseFeatureName}({super.key});

  @override
  Widget build(BuildContext context) {
    return RepositoryProvider(
      create: (context) => ${pascalCaseFeatureName}Data(context),
      child: const ${pascalCaseFeatureName}View(),
    );
  }
}

class ${pascalCaseFeatureName}View extends StatelessWidget {
  const ${pascalCaseFeatureName}View({super.key});

  @override
  Widget build(BuildContext context) {
    final data = context.read<${pascalCaseFeatureName}Data>();
    return Scaffold(
      appBar: AppBar(
        title: const Text('${pascalCaseFeatureName}'),
      ),
      body: const Center(
        child: Text('Hello, ${pascalCaseFeatureName}!'),
      ),
    );
  }
}`;
  }
}

function getFeatureDataTemplate(featureName: string) {
  const pascalCaseFeatureName = getPascalCase(featureName);
  const snakeCaseFeatureName = getSnakeCase(featureName);
  return `part of '${snakeCaseFeatureName}_imports.dart';

class ${pascalCaseFeatureName}Data {
  const ${pascalCaseFeatureName}Data(this.context);

  final BuildContext context;
}`;
}

function getFeatureWidgetTemplate(featureName: string) {
  const pascalCaseFeatureName = getPascalCase(featureName);
  const snakeCaseFeatureName = getSnakeCase(featureName);
  return `part of '${snakeCaseFeatureName}_widgets_imports.dart';

class ${pascalCaseFeatureName}Widget extends StatelessWidget {
  const ${pascalCaseFeatureName}Widget({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text('Hello, ${pascalCaseFeatureName}Widget!');
  }
}`;
}

function getFeatureWidgetsImportsTemplate(featureName: string) {
  const snakeCaseFeatureName = getSnakeCase(featureName);

  return `import 'package:flutter/material.dart';

part '${snakeCaseFeatureName}_widget.dart';
`;
}

function getFeatureImportsTemplate(featureName: string) {
  const snakeCaseFeatureName = getSnakeCase(featureName);

  return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
    
part '${snakeCaseFeatureName}_data.dart';
part '${snakeCaseFeatureName}.dart';
`;
}

export function promptForFeatureName(): Thenable<string | undefined> {
  const featureNamePromptOptions: vscode.InputBoxOptions = {
    prompt: "Feature Name",
    placeHolder: "counter",
  };
  return vscode.window.showInputBox(featureNamePromptOptions);
}

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

export function getPascalCase(name: string): string {
  // Split the name by spaces or underscores
  let words = name.split(/[\s_]+/);

  // Capitalize the first letter of each word and join them
  let pascalCaseName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return pascalCaseName;
}

export function getSnakeCase(name: string): string {
  // Split the name by spaces or underscores
  let words = name.split(/[\s_]+/);

  // Lowercase the words and join them with underscores
  let snakeCaseName = words.map((word) => word.toLowerCase()).join("_");

  return snakeCaseName;
}

export async function createDirectories(
  targetDirectory: string,
  childDirectories: string[]
): Promise<void> {
  // Create the parent directory
  await createDirectory(targetDirectory);
  // Creat the children
  childDirectories.map(
    async (directory) =>
      await createDirectory(path.join(targetDirectory, directory))
  );
}
