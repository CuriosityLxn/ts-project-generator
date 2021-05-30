#!/usr/bin/env node
'use strict';

const { green } = require('chalk');
const chalk = require('chalk');
const colors = ['green', 'blue', 'yellow', 'red'];
var commander = require('commander');
const consoleColors = {};

/* 终端文案颜色 */
colors.forEach(color => {
  consoleColors[color] = (text, isConsole = true) =>
    isConsole ? console.log(chalk[color](text)) : chalk[color](text);
});

module.exports = consoleColors;

/* 终端命令-版本号 */
commander.version('0.0.1');

/* 终端命令-选项 */
commander
  .option('-d --debug', 'output extra debugging')
  .option('-h --huajian', 'huajian wants to console');

/* 终端命令-自定义命令  */
/* create 创建项目 */
commander
  .command('create')
  .description('create a project')
  .action(() =>
    consoleColors.green('Welcome to use mycli，it`s easy to build a TS project')
  );

/* start 运行项目 */
commander
  .command('start')
  .description('project start')
  .action(() => consoleColors.green('-----运行项目-----'));

/* build 打包项目 */
commander
  .command('build')
  .description('project build')
  .action(() => consoleColors.green('-----构建项目-----'));

commander.parse(process.argv);

if (commander.debug) {
  consoleColors.blue('option is debug');
} else if (commander.huajian) {
  consoleColors.green('option is console');
}
