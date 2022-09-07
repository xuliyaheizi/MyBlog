---
title: MyBatis
date: 2022-09-04
tags:
 - MyBatis
categories:
 - 数据库
publish: true
---

## 一、基础概念

### 1.1、什么是Mybatis？

MyBatis 是一款支持定制化 SQL、存储过程以及高级映射的优秀的持久层框架。MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作。MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

MyBatis 是一个 半自动的ORM（Object Relation Mapping）框架。

### 1.2、什么是ORM？

对象关系映射（Object Relational Mapping，简称ORM）模式是一种为了解决面向对象与关系数据库存在的互不匹配的现象的技术。ORM框架是连接数据库的桥梁，只要提供了持久化类与表的映射关系，ORM框架在运行时就能参照映射文件的信息，把对象持久化到数据库中。

## 二、Mybatis操作

### 2.1、Mybatis增删改查

#### 2.1.1、增

```xml
<!--int insertUser();--> 
<insert id="insertUser"> 
    insert into t_user values(null,'admin','123456',23,'男') 
</insert>
```

#### 2.1.2、删

```xml
<!--int deleteUser();--> 
<delete id="deleteUser"> 
    delete from t_user where id = 7 
</delete>
```

#### 2.1.3、改

```xml
<!--int updateUser();--> 
<update id="updateUser"> 
    update t_user set username='ybc',password='123' where id = 6 
</update>
```

#### 2.1.4、查询一个实体类对象

```xml
<!--User getUserById();--> 
<select id="getUserById" resultType="com.atguigu.mybatis.bean.User"> 
    select * from t_user where id = 2 
</select>
```

#### 2.1.5、查询list集合

```xml
<!--List<User> getUserList();--> 
<select id="getUserList" resultType="com.atguigu.mybatis.bean.User"> 
    select * from t_user 
</select>
```

> 查询的标签 select 必须设置属性 resultType或resultMap，用于设置实体类和数据库表的映射关系
>
> - resultType：自动映射，用于属性名和表中字段名一致的情况
> - resultMap：自定义映射，用于一对多或多对一或字段名和属性名不一致的情况

### 2.2、Mybatis获取参数值的两种方式

获取参数值的两种方式：#{}、${}

- #{}：本质就是`占位符赋值`，使用占位符赋值的方式拼接sql，此时为字符串类型或日期类型的字段进行赋值时，可以自动添加单引号。
- ${}：本质就是`字符串拼接`，使用字符串拼接的方式拼接sql，若为字符串类型或日期类型的字段进行赋值时，需要手动加单引号。

**使用@Param标识参数**

此时，会将这些参数放在map集合中，以@Param注解的value属性值为键，以参数为值；以param1,param2...为键，以参数为值；只需要通过${}和#{}访问map集合的键就可以获取相对应的值，

注意${}需要手动加单引号

### 2.3、特殊SQL的执行

#### 2.3.1、模糊查询

```java
/**
 * 测试模糊查询 
 * @param mohu 
 * @return 
 */ 
List<User> testMohu(@Param("mohu") String mohu);
```

```xml
<!--List<User> testMohu(@Param("mohu") String mohu);--> 
<select id="testMohu" resultType="User"> 
    <!--select * from t_user where username like '%${mohu}%'--> 
    <!--select * from t_user where username like concat('%',#{mohu},'%')--> 
    select * from t_user where username like "%"#{mohu}"%" 
</select>
```

#### 2.3.2、批量删除

```java
/**
 * 批量删除 
 * @param ids 
 * @return 
 */ 
int deleteMore(@Param("ids") String ids);
```

```xml
<!--int deleteMore(@Param("ids") String ids);--> 
<delete id="deleteMore"> 
    delete from t_user where id in (${ids}) 
</delete>
```

#### 2.3.3、动态设置表名

```java
/**
 * 动态设置表名，查询所有的用户信息 
 * @param tableName 
 * @return 
 */ 
List<User> getAllUser(@Param("tableName") String tableName);
```

```xml
<!--List<User> getAllUser(@Param("tableName") String tableName);--> 
<select id="getAllUser" resultType="User"> 
    select * from ${tableName} 
</select>
```

#### 2.3.4、添加功能获取自增的主键

