// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path from "path";
import { ExtensionContext, Uri, commands, window } from "vscode";
import { getDataImportsTemplate } from "./templates/clean_arch_template/data/data-imports.template";
import { getDataSourceTemplate } from "./templates/clean_arch_template/data/data-source.template";
import { getServiceLoctorTemplate } from "./templates/clean_arch_template/data/di.template";
import { getEntityModelTemplate } from "./templates/clean_arch_template/data/model.template";
import { getRepositoryTemplate } from "./templates/clean_arch_template/data/repository.template";
import { getDomainImportsTemplate } from "./templates/clean_arch_template/domain/domain-imports.template";
import { getEntityTemplate } from "./templates/clean_arch_template/domain/entity.template";
import { getUsecaseTemplate } from "./templates/clean_arch_template/domain/usecase.template";
import { getCubitStateTemplate } from "./templates/clean_arch_template/presentation/cubit-state.template";
import { getCubitClassTemplate } from "./templates/clean_arch_template/presentation/cubit.template";
import { getPresentationListTemplate } from "./templates/clean_arch_template/presentation/list.template";
import { getPresentationImportsTemplate } from "./templates/clean_arch_template/presentation/presentation-imports.template";
import { getScreenBodyTemplate } from "./templates/clean_arch_template/presentation/screen-body.template";
import { getScreenViewTemplate } from "./templates/clean_arch_template/presentation/screen-view.template";
import { getProviderFeatureDataTemplate } from "./templates/provider_template/data.template";
import { getProviderFeatureImportsTemplate } from "./templates/provider_template/imports.template";
import { getFeatureMainTemplate } from "./templates/provider_template/view.template";
import { getFeatureDataTemplate } from "./templates/stateful_template/data.template";
import { getFeatureImportsTemplate } from "./templates/stateful_template/imports.template";
import { getFeatureMainStfulTemplate } from "./templates/stateful_template/view.template";
import { getFeatureWidgetTemplate } from "./templates/widgets_template/widget.template";
import { getFeatureWidgetsImportsTemplate } from "./templates/widgets_template/widgets-imports.template";
import { promptForFeatureName } from "./utils/ask-for-feature-name";
import { createDirectories } from "./utils/create-directories";
import { createDirectory } from "./utils/create-directory";
import { getTargetDirectory } from "./utils/get-target-directory";
import { isNameValid } from "./utils/name-validation";
import { getPascalCase } from "./utils/pascal-case";
import { writeContent } from "./utils/write-content";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: ExtensionContext) {
  commands.registerCommand("base-dir-gen.createFolder", (uri) => Go(uri));

  commands.registerCommand("base-dir-gen.createStfulFolder", (uri) =>
    Go(uri, true)
  );

  commands.registerCommand("base-dir-gen.createCleanArchFolder", (uri) =>
    generateCleanArchitecture(uri)
  );
}

export async function Go(uri: Uri, isStful: boolean = false) {
  // Show feature prompt
  let featureName = await promptForFeatureName();

  // Abort if name is not valid
  if (!isNameValid(featureName)) {
    window.showErrorMessage("The name must not be empty");
    return;
  }
  featureName = `${featureName}`;

  let targetDirectory = "";
  try {
    targetDirectory = await getTargetDirectory(uri);
  } catch (error) {
    window.showErrorMessage((error as Error).message);
  }

  const pascalCaseFeatureName = getPascalCase(featureName.toLowerCase());

  await generateFeatureArchitecture(`${featureName}`, targetDirectory, isStful);
  window.showInformationMessage(
    `Successfully Generated ${pascalCaseFeatureName} Feature`
  );
}

export async function generateFeatureArchitecture(
  featureName: string,
  targetDirectory: string,
  isStful: boolean
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

  createDirectory(featureDirectoryPath).finally(async () =>
    generateFeatureCode(featureName, featureDirectoryPath, isStful)
  );

  createDirectory(featureWidgetsDirectoryPath).finally(async () =>
    generateFeatureWidgetsCode(featureName, featureWidgetsDirectoryPath)
  );
}

