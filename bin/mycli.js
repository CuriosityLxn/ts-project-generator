#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const colors = ['green', 'blue', 'yellow', 'red'];
var commander = require('commander');
const consoleColors = {};

/* 终端文案颜色 */
colors.forEach(color => {
  consoleColors[color] = (text, isConsole = true) =>
    isConsole ? console.log(chalk[color](text)) : chalk[color](text);
});

/* 终端命令-版本号 */
commander.version('0.0.1');

/* 终端命令-选项 */
commander
  .option('-d --debug', 'output extra debugging')
  .option('-h --huajian', 'huajian wants to console');

commander.parse(process.argv);

if (commander.debug) {
  consoleColors.blue('option is debug');
} else if (commander.huajian) {
  consoleColors.green('option is console');
}

module.exports = consoleColors;
