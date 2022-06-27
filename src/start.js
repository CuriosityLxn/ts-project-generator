'use strict';

// 启动项目
const child_process = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const { rejects } = require('assert');

/* 找到mycli-react-webpack-plugin的路径*/
const currentPath = process.cwd() + '/node_modules/mycli-react-webpack-plugin';

/**
 * 
 * @param {*} type  type = start 本地启动项目  type = build 线上打包项目
 */

module.exports = (type) => {
  return new Promise((resolve, reject) => {
    // 判断 mycli-react-webpack-plugin 是否存在
    fs.access(currentPath, err => {
      if (!err) {
        const warning = chalk.red('mycli-react-webpack-plugin does not exist , please install mycli-react-webpack-plugin first');
        console.log(warning);
        return;
      }
  
      // 存在插件则启动子进程
      const children = child_process.fork(currentPath + 'index.js');

      // 监听子进程
      children.on('message', message => {
        const msg = JSON.parse(message);
        // 正常结束，关闭子进程，promise resolve
        if (msg.type === 'end') {
          children.kill();
          resolve();
        }

        // 异常结束，关闭子进程，promise reject
        if (msg.type === 'error') {
          children.kill();
          reject();
        }
      });

      // 发送 cwd 路径和操作类型 type: 'start' | 'build'
      children.send(JSON.stringify({
        cwdPath: process.cwd(),
        type: type || 'build'
      }));

    });
  });
};
