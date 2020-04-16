# gobangbang

> An AI Project.

gobang就是五子棋……百度搜的e文。

姑且看看文件目录

```
gobangbang
├─.electron-vue 		: 一些诡异的配置文件
├─.vscode 				: 又一些诡异的配置文件
├─build 				: 最终成品输出的地方
├─dist 					: 自动生成的中间文件
├─src 					: 我们可亲可爱的源代码
│  ├─main 				: 不用管
│  ├─renderer 			: ※主要写东西的地方※
│  │  ├─assets			: 一些图片啊什么的资源
│  │  ├─components		: 前端的页面模块
│  │  ├─router			: 路由器？好像没啥用
│  │  ├─store			: 后端的储存、数据结构
│  └  ┴─utils			: 核心算法之类的东西
├─test 					: 测试
| 其他都都没啥用
```

 [Vue文档](https://cn.vuejs.org/v2/guide/) 

#### 构建方法

``` bash
# 安装依赖包
npm install

# 实时更新预览模式←平常就用这个
npm run dev

# 打包出来
npm run build

# 执行测试程序
npm test


# src下所有文件格式化
npm run lint

```

---

该工程基于 [electron-vue](https://github.com/SimulatedGREG/electron-vue)，使用 [vue-cli](https://github.com/vuejs/vue-cli)。 模板相关文档可以在 [这里](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html) 找到。
