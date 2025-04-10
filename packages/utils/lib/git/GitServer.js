import path from 'node:path';
import fs from 'node:fs';
import { homedir } from 'node:os';
import { pathExistsSync } from 'path-exists';
import fse from 'fs-extra';
import { execa } from 'execa';
import { makeList, makePassword } from '../inquirer.js';
import log from '../log.js';

const TEMP_HOME = '.cli-longmo';
const TEMP_TOKEN = '.git_token';
const TEMP_PLATFORM = '.git_platform';
const TEMP_OWN = '.git_own';
const TEMP_LOGIN = '.git_login';

function createTokenPath() {
  return path.resolve(homedir(), TEMP_HOME, TEMP_TOKEN);
}

function createPlatformPath() {
  return path.resolve(homedir(), TEMP_HOME, TEMP_PLATFORM);
}

function createOwnPath() {
  return path.resolve(homedir(), TEMP_HOME, TEMP_OWN);
}

function createLoginPath() {
  return path.resolve(homedir(), TEMP_HOME, TEMP_LOGIN);
}

function getGitPlatform() {
  if (pathExistsSync(createPlatformPath())) {
    return fs.readFileSync(createPlatformPath()).toString();
  }
  return null;
}

function getGitOwn() {
  if (pathExistsSync(createOwnPath())) {
    return fs.readFileSync(createOwnPath()).toString();
  }
  return null;
}

function getGitLogin() {
  if (pathExistsSync(createLoginPath())) {
    return fs.readFileSync(createLoginPath()).toString();
  }
  return null;
}

class GitServer {
  constructor() {
  }

  async init() {
    // 判断token是否录入
    const tokenPath = createTokenPath();
    if (pathExistsSync(tokenPath)) {
      this.token = fse.readFileSync(tokenPath).toString();
    } else {
      this.token = await this.getToken();
      fs.writeFileSync(tokenPath, this.token);
    }
    log.verbose('token', this.token);
  }

  getToken() {
    return makePassword({
      message: '请输入token信息',
    });
  }

  savePlatform(platform) {
    this.platform = platform;
    fs.writeFileSync(createPlatformPath(), platform);
  }

  saveOwn(own) {
    this.own = own;
    fs.writeFileSync(createOwnPath(), own);
  }

  saveLogin(login) {
    this.login = login;
    fs.writeFileSync(createLoginPath(), login);
  }

  getPlatform() {
    return this.platform;
  }

  getOwn() {
    return this.own;
  }

  getLogin() {
    return this.login;
  }

  cloneRepo(fullName, tag) {
    if (tag) {
      return execa('git', ['clone', this.getRepoUrl(fullName), '-b', tag]);
    } else {
      return execa('git', ['clone', this.getRepoUrl(fullName)]);
    }
  }

  installDependencies(cwd, fullName) {
    const projectPath = getProjectPath(cwd, fullName);
    if (pathExistsSync(projectPath)) {
      return execa('npm', ['install', '--registry=https://registry.npmmirror.com'], { cwd: projectPath });
    }
    return null;
  }

  async runRepo(cwd, fullName) {
    const projectPath = getProjectPath(cwd, fullName);
    const pkg = getPackageJson(cwd, fullName);
    if (pkg) {
      const { scripts, bin, name } = pkg;
      if (bin) {
        await execa('npm',
          ['install', '-g', name, '--registry=https://registry.npmmirror.com'],
          { cwd: projectPath, stdout: 'inherit' }
        );
      }
      if (scripts && scripts.dev) {
        return execa('npm', ['run', 'dev'], { cwd: projectPath, stdout: 'inherit' });
      } else if (scripts && scripts.start) {
        return execa('npm', ['start'], { cwd: projectPath, stdout: 'inherit' });
      } else {
        log.warn('未找到启动命令');
      }
    }
  }

  getUser() {
    throw new Error('getUser must be implemented!');
  }

  getOrg() {
    throw new Error('getOrg must be implemented!');
  }

  createRepo() {
    throw new Error('createRepo must be implemented!');
  }
}

function getPackageJson(cwd, fullName) {
  const projectPath = getProjectPath(cwd, fullName);
  const pkgPath = path.resolve(projectPath, 'package.json');
  if (pathExistsSync(pkgPath)) {
    return fse.readJsonSync(pkgPath);
  }
  return null;
}

function getProjectPath(cwd, fullName) {
  const projectName = fullName.split('/')[1]; // vuejs/vue => vue
  return path.resolve(cwd, projectName);
}

function clearCache() {
  const platform = createPlatformPath();
  const token = createTokenPath();
  const own = createOwnPath();
  const login = createLoginPath();
  fse.removeSync(platform);
  fse.removeSync(token);
  fse.removeSync(own);
  fse.removeSync(login);
}

export {
  GitServer,
  getGitPlatform,
  clearCache,
  getGitOwn,
  getGitLogin,
};
