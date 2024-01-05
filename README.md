# 物联网可视化平台项目模板 - ty-iot-template

## 项目使用 pnpm 作为包管理器

全局安装：

```bash
$ npm i -g pnpm
```

### 安装依赖：

```bash
$ pnpm i
```

### 启动开发服务器

```bash
$ pnpm start
```

### 构建生产环境包

```bash
$ pnpm build
```

### 关于 **config.json** 文件

项目新建完成后，把 public/config.json.example，改名为： config.json. 即可.

config.json 中字段说明：
```bash
{
  // 指定所用的环境
  "environments": "DEV",
  "DEV": {
    # 空间数据库接口地址
    "api": "http://192.168.0.220:8055/mapvision_5.5_jzy",
    # 报警 socket 地址配置
    "alarmSocket": "ws://192.168.0.220:9002",
    # DIS 服务接口地址
    "dis": "https://console-mock.apipost.cn/mock/f5623c1f-6ab7-41ae-bd1e-00c583852dce/",
    # 功能模块部署的地址
    "moduleUrl": "//192.168.0.220/modules/",
    # 地图平台地址
    "url": "http://192.168.0.220:19901/aimapvision3d",
    # 所用的场景ID
    "projectId": "d6b76d5e1f284c0c86259d3b3778b514",
    # 地图平台 认证token
    "mapkey": "75504daf1856eadc28beff5d96518186",
    # 配置给IOT页面所引入的功能模块弹窗距离页面顶部的距离
    "moduleOffsetTop": "12vh",
    # 人脸轨迹中，绘制的轨迹的离地高度
    "groundHeight": 100,
    #
    "floorHeight": 300,
    # 路网的认证token
    "auth": "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjdlNmY5NDMzLTgxNmEtNDI1Yy1hMDM3LTY4OWRlYmE4NTljYiJ9.PD0WZ-y-HKm-SP8zz7YpIoRQoHtZduRByPXwbuhJW-BNJK4rwd416KZTnTRHSStLoGIfLNcxAAUDamucDKQDAQ",
    # 路网的ID
    "pathName": "mv_jzy",
    # 视频预览时的取流协议
    "videoProtocol": "ws",
     # 配置IOT平台中，底部导航栏初始的是否可见
     "footer": true
     
     # 其他第三方接口，也需要在这里配置, 以便能在项目中使用
  },
  "SIT": {
    "api": "http://192.168.0.220:8055/MapW5.5",
    "url": "http://192.168.0.220:19901/aimapvision3d",
    "projectId": "bd328a32238f463e819065f38617100e",
    "mapkey": "75504daf1856eadc28beff5d96518186"
  },
  "PRD": {
    "api": "http://192.168.0.220:805/MapW5.5",
    "url": "http://192.168.0.220:19901/aimapvision3d",
    "projectId": "bd328a32238f463e819065f38617100e",
    "mapkey": "75504daf1856eadc28beff5d96518186"
  }
}
```

## git 分支管理规范

- 实际开发的时候，一人一条分支。除此之外还要有一条 develop 开发分支，一条 test 测试分支，一条 release 预发布分支。
- **「develop」**：**「开发分支」**，开发人员每天都需要拉取/提交最新代码的分支；
- **「test」**：**「测试分支」**，开发人员开发完并自测通过后，发布到测试环境的分支；
- **「release」**：**「预发布分支」**，测试环境测试通过后，将测试分支的代码发布到预发环境的分支（**「这个得看公司支不支持预发环境，没有的话就可以不采用这条分支」**）；
- **「master」**：**「线上分支」**，预发环境测试通过后，运营/测试会将此分支代码发布到线上环境；
- 大致流程：
- 开发人员每天都需要拉取/提交最新的代码到 **「develop 分支」**；
- 开发人员开发完毕，开始 **「集成测试」**，测试无误后提交到 **「test 分支」**并发布到测试环境，交由测试人员测试；
- 测试环境通过后，发布到 **「release 分支」** 上，进行预发环境测试；
- 预发环境通过后，发布到 **「master 分支」** 上并打上标签（tag）；
- 如果线上分支出了 bug ，这时候相关开发者应该基于预发布分支（**「没有预发环境，就使用 master 分支」**），新建一个 **「bug 分支」** 「fix-xxx」用来临时解决 bug ，处理完后申请合并到 预发布分支。这样做的好处就是：不会影响正在开发中的功能。

**「预发布环境的作用：」** 预发布环境是正式发布前最后一次测试。因为在少数情况下即使预发布通过了，都不能保证正式生产环境可以 100%不出问题；预发布环境的配置，数据库等都是跟线上一样；有些公司的预发布环境数据库是连接线上环境，有些公司预发布环境是单独的数据库；如果不设预发布环境，如果开发合并代码有问题，会直接将问题发布到线上，增加维护的成本

## git message 规范(参考 commitizen 规范)

代码提交时，执行如下命令：

```bash
$ yarn cz
```

然后根据本次提交的类别选择对应分类，填写简略描述信息即可。

```bash
cz-cli@4.2.4, cz-conventional-changelog@3.2.0

? Select the type of change that you\'re committing: (Use arrow keys)
> feat:     A new feature   # 提交了一个新特性、新功能
  fix:      A bug fix       # 提交了一个bug修复
  docs:     Documentation only changes # 提交只针对文档修改
  style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) # 提交只针对代码样式修改，不影响功能特性。
  refactor: A code change that neither fixes a bug nor adds a feature # 提交了一次代码重构
  perf:     A code change that improves performance  # 提交了一次对代码的性能优化
  test:     Adding missing tests or correcting existing tests # 提交了测试相关代码
  build:    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) #  提交了针对构建系统的更改，例如，引入了新的依赖包，修改了package.json配置等
  ci:       Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) # 提交的是针对 ci 系统的修改
  chore:    Other changes that don\'t modify src or test files # 提交的是其他修改
  revert:   Reverts a previous commit  # 提交了一次代码回滚
```

详细的说明参考：[commitizen](https://github.com/commitizen/cz-cli)

## 代码规范(code style)

javascript 代码规范参考：[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

【中文版】[Airbnb JavaScript Style Guide](https://lin-123.github.io/javascript/)

css & scss 代码规范参考: [airbnb css & scss style](https://github.com/airbnb/css)

【中文版】[airbnb css & scss style](https://github.com/Zhangjd/css-style-guide)

其他：

[JavaScript Standard Style](https://standardjs.com/rules-zhcn.html)

[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