async function generateFeatureCode(
  featureName: string,
  targetDirectory: string,
  isStful: boolean
) {
  await Promise.all([
    createMainFeatureTemplate(featureName, targetDirectory, isStful),
    createFeatureDataTemplate(featureName, targetDirectory, isStful),
    createFeatureImportsTemplate(featureName, targetDirectory, isStful),
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
  writeContent(
    `${featureName}_widget`,
    targetDirectory,
    getFeatureWidgetTemplate(featureName)
  );
}

async function createFeatureWidgetsImportsTemplate(
  featureName: string,
  targetDirectory: string
) {
  writeContent(
    `${featureName}_widgets_imports`,
    targetDirectory,
    getFeatureWidgetsImportsTemplate(featureName)
  );
}

async function createFeatureImportsTemplate(
  featureName: string,
  targetDirectory: string,
  isStful: boolean
) {
  writeContent(
    `${featureName}_imports`,
    targetDirectory,
    isStful
      ? getFeatureImportsTemplate(featureName)
      : getProviderFeatureImportsTemplate(featureName)
  );
}

async function createFeatureDataTemplate(
  featureName: string,
  targetDirectory: string,
  isStful: boolean
) {
  writeContent(
    `${featureName}_data`,
    targetDirectory,
    isStful
      ? getFeatureDataTemplate(featureName)
      : getProviderFeatureDataTemplate(featureName)
  );
}

function createMainFeatureTemplate(
  featureName: string,
  targetDirectory: string,
  isStful: boolean
) {
  writeContent(
    featureName,
    targetDirectory,
    isStful
      ? getFeatureMainStfulTemplate(featureName)
      : getFeatureMainTemplate(featureName)
  );
}

async function generateCleanArchitecture(uri: Uri) {
  // Show feature prompt
  let featureName = await promptForFeatureName();

  // Abort if name is not valid
  if (!isNameValid(featureName)) {
    window.showErrorMessage("The name must not be empty");
    return;
  }

  featureName = `${featureName}`;

  const pascalCaseFeatureName = getPascalCase(featureName.toLowerCase());

  let targetDirectory = "";
  try {
    targetDirectory = await getTargetDirectory(uri);
  } catch (error) {
    window.showErrorMessage((error as Error).message);
  }

  generateFeatureCleanArchitecture(featureName, targetDirectory).finally(() =>
    window.showInformationMessage(
      `Successfully Generated ${pascalCaseFeatureName} Feature`
    )
  );
}

export async function generateFeatureCleanArchitecture(
  featureName: string,
  targetDirectory: string
) {
  // Create the feature directory
  const featureDirectoryPath = path.join(
    targetDirectory,
    featureName.toLowerCase()
  );
  await createDirectories(featureDirectoryPath, [
    "data",
    "domain",
    "presentation",
  ]);

  Promise.all([
    createFeatureCleanArchitectureDataTemplate(
      featureName,
      path.join(featureDirectoryPath, "data")
    ),
    createFeatureCleanArchitectureDomainTemplate(
      featureName,
      path.join(featureDirectoryPath, "domain")
    ),
    createFeatureCleanArchitecturePresentationTemplate(
      featureName,
      path.join(featureDirectoryPath, "presentation")
    ),
  ]);
}

async function createFeatureCleanArchitecturePresentationTemplate(
  featureName: string,
  targetDirectory: string
) {
  let subDirectories = ["cubit", "screens", "imports", "widgets"];
  let templates = [
    getScreenViewTemplate(featureName),
    getPresentationImportsTemplate(featureName),
  ];
  let fileNames = [
    `${featureName}_screen`,
    `${featureName}_presentation_imports`,
  ];

  for (let index = 0; index < subDirectories.length; index++) {
    const directory = subDirectories[index];

    if (index == 0) {
      let targetDir = path.join(targetDirectory, directory);
      let fileNames = [`${featureName}_cubit`, `${featureName}_state`];
      for (let i = 0; i < fileNames.length; i++) {
        const template =
          i == 0
            ? getCubitClassTemplate(featureName)
            : getCubitStateTemplate(featureName);
        const fileName = fileNames[i];
        createDirectory(targetDir).finally(() => {
          writeContent(fileName, targetDir, template);
        });
      }
    } else if (index == 3) {
      let targetDir = path.join(targetDirectory, directory);
      let fileNames = [`${featureName}_body`, `${featureName}_list`];

      for (let i = 0; i < fileNames.length; i++) {
        const template =
          i == 0
            ? getScreenBodyTemplate(featureName)
            : getPresentationListTemplate(featureName);
        const fileName = fileNames[i];
        createDirectory(targetDir).finally(() => {
          writeContent(fileName, targetDir, template);
        });
      }
    } else {
      const template = index == 1 ? templates[0] : templates[1];
      const fileName = index == 1 ? fileNames[0] : fileNames[1];

      let targetDir = path.join(targetDirectory, directory);

      createDirectory(targetDir).finally(() => {
        writeContent(fileName, targetDir, template);
      });
    }
  }
}

async function createFeatureCleanArchitectureDomainTemplate(
  featureName: string,
  targetDirectory: string
) {
  let subDirectories = ["entities", "imports", "use_case"];
  let templates = [
    getEntityTemplate(featureName),
    getDomainImportsTemplate(featureName),
    getUsecaseTemplate(featureName),
  ];
  let fileNames = [
    `${featureName}_entity`,
    `${featureName}_domain_imports`,
    `fetch_${featureName}_use_case`,
  ];
  for (let index = 0; index < subDirectories.length; index++) {
    const directory = subDirectories[index];
    const template = templates[index];
    const fileName = fileNames[index];

    let targetDir = path.join(targetDirectory, directory);

    createDirectory(targetDir).finally(() => {
      writeContent(fileName, targetDir, template);
    });
  }
}

async function createFeatureCleanArchitectureDataTemplate(
  featureName: string,
  targetDirectory: string
) {
  let subDirectories = [
    "data_sources",
    "di",
    "imports",
    "models",
    "repositories",
  ];
  let templates = [
    getDataSourceTemplate(featureName),
    getServiceLoctorTemplate(featureName),
    getDataImportsTemplate(featureName),
    getEntityModelTemplate(featureName),
    getRepositoryTemplate(featureName),
  ];
  let fileNames = [
    `${featureName}_data_source`,
    `${featureName}_di`,
    `${featureName}_data_imports`,
    `${featureName}_model`,
    `${featureName}_repository`,
  ];
  for (let index = 0; index < subDirectories.length; index++) {
    const directory = subDirectories[index];
    const template = templates[index];
    const fileName = fileNames[index];

    let targetDir = path.join(targetDirectory, directory);

    createDirectory(targetDir).finally(() => {
      writeContent(fileName, targetDir, template);
    });
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