```java
/**
 * 添加用户信息 
 * @param user 
 * @return 
 * useGeneratedKeys：设置使用自增的主键 
 * keyProperty：因为增删改有统一的返回值是受影响的行数，因此只能将获取的自增的主键放在传输的参 数user对象的某个属性中 
 */ 
int insertUser(User user);
```

```xml
<!--int insertUser(User user);--> 
<insert id="insertUser" useGeneratedKeys="true" keyProperty="id"> 
    insert into t_user values(null,#{username},#{password},#{age},#{sex}) 
</insert>
```

### 2.4、自定义映射resultMap

#### 2.4.1、resultMap处理字段和属性的映射关系

> 若字段名和实体类中的属性名不一致，则可以通过resultMap设置自定义映射

```xml
<!--
	resultMap：设置自定义映射 
	属性： 
    id：表示自定义映射的唯一标识 
    type：查询的数据要映射的实体类的类型 
    子标签： 
    id：设置主键的映射关系 
    result：设置普通字段的映射关系
    association：设置多对一的映射关系 
    collection：设置一对多的映射关系 
    属性： 
    property：设置映射关系中实体类中的属性名 
    column：设置映射关系中表中的字段名 
-->
<resultMap id="userMap" type="User"> 
    <id property="id" column="id"></id> 
    <result property="userName" column="user_name"></result> 
    <result property="password" column="password"></result> 
    <result property="age" column="age"></result> 
    <result property="sex" column="sex"></result> 
</resultMap> 
<!--List<User> testMohu(@Param("mohu") String mohu);--> 
<select id="testMohu" resultMap="userMap"> 
    <!--select * from t_user where username like '%${mohu}%'--> 
    select id,user_name,password,age,sex from t_user where user_name like concat('%',#{mohu},'%') 
</select>
```

#### 2.4.2、多对一映射处理

> **1、级联方式处理映射关系**

```xml
<resultMap id="empDeptMap" type="Emp"> 
    <id column="eid" property="eid"></id> 
    <result column="ename" property="ename"></result> 
    <result column="age" property="age"></result> 
    <result column="sex" property="sex"></result> 
    <result column="did" property="dept.did"></result> 
    <result column="dname" property="dept.dname"></result> 
</resultMap> 
<!--Emp getEmpAndDeptByEid(@Param("eid") int eid);--> 
<select id="getEmpAndDeptByEid" resultMap="empDeptMap"> 
    select emp.*,dept.* from t_emp emp left join t_dept dept on emp.did = dept.did where emp.eid = #{eid} 
</select>
```

> **2、使用association处理映射关系**

```xml
<resultMap id="empDeptMap" type="Emp"> 
    <id column="eid" property="eid"></id> 
    <result column="ename" property="ename"></result> 
    <result column="age" property="age"></result> 
    <result column="sex" property="sex"></result> 
    <association property="dept" javaType="Dept"> 
        <id column="did" property="did"></id> 
        <result column="dname" property="dname"></result> 
    </association> 
</resultMap> 
<!--Emp getEmpAndDeptByEid(@Param("eid") int eid);--> 
<select id="getEmpAndDeptByEid" resultMap="empDeptMap"> 
    select emp.*,dept.* from t_emp emp left join t_dept dept on emp.did = dept.did where emp.eid = #{eid} 
</select>
```

> **3、分布查询**

**先查询员工信息**

```java
/**
 * 通过分步查询查询员工信息 
 * @param eid 
 * @return 
 */ 
Emp getEmpByStep(@Param("eid") int eid);
```

```xml
<resultMap id="empDeptStepMap" type="Emp"> 
    <id column="eid" property="eid"></id> 
    <result column="ename" property="ename"></result> 
    <result column="age" property="age"></result> 
    <result column="sex" property="sex"></result> 
    <!--select：设置分步查询，查询某个属性的值的sql的标识（namespace.sqlId） column：将sql以及查询结果中的某个字段设置为分步查询的条件 --> 
    <association property="dept" select="com.atguigu.MyBatis.mapper.DeptMapper.getEmpDeptByStep" column="did"> 
    </association> 
</resultMap> 
<!--Emp getEmpByStep(@Param("eid") int eid);--> 
<select id="getEmpByStep" resultMap="empDeptStepMap"> 
    select * from t_emp where eid = #{eid} 
</select>
```

