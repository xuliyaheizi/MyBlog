---
title: 对Vue的几点总结
date: 2022-10-29
description: 
tags:
 - Vue
categories:
 - 工作
publish: true
---

## 一、界面中两张Table如何实现滚动条联动

前端框架为Vue，界面中两张Element UI的el_table，需要实现两张table的滚动条联动。

`联动`：一张table的滚动条拖动多少，另一张table的滚动条也随之移动多少，便于两张table之间的数据进行比较。

### 界面代码

```vue
<el-table
	v-for="(data, i) in completedData"
	:key="i"
	:data="data"
	ref="table"
>
```

### 实现代码

```js
import _ from "lodash";
methods: {
    //设置table滚动条规则
    setScrollRule() {
        let that = this;
        //获取两张table的bodyWrapper
        this.one = this.$refs.table[0].bodyWrapper;
        this.two = this.$refs.table[1].bodyWrapper;

        //绑定滚动事件
        this.one.addEventListener(
            "scroll",
            _.throttle(
                function () {
                    that.fn1();
                },// 85毫秒触发一次
                85,
                {
                    leading: true,
                    trailing: false,
                }
            )	//节流函数
        );
        this.two.addEventListener(
            "scroll",
            _.throttle(
                function () {
                    that.fn2();
                },
                85,
                {
                    leading: true,
                    trailing: false,
                }
            )
        );
    },
    fn1() {
    	this.two.scrollLeft = this.one.scrollLeft;
    	this.two.scrollTop = this.one.scrollTop;
    	setTimeout(() => {
    		this.two.scrollLeft = this.one.scrollLeft;
    		this.two.scrollTop = this.one.scrollTop;
    	}, 120);
    },
    fn2() {
    	this.one.scrollLeft = this.two.scrollLeft;
    	this.one.scrollTop = this.two.scrollTop;
    	setTimeout(() => {
    	this.one.scrollLeft = this.two.scrollLeft;
    	this.one.scrollTop = this.two.scrollTop;
    	}, 120);
    },
},
mounted() {
	this.setScrollRule();
},
//页面销毁时，移除监听器
beforeDestroy() {
	this.one.removeEventListener("scroll", this.fn1);
	this.two.removeEventListener("scroll", this.fn2);
}
```

## 二、Vue的缓存方式

localStorage和sessionStorage都只能存储字符串类型的对象

- localStorage

  有效期是永久的，一般浏览器能存储的是5MB左右。作用域是协议、主机名、端口。

  ```js
  window.localStorage.setItem(key,value)
  window.localStorage.getItem(key)
  ```

  组件封装

  ```js
  //存储localStorage
  export const setStorage = (keyword, content) => {
    if (!keyword) return
    //对于json对象的存储，先使用JSON.stringify将对象转为字符串
    localStorage.setItem(keyword, JSON.stringify(content));
  }
  
  //获取localStorage
  export const getStorage = keyword => {
    if (!keyword) return;
    return JSON.parse(localStorage.getItem(keyword));
  }
  
  //删除localStorage
  export const removeStorage = keyword => {
    if (!keyword) return;
    localStorage.removeItem(keyword);
  }
  ```

- sessionStorage

  临时存储，为每一个数据源维持一个存储区域，在浏览器打开期间存在，包括页面重新加载。作用域是窗口、协议、主机名、端口。

  ```js
  window.sessionStorage.setItem(key,value)
  window.sessionStorage.getItem(key)
  ```

- storage.js

  ```js
  import storage from 'store'
  
  // Store current user
  store.set('user', { name:'Marcus' })
  
  // Get current user
  store.get('user')
  
  // Remove current user
  store.remove('user')
  
  // Clear all keys
  store.clearAll()
  
  // Loop over all stored values
  store.each(function(value, key) {
      console.log(key, '==', value)
  })
  ```

- vuex

  https://blog.csdn.net/qq_56989560/article/details/124706021

## 三、关于Vue的路由模式

### Hash模式

使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载，其显示的网路路径中会有 “#” 号，有一点点丑。这是最安全的模式，因为他兼容所有的浏览器和服务器。

### History模式

美化后的hash模式，会去掉路径中的 “#”。依赖于Html5 的history，pushState API,所以要担心IE9以及一下的版本，感觉不用担心。并且还包括back、forward、go三个方法，对应浏览器的前进，后退，跳转操作。就是浏览器左上角的前进、后退等按钮进行的操作。

在history模式下，如果前端的url和后端发起请求的url不一致的话，会报404错误，使用history模式的路由需要和后端进行配置。利用Nginx对Vue项目进行代理的话，需要如下配置

```js
try_files $uri $uri/ /index.html;
```

