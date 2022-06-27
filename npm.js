const which = require('which');

// 找到 npm
function findNpm() {
  const npms = process.platform === 'win32' ? ['npm.cmd'] : ['npm'];
  for (let i = 0; i < npms.length; i ++) {
    try {
      which.sync(npms[i]);
      console.log('use npm:' + npms[i]);
      return npms[i];
    } catch (e) {
      console.log('use npm error:' + e);
    }
  }

  throw new Error('please install npms');
}

/**
 * 运行终端命令
 * @param {*} cmd   
 * @param {*} args 
 * @param {*} fn 
 */
function runCmd(cmd, args, fn) {
  args = args || [];
  const runner = require('child_process').spawn(cmd, args, {
    stdio: 'inherit'
  });

  runner.on('close', code => fn && fn(code));
}

/**
 * 
 * @param {*} installArg  执行命令 命令行组成的数组，默认为 install 
 */
module.exports = (installArg = ['install']) => {
  // 闭包保存 npm
  const npm = findNpm();

  return function (done) {
    // 执行命令，done 是执行完成的回调
    runCmd(which.sync(npm), installArg, () => done && done());
  }
};