**根据员工所对应的部门id查询部门信息**

```java
/**
 * 分步查询的第二步： 根据员工所对应的did查询部门信息 
 * @param did 
 * @return 
 */ 
Dept getEmpDeptByStep(@Param("did") int did);
```

```xml
<!--Dept getEmpDeptByStep(@Param("did") int did);--> 
<select id="getEmpDeptByStep" resultType="Dept"> 
    select * from t_dept where did = #{did} 
</select>
```

#### 2.4.3、一对多映射处理

> **1、collection**

```java
/**
 * 根据部门id查新部门以及部门中的员工信息 
 * @param did 
 * @return 
 */ 
Dept getDeptEmpByDid(@Param("did") int did);
```

```xml
<resultMap id="deptEmpMap" type="Dept"> 
    <id property="did" column="did"></id> 
    <result property="dname" column="dname"></result> 
    <!--ofType：设置collection标签所处理的集合属性中存储数据的类型 --> 
    <collection property="emps" ofType="Emp"> 
        <id property="eid" column="eid"></id> 
        <result property="ename" column="ename"></result> 
        <result property="age" column="age"></result> 
        <result property="sex" column="sex"></result> 
    </collection> 
</resultMap> 
<!--Dept getDeptEmpByDid(@Param("did") int did);--> 
<select id="getDeptEmpByDid" resultMap="deptEmpMap"> 
    select dept.*,emp.* from t_dept dept left join t_emp emp on dept.did = emp.did where dept.did = #{did} 
</select>
```

> **2、分步查询**

**先查询部门信息**

```java
/**
 * 分步查询部门和部门中的员工 
 * @param did 
 * @return 
 */ 
Dept getDeptByStep(@Param("did") int did);
```

```xml
<resultMap id="deptEmpStep" type="Dept"> 
    <id property="did" column="did"></id> 
    <result property="dname" column="dname"></result> 
    <collection property="emps" fetchType="eager" select="com.atguigu.MyBatis.mapper.EmpMapper.getEmpListByDid" column="did"> 
    </collection> 
</resultMap> 
<!--Dept getDeptByStep(@Param("did") int did);--> 
<select id="getDeptByStep" resultMap="deptEmpStep"> 
    select * from t_dept where did = #{did} 
</select>
```

**根据部门id查询部门中的所有员工**

```java
/**
 * 根据部门id查询员工信息 
 * @param did 
 * @return 
 */ 
List<Emp> getEmpListByDid(@Param("did") int did);
```

```xml
<!--List<Emp> getEmpListByDid(@Param("did") int did);--> 
<select id="getEmpListByDid" resultType="Emp"> 
    select * from t_emp where did = #{did} 
</select>
```

> 分步查询的优点：可以实现延迟加载
>
> 需要在核心配置文件中设置全局配置信息
>
> lazyLoadingEnabled：延迟加载的全局开关。当开启时，所有关联对象都会延迟加载
>
> aggressiveLazyLoading：当开启时，任何方法的调用都会加载该对象的所有属性。否则，每个属性会按需加载
>
> 此时就可以实现按需加载，获取的数据是什么，就只会执行相应的sql。此时可以通过association和collection中的fetchType属性设置当前的分步查询是否使用延迟加载，fetchType=“lazy（延迟加载）|eager（立即加载）”

## 三、Mybatis的缓存

### 3.1、一级缓存

一级缓存是SqlSession级别的，通过同一个SqlSession查询的数据会被缓存，在下次查询相同的数据，就会从缓存中直接获取，不会从数据库中访问。

**使一级缓存失效的四种情况：**

- 不同的SqlSession对应不同的一级缓存
- 同一个SqlSession但是查询条件不同
- 同一个SqlSession两次查询期间执行了任何一次增删改操作
- 同一个SqlSession两次查询期间手动清空了缓存

### 3.2、二级缓存

二级缓存是SqlSessionFactory级别，通过同一个SqlSessionFactory创建的SqlSession查询的结果会被缓存；此后若再执行相同的查询语句，结果就会从缓存中获取。

**二级缓存开启的条件：**

- 在核心配置文件中，设置全局配置属性 cacheEnabled=“true”，默认为 true，不需要配置
- 在映射文件中设置标签<cache/>
- 二级缓存必须在SqlSession关闭或提交之后有效
- 查询的数据所转换的实体类类型必须实现序列化的接口

