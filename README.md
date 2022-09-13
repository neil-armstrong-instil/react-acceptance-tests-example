# Acceptance test example

## Quickstart

### Required dependencies
1. Install Nodenv: https://github.com/nodenv/nodenv#homebrew-on-macos
2. Install Node version: `$ nodenv install 16.5.0`
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

## TODO
- Deploy application to showcase Webapp tests
- Deploy API to showcase API tests (so not using playwright)
- Get reordering working to show case playwrights drag and drop capabilities

## Debugging

### Webstorm ESLint: "TypeError: this.cliEngineCtor is not a constructor"
Upgrade Webstorm to latest version, or at least `2021.3.1`

