---
title: cloudreve搭建
date: 2022-08-15
description: 配置cloudreve搭建一套属于自己的网盘系统
tags:
 - cloudreve
categories:
 - 配置
publish: true
---

Cloudreve 可以让您快速搭建起公私兼备的网盘系统。Cloudreve 在底层支持不同的云存储平台，用户在实际使用时无须关心物理存储方式。你可以使用 Cloudreve 搭建个人用网盘、文件分享系统，亦或是针对大小团体的公有云系统。

## 一、特性

- ☁️ 支持本机、从机、七牛、阿里云 OSS、腾讯云 COS、又拍云、OneDrive (包括世纪互联版) 作为存储端
- 📤 上传/下载 支持客户端直传，支持下载限速
- 💾 可对接 Aria2 离线下载，可使用多个从机节点分担下载任务
- 📚 在线 压缩/解压缩、多文件打包下载
- 💻 覆盖全部存储策略的 WebDAV 协议支持
- ⚡ 拖拽上传、目录上传、流式上传处理
- 🗃️ 文件拖拽管理
- 👩‍👧‍👦 多用户、用户组
- 🔗 创建文件、目录的分享链接，可设定自动过期
- 👁️‍🗨️ 视频、图像、音频、文本、Office 文档在线预览
- 🎨 自定义配色、黑暗模式、PWA 应用、全站单页应用
- 🚀 All-In-One 打包，开箱即用
- 🌈 ... ...

## 二、安装配置

**cloudreve下载地址**：https://github.com/cloudreve/Cloudreve/releases

**文档地址**：https://docs.cloudreve.org/

### 2.1、默认部署方式

该方式较为简单、方便，直接执行已经构建打包完成后的主程序。

#### 初始启动

**Linux**

```shell
#解压获取到的主程序
tar -zxvf cloudreve_VERSION_OS_ARCH.tar.gz

# 赋予执行权限
chmod +x ./cloudreve

# 启动 Cloudreve
./cloudreve
```

**Window**

```
Windows 下，直接解压获取到的 zip 压缩包，启动 cloudreve.exe 即可。
```

Cloudreve 在首次启动时，会创建初始管理员账号，请注意保管管理员密码，此密码只会在首次启动时出现。如果您忘记初始管理员密码，需要删除同级目录下的`cloudreve.db`，重新启动主程序以初始化新的管理员账户。

Cloudreve 默认会监听`5212`端口。你可以在浏览器中访问`http://服务器IP:5212`进入 Cloudreve。

#### 进程守护

```shell
# 编辑配置文件
vim /usr/lib/systemd/system/cloudreve.service
```

将下文 `PATH_TO_CLOUDREVE` 更换为程序所在目录：

```shell
[Unit]
Description=Cloudreve
Documentation=https://docs.cloudreve.org
After=network.target
After=mysqld.service
Wants=network.target

[Service]
WorkingDirectory=/PATH_TO_CLOUDREVE
ExecStart=/PATH_TO_CLOUDREVE/cloudreve
Restart=on-abnormal
RestartSec=5s
KillMode=mixed

StandardOutput=null
StandardError=syslog

[Install]
WantedBy=multi-user.target
```

管理命令：

```shell
# 启动服务
systemctl start cloudreve

# 停止服务
systemctl stop cloudreve

# 重启服务
systemctl restart cloudreve

# 查看状态
systemctl status cloudreve
```

#### 配置文件

首次启动时，Cloudreve 会在同级目录下创建名为`conf.ini`的配置文件，你可以修改此文件进行一些参数的配置，保存后需要重新启动 Cloudreve 生效。

你也可以在启动时加入`-c`参数指定配置文件路径：

```shell
./cloudreve -c /path/to/conf.ini
```

一个完整的配置文件示例如下：

```shell
[System]
; 运行模式
Mode = master
; 监听端口
Listen = :5212
; 是否开启 Debug
Debug = false
; Session 密钥, 一般在首次启动时自动生成
SessionSecret = 23333
; Hash 加盐, 一般在首次启动时自动生成
HashIDSalt = something really hard to guss

; SSL 相关
[SSL]
; SSL 监听端口
Listen = :443
; 证书路径
CertPath = C:\Users\i\Documents\fullchain.pem
; 私钥路径
KeyPath = C:\Users\i\Documents\privkey.pem

; 启用 Unix Socket 监听
[UnixSocket]
Listen = /run/cloudreve/cloudreve.sock

; 数据库相关，如果你只想使用内置的 SQLite 数据库，这一部分直接删去即可
[Database]
; 数据库类型，目前支持 sqlite/mysql/mssql/postgres
Type = mysql
; MySQL 端口
Port = 3306
; 用户名
User = root
; 密码
Password = root
; 数据库地址
Host = 127.0.0.1
; 数据库名称
Name = v3
; 数据表前缀
TablePrefix = cd_
; 字符集
Charset = utf8mb4
; SQLite 数据库文件路径
DBFile = cloudreve.db

; 从机模式下的配置
[Slave]
; 通信密钥
Secret = 1234567891234567123456789123456712345678912345671234567891234567
; 回调请求超时时间 (s)
CallbackTimeout = 20
; 签名有效期
SignatureTTL = 60

; 跨域配置
[CORS]
AllowOrigins = *
AllowMethods = OPTIONS,GET,POST
AllowHeaders = *
AllowCredentials = false

; Redis 相关
[Redis]
Server = 127.0.0.1:6379
Password =
DB = 0

; 从机配置覆盖
[OptionOverwrite]
; 可直接使用 `设置名称 = 值` 的格式覆盖
max_worker_num = 50
```

