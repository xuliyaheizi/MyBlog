---
title: 利用反射原理解决冗长的if esle代码
date: 2022-09-04
description: 在需求中需要获取对象的单个属性的值。暴力的解法一般是拿要获取属性值的属性名去与对象的属性名一一比较，相等的话就调用该属性的get方法来获取值。但是如果一个对象的属性十分多，那么一一比较的话就会有很长else if语句。使代码十分不雅观。
tags:
 - 反射
categories:
 - 工作
publish: true
---
:::tip
在需求中需要获取对象的单个属性的值。暴力的解法一般是拿要获取属性值的属性名去与对象的属性名一一比较，相等的话就调用该属性的get方法来获取值。

但是如果一个对象的属性十分多，那么一一比较的话就会有很长else if语句。使代码十分不雅观。
:::
<!-- more -->

## 反射

允许运行中的 Java 程序对自身进行检查。被[private](https://so.csdn.net/so/search?q=private&spm=1001.2101.3001.7020)封装的资源只能类内部访问，外部是不行的，但反射能直接操作类私有属性。反射可以在运行时获取一个类的所有信息，（包括成员变量，成员方法，构造器等），并且可以操纵类的字段、方法、构造器等部分。

因此通过反射我们可以依据属性名来获取对象的方法并调用

### 1、获取类对应的字节码对象

1. 调用某个类的对象的getClass()方法。即：对象.getClass()

   ```java
   People people=new People();
   Class<? extends People> aClass = people.getClass();
   System.out.println(aClass);
   ```

   **注意**：此处使用的是Object类中的getClass()方法，因为所有类都继承Object类，所以调用Object类中的getClass()方法来获取。

2. 调用类的class属性类获取该类对应的Class对象。即：类名.class

   ```java
   Class<People> peopleClass = People.class;
   System.out.println(peopleClass);
   ```

3. 使用Class类中的forName()静态方法（最安全，性能最好）。即：Class.forName(“类的全路径”)

   ```java
   Class<?> bClass = Class.forName("com.zhulin.bean.People");
   System.out.println(bClass);
   ```

### 2、获取成员变量

获取类的字段有两种方式：`getFields()`和`getDeclaredFields()`

- getFields()：获取某个类的所有公共(public)的字段，包括父类中的字段
- getDeclaredFields()：获取某个类的所有声明的字段，即包括public、private和protected，但是不包括父类的声明字段

```java
People people=new People();
Field[] fields = people.getClass().getDeclaredFields();
for (Field field : fields) {
    System.out.print(field.getName()+"     ");
    System.out.println(field.getType());
}

//name     class java.lang.String
//age     class java.lang.String
```

### 3、通过属性名调用get方法

```java
People people=new People();
people.setAge("21");
people.setName("zhulin");
String filedName="name";
Field field = people.getClass().getDeclaredField(filedName);
//打破封装
field.setAccessible(true);
System.out.println(field.get(people)); //zhulin
```

