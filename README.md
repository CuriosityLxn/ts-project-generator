# ts-project-generator

跟着[公众号文章](https://mp.weixin.qq.com/s/8gVMzz2_KgaYe81NHpqUig)实现了一个包含 cli、简单的 React + TS 脚手架。

相关插件：[mycli-react-webpack-plugin](https://github.com/CuriosityLxn/mycli-react-webpack-plugin)


#### 操作补充、修正

- revisePackageJson 方法 package.json 的写文件操作中， new Buffer(string) 方法会报错

```
(node:59457) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
```

![控制台 console.png](https://i.postimg.cc/kgyRwf59/32-C590-C3-2-FB6-47-E1-9-F8-B-D175-E8-D8-BE1-A.png)

[解决方法](https://stackoverflow.com/questions/52165333/deprecationwarning-buffer-is-deprecated-due-to-security-and-usability-issues/52165509)

![文档内容.png](https://i.postimg.cc/xdTJZMkm/53-BC4-FDD-F636-4-C94-BB81-3-A94-B8-F52-D73.png)

- 深拷贝复制文件使用的 `fs.exists` 被废弃了，改用 `fs.existsSync` 方法 or `fs.access`。
因为 fs.stat 是 promise，是异步的，所以不用 fs.stat。
