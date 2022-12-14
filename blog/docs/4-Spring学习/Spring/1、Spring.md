---
title: Spring框架
date: 2022-08-13
description: Spring 是个java企业级应用的开源开发框架。Spring主要用来开发Java应用，但是有些扩展是针对构建J2EE平台的web应用。Spring 框架目标是简化Java企业级应用开发，并通过POJO为基础的编程模型促进良好的编程习惯。
tags:
 - Spring
categories:
 - Spring
publish: true
---

## 一、概念与基础

### 1.1、什么是Spring？

Spring 是个java企业级应用的开源开发框架。Spring主要用来开发Java应用，但是有些扩展是针对构建J2EE平台的web应用。Spring 框架目标是简化Java企业级应用开发，并通过POJO为基础的编程模型促进良好的编程习惯。

Spring是一个**轻量的IOC和AOP容器框架**。是为Java应用程序提供基础性服务的一套框架，目的用于简化企业应用程序的开发，它使得开发者只需要关心业务需求。常见的配置方式有三种：`基于XML的配置`、`基于注解的配置`、`基于Java的配置`。

主要模块有：

- Spring Core：核心类库，提供IOC服务；
- Spring Context：提供框架式的Bean访问方式，以及企业级功能（JNDI、定时任务等）；
- Spring AOP：AOP服务；
- Spring DAO：对JDBC的抽象，简化了数据访问异常的处理；
- Spring ORM：对现有的ORM框架的支持；
- Spring Web：提供了基本的面向Web的综合特性，例如多方文件上传；
- Spring MVC：提供面向Web应用的Model-View-Controller实现。

### 1.2、为什么用Spring？

- `轻量：`Spring是轻量的，基本的版本大约2MB。
- `非侵入式：`基于Spring开发的应用中的对象可以不依赖于Spring的API。
- `控制反转（IOC）：`Spring通过控制反转实现了基本耦合，对象们给出它们的依赖，而不是创建或查找依赖的对象们。
- `依赖注入（DI）：`指依赖的对象不需要手动调用`setXX`方法去设置，而是通过配置赋值。
- `面向切面的编程（AOP）：`Spring支持面向切面的编程，并且把应用业务逻辑和系统服务分开。
- `容器：`Spring包含并管理应用中对象的生命周期和配置。
- `MVC框架：`Spring的WEB框架是个精心设计的框架，是WEB框架的一个很好的替代品。
- `事务管理：`Spring提供一个持续的事务管理接口，可用扩展到上至本地事务下至全局事务（JTA）。
- `异常处理：`Spring提供方便的API把具体技术相关的异常（比如由JDBC，Hibernate or JDO抛出的）转化为一致的unchecked异常。

### 1.3、Spring的组件

