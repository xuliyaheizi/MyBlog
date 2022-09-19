---
title: MyBatis八股文
date: 2022-08-20
---
## 1、Mybatis的优缺点

> **优点**

1. 小巧，学习成本低，会写sql上手就很快了
2. jdbc基本上配置好了，大部分的工作量就专注在sql的部分
3. 方便维护管理，sql不需要在Java代码中找，sql代码可以分离出来，重用
4. 接近jdbc，灵活，支持动态sql
5. 支持对象与数据库orm字段关系映射

> **缺点**

- 由于工作量在sql上，需要sql的熟练度高。
- 移植性差。sql语法依赖数据库。不同数据库的切换会因语法差异。

## 2、Hibernate的优缺点？

> **优点**

Hibernate建立在POJO和数据库表模型的直接映射关系上。通过xml或注解即可和数据库表做映射。通过pojo直接可以操作数据库的数据。它提供的是全表的映射模型。

- 消除代码映射规则，被分离到xml或注解里配置
- 无需在管理数据库连接，配置在xml中即可
- 一个会话中，不要操作多个对象，只要操作session对象即可
- 关闭资源只需关闭session即可

> **缺点**

- 全表映射带来的不便，比如更新需要发送所有的字段
- 无法根据不同的条件来组装不同的sql
- 对多表关联和复杂的sql查询支持较差，需要自己写sql，返回后，需要自己将数据组成pojo
- 不能有效支持存储过程
- 虽然有hql，但是性能较差，大型互联网需要优化sql，而hibernate做不到

## 3、Mybatis的核心组件有哪些？分别是？

- SqlSessionFactoryBuilder（构造器）：会根据配置信息或者代码来生成SqlSessionFactory。
- SqlSessionFactory（工厂接口）：依靠工厂来生成SqlSession
- SqlSession（会话）：是一个既可以发送sql去执行返回结果，也可以获取Mapper接口
- SqlMapper：它是新设计的组件，是由一个Java接口和XML文件（或注解）构成的。需要给出对象的SQL和映射规则。负责发送SQL去执行，并返回结果。

## 4、#{}和${}的区别是什么？

${}是字符串替换，#{}是预编译处理。一般用#{}防止Sql注入问题。

- #{}解析传递进来的参数数据
- ${}对传递进来的参数原样拼接在SQL中
- 使用#{}可以有效的防止SQL注入，提高系统安全性

**#{}匹配的是一个占位符，相当于JDBC中一个？，会对一些敏感字符进行过滤，编译过后会对传递的值加上双引号。**

**${}匹配的是真实传递的值，传递过后，会与SQL语句进行字符串进行拼接。**

## 5、Mybatis中九个动态标签

1. if
2. choose（when、oterwise）
3. trim（where、set）
4. foreach
5. bind

## 6、xml映射文件中，有哪些标签？

select|insert|update|delete|resultMap|parameterMap|sql|include|selectKey加上9个动态标签，其中为sql片段标签，通过标签引入sql片段，为不支持自增的主键生成策略标签。

## 7、Mybatis支持注解吗？

支持。注解对于需求简单sql逻辑简单的系统，效率较高。

但是，当sql变化需要重新编译代码，sql复杂时，写起来更不方便，不好维护

## 8、Mybatis动态sql？

Mybatis动态sql可以让我们在Xml映射文件内，以标签的形式编写动态sql，完成逻辑判断和动态拼接sql的功能。

## 9、Mybatis是如何进行分页的？分页插件的原理是什么？

1. Mybatis使用RowBounds对象进行分页，也可以直接编写sql实现分页，也可以使用Mybatis的分页插件
2. 分页插件的原理：实现Mybatis提供的接口，实现自定义插件，在插件的拦截方法内拦截待执行的sql，然后重写sql。

## 10、如何获取自增主键？

注解

```java
@Options(useGeneratedKeys=true,keyProperty="id")
int insert();
```

XML

```xml
<insert id="insert" useGeneratedKeys="true" keyProperty="id">
 sql
</insert>
```

## 11、为什么Mapper接口没有实现类，却能被正常调用？

因为Mybatis在Mapper接口上使用了动态代理

