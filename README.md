# Styled Component Generator

Automate the creation of Components folder in React.

The files generated are very opinionated, not much customizable yet.

## Features

This extension adds a menu option for **folders**. (Create Styled Component)

When clicked it asks for Component Name. If it is let empty, the parent folder will be used as component name. Otherwise, a new folder (component name) will be created inside selected folder.

After prompting the extension will generate two files in folder:

- index.(js|tsx)
- styles.(js|ts)

**TODO: Add Animation**

## Requirements

- React Web
- Styled Component
- Functional Compoments usage in project

## Extension Settings

The generated files extensions will be created accordingly to setting `createComponent.language`. If it is set to `js` .js extensions will be used. If set to `ts` .ts(x) extensions will be used.

- `createComponent.language`: set to `js` or `ts` (defaults to `js`)

## TODO

- Autodected `js` or `ts` (by reading `tsconfig.json` maybe?)
- Support React Native

## Known Issues

---

## Release Notes

- See CHANGELOG.md
