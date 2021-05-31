let fileCount = 0; // 文件数量
let dirCount = 0; // 文件夹数量
let flat = 0; // readir 数量
const fs = require('fs');
const { green, blue, yellow } = require('../utils/colors');
const sourcePath = __dirname.slice(0, -3) + 'template';

const revisePackageJson = (res, sourcePath) =>
  new Promise(resolve => {
    fs.readFile(sourcePath + '/package.json', (error, data) => {
      if (error) throw error;
      const { name, author } = res;
      let json = data.toString();

      // 使用者自定义内容替换掉模版配置项
      json = json.replace(/demoName/g, name.trim());
      json = json.replace(/demoAuthor/g, author.trim());
      const path = process.cwd() + '/package.json';

      // 写文件操作
      fs.writeFile(path, Buffer.from(json), () => {
        green('创建文件：' + path);
        resolve();
      });
    });
  });

module.exports = res => {
  green('-----开始构建-----');

  /* 找到template文件夹下的模版项目 */

  blue('当前路径:' + process.cwd());

  // 修改 package.json
  revisePackageJson(res, sourcePath).then(() =>
    copy(sourcePath, process.cwd(), npm())
  );
};

/**
 * @param {*} sourcePath   // template资源路径
 * @param {*} currentPath  // 当前项目路径
 * @param {*} callback     // 项目复制完成回调函数
 */
const copy = (sourcePath, currentPath, callback) => {
  flat++;

  fs.readdir(sourcePath, (err, paths) => {
    flat--;

    if (err) throw err;

    paths.forEach(path => {
      if (path !== '.git' && path !== 'package.json') fileCount++;
      const newSoursePath = sourcePath + '/' + path;
      const newCurrentPath = currentPath + '/' + path;

      // 判断文件信息
      fs.stat(newSoursePath, (err, stat) => {
        if (err) throw err;

        if (stat.isFile() && path !== 'package.json') {
          //创建文件流
          const readSteam = fs.createReadStream(newSoursePath);
          const writeSteam = fs.createWriteStream(newCurrentPath);
          readSteam.pipe(writeSteam);
          green('创建文件：', newCurrentPath);
          fileCount--;
          completeControl(callback);
        }

        if (stat.isDirectory() && path !== '.git' && path !== 'package.json') {
          dirCount++;
          dirExist(newSoursePath, newCurrentPath, callback);
        }
      });
    });
  });
};

/**
 *
 * @param {*} sourcePath   // template 资源路径
 * @param {*} currentPath  // 当前项目路径
 * @param {*} callback     // 项目复制完成回调函数
 */
const dirExist = (soursePath, currentPath, callback) => {
  fs.existsSync(currentPath, exitItem => {
    if (exitItem) return copy(soursePath, currentPath, callback);

    fs.mkdir(currentPath, () => {
      fileCount--;
      dirCount--;
      copy(soursePath, currentPath, callback);
      yellow('创建文件夹：' + currentPath);
      completeControl(callback);
    });
  });
};
