---
title: Java中的SPI机制学习 
description: SPI（Service ProviderInterface），是JDK内置的一种服务提供发现机制，可以用来启用框架扩展和替换组件，主要是被框架的开发人员使用，比如java.sql.Driver接口，其他不同厂商可以针对同一接口做出不同的实现，MySQL和PostgreSQL都有不同的实现提供给用户，而Java的SPI机制可以为某个接口寻找服务实现。Java中SPI机制主要思想是将装配的控制权移到程序之外，在模块化设计中这个机制尤其重要，其核心思想就是解耦。
date: 2022-09-15 
tags:
 - SPI 
categories:
 - Java 
publish: true
---

## 一、概念

### 1、什么是SPI？

SPI(Service Provider Interface)服务提供发现接口，是JDK内置的一种服务提供发现机制，一直**“基于接口的编程+策略模式+配置文件”**组合实现的动态加载机制。

在面向对象的设计里，模块之间一般基于接口编程，且不对实现类进行硬编码。因为一旦代码里涉及了具体的实现类，就违反了可拔插的原则，如果需要替换一种实现，就需要修改代码。为了实现在模块装配的时候不在程序里动态表明，就需要一种服务发现机制。Java中SPI就是这样一个机制，为某个接口寻找服务实现的机制。主要的核心思想是**解耦、增加可扩展性**。

### 2、可以用来做什么？

SPI可以用来启用框架扩展和替换组件，主要被框架的开发人员使用。Java中就预留了`java.sql.Driver`接口，不同的数据库厂商都可以根据这一接口做出不同的实现。还有其他，日志门面接口实现类加载（SLF4J加载不同提供商的日志实现类）、Spring中也大量使用了SPI,比如：对servlet3.0规范对ServletContainerInitializer的实现、自动类型转换Type Conversion SPI(Converter SPI、Formatter SPI)等。

### 3、SPI和API的比较

- API在大多数情况下，都是实现方制定接口并完成对接口的实现，调用方仅仅依赖接口调用，且无权选择不同实现。从使用人员上来说，API直接被应用开发人员使用。组织上位于实现方所在的包中，实现和接口在一个包中。
- SPI是调用方来制定接口规范，提供给外部来实现，调用方在调用时则选择自己需要的外部实现。从使用人员上来说，SPI被框架扩展人员使用。组织上位于调用方所在的包中，实现位于独立的包中。

![image-20220915231238479](https://oss.zhulinz.top/newImage/202209152312533.png)

### 4、SPI的缺点

ServiceLoader使用的延迟加载，但是只能通过遍历全部获取，将接口的实现类全部加载并实例一遍。造成了资源浪费，不想使用某个实现类时，该类也会被加载并实例。获取某个实现类的方式不够灵活，只能通过Iterator形式获取，不能根据某个参数来获取对应的实现类。

多个并发多线程使用ServiceLoader类的实例是不安全的。

## 二、Java中SPI的原理

当服务的提供者提供了一种接口的实现之后，需要在classpath下的META-INF/services/目录里创建一个以服务接口命名的文件，这个文件里的内容就是这个接口的具体的实现类。当其他的程序需要这个服务的时候，就可以通过查找这个jar包（一般都是以jar包做依赖）的META-INF/services/中的配置文件，配置文件中有接口的具体实现类名，可以根据这个类名进行加载实例化，就可以使用该服务了。JDK中查找服务的实现的工具类是：`java.util.ServiceLoader`。

### 例子

> 1、先定义一个接口 interface

```java
public interface Search {
    public List<String> searchDoc(String keyWord);
}
```

> 2、接口的实现类

```java
public class FileSearch implements Search {
    @Override
    public List<String> searchDoc(String keyWord) {
        System.out.println("文件搜索" + keyWord);
        return null;
    }
}
```

```java
public class DataSearch implements Search {
    @Override
    public List<String> searchDoc(String keyWord) {
        System.out.println("数据库搜索" + keyWord);
        return null;
    }
}
```

> 3、在resources下新建META-INF/services/目录，新建接口的全限定名的文件

![image-20220915224945707](https://oss.zhulinz.top/newImage/202209152250910.png)

```
com.zhulin.service.impl.DataSearch
com.zhulin.service.impl.FileSearch
```

> 4、测试

```java
public static void main(String[] args) {
    ServiceLoader<Search> load = ServiceLoader.load(Search.class);
    Iterator<Search> iterator = load.iterator();
    while (iterator.hasNext()) {
        Search next = iterator.next();
        next.searchDoc("hello world");
    }
}

//输出
数据库搜索hello world
文件搜索hello world
```

SPI的机制是由于`ServiceLoader.load(Search.class)`在加载某接口时，会去`META-INF/services`下找接口的全限定名文件，再根据里面的内容加载相应的实现类（遍历的方式去加载并实例每个实现类）。、

### SPI机制实现原理





## 参考文章

- [Java常用机制 - SPI机制详解](https://www.pdai.tech/md/java/advanced/java-advanced-spi.html)