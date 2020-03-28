// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

const indexContent = require("./templates/index");
const stylesContent = require("./templates/styles");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "styled-component-generator" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.createComponent",
    async function(args) {
      try {
        let result = await vscode.window.showInputBox({
          ignoreFocusOut: true,
          placeHolder: "New component name (empty to use parent)"
        });
        if (result === undefined) {
          return;
        }
        let folderPath = args.fsPath;

        let newComponentName;
        if (result !== "") {
          newComponentName = result;
          folderPath = path.resolve(folderPath, result);
          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
          }
        } else {
          newComponentName = folderPath.split(path.sep).pop();
        }
        let configs = vscode.workspace.getConfiguration("createComponent");

        let extensions;
        switch (configs.language) {
          case "typescript":
          case "ts":
            extensions = {
              index: "tsx",
              style: "ts"
            };
            break;
          case "js":
          case "javascript":
          default:
            extensions = {
              index: "js",
              style: "js"
            };
        }

        const indexFile = path.resolve(folderPath, `index.${extensions.index}`);
        const styleFile = path.resolve(
          folderPath,
          `styles.${extensions.style}`
        );
        const indexContentFormatted = indexContent.replace(
          "__COMPONENT_NAME__",
          newComponentName
        );

        fs.writeFileSync(indexFile, indexContentFormatted, "utf8");
        fs.writeFileSync(styleFile, stylesContent, "utf8");
        vscode.window.showInformationMessage(`Component Created`);
      } catch (error) {
        console.error(error);
        vscode.window.showErrorMessage(
          `Found error whiule generating: ${error.message}`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
