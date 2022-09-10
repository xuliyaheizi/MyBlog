---
title: SpringBoot中接收参数
date: 2022-09-04
tags:
 - SpringBoot
categories:
 - 文章创作
publish: true
---
## SpringBoot中接收参数的注解

```
@RequestBody
@RequestParam
@PathVariable
```

### 1、使用@RequestBody获取map对象

```js
let params = {
    "name": "zhulin",
    "age": "21",
}
axios.post("/test/test1", params).then(res => {
    console.log(res.data);
})
```

```java
@PostMapping("/test1")
public JsonModel test(@RequestBody Map<String, String> map) {
    return new JsonModel(200, null, map);
}
```

![image-20220904165302698](https://oss.zhulinz.top//img/202209041653380.png)

### 2、使用@RequestBody获取实体对象

```js
let params = {
    "name": "zhulin",
    "age": "21",
}
axios.post("/test/test2", params).then(res => {
    console.log(res.data);
})
```

```java
@PostMapping("/test2")
public JsonModel<People> test(@RequestBody People people) {
    return new JsonModel<People>(200, null, people);
}
```

![image-20220904165944156](https://oss.zhulinz.top//img/202209041659189.png)

### 3、使用@RequestParam获取路径中？后的参数

```java
@PostMapping("/test3")
public JsonModel test(@RequestParam String name) {
    return new JsonModel(200, null, name);
}
```

```js
let name="zhulin";
axios.post("/test/test3?name="+name).then(res => {
    console.log(res.data);
})
```

![image-20220904170339079](https://oss.zhulinz.top//img/202209041703122.png)

### 4、使用@PathVariable接收路径中的参数

```java
@PostMapping("/test3/{name}")
public JsonModel test2(@PathVariable String name) {
    return new JsonModel(200, null, name);
}
```

```js
let name="zhulin";
axios.post("/test/test3/"+name).then(res => {
    console.log(res.data);
})
```

![image-20220904170621297](https://oss.zhulinz.top//img/202209041706329.png)