## 12、用注解好还是xml好？

简单的增删改查可以用注解

复杂的sql还是用xml，官方也比较推荐xml方式

xml的方式更便于统一维护管理代码

## 13、Mybatis的Xml映射⽂件中，不同的Xml映射⽂件，id是否可以重复？

如果配置了namespace，那么当然是可以重复的，因为我们的Statement实际上就是`namespace+id`。如果没有配置namespace的话，那么相同的id就会导致覆盖了。

## 14、为什么说Mybatis是半自动ORM映射工具？与全自动的区别在哪里？

- Hibernate是属于全自动ORM映射工具，使用Hibernate查询关联对象或者关联集合对象时，可以根据对象关系模型直接获取，所以是全自动的。
- 而Mybatis在查询关联对象或关联集合对象时，需要手动编写sql来完成，所以称之为半自动ORM映射工具

## 15、通常一个XML映射文件，都会写一个Dao接口与之对应，那这个Dao接口的工作原理是什么？Dao接口里的方法，参数不同时，方法能重载吗？

- Dao接口，也就是Mapper接口，接口的全限名，就是映射文件中的namespace的值，接口的方法名，就是映射文件中MappedStatement的id值，接口方法内的参数，就是传递给sql的参数。
- Mapper接口是没有实现类的，当调用接口方法时，接口全限名+方法名拼接字符串作为key值，可唯一定位一个MappedStatement。

> com.mybatis3.mappers.StudentDao.findStudentById，
>
> 可以唯⼀找到namespace为com.mybatis3.mappers.StudentDao下⾯id = findStudentById的MappedStatement。在Mybatis中，每⼀个<select>、<insert>、<update>、<delete>标签，都会被解析为⼀个MappedStatement对象。

Dao接口里的方法，**是不能重载的，因为是全限名+方法名的保存和寻找策略**

**Dao接口的工作原理是JDK动态代理，Mybatis运行时会使用JDK动态代理为Dao接口生成代理proxy对象，代理对象proxy会拦截接口方法，转而执行MappedStatement所代表的sql，然后将sql执行结果返回。**

## 16、Mybatis是否支持延迟加载？如果支持，它的实现原理是什么？

Mybatis仅⽀持`association关联对象`和`collection关联集合对象`的延迟加载，**association指的就是⼀对⼀**，**collection指的就是⼀对多查询**。在Mybatis配置⽂件中，可以配置是否启⽤延迟加载`lazyLoadingEnabled=true|false`。

它的原理是，**使⽤CGLIB创建⽬标对象的代理对象**，当调⽤⽬标⽅法时，进⼊拦截器⽅法，⽐如调⽤a.getB().getName()，拦截器invoke()⽅法发现a.getB()是null值，那么就会单独发送事先保存好的查询关联B对象的sql，把B查询上来，然后调⽤a.setB(b)，于是a的对象b属性就有值了，接着完成a.getB().getName()⽅法的调⽤。这就是延迟加载的基本原理。当然了，不光是Mybatis，⼏乎所有的包括Hibernate，⽀持延迟加载的原理都是⼀样的。

## 17、Mybatis都有哪些Executor执行器？之间的区别是什么？

Mybatis有三种基本的Executor执⾏器，SimpleExecutor、ReuseExecutor、BatchExecutor。

- SimpleExecutor：每执⾏⼀次update或select，就开启⼀个Statement对象，⽤完⽴刻关闭Statement对象。
- ReuseExecutor：执⾏update或select，以sql作为key查找Statement对象，存在就使⽤，不存在就创建，⽤完后，不关闭Statement对象，⽽是放置于Map<String, Statement>内，供下⼀次使⽤。简⾔之，就是重复使⽤Statement对象。
- BatchExecutor：执⾏update（没有select，JDBC批处理不⽀持select），将所有sql都添加到批处理中（addBatch()），等待统⼀执⾏（executeBatch()），它缓存了多个Statement对象，每个Statement对象都是addBatch()完毕后，等待逐⼀执⾏executeBatch()批处理。与JDBC批处理相同。

作⽤范围：Executor的这些特点，都严格限制在SqlSession⽣命周期范围内。