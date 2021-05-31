const chalk = require('chalk');
const colors = ['green', 'blue', 'yellow', 'red'];
const consoleColors = {};

/* 终端文案颜色 */
colors.forEach(color => {
  consoleColors[color] = (text, isConsole = true) =>
    isConsole ? console.log(chalk[color](text)) : chalk[color](text);
});

module.exports = consoleColors;
