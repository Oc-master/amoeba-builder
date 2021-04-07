# amoeba-builder
amoeba-builder 是一套快速开发 Cocos create 游戏的 CLI 工具。

## Usage
``` shell
git clone https://github.com/Oc-master/amoeba-builder.git

npm link
```
当前 CLI 项目尚未成熟还未发布成为 npm 包，所以采用 `npm link` 创建伪连接的形式供开发者使用命令。在使用过程中可能出现版本滞后问题，请使用 `git pull --rebase` 更新项目再进行生成工作。

### create 功能
通过 `amoeba create [project]` 命令可以快速创建项目的基础结构。
