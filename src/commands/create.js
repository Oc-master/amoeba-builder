const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');
const ora = require('ora');
const inquirer = require('inquirer');
const download = require('download-git-repo');
const { questions } = require('../config/questions');

class Create {
  constructor(source = '') {
    this.project = source;
    this.spinner = ora();
  }

  async init() {
    await this.verifyProjectName();
    await this.checkFolderExists();
    // await this.downloadTemplate();
    this.copyFiles();
    await this.generatePackageJson();
    await this.initializeGit();
  }

  async verifyProjectName() {
    if (this.project) return undefined;
    const { project } = await inquirer.prompt(questions.project);
    this.project = project;
    await this.verifyProjectName();
  }

  async checkFolderExists() {
    const folderPath = path.resolve(process.cwd(), this.project);
    const isExists = fs.pathExistsSync(folderPath);
    if (!isExists) return undefined;
    const { operation } = await inquirer.prompt(questions.operation);
    if (operation === 'rename') {
      const { project } = await inquirer.prompt(questions.project);
      this.project = project;
      await this.checkFolderExists();
    } else if (operation === 'cover') {
      fs.removeSync(folderPath);
    } else if (operation === 'exit') {
      process.exit(0);
    } else {
      throw new Error('Unexpected exception occurred in checkFolderExists function');
    }
  }

  downloadTemplate() {
    return new Promise((resolve, reject) => {
      this.spinner.start('Downloading template...');
      const tempPath = path.resolve(__dirname, '../../__temp__');
      fs.removeSync(tempPath);
      download('github:Oc-master/amoeba-game-base#develop', tempPath, (error) => {
        if (error) {
          this.spinner.fail('Template download failed, please try again!');
          return reject();
        }
        this.spinner.succeed('Template downloaded successfully!');
        resolve();
      });
    });
  }

  copyFiles() {
    const sourcePath = path.resolve(__dirname, '../../__temp__');
    const targetPath = path.resolve(process.cwd(), this.project);
    fs.copySync(sourcePath, targetPath);
    const excludeList = ['.git', 'package.json', 'package_template.json', 'CHANGELOG.md', 'README.md'];
    excludeList.forEach((item) => fs.removeSync(path.resolve(targetPath, item)));
  }

  async generatePackageJson() {
    const packageTemplatePath = path.resolve(__dirname, '../../__temp__/package_template.json');
    const packageTemplateContent = JSON.parse(fs.readFileSync(packageTemplatePath, { encoding: 'utf8' }));
    const {
      desrtiption, author, repository,
    } = await inquirer.prompt(questions.info);
    const packageJsonPath = path.resolve(process.cwd(), this.project, 'package.json');
    const content = {
      ...packageTemplateContent,
      name: this.project,
      desrtiption,
      author,
      repository: {
        ...packageTemplateContent.repository,
        url: repository,
      },
    };
    fs.writeJSONSync(packageJsonPath, content, { spaces: '\t' });
  }

  async initializeGit() {
    const projectPath = path.resolve(process.cwd(), this.project);
    this.spinner.start('Initialize the git management tool...');
    await this.runCommand(`cd ${projectPath}`);
    process.chdir(projectPath);
    await this.runCommand('git init');
    await this.runCommand('git add . && git commit -m "feat(*): Initialize project"');
    setTimeout(() => this.spinner.succeed('Initialize the git management tool successfully'), 800);
  }

  runCommand(command) {
    return new Promise((resolve, reject) => {
      childProcess.exec(command, (error) => {
        if (error) return reject();
        resolve();
      });
    });
  }
}

module.exports = {
  Create,
};
