# Acceptance test example
An example of the following techniques:
- UI driven development via "acceptance tests" using Playwright
- UI testing a webapp on multiple different platforms: browser, Electron, Android
- Sharing code between webapp, tests, Electron
- Using figma-sync to share styles between Figma and the browser
- Drag and drop, along with how to test it in Playwright

The (very crude) Figma design used can be found here: https://www.figma.com/file/4FqjOyGsXBVaZ7q0t0tA54/Design-System-Example?node-id=2%3A1089&t=NyCFVJj0sPYcSyie-0

## Quickstart

### Required dependencies
1. Install Nodenv: https://github.com/nodenv/nodenv#homebrew-on-macos
2. Install Node version: `$ nodenv install 18.6.0`
3. Install Yarn 2: https://yarnpkg.com/getting-started/install
4. Install dependencies: `$ yarn install`
5. Test it works! `$ yarn start:webapp`

#### Optional project wide dependencies
1. Install android studio: https://developer.android.com/studio
2. Ensure command line tools are installed
   1. Preferences > Appearance & Behavior > System Settings > Android SDK > SDK Tools
   2. Tick `Android SDK Command-line Tools`
3. Add android commandline tools to your path
   1. Open `~/.bashrc` or `~/.zshrc` depending on your shell
   2. Add the line `export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin` to update your path
4. Run `$ yarn bootstrap`

This will install android avd for acceptance tests, gradle for android, package everything up, etc

## Debugging

### Webstorm ESLint: "TypeError: this.cliEngineCtor is not a constructor"
Upgrade Webstorm to latest version, or at least `2021.3.1`