![image-20220801222625301](https://oss.zhulinz.top//img/202208012226453.png)

上图中包含了 Spring 框架的所有模块，这些模块可以满足一切企业级应用开发的需求，在开发过程中可以根据需求有选择性地使用所需要的模块。下面分别对这些模块的作用进行简单介绍（并且结合SpringFramework5.x源码模块帮助你对应好各模块关系）。

> #### 1、Core Container（Spring的核心容器）

Spring的核心容器是其他模块建立的基础，由Beans模块、Core核心模块、Context上下文模块和 SpEL 表达式语言模块组成，没有这些核心容器，也不可能有AOP、Web等上层的功能。

- **Beans模块：**提供了框架的基础部分，包括`控制反转`和`依赖注入`。
- **Core核心模块：**封装了 Spring 框架的底层部分，包括`资源访问`、`类型转换`及一些`常用工具类`。
- **Context上下文模块：**建立在 Core 和 Beans 模块的基础之上，集成 Beans 模块功能并添加`资源绑定`、`数据验证`、`国际化`、`Java EE支持`、`容器生命周期`、`事件传播`等。ApplicationContext 接口是上下文模块的焦点。
- **SpEL模块：**提供强大的表达式语言支持，支持访问和修改属性值，方法调用，支持访问及修改数组、容器和索引器，命名变量，支持算数和逻辑运算，支持从 Spring 容器获取Bean，也支持列表投影、选择和一般的列表聚合等。

> #### 2、Data Access/Integration（数据访问/集成）

- **JDBC模块：**提供了一个JDBC的样例模块，使用这些模块能消除传统冗长的JDBC编码还有必须的事务控制，而且能享受到 Spring 管理事务的好处。
- **ORM模块：**提供了与流行的”对象-关系“映射框架无缝集成的 API，包括 JPA、JDO、Hibernate 和 MyBatis等。而且还可以使用 Spring 事务管理，无需额外控制事务。
- **OXM模块：**提供了一个支持 Object/XML 映射的抽象层实现，如 JAXB、Castor、XMLBeans、JiBX和 XStream。将 Java 对象映射成 XML数据，或者将 XML 数据映射成 Java 对象。
- **JMS模块：**指Java消息服务，提供一套”消息生产者、消息消费者“模板用于更加简单的使用 JMS，JMS用于在两个应用程序之间，或分布式系统中发送消息，进行异步通信等。
- **Transactions 事务模块**：支持编程和声明式事务管理。

> #### 3、Web模块

- **Web 模块**：提供了基本的 Web 开发集成特性，例如多文件上传功能、使用的 Servlet 监听器的 IOC 容器初始化以及 Web 应用上下文。
- **Servlet 模块**：提供了一个 Spring MVC Web 框架实现。Spring MVC 框架提供了基于注解的请求资源注入、更简单的数据绑定、数据验证等及一套非常易用的 JSP 标签，完全无缝与 Spring 其他技术协作。
- **WebSocket 模块**：提供了简单的接口，用户只要实现响应的接口就可以快速的搭建 WebSocket Server，从而实现双向通讯。
- **Webflux 模块**： Spring WebFlux 是 Spring Framework 5.x中引入的新的响应式web框架。与Spring MVC不同，它不需要Servlet API，是完全异步且非阻塞的，并且通过Reactor项目实现了Reactive Streams规范。Spring WebFlux 用于创建基于事件循环执行模型的完全异步且非阻塞的应用程序。

> #### 4、AOP、Aspects、Instrumentation和Messaging

- **AOP 模块**：提供了面向切面编程实现，提供比如日志记录、权限控制、性能统计等通用功能和业务逻辑分离的技术，并且能动态的把这些功能添加到需要的代码中，这样各司其职，降低业务逻辑和通用功能的耦合。
- **Aspects 模块**：提供与 AspectJ 的集成，是一个功能强大且成熟的面向切面编程（AOP）框架。
- **Instrumentation 模块**：提供了类工具的支持和类加载器的实现，可以在特定的应用服务器中使用。
- **messaging 模块**：Spring 4.0 以后新增了消息（Spring-messaging）模块，该模块提供了对消息传递体系结构和协议的支持。
- **jcl 模块**： Spring 5.x中新增了日志框架集成的模块。

### 1.4、Spring常用注解

![Spring注解](https://oss.zhulinz.top//img/202208222109284.png)

**Web**:

- @Controller：组合注解（组合了@Component注解），应用在MVC层（控制层）。
- @RestController：该注解为一个组合注解，相当于@Controller和@ResponseBody的组合，注解在类上，意味着，该Controller的所有方法都默认加上了@ResponseBody。
- @RequestMapping：用于映射Web请求，包括访问路径和参数。如果是Restful风格接口，还可以根据请求类型使用不同的注解：
  - @GetMapping
  - @PostMapping
  - @PutMapping
  - @DeleteMapping
- @ResponseBody：支持将返回值放在response内，而不是一个页面，通常用户返回json数据。
- @RequestBody：允许request的参数在request体中，而不是在直接连接在地址后面。
- @PathVariable：用于接收路径参数，比如@RequestMapping(“/hello/{name}”)申明的路径，将注解放在参数中前，即可获取该值，通常作为Restful的接口实现方法。
- @RestController：该注解为一个组合注解，相当于@Controller和@ResponseBody的组合，注解在类上，意味着，该Controller的所有方法都默认加上了@ResponseBody。

**容器**:

- @Component：表示一个带注释的类是一个“组件”，成为Spring管理的Bean。当使用基于注解的配置和类路径扫描时，这些类被视为自动检测的候选对象。同时@Component还是一个元注解。
- @Service：组合注解（组合了@Component注解），应用在service层（业务逻辑层）。
- @Repository：组合注解（组合了@Component注解），应用在dao层（数据访问层）。
- @Autowired：Spring提供的工具（由Spring的依赖注入工具（BeanPostProcessor、BeanFactoryPostProcessor）自动注入）。
- @Qualifier：该注解通常跟 @Autowired 一起使用，当想对注入的过程做更多的控制，@Qualifier 可帮助配置，比如两个以上相同类型的 Bean 时 Spring 无法抉择，用到此注解
- @Configuration：声明当前类是一个配置类（相当于一个Spring配置的xml文件）
- @Value：可用在字段，构造器参数跟方法参数，指定一个默认值，支持 #{} 跟 ${} 两个方式。一般将 SpringbBoot 中的 application.properties 配置的属性值赋值给变量。
- @Bean：注解在方法上，声明当前方法的返回值为一个Bean。返回的Bean对应的类中可以定义init()方法和destroy()方法，然后在@Bean(initMethod=”init”,destroyMethod=”destroy”)定义，在构造之后执行init，在销毁之前执行destroy。
- @Scope:定义我们采用什么模式去创建Bean（方法上，得有@Bean） 其设置类型包括：Singleton 、Prototype、Request 、 Session、GlobalSession。

**AOP**:

- @Aspect:声明一个切面（类上） 使用@After、@Before、@Around定义建言（advice），可直接将拦截规则（切点）作为参数。
  - `@After` ：在方法执行之后执行（方法上）。
  - `@Before`： 在方法执行之前执行（方法上）。
  - `@Around`： 在方法执行之前与之后执行（方法上）。
  - `@PointCut`： 声明切点 在java配置类中使用@EnableAspectJAutoProxy注解开启Spring对AspectJ代理的支持（类上）。

**事务：**

- @Transactional：在要开启事务的方法上使用@Transactional注解，即可声明式开启事务。

### 1.5、Spring中的设计模式

![Spring中设计模式](https://oss.zhulinz.top//img/202208222112931.png)

1. **工厂模式** : Spring 容器本质是一个大工厂，使用工厂模式通过 BeanFactory、ApplicationContext 创建 bean 对象。
2. **代理模式** : Spring AOP 功能就是通过代理模式来实现的，分为动态代理和静态代理。
3. **单例模式** : Spring 中的 Bean 默认都是单例的，这样有利于容器对Bean的管理。
4. **模板模式** : Spring 中 JdbcTemplate、RestTemplate 等以 Template结尾的对数据库、网络等等进行操作的模板类，就使用到了模板模式。
5. **观察者模式**: Spring 事件驱动模型就是观察者模式很经典的一个应用。
6. **适配器模式** :Spring AOP 的增强或通知 (Advice) 使用到了适配器模式、Spring MVC 中也是用到了适配器模式适配 Controller。
7. **策略模式**：Spring中有一个Resource接口，它的不同实现类，会根据不同的策略去访问资源。

## 二、控制反转（IOC）

### 2.1、什么IOC？

Ioc-Inversion of Control，即“控制反转”，**不是什么技术，而是一种设计思想**。在开发中，IOC意味着将你设计好的对象交给容器控制，而不是传统的在你的对象内部直接控制。

> #### 1、谁控制谁，控制什么？

传统Java SE程序程序设计，是直接在对象内部通过new进行创建对象，是程序主动去创建依赖对象；而IOC是有专门一个容器来创建这些对象，即由IOC容器来控制对象的创建；

**谁控制谁？：**IoC容器控制了对象。

**控制什么？：**主要控制了外部资源获取（不只是对象包括文件等）。

> #### 2、为何是反转，哪些方面反转了？

有反转就有正转，传统应用程序是由我们自己在对象中主动控制去直接获取依赖对象，也就是正转；而反转则是由容器来帮忙创建及注入依赖对象；

**为何是反转？：**是由容器帮我们查找及注入依赖对象，对象只是被动的接受依赖对象，所以是反转。

**哪些方面反转了？：**依赖对象的获取被反转了。

> #### 3、图例说明

传统程序设计下，都是主动去创建相关对象然后再组合起来。

![image-20220802115622536](https://oss.zhulinz.top//img/202208021156575.png)

当有了IOC/DI的容器后，在客户端类中不再主动去创建这些对象了。

![image-20220802115706887](https://oss.zhulinz.top//img/202208021157349.png)

### 2.2、IoC能做什么？

传统应用程序都是由我们在类内部主动创建依赖对象，从而导致类与类之间耦合，难于测试；有了IoC容器后，**把创建和查找依赖对象的控制权交给了容器，由容器进行注入组合对象，所以对象与对象之间是松耦合，这样也便于测试，利于功能复用，更重要的是使得程序的整个体系结构变得非常灵活**。

其实 IoC 对编程带来的最大改变不是从代码上，而是从思想上，发生了“主从换位”的变化。应用程序原本是老大，要获取什么资源都是主动出击，但是在IoC/DI思想中，应用程序就变成被动的了，被动的等待IoC容器来创建并注入它所需要的资源了。

### 2.3、IoC和DI的关系？

控制反转是通过依赖注入实现的，两者是同一个概念的不同角度描述。**IoC是设计思想，DI是实现方式。**

DI-Denpendency Injection，即`依赖注入`：组件之间依赖关系由`容器在运行期决定`，由容器动态的将某个依赖关系注入到组件之中。依赖注入的目的并非为软件系统带来更多功能，而是为了`提升组件重用的频率`，并为系统搭建一个灵活、可扩展的平台。通过依赖注入机制，只需通过简单的配置，而无需任何代码就可指定目标需要的资源，完成自身的业务逻辑，而不需要关系具体的资源来自何处，由谁实现。

### 2.4、IOC容器

> #### 1、Spring容器（Bean工厂）可分为两种：

- **BeanFactory**：最基础的，面向Spring的
- **ApplicationContext**：是在BeanFactory基础之上，面向使用Spring框架的开发者，提供了一系列的功能

> #### 2、Bean的生命周期

BeanDefinitionReader读取Resource所指向的配置文件资源，然后解析配置文件。配置文件中每一个`<bean>`解析成一个BeanDefinition对象，并保存到BeanDefinitionRegistry中；

容器扫描BeanDefinitionRegistry中的BeanDefinition；调用InstantiationStrategy进行Bean实例化的工作；使用BeanWrapper完成Bean属性的设置工作；、

> #### 3、ApplicationContext和BeanFactory的区别？

ApplicationContext会利用Java反射机制自动识别出配置文件中定义的BeanPostProcessor、 InstantiationAwareBeanPostProcesso 和BeanFactoryPostProcessor后置器，并自动将它们注册到应用上下文中。而BeanFactory需要在代码中通过手工调用addBeanPostProcessor()方法进行注册

ApplicationContext在初始化应用上下文的时候就实例化所有单实例的Bean。而BeanFactory在初始化容器的时候并未实例化Bean，直到第一次访问某个Bean时才实例化目标Bean。

单例Bean缓存池：Spring 在DefaultSingletonBeanRegistry类中提供了一个用于缓存单实例 Bean 的缓存器，它是一个用HashMap实现的缓存器，单实例的Bean以beanName为键保存在这个HashMap中。

**BeanFactory接口**

BeanFactory是类的通用工厂，可以创建并管理各种类的对象。

Spring为BeanFactory提供了很多种实现，最常用的是XmlBeanFactory，但在Spring 3.2中已被废弃，建议使用XmlBeanDefinitionReader、DefaultListableBeanFactory。

BeanFactory接口位于类结构树的顶端，它最主要的方法就是getBean(String var1)，这个方法从容器中返回特定名称的Bean。

BeanFactory的功能通过其它的接口得到了不断的扩展，比如AbstractAutowireCapableBeanFactory定义了将容器中的Bean按照某种规则（比如按名字匹配、按类型匹配等）进行自动装配的方法。

**Application接口**

ApplicationContext由BeanFactory派生而来，提供了更多面向实际应用的功能。可以这么说，使用BeanFactory就是手动档，使用ApplicationContext就是自动档。

ApplicationContext 继承了HierachicalBeanFactory和ListableBeanFactory接口，在此基础上，还通过其他的接口扩展了BeanFactory的功能，包括：

- Bean instantiation/wiring
- Bean 的实例化/串联
- 自动的 BeanPostProcessor 注册
- 自动的 BeanFactoryPostProcessor 注册
- 方便的 MessageSource 访问（i18n）
- ApplicationEvent 的发布与 BeanFactory 懒加载的方式不同，它是预加载，所以，每一个 bean 都在 ApplicationContext 启动之后实例化



> #### 4、Bean对象之间关系

- 依赖-->挺少用的(使用depends-on就是依赖关系了-->前置依赖【依赖的Bean需要初始化之后，当前Bean才会初始化】)
- 继承-->可能会用到(指定abstract和parent来实现继承关系)
- 引用-->最常见(使用ref就是引用关系了)

### 2.5、IoC配置的三种方式

> #### 1、XML配置

将bean的信息配置.xml文件里，通过Spring加载文件为我们创建bean。

- **优点：**可以使用于任何场景，结构清晰，通俗易懂。
- **缺点：**配置繁琐，不易维护，枯燥无味，扩展性差。

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
 http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!-- services -->
    <bean id="userService" class="tech.pdai.springframework.service.UserServiceImpl">
        <property name="userDao" ref="userDao"/>
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>
    <!-- more bean definitions for services go here -->
</beans>
```

> #### 2、Java配置（@Configuration）

将类的创建交给配置的Config类来完成，Spring只负责维护和管理，采用纯Java创建方式。本质上就是把在XML上的配置声明转移到Java配置类中。

- **优点：**适用于任何场景，配置方便，由于是纯Java代码，扩展性高，十分灵活。
- **缺点：**由于是采用的Java类的方式，声明不明显，如果大量配置，可读性比较差。

**举例：**

1. 创建一个配置类，添加@Configuration注解声明为配置类
2. 创建方法，方法上加上@bean，该方法用于创建实例并返回，该实例创建后会交给spring管理，方法名建议与实例名相同（首字母小写）

```java
@Configuration
public class BeansConfig {

    /**
     * @return user dao
     */
    @Bean("userDao")
    public UserDaoImpl userDao() {
        return new UserDaoImpl();
    }

    /**
     * @return user service
     */
    @Bean("userService")
    public UserServiceImpl userService() {
        UserServiceImpl userService = new UserServiceImpl();
        userService.setUserDao(userDao());
        return userService;
    }
}
```

> #### 3、注解配置

通过在`类上加注解`的方式，来声明一个类交给Spring管理，Spring会自动扫描带有`@Component`、`@Controller`、`@Service`、`@Repository`这四个注解的类，然后创建并管理，前提是需要先配置Spring的注解扫描器。

- **优点**：开发便捷，通俗易懂，方便维护。
- **缺点**：具有局限性，对于一些第三方资源，无法添加注解。只能采用XML或JavaConfig的方式配置

**举例**：

1. 对类添加@Component相关的注解，比如@Controller，@Service，@Repository
2. 设置ComponentScan的basePackage, 比如`<context:component-scan base-package='tech.pdai.springframework'>`, 或者`@ComponentScan("tech.pdai.springframework")`注解，或者 `new AnnotationConfigApplicationContext("tech.pdai.springframework")`指定扫描的basePackage.

```java
@Service
public class UserServiceImpl {

    /**
     * user dao impl.
     */
    @Autowired
    private UserDaoImpl userDao;

    /**
     * find user list.
     *
     * @return user list
     */
    public List<User> findUserList() {
        return userDao.findUserList();
    }
}
```

### 2.6、依赖注入的三种方式

常用的注入方式主要有三种：构造方法注入（`Construct`注入），setter注入，基于注解的注入（接口注入）。

> #### 1、setter注入

- **在XML配置方式中**，property都是setter方式注入，比如下面的xml:

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
 http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!-- services -->
    <bean id="userService" class="tech.pdai.springframework.service.UserServiceImpl">
        <property name="userDao" ref="userDao"/>
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>
    <!-- more bean definitions for services go here -->
</beans>
```

本质上包含两步：

1. 第一步，需要new UserServiceImpl()创建对象, 所以需要默认构造函数
2. 第二步，调用setUserDao()函数注入userDao的值, 所以需要setUserDao()函数

所以对应的service类是这样的：

```java
public class UserServiceImpl {

    /**
     * user dao impl.
     */
    private UserDaoImpl userDao;

    /**
     * init.
     */
    public UserServiceImpl() {
    }

    /**
     * find user list.
     *
     * @return user list
     */
    public List<User> findUserList() {
        return this.userDao.findUserList();
    }

    /**
     * set dao.
     *
     * @param userDao user dao
     */
    public void setUserDao(UserDaoImpl userDao) {
        this.userDao = userDao;
    }
}
```

- **在注解和Java配置方式下**

```java
public class UserServiceImpl {

    /**
     * user dao impl.
     */
    private UserDaoImpl userDao;

    /**
     * find user list.
     *
     * @return user list
     */
    public List<User> findUserList() {
        return this.userDao.findUserList();
    }

    /**
     * set dao.
     *
     * @param userDao user dao
     */
    @Autowired
    public void setUserDao(UserDaoImpl userDao) {
        this.userDao = userDao;
    }
}
```

> #### 2、构造函数注入

- **在XML配置方式中**，`<constructor-arg>`是通过构造函数参数注入，比如下面的xml:

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
 http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!-- services -->
    <bean id="userService" class="tech.pdai.springframework.service.UserServiceImpl">
        <constructor-arg name="userDao" ref="userDao"/>
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>
    <!-- more bean definitions for services go here -->
</beans>
```

本质上是new UserServiceImpl(userDao)创建对象, 所以对应的service类是这样的：

```java
public class UserServiceImpl {

    /**
     * user dao impl.
     */
    private final UserDaoImpl userDao;

    /**
     * init.
     * @param userDaoImpl user dao impl
     */
    public UserServiceImpl(UserDaoImpl userDaoImpl) {
        this.userDao = userDaoImpl;
    }

    /**
     * find user list.
     *
     * @return user list
     */
    public List<User> findUserList() {
        return this.userDao.findUserList();
    }
}
```

- **在注解和Java配置方式下**

```java
@Service
public class UserServiceImpl {

    /**
     * user dao impl.
     */
    private final UserDaoImpl userDao;

    /**
     * init.
     * @param userDaoImpl user dao impl
     */
    @Autowired // 这里@Autowired也可以省略
    public UserServiceImpl(final UserDaoImpl userDaoImpl) {
        this.userDao = userDaoImpl;
    }

    /**
     * find user list.
     *
     * @return user list
     */
    public List<User> findUserList() {
        return this.userDao.findUserList();
    }
}
```

> #### 3、注解注入

以@Autowired（自动注入）注解注入为例，修饰符有三个属性：Constructor，byType，byName。默认按照byType注入。

- **constructor**：通过构造方法进行自动注入，spring会匹配与构造方法参数类型一致的bean进行注入，如果有一个多参数的构造方法，一个只有一个参数的构造方法，在容器中查找到多个匹配多参数构造方法的bean，那么spring会优先将bean注入到多参数的构造方法中。
- **byName**：被注入bean的id名必须与set方法后半截匹配，并且id名称的第一个单词首字母必须小写，这一点与手动set注入有点不同。
- **byType**：查找所有的set方法，将符合符合参数类型的bean注入

```java
/**
 * @author pdai
 */
@Service
public class UserServiceImpl {

    /**
     * user dao impl.
     */
    @Autowired
    private UserDaoImpl userDao;

    /**
     * find user list.
     *
     * @return user list
     */
    public List<User> findUserList() {
        return userDao.findUserList();
    }
}
```

### 2.7、Bean的作用域

- 单例Singleton
- 多例prototype
- 与Web应用环境相关的Bean作用域
  - reqeust
  - session
  - globalSession
- 使用与Web应用环境相关的Bean作用域需要手动设置代理

### 2.8、为什么推荐构造器注入方式？

构造器注入的方式**能够保证注入的组件不可变，并且确保需要的依赖不为空**。构造器注入的依赖总是能够在返回客户端（组件）代码的时候保证完全初始化的状态。

- **依赖不可变：**final关键字
- **依赖不为空：**当要实例化UserServiceImpl的时候，由于自己实现了有参数的构造函数，所以不会调用默认构造函数，那么就需要Spring容器传入所需要的参数，所以就两种情况：1、有该类型的参数 -> 传入，OK。2：无该类型的参数 -> 报错 
- **完全初始化的状态**：这个可以跟上面的依赖不为空结合起来，向构造器传参之前，要确保注入的内容不为空，那么肯定要调用依赖组件的构造方法完成实例化。而在Java类加载实例化的过程中，构造方法是最后一步（之前如果有父类先初始化父类，然后自己的成员变量，最后才是构造方法），所以返回来的都是初始化之后的状态。

```java
@Service
public class UserServiceImpl {

    /**
     * user dao impl.
     */
    private final UserDaoImpl userDao;

    /**
     * init.
     * @param userDaoImpl user dao impl
     */
    public UserServiceImpl(final UserDaoImpl userDaoImpl) {
        this.userDao = userDaoImpl;
    }
}
```

**循环依赖的问题：**使用field注入可能会导致循环依赖，即A里面注入B，B里面又注入A。

```java
public class A {
    @Autowired
    private B b;
}

public class B {
    @Autowired
    private A a;
}
```

如果使用构造器注入，在spring项目启动的时候，就会抛出：`BeanCurrentlyInCreationException：Requested bean is currently in creation: Is there an unresolvable circular reference`？从而提醒你避免循环依赖，如果是field注入的话，启动的时候不会报错，在使用那个bean的时候才会报错。

### 2.9、@Autowired和@Resource以及@Inject等注解注入有何区别？

> ### 1、@Autowired

```java
@Target({ElementType.CONSTRUCTOR, ElementType.METHOD, ElementType.PARAMETER, ElementType.FIELD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Autowired {
  boolean required() default true;
}
```

从Autowired注解源码上看，可以使用在下面这些地方：

```java
@Target(ElementType.CONSTRUCTOR) #构造函数
@Target(ElementType.METHOD) #方法
@Target(ElementType.PARAMETER) #方法参数
@Target(ElementType.FIELD) #字段、枚举的常量
@Target(ElementType.ANNOTATION_TYPE) #注解
```

1. @Autowired是Spring自带的注解，通过 AutowiredAnnotationBeanPostProcessor 类实现的依赖注入。
2. @Autowired可以作用在CONSTRUCTOR、METHOD、PARAMETER、FIELD、ANNOTATION_TYPE
3. @Autowired默认是根据类型（byType）进行自动装配的
4. 如果有多个类型一样的Bean候选者，需要指定按照名称（byName ）进行装配，则需要配合@Qualifier。

指定名称后，如果Spring IOC容器中没有对应的组件bean抛出NoSuchBeanDefinitionException。也可以将@Autowired中required配置为false，如果配置为false之后，当没有找到相应bean的时候，系统不会抛异常

> #### 2、@Resource

```java
@Target({TYPE, FIELD, METHOD})
@Retention(RUNTIME)
public @interface Resource {
    String name() default "";
    // 其他省略
}
```

从Resource注解源码上看，可以使用在下面这些地方：

```java
@Target(ElementType.TYPE) #接口、类、枚举、注解
@Target(ElementType.FIELD) #字段、枚举的常量
@Target(ElementType.METHOD) #方法
```

1、@Resource是JSR250规范的实现，在javax.annotation包下

2、@Resource可以作用TYPE、FIELD、METHOD上

3、@Resource是默认根据属性名称进行自动装配的，如果有多个类型一样的Bean候选者，则可以通过name进行指定进行注入

> #### 3、@Inject

```java
@Target({ METHOD, CONSTRUCTOR, FIELD })
@Retention(RUNTIME)
@Documented
public @interface Inject {}
```

从Inject注解源码上看，可以使用在下面这些地方：

```java
@Target(ElementType.CONSTRUCTOR) #构造函数
@Target(ElementType.METHOD) #方法
@Target(ElementType.FIELD) #字段、枚举的常量
```

1、@Inject是JSR330 (Dependency Injection for Java)中的规范，需要导入javax.inject.Inject jar包 ，才能实现注入

2、@Inject可以作用CONSTRUCTOR、METHOD、FIELD上

3、@Inject是根据类型进行自动装配的，如果需要按名称进行装配，则需要配合@Named；

### 2.10、IOC的实现机制

## 三、面向切面编程（AOP）

### 3.1、什么是AOP？

AOP最早是AOP联盟的组织提出的,指定的一套规范,spring将AOP的思想引入框架之中,通过**预编译方式**和**运行期间动态代理**实现程序的统一维护的一种技术。

```java
/**
 * @author pdai
 */
public class UserServiceImpl implements IUserService {

    /**
     * find user list.
     *
     * @return user list
     */
    @Override
    public List<User> findUserList() {
        System.out.println("execute method： findUserList");
        return Collections.singletonList(new User("pdai", 18));
    }

    /**
     * add user
     */
    @Override
    public void addUser() {
        System.out.println("execute method： addUser");
        // do something
    }
}
```

我们将记录日志功能解耦为日志切面，它的目标是解耦。进而引出AOP的理念：就是将分散在各个业务逻辑代码中相同的代码通过**横向切割**的方式抽取到一个独立的模块中！

![image-20220802210939550](https://oss.zhulinz.top//img/202208022110891.png)

OOP面向对象编程，针对业务处理过程的实体及其属性和行为进行抽象封装，以获得更加清晰高效的逻辑单元划分。而AOP则是针对业务处理过程中的切面进行提取，它所面对的是处理过程的某个步骤或阶段，以获得逻辑过程的中各部分之间低耦合的隔离效果。这两种设计思想在目标上有着本质的差异。

![image-20220802210956055](https://oss.zhulinz.top//img/202208022110462.png)

### 3.2、AOP术语

- **连接点（Jointpoint）**：表示需要在程序中插入横切关注点的扩展点，**连接点可能是类初始化、方法执行、方法调用、字段调用或处理异常等等**，Spring只支持方法执行连接点，在AOP中表示为**在哪里干**；
- **切入点（Pointcut）**： 选择一组相关连接点的模式，即可以认为连接点的集合，Spring支持perl5正则表达式和AspectJ切入点模式，Spring默认使用AspectJ语法，在AOP中表示为**在哪里干的集合**；
- **通知（Advice）**：在连接点上执行的行为，通知提供了在AOP中需要在切入点所选择的连接点处进行扩展现有行为的手段；包括前置通知（before advice）、后置通知(after advice)、环绕通知（around advice），在Spring中通过代理模式实现AOP，并通过拦截器模式以环绕连接点的拦截器链织入通知；在AOP中表示为**干什么**；
- **方面/切面（Aspect）**：横切关注点的模块化，比如上边提到的日志组件。可以认为是通知、引入和切入点的组合；在Spring中可以使用Schema和@AspectJ方式进行组织实现；在AOP中表示为**在哪干和干什么集合**；
- **引入（inter-type declaration）**：也称为内部类型声明，为已有的类添加额外新的字段或方法，Spring允许引入新的接口（必须对应一个实现）到所有被代理对象（目标对象）, 在AOP中表示为**干什么（引入什么）**；
- **目标对象（Target Object）**：需要被织入横切关注点的对象，即该对象是切入点选择的对象，需要被通知的对象，从而也可称为被通知对象；由于Spring AOP 通过代理模式实现，从而这个对象永远是被代理对象，在AOP中表示为**对谁干**；
- **织入（Weaving）**：把切面连接到其它的应用程序类型或者对象上，并创建一个被通知的对象。这些可以在编译时（例如使用AspectJ编译器），类加载时和运行时完成。Spring和其他纯Java AOP框架一样，在运行时完成织入。在AOP中表示为**怎么实现的**；
- **AOP代理（AOP Proxy）**：AOP框架使用代理模式创建的对象，从而实现在连接点处插入通知（即应用切面），就是通过代理来对目标对象应用切面。在Spring中，AOP代理可以用JDK动态代理或CGLIB代理实现，而通过拦截器模型应用切面。在AOP中表示为**怎么实现的一种典型方式**；

> #### 通知类型

- **前置通知（Before advice）**：在某连接点之前执行的通知，但这个通知不能阻止连接点之前的执行流程（除非它抛出一个异常）。
- **后置通知（After returning advice）**：在某连接点正常完成后执行的通知：例如，一个方法没有抛出任何异常，正常返回。
- **异常通知（After throwing advice）**：在方法抛出异常退出时执行的通知。
- **最终通知（After (finally) advice）**：当某连接点退出的时候执行的通知（不论是正常返回还是异常退出）。
- **环绕通知（Around Advice）**：包围一个连接点的通知，如方法调用。这是最强大的一种通知类型。环绕通知可以在方法调用前后完成自定义的行为。它也会选择是否继续执行连接点或直接返回它自己的返回值或抛出异常来结束执行。

![image-20220802211118397](https://oss.zhulinz.top//img/202208022111132.png)

### 3.3、AOP的配置方式

> #### 1、XML Schema配置方式

- **定义目标类**

```java
package tech.pdai.springframework.service;

public class AopDemoServiceImpl {

    public void doMethod1() {
        System.out.println("AopDemoServiceImpl.doMethod1()");
    }

    public String doMethod2() {
        System.out.println("AopDemoServiceImpl.doMethod2()");
        return "hello world";
    }

    public String doMethod3() throws Exception {
        System.out.println("AopDemoServiceImpl.doMethod3()");
        throw new Exception("some exception");
    }
}
```

- **定义切面类**

```java
package tech.pdai.springframework.aspect;

import org.aspectj.lang.ProceedingJoinPoint;

/**
 * @author pdai
 */
public class LogAspect {

    /**
     * 环绕通知.
     *
     * @param pjp pjp
     * @return obj
     * @throws Throwable exception
     */
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("-----------------------");
        System.out.println("环绕通知: 进入方法");
        Object o = pjp.proceed();
        System.out.println("环绕通知: 退出方法");
        return o;
    }

    /**
     * 前置通知.
     */
    public void doBefore() {
        System.out.println("前置通知");
    }

    /**
     * 后置通知.
     *
     * @param result return val
     */
    public void doAfterReturning(String result) {
        System.out.println("后置通知, 返回值: " + result);
    }

    /**
     * 异常通知.
     *
     * @param e exception
     */
    public void doAfterThrowing(Exception e) {
        System.out.println("异常通知, 异常: " + e.getMessage());
    }

    /**
     * 最终通知.
     */
    public void doAfter() {
        System.out.println("最终通知");
    }
}
```

- **XML配置AOP**

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
 http://www.springframework.org/schema/beans/spring-beans.xsd
 http://www.springframework.org/schema/aop
 http://www.springframework.org/schema/aop/spring-aop.xsd
 http://www.springframework.org/schema/context
 http://www.springframework.org/schema/context/spring-context.xsd
">

    <context:component-scan base-package="tech.pdai.springframework" />

    <aop:aspectj-autoproxy/>

    <!-- 目标类 -->
    <bean id="demoService" class="tech.pdai.springframework.service.AopDemoServiceImpl">
        <!-- configure properties of bean here as normal -->
    </bean>

    <!-- 切面 -->
    <bean id="logAspect" class="tech.pdai.springframework.aspect.LogAspect">
        <!-- configure properties of aspect here as normal -->
    </bean>

    <aop:config>
        <!-- 配置切面 -->
        <aop:aspect ref="logAspect">
            <!-- 配置切入点 -->
            <aop:pointcut id="pointCutMethod" expression="execution(* tech.pdai.springframework.service.*.*(..))"/>
            <!-- 环绕通知 -->
            <aop:around method="doAround" pointcut-ref="pointCutMethod"/>
            <!-- 前置通知 -->
            <aop:before method="doBefore" pointcut-ref="pointCutMethod"/>
            <!-- 后置通知；returning属性：用于设置后置通知的第二个参数的名称，类型是Object -->
            <aop:after-returning method="doAfterReturning" pointcut-ref="pointCutMethod" returning="result"/>
            <!-- 异常通知：如果没有异常，将不会执行增强；throwing属性：用于设置通知第二个参数的的名称、类型-->
            <aop:after-throwing method="doAfterThrowing" pointcut-ref="pointCutMethod" throwing="e"/>
            <!-- 最终通知 -->
            <aop:after method="doAfter" pointcut-ref="pointCutMethod"/>
        </aop:aspect>
    </aop:config>

    <!-- more bean definitions for data access objects go here -->
</beans>

```

- **测试类**

```java
/**
  * main interfaces.
  *
  * @param args args
  */
public static void main(String[] args) {
    // create and configure beans
    ApplicationContext context = new ClassPathXmlApplicationContext("aspects.xml");

    // retrieve configured instance
    AopDemoServiceImpl service = context.getBean("demoService", AopDemoServiceImpl.class);

    // use configured instance
    service.doMethod1();
    service.doMethod2();
    try {
        service.doMethod3();
    } catch (Exception e) {
        // e.printStackTrace();
    }
}

```

- **输出结果**

```java
-----------------------
环绕通知: 进入方法
前置通知
AopDemoServiceImpl.doMethod1()
环绕通知: 退出方法
最终通知
-----------------------
环绕通知: 进入方法
前置通知
AopDemoServiceImpl.doMethod2()
环绕通知: 退出方法
最终通知
后置通知, 返回值: hello world
-----------------------
环绕通知: 进入方法
前置通知
AopDemoServiceImpl.doMethod3()
最终通知
异常通知, 异常: some exception

```

> #### 2、AspectJ注解方式

基于XML的声明式AspectJ存在一些不足，需要在Spring配置文件配置大量的代码信息，为了解决这个问题，Spring 使用了@AspectJ框架为AOP的实现提供了一套注解。

| 注解名称        | 解释                                                         |
| --------------- | ------------------------------------------------------------ |
| @Aspect         | 用来定义一个切面。                                           |
| @pointcut       | 用于定义切入点表达式。在使用时还需要定义一个包含名字和任意参数的方法签名来表示切入点名称，这个方法签名就是一个返回值为void，且方法体为空的普通方法。 |
| @Before         | 用于定义前置通知，相当于BeforeAdvice。在使用时，通常需要指定一个value属性值，该属性值用于指定一个切入点表达式(可以是已有的切入点，也可以直接定义切入点表达式)。 |
| @AfterReturning | 用于定义后置通知，相当于AfterReturningAdvice。在使用时可以指定pointcut / value和returning属性，其中pointcut / value这两个属性的作用一样，都用于指定切入点表达式。 |
| @Around         | 用于定义环绕通知，相当于MethodInterceptor。在使用时需要指定一个value属性，该属性用于指定该通知被植入的切入点。 |
| @After-Throwing | 用于定义异常通知来处理程序中未处理的异常，相当于ThrowAdvice。在使用时可指定pointcut / value和throwing属性。其中pointcut/value用于指定切入点表达式，而throwing属性值用于指定-一个形参名来表示Advice方法中可定义与此同名的形参，该形参可用于访问目标方法抛出的异常。 |
| @After          | 用于定义最终final 通知，不管是否异常，该通知都会执行。使用时需要指定一个value属性，该属性用于指定该通知被植入的切入点。 |
| @DeclareParents | 用于定义引介通知，相当于IntroductionInterceptor (不要求掌握)。 |

## 参考文章

- [♥Spring框架知识体系详解♥](https://www.pdai.tech/md/spring/spring.html)

- [四万字+五十图，三五十问拿捏Spring!](https://juejin.cn/post/7088271291567833096#heading-8)

- [Spring八股文](/7-八股文/5、Spring相关面试题)