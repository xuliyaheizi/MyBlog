---
title: Axios提交数据的方式
date: 2022-09-01
description: 在前端中使用axios提交数据的方式
tags:
 - axios
categories:
 - 工作
publish: true
---
## Post提交数据的三种方式

### 1、Content-Type：application/json

```js
import axios from 'axios'
let data = {"code":"1234","name":"yyyy"};
axios.post(`${this.$url}/test/testRequest`,data)
.then(res=>{
    console.log('res=>',res);            
})
```

### 2、Content-Type：multipart/form-data

```js
import axios from 'axios'
let data = new FormData();
data.append('code','1234');
data.append('name','yyyy');
axios.post(`${this.$url}/test/testRequest`,data)
.then(res=>{
    console.log('res=>',res);            
})
```

### 3、Content-Type：application/x-www-form-urlencoded

而在使用`POST`时对应的传参使用的是`data`，`data`是作为请求体发送的，同样使用这种形式的还有`PUT`,`PATCH`等请求方式。有一点需要注意的是，`axios`中`POST`的默认请求体类型为`Content-Type:application/json`（JSON规范流行），这也是最常见的请求体类型，也就是说使用的是序列化后的`json`格式字符串来传递参数，如：`{ "name" : "mike", "sex" : "male" }`；同时，后台必须要以支持`@RequestBody`的形式接收参数，否则会出现前台传参正确，后台接收不到的情况。
如果想要设置类型为`Content-Type:application/x-www-form-urlencoded`（浏览器原生支持），可以用`qs`这个库来格式化数据。默认情况下在安装完axios后就可以使用`qs`库。

```js
import axios from 'axios'
import qs from 'Qs'
let data = {"code":"1234","name":"yyyy"};
axios.post(`${this.$url}/test/testRequest`,qs.stringify({
    data
}))
.then(res=>{
    console.log('res=>',res);            
})
```