**使二级缓存失效的情况：**

两次查询之间执行了任意的增删改，会使一级和二级缓存同时失效。

### 3.3、二级缓存的相关配置

在mapper配置文件中添加的cache标签可以设置一些属性

1. eviction属性：缓存回收策略，默认是LRU

   - LRU（Least Recently Used） – 最近最少使用的：移除最长时间不被使用的对象。
   - FIFO（First in First out） – 先进先出：按对象进入缓存的顺序来移除它们。
   - SOFT – 软引用：移除基于垃圾回收器状态和软引用规则的对象。
   - WEAK – 弱引用：更积极地移除基于垃圾收集器状态和弱引用规则的对象。

2. flushInterval属性：刷新间隔，单位毫秒

   默认情况是不设置，也就是没有刷新间隔，缓存仅仅调用语句时刷新

3. size属性：引用数目，正整数

   代表缓存最多可以存储多少个对象，太大容易导致内存溢出

4. readOnly属性：只读， true/false

   - true：只读缓存；会给所有调用者返回缓存对象的相同实例。因此这些对象不能被修改。这提供了很重要的性能优势。
   - false：读写缓存；会返回缓存对象的拷贝（通过序列化）。这会慢一些，但是安全，因此默认是false。

### 3.4、缓存查询的顺序

先查询二级缓存，因为二级缓存中可能会有其他程序已经查出来的数据，可以拿来直接使用。如果二级缓存没有命中，再查询一级缓存。如果一级缓存没有命中，则查询数据库。SqlSession关闭之后，一级缓存中的数据会写入二级缓存。

### 3.5、缓存的应用场景与局限性

> **1、应用场景**

**对查询频率高、变化频率低的数据建议使用二级缓存**

对于访问多的查询请求且用户对查询结果实时性要求不高，此时可采用mybatis二级缓存技术降低数据库访问量，提高访问速度。

**业务场景比如：**

- 耗时较高的统计sql
- 电话账单查询sql等

实现方法如下：**通过设置刷新间隔时间，由mybatis每隔一段时间自动清空缓存，根据数据变化频率设置缓存刷新间隔flushInterval**，⽐如设置为30分钟、60分钟、24⼩时等，根据需求⽽定。

> **2、局限性**

mybatis二级缓存对细粒度的数据级别的缓存实现不好，比如如下需求：对商品信息进行缓存，由于商品信息查询访问量大，但是要求用户每次都能查询最新的商品信息，此时如果使用mybatis的二级缓存就无法实现当一个商品变化时只刷新该商品的缓存信息而不刷新其他商品的信息，**因为mybatis的二级缓存区域是以mapper为单位划分，当一个商品信息变化会将所有商品信息的缓存数据全部清空。**解决此类问题需要在业务层根据需求对数据有针对性缓存。

## 四、Mybatis的逆向工程

- 正向工程：先创建Java实体类，由框架负责根据实体类生成数据库表。Hibernate是支持正向工程的。
- 逆向工程：先创建数据库表，由框架负责根据数据库表，反向生成如下资源：Java实体类、Mapper接口、Mapper映射文件

### 4.1、创建逆向工程的步骤

**添加依赖和插件**

```xml
<!-- 依赖MyBatis核心包 -->
<dependencies> 
    <dependency> 
        <groupId>org.mybatis</groupId> 
        <artifactId>mybatis</artifactId> 
        <version>3.5.7</version> 
    </dependency> 
    <!-- junit测试 --> 
    <dependency> 
        <groupId>junit</groupId> 
        <artifactId>junit</artifactId> 
        <version>4.12</version> 
        <scope>test</scope> 
    </dependency> 
    <!-- log4j日志 --> 
    <dependency> 
        <groupId>log4j</groupId> 
        <artifactId>log4j</artifactId> 
        <version>1.2.17</version> 
    </dependency> 
    <dependency> 
        <groupId>mysql</groupId> 
        <artifactId>mysql-connector-java</artifactId> 
        <version>8.0.16</version> 
    </dependency> 
</dependencies> 

<!-- 控制Maven在构建过程中相关配置 --> 
<build> 
    <!-- 构建过程中用到的插件 --> 
    <plugins> 
        <!-- 具体插件，逆向工程的操作是以构建过程中插件形式出现的 --> 
        <plugin> 
            <groupId>org.mybatis.generator</groupId> 
            <artifactId>mybatis-generator-maven-plugin</artifactId> 
            <version>1.3.0</version> 
            
            <!-- 插件的依赖 --> 
            <dependencies> 
                <!-- 逆向工程的核心依赖 --> 
                <dependency> 
                    <groupId>org.mybatis.generator</groupId> 
                    <artifactId>mybatis-generator-core</artifactId> 
                    <version>1.3.2</version> 
                </dependency> 
                
                <!-- MySQL驱动 --> 
                <dependency> 
                    <groupId>mysql</groupId> 
                    <artifactId>mysql-connector-java</artifactId> 
                    <version>8.0.16</version> 
                </dependency> 
            </dependencies> 
        </plugin> 
    </plugins>
</build>
```

