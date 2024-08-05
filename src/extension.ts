// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands } from "vscode";

import { generateMedinaCleanArchitecture } from "./medina_utils/generate_clean_arch_method";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: ExtensionContext) {
  commands.registerCommand("base-dir-gen.createCleanArchFolderMedina", (uri) =>
    generateMedinaCleanArchitecture(uri)
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