### 2.2、Docker部署

**查找并获取官方镜像文件**

```sh
docker search cloudreve/cloudreve
# NAME                  DESCRIPTION                         STARS     OFFICIAL   AUTOMATED
# cloudreve/cloudreve   🌩支持多家云存储的云盘系统 (Self-hosted file …   21  

docker pull cloudreve/cloudreve
```

> 1. 手动创建 `conf.ini` 空文件或者符合 Cloudreve 配置文件规范的 `conf.ini`, 并将 `<path_to_your_config> `替换为该路径
> 2. 手动创建 `cloudreve.db` 空文件, 并将 `<path_to_your_db> `替换为该路径
> 3. 手动创建 `uploads` 文件夹, 并将 `<path_to_your_uploads>` 替换为该路径
> 4. 手动创建 `avatar` 文件夹，并将 `<path_to_your_avatar>` 替换为该路径

**或者用命令创建**

```sh
mkdir -vp cloudreve/{uploads,avatar} \
&& touch cloudreve/conf.ini \
&& touch cloudreve/cloudreve.db
```

**修改`conf.ini`配置文件(可使用空文件)**

```sh
[System]
; 运行模式
Mode = master
; 监听端口
Listen = :5212
; 是否开启 Debug
Debug = false
; Session 密钥, 一般在首次启动时自动生成
SessionSecret = 23333
; Hash 加盐, 一般在首次启动时自动生成
HashIDSalt = something really hard to guss

; SSL 相关
[SSL]
; SSL 监听端口
Listen = :443
; 证书路径
CertPath = C:\Users\i\Documents\fullchain.pem
; 私钥路径
KeyPath = C:\Users\i\Documents\privkey.pem

; 启用 Unix Socket 监听
[UnixSocket]
Listen = /run/cloudreve/cloudreve.sock

; 数据库相关，如果你只想使用内置的 SQLite 数据库，这一部分直接删去即可
[Database]
; 数据库类型，目前支持 sqlite/mysql/mssql/postgres
Type = mysql
; MySQL 端口
Port = 3306
; 用户名
User = root
; 密码
Password = root
; 数据库地址
Host = 127.0.0.1
; 数据库名称
Name = v3
; 数据表前缀
TablePrefix = cd_
; 字符集
Charset = utf8mb4
; SQLite 数据库文件路径
DBFile = cloudreve.db

; 从机模式下的配置
[Slave]
; 通信密钥
Secret = 1234567891234567123456789123456712345678912345671234567891234567
; 回调请求超时时间 (s)
CallbackTimeout = 20
; 签名有效期
SignatureTTL = 60

; 跨域配置
[CORS]
AllowOrigins = *
AllowMethods = OPTIONS,GET,POST
AllowHeaders = *
AllowCredentials = false

; Redis 相关
[Redis]
Server = 127.0.0.1:6379
Password =
DB = 0

; 从机配置覆盖
[OptionOverwrite]
; 可直接使用 `设置名称 = 值` 的格式覆盖
max_worker_num = 50
```

**运行**

```sh
docker run -d \
-p 5212:5212 \
--restart=always \
--name cloudreve \
--mount type=bind,source=/root/cloudreve/conf.ini,target=/cloudreve/conf.ini \
--mount type=bind,source=/root/cloudreve/cloudreve.db,target=/cloudreve/cloudreve.db \
-v /root/cloudreve/uploads:/cloudreve/uploads \
-v /root/cloudreve/avatar:/cloudreve/avatar \
cloudreve/cloudreve:latest
```

**获取初始账号和密码**

```sh
#查看容器的日志输出获取
docker logs cloudreve
```

**最后通过IP+端口的方式访问Web界面**

![image-20221125205128489](https://oss.zhulinz.top/newImage/202211252051636.png)