**创建Mybatis的核心配置文件**

**创建逆向工程的配置文件**

> 文件名必须是：generatorConfig.xml

```xml
<?xml version="1.0" encoding="UTF-8"?> 
<!DOCTYPE generatorConfiguration PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN" "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd"> 
<generatorConfiguration> 
    <!-- 
		targetRuntime: 执行生成的逆向工程的版本 
			MyBatis3Simple: 生成基本的CRUD（清新简洁版） 
			MyBatis3: 生成带条件的CRUD（奢华尊享版） 
	--> 
    <context id="DB2Tables" targetRuntime="MyBatis3"> 
        <!-- 数据库的连接信息 --> 
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver" connectionURL="jdbc:mysql://localhost:3306/mybatis?serverTimezone=UTC" userId="root" password="123456"> 
        </jdbcConnection> 
        <!-- javaBean的生成策略--> 
        <javaModelGenerator targetPackage="com.atguigu.mybatis.pojo" targetProject=".\src\main\java"> 
            <property name="enableSubPackages" value="true" /> 
            <property name="trimStrings" value="true" /> 
        </javaModelGenerator> 
        <!-- SQL映射文件的生成策略 --> 
        <sqlMapGenerator targetPackage="com.atguigu.mybatis.mapper" targetProject=".\src\main\resources"> 
            <property name="enableSubPackages" value="true" /> 
        </sqlMapGenerator> 
        <!-- Mapper接口的生成策略 --> 
        <javaClientGenerator type="XMLMAPPER" targetPackage="com.atguigu.mybatis.mapper" targetProject=".\src\main\java"> 
            <property name="enableSubPackages" value="true" /> 
        </javaClientGenerator> 
        <!-- 逆向分析的表 --> 
        <!-- tableName设置为*号，可以对应所有表，此时不写domainObjectName --> 
        <!-- domainObjectName属性指定生成出来的实体类的类名 --> 
        <table tableName="t_emp" domainObjectName="Emp"/> 
        <table tableName="t_dept" domainObjectName="Dept"/> 
    </context> 
</generatorConfiguration>
```

**执行MBG插件的generate目标**

![image-20220821164850600](https://knowledgeimagebed.oss-cn-hangzhou.aliyuncs.com/img/202208211648404.png)

### 4.2、QBC查询

```java
@Test public void testMBG(){ 
    try {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml"); 
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is); 
        SqlSession sqlSession = sqlSessionFactory.openSession(true); 
        EmpMapper mapper = sqlSession.getMapper(EmpMapper.class); 
        //查询所有数据 
        /*List<Emp> list = mapper.selectByExample(null); 
        list.forEach(emp -> System.out.println(emp));
        */ 
        //根据条件查询 
        /*EmpExample example = new EmpExample();
        example.createCriteria().andEmpNameEqualTo("张 三").andAgeGreaterThanOrEqualTo(20); 
        example.or().andDidIsNotNull(); List<Emp> list = mapper.selectByExample(example); 
        list.forEach(emp -> System.out.println(emp));
        */ 
        mapper.updateByPrimaryKeySelective(new Emp(1,"admin",22,null,"456@qq.com",3)); 
    } catch (IOException e) { 
        e.printStackTrace(); 
    } 
}
```

## 五、分页插件





## 参考文章

- [Mybtais八股文](/6-八股文/8、Mybatis八股文)
