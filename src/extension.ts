// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands } from "vscode";

import { generateMedinaCleanArchitecturePaginated } from "./medina_clean_paginated_list_template/medina_utils/generate_clean_arch_method";
import { generateMedinaCleanArchitecture } from "./medina_clean_template/medina_utils/generate_clean_arch_method";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: ExtensionContext) {
  commands.registerCommand("base-dir-gen.createCleanArchFolder", (uri) =>
    generateMedinaCleanArchitecture(uri)
  );

  commands.registerCommand(
    "base-dir-gen.createCleanArchFolderPaginated",
    (uri) => generateMedinaCleanArchitecturePaginated(uri)
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
