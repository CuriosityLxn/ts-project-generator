#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const colors = ['green', 'blue', 'yellow', 'red'];
var commander = require('commander');
var inquirer = require('inquirer');
const consoleColors = {};
const question = [
  {
    name: 'conf',
    type: 'confirm',
    message: '是否创建新的项目？'
  },
  {
    name: 'name',
    message: '请输入项目名称',
    when: res => Boolean(res.conf)
  },
  {
    name: 'author',
    message: '请输入创建者',
    when: res => Boolean(res.conf)
  },
  {
    name: 'state',
    type: 'list',
    message: '选择公共管理状态',
    choices: ['mobx', 'redux'],
    filter: res => res.toLowerCase(),
    when: res => Boolean(res.conf)
  }
];

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
  .action(
    () =>
      consoleColors.green(
        'Welcome to use mycli，it`s easy to build a TS project'
      ),
    inquirer.prompt(question).then(answer => console.log('answer=', answer))
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
