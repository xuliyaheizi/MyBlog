---
title: Spring八股文
date: 2022-08-15
---
## 一、Spring

### 1.1、Spring框架

> #### 1、什么是Spring？

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

> #### 2、Spring框架的好处？

- `轻量`：Spring是轻量的，基本的版本大约2MB。
- `控制反转（IOC）`：Spring通过控制反转实现了基本耦合，对象们给出它们的依赖，而不是创建或查找依赖的对象们。
- `面向切面的编程（AOP）`：Spring支持面向切面的编程，并且把应用业务逻辑和系统服务分开。
- `容器`：Spring包含并管理应用中对象的生命周期和配置。
- `MVC框架`：Spring的WEB框架是个精心设计的框架，是WEB框架的一个很好的替代品。
- `事务管理`：Spring提供一个持续的事务管理接口，可用扩展到上至本地事务下至全局事务（JTA）。
- `异常处理`：Spring提供方便的API把具体技术相关的异常（比如由JDBC，Hibernate or JDO抛出的）转化为一致的unchecked异常。

> #### 3、@Autowired和@Resource关键字的区别？

@Resource和@Autowired都是做`bean的注入`时使用，且@Resource并不是Spring的注解，它的包是javax.annotation.Resource，需要导入，但是Spring支持该注解的注入。

1. **共同点：**两者都可以写在字段和setter上。两者如果都写在字段上，那么就不需要再写setter方法。

2. **不同点：**

   - @Autowired为Spring提供的注解，需要导入包org.springframework.beans.factory.annotation.Autowired：只按照`byType`注入。

     ```java
     public class TestServiceImpl {
         // 下面两种@Autowired只要使用一种即可
         @Autowired
         private UserDao userDao; // 用于字段上
     
         @Autowired
         public void setUserDao(UserDao userDao) { // 用于属性的方法上
             this.userDao = userDao;
         }
     }
     ```

   - @Autowired注解是`按照类型（byType）装配依赖对象`，默认情况下它要求依赖对象必须存在，如果允许null值，可以设置它的`required属性为false`。如果我们想使用按照名称（byName）来装配，可以结合`@Qualififier注解`一起使用。如下：

     ```java
     public class TestServiceImpl {
         @Autowired
         @Qualifier("userDao")
         private UserDao userDao; 
     }
     ```

   - @Resource默认按照`byName自动注入`，由J2EE提供，需要导入包javax.annotation.Resource。@Resource有两个重要的属性：`name`和`type`，而Spring将@Resource注解的name属性解析为bean的名字，而type属性则解析为bean的类型。所以，如果使用name属性，则使用byName的自动注入策略。而使用type属性时则使用byType自动注入策略。如果即不制定name也不制定type属性，这时将**通过反射机制使用byName自动注入策略**（默认策略）。

     ```java
     public class TestServiceImpl {
         // 下面两种@Resource只要使用一种即可
         @Resource(name="userDao")
         private UserDao userDao; // 用于字段上
     
         @Resource(name="userDao")
         public void setUserDao(UserDao userDao) { // 用于属性的setter方法上
             this.userDao = userDao;
         }
     }
     ```

     注：最好是将@Resource放在setter方法上，因为这样更符合面向对象的思想，通过set、get去操作属性，而不是直接去操作属性。

     @Resource装配顺序：

     ①如果同时指定了name和type，则从Spring上下文中找到唯一匹配的bean进行装配，找不到则抛出异常。

     ②如果指定了name，则从上下文中查找名称（id）匹配的bean进行装配，找不到则抛出异常。

     ③如果指定了type，则从上下文中找到类似匹配的唯一bean进行装配，找不到或是找到多个，都会抛出异常。

     ④如果既没有指定name，又没有指定type，则自动按照byName方式进行装配；如果没有匹配，则回退为一个原始类型进行匹配，如果匹配则自动装配。@Resource的作用相当于@Autowired，只不过@Autowired按照byType自动注入。

> #### 4、解释一下Spring Bean的生命周期？

Servlet的生命周期：实例化、初始化init、接收请求service、销毁destroy；

Spring上下文的Bean生命周期也类似，如下：

1. 实例化Bean：对于BeanFactory容器，当客户向容器请求一个尚未初始化的bean时，或初始化bean的时候需要注入另一个尚未初始化的依赖时，容器就会调用createBean进行实例化。对于ApplicationContext容器，当容器启动结束后，通过获取BeanDefinition对象中的信息，实例化所有的bean。
2. 设置对象属性（依赖注入）：实例化后的对象被封装在BeanWrapper对象中，紧接着，Spring根据BeanDefinition中的信息以及通过BeanWrapper提供的设置属性的接口完成依赖注入。
3. 处理Aware接口：Spring会检测该对象是否实现了xxxAware接口，并将相关的xxxAware实例注入给Bean
   1. 如果这个Bean已经实现了BeanNameAware接口，会调用它实现的setBeanName（String beanld）方法，此处传递的就是Spring配置文件中Bean的id值。
   2. 如果这个Bean已经实现了BeanFactoryAware接口，会调用它实现的setBeanFactory()方法，传递的是Spring工厂自身。
   3. 如果这个Bean已经实现了ApplicationContextAware接口，会调用setApplicationContext（ApplicationContext）方法，传入Spring上下文。
4. BeanPostProcessor：如果想对Bean进行一些自定义的处理，那么可以让Bean实现了BeanPostProcessor接口，那将会调用postProcessBeforeInitalization（Object obj，String s）方法。
5. InitializingBean与init-method：如果Bean在Spring配置文件中配置了init-method属性，则会自动调用其配置的初始化方法。
6. 如果这个Bean实现了BeanPostProcessor接口，将会调用postProcessAfterInitialization(Object obj, String s)方法；由于这个方法是在Bean初始化结束时调用的，所以可以被应用于内存或缓存技术；
7. DisposableBean：当Bean不再需要时，会经过清洗阶段，如果Bean实现了DisposableBean这个接口，会调用其实现的destroy()方法。
8. destroy-method：最后，如果这个Bean的Spring配置中配置了destroy-method属性，会自动调用其配置的销毁方法。

![image-20220722222148405](https://oss.zhulinz.top//img/202207222221768.png)

> #### 5、解释Spring支持的几种Bean的作用域？

Spring容器中的bean可以分为5个范围

- singleton：默认，每个容器中只有一个bean的实例，单例的模式由BeanFactory自身来维护。
- prototype：为每一个bean请求提供一个实例。
- request：为每一个网络请求创建一个实例，在请求完成以后，bean会失效并被垃圾回收器回收。
- session：与request范围类似，确保每个session中有一个bean的实例，在session过期后，bean会随之失效。
- global-session：全局作用域，global-session和Porlet应用相关。当你的应用部署在Portlet容器中工作时，它包含很多portlet。如果你想要声明让所有的portlet共用全局的存储变量的话，那么这全局变量需要存储在global-session中。全局作用域与Servlet中的session作用域效果相同。

> #### 6、Spring框架中都用到了哪些设计模式？

- 简单工厂模式：Spring中的BeanFactory就是简单工厂模式的体现。根据传入一个唯一的标识来获得Bean对象，但是在传入参数后创建还是传入参数前创建，要根据具体情况来定。
- 工厂模式：Spring中的FactoryBean就是典型的工厂模式。实现了FactoryBean接口的bean是一类叫做factory的bean。其特点是，spring在使用getBean()调用获得该bean时，会自动调用该bean的getObject()方法，所有返回的不是factory这个bean，而bean.getObject()方法的返回值。
- 单例模式：在Spring中用到的单例模式有：`scope="singleton"`，注册式单例模式，bean存放于Map中，bean name当做key，bean当做value。
- 原型模式：在Spring中用到的原型模式有：`scope="prototype"`，每次获取的是通过克隆生成的新实例，对其进行修改时对原有实例对象不造成任何影响。
- 迭代器模式：在 Spring 中有个 CompositeIterator 实现了 Iterator，Iterable 接口和 Iterator 接口，这两个都是迭代相关的接口。可以这么认为，实现了 Iterable 接口，则表示某个对象是可被迭代的。Iterator 接口相当于是一个迭代器，实现了 Iterator 接口，等于具体定义了这个可被迭代的对象时如何进行迭代的。
- 代理模式：Spring中经典的AOP，就是使用动态代理实现的，分JDK和CGlib动态代理。
- 适配器模式：Spring 中的 AOP 中 AdvisorAdapter 类，它有三个实现：MethodBeforAdviceAdapter、AfterReturnningAdviceAdapter、ThrowsAdviceAdapter。Spring会根据不同的 AOP 配置来使用对应的 Advice，与策略模式不同的是，一个方法可以同时拥有多个Advice。Spring 存在很多以 Adapter 结尾的，大多数都是适配器模式。
- 观察者模式：Spring 中的 Event 和 Listener。spring 事件：ApplicationEvent，该抽象类继承了EventObject 类，JDK 建议所有的事件都应该继承自 EventObject。spring 事件监听器：ApplicationListener，该接口继承了 EventListener 接口，JDK 建议所有的事件监听器都应该继承EventListener。
- 责任链模式：DispatcherServlet 中的 doDispatch() 方法中获取与请求匹配的处理器HandlerExecutionChain，this.getHandler() 方法的处理使用到了责任链模式。

> #### 7、Spring框架中的单例Bean是线程安全的吗？

Spring框架并没有对单例Bean进行任何多线程的封装处理

- 关于单例Bean的线程安全和并发问题，需要开发者自行去搞定。
- 单例的线程安全问题，并不是Spring应该去关心的。Spring应该做的是，提供根据配置，创建单例Bean或多例Bean的功能。

实际上，大部分的Spring Bean并没有可变的状态，所以在某种程度上说Spring的单例Bean是线程安全的。如果Bean有多种状态的话，就需要自行保证线程。最浅显的解决办法，就是将多态Bean的作用域（Scope）由Singleton变更为Prototype。

### 1.2、IOC控制反转

> #### 1、说说对SpringIOC的理解？

IOC就是`控制反转`，是指创建对象的控制权的转移。以前创建对象的主动权和时机是由自己把控的，而现在这种权力转移到Spring容器中，并由容器根据配置文件去创建实例和管理各个实例之间的依赖关系。对象与对象之间松散耦合，也利于功能的复用。

`DI依赖注入`，和控制反转是同一个概率的不同角度的描述，即应用程序在运行时依赖IOC容器来`动态注入`对象需要的外部资源。

最直观的表达就是，IOC让对象的创建不用去new了，可以由Spring自动生产，使用java的反射机制，根据配置文件在运行时`动态的去创建对象以及管理对象`，并调用对象的方法的。

SpringIOC有三种注入方式：构造器注入、setter方式注入、根据注解注入。

- IOC让相互合作的组件保持松散的耦合，而AOP编程允许把遍布于各层的功能分离出来，形成可重用的功能组件。

> #### 2、依赖注入的方式有几种？

1. `构造器注入`：将被依赖对象通过`构造函数的参数`注入给依赖对象，并且在初始化对象的时候注入。

   优点：对象初始化完成后便可获得可使用的对象。

   缺点：当需要注入的对象很多时，构造器参数列表将会很长；不够灵活。若有多种注入方式，每种方式只需注入指定几个依赖，那么就需要提供多个重载的构造函数，有点麻烦。

2. `setter方式注入`：IOC Service Provider通过调用成员变量提供的setter函数将被依赖对象注入给依赖类。

   优点：灵活。可用选择性的注入需要的对象。

   缺点：依赖对象初始化完成后由于尚未注入被依赖对象，因此还不能使用。

3. `接口注入`：依赖类必须要实现指定的接口，然后实现该接口中的一个函数，该函数就是用于依赖注入。该函数的参数就是要注入的对象。

   优点：接口注入中，接口的名字、函数的名字都不重要，只要保证函数的参数是要注入的对象类型即可。

   缺点：侵入行（如果类A要使用别人提供的一个功能，若为了使用这个功能，需要在自己的类中增加额外的代码）太强，不建议使用。

> #### 3、Spring基于XML注入bean的几种方式？

1. set方法注入
2. 构造器注入：通过index设置参数的位置；通过type设置参数类型
3. 静态工厂注入
4. 实例工厂

> #### 4、Spring容器启动阶段会干什么？

Spring的IOC容器工作的过程，可以划分为两个阶段：**容器启动阶段**和**Bean实例化阶段**。

容器启动阶段主要是加载和解析配置文件，保存到对应的Bean定义中

![image-20220822215331721](https://oss.zhulinz.top//img/202208222153793.png)

容器启动开始，首先会通过某种途径加载Congiguration MetaData，在大部分情况下，容器需要依赖某些工具类（BeanDefinitionReader）对加载的Congiguration MetaData进行解析和分析，并将分析后的信息组为相应的BeanDefinition。

![image-20220822215356545](https://oss.zhulinz.top//img/202208222153613.png)

最后把这些保存了Bean定义必要信息的BeanDefinition，注册到相应的BeanDefinitionRegistry，这样容器启动就完成了。

> #### 5、Spring有哪些自动装配的方式？

**什么是自动装配**

Spring IOC容器知道所有Bean的配置信息，此外，通过Java反射机制还可以获知实现类的结构信息，如构造方法的结构、属性等信息。掌握所有Bean的这些信息后，Spring IOC容器就可以按照某种规则对容器中的Bean进行自动装配，而无须通过显式的方式进行依赖配置。

Spring提供的这种方式，可以按照某些规则进行Bean的自动装配，元素提供了一个指定自动装配类型的属性：autowire="<自动装配类型>"

**Spring提供了四种装配类型**

- **byName**：根据名称进行自动匹配，假设Boss又一个名为car的属性，如果容器中刚好有一个名为car的bean，Spring就会自动将其装配给Boss的car属性
- **byType**：根据类型进行自动匹配，假设Boss有一个Car类型的属性，如果容器中刚好有一个Car类型的Bean，Spring就会自动将其装配给Boss这个属性
- **constructor**：与 byType类似， 只不过它是针对构造函数注入而言的。如果Boss有一个构造函数，构造函数包含一个Car类型的入参，如果容器中有一个Car类型的Bean，则Spring将自动把这个Bean作为Boss构造函数的入参；如果容器中没有找到和构造函数入参匹配类型的Bean，则Spring将抛出异常。
- **autodetect**：根据Bean的自省机制决定采用byType还是constructor进行自动装配，如果Bean提供了默认的构造函数，则采用byType，否则采用constructor。

### 1.3、AOP面向切面编程

> #### 1、说说对Spring的AOP的理解？

`AOP（面向切面编程）`能够将那些与业务无关，却为业务模块所`共同调用的逻辑或责任`（例如事务处理、日志管理、权限控制等）封装起来，便于减少系统的重复代码，减低模块间的耦合度，并有利于未来的可扩展性和可维护性。

SpringAOP是基于`动态代理`的，如果代理的对象实现了某个接口，那么SpringAOP就会使用`JDK动态代理`去创建代理对象。而对于没有实现接口的对象，就无法使用JDK动态代理，转而使用`CGlib动态代理`生成一个被代理对象的子类作为代理。

![image-20220722215532314](https://oss.zhulinz.top//img/202207222155107.png)

当然也可以使用AspectJ，Spring AOP中已经集成了AspectJ，AspectJ应该算得上是Java生态系统中最完整的AOP框架了。使用AOP之后我们可以把一些通用功能抽象出来，在需要用到的地方直接使用即可，这样可以大大简化代码量。我们需要增加新功能也方便，提高了系统的扩展性。日志功能、事务管理和权限管理等场景都用到了AOP。

> #### 2、在SpringAOP中，关注点和横切关注的区别是什么？

关注点是应用中一个模块的行为，一个关注点可能会被定义成一个我们想实现的一个功能。横切关注点是一个关注点，此关注点是整个应用都会使用的功能，并影响整个应用，比如日志、安全和数据传输，几乎应用的每个模块都需要的功能。因此这些都属于横切关注点。

那什么是连接点呢？连接点代表一个应用程序的某个位置，在这个位置我们可以插入一个AOP切面，它实际上是个应用程序执行Spring AOP的位置。切入点是什么？切入点是一个或一组连接点，通知将在这些位置执行。可以通过表达式或匹配的方式指明切入点。

> #### 3、什么是通知呢？有哪些类型呢？

通知是个在方法执行前或执行后要做的动作，实际上是程序执行时要通过SpringAOP框架触发的代码段。

Spring切面可以应用五种类型的通知：

- **before**：前置通知，在一个方法执行前被调用。
- **after:** 在方法执行之后调用的通知，无论方法执行是否成功。
- **after-returning:** 仅当方法成功完成后执行的通知。
- **after-throwing:** 在方法抛出异常退出时执行的通知。
- **around:** 在方法执行之前和之后调用的通知。

### 1.4、事务

> #### 1、说说事务的隔离级别？

- `未提交读`：允许脏读，也就是可能读取到其他会话中未提交事务修改的数据。

- `提交读`：只能读取到已经提交的数据。Oracle等多数数据库默认都是该级别（不可重复读）

- `可重复读`：在同一个事务内的查询都是事务开始时刻一致的，Mysql的InnoDB默认级别。在SQL标准中，该隔离级别消除了不可重复读，但是还存在幻读（多个事务同时修改同一条记录，事务之间不知道彼此存在，当事务提交之后，后面的事务修改的数据将会覆盖当前事务，前一个事务就像发生幻觉一样）

- `可串行化`：完全串行化的读，每次读都需要获得表级共享锁，读写相互都会阻塞。

  |        事务隔离级别         | 脏读 | 不可重复读 | 幻读 |
  | :-------------------------: | :--: | :--------: | :--: |
  | 读未提交（READ_UNCOMMITTED) | 允许 |    允许    | 允许 |
  | 读已提交（READ_COMMITTED）  | 禁止 |    允许    | 允许 |
  | 可重复读（REPEATABLE_READ） | 禁止 |    禁止    | 允许 |
  |   顺序读（SERIALIZABLE）    | 禁止 |    禁止    | 禁止 |

  `不可重复读和幻读的区别主要是`：解决了不可重复读需要锁定了当前满足条件的记录，而解决幻读需要锁定当前满足条件的记录及相近的记录。比如查询某个商品的信息，可重复读事务隔离级别可以保证当前商品信息被锁定，解决不可重复读；但是如果统计商品个数，中途有记录插入，可重复读事务隔离级别就不能保证两个事务统计的个数相同。

  **脏读、幻读、不可重复读的区别？**

  **脏读：**	脏读就是指当一个事务正在访问数据，并且对数据进行了修改，而这个修改还没有提交到数据库中，这时，另外一个事务也访问这个数据，然后使用了这个数据。

  **不可重复读：**是指在一个事务内，多次读同一数据。在这个事务还没有结束时，另外一个事务也访问该同一数据。那么，在第一个事务中的两次读数据之间，由于第二个事务的修改，那么第一个事务两次读到的数据可能是不一样的。这样就发生了在一个事务内两次读到的数据是不一样的，因此称为是不可重复读的。

  **幻读：**是指当事务不是独立执行时发生的一种现象，例如第一个事务对一个表中的数据进行了修改，这种修改涉及到表中的全部数据行。同时，第二个事务也修改了这个表中的数据，这种修改是向表中插入一行新数据。那么，以后就会发生操作第一个事务的用户发现表中还没有修改的数据行，就好像发生了幻觉一样。

> #### 2、说说事务的传播级别？

Spring事务定义了7种传播机制

1. `PROPAGATION_REQUIRED`：默认的Spring事物传播级别，若当前存在事务，则加入该事务，若不存在事务，则新建一个事务。

2. `PAOPAGATION_REQUIRE_NEW`：若当前没有事务，则新建一个事务。若当前存在事务，则新建一个事务，新老事务相互独立。外部事务抛出异常回滚不会影响内部事务的正常提交。

3. `PROPAGATION_NESTED`：如果当前存在事务，则嵌套在当前事务中执行。如果当前没有事务，则新建一个事务，类似于REQUIRE_NEW。 

4. `PROPAGATION_SUPPORTS`：支持当前事务，若当前不存在事务，以非事务的方式执行。

5. `PROPAGATION_NOT_SUPPORTED`：以非事务的方式执行，若当前存在事务，则把当前事务挂起。

6. `PROPAGATION_MANDATORY`：强制事务执行，若当前不存在事务，则抛出异常. 

7. `PROPAGATION_NEVER`：以非事务的方式执行，如果当前存在事务，则抛出异常。

> #### 3、Spring事务实现方式？

- 编程式事务管理：这意味着可以通过编程的方式管理事务，这种方式带来了很大的灵活性。但很难维护。
- 声明式事务管理：这种方式意味着可以将事务管理和业务代码分离。只需要通过注解或XML配置管理事务。

> #### 4、Spring框架的事务管理有哪些优点？

它为不同的事务API(如JTA, JDBC, Hibernate, JPA, 和JDO)提供了统一的编程模型。它为编程式事务管理提供了一个简单的API而非一系列复杂的事务API(如JTA).它支持声明式事务管理。它可以和Spring 的多种数据访问技术很好的融合。

> #### 5、事务三要素是什么？

- 数据源：表示具体的事务性资源，是事务的真正处理者，如Mysql等。
- 事务管理器：像一个大管家，从整体上管理事务的处理过程，如打开、提交、回滚等。
- 事务应用和属性配置：像一个表示符，表明哪些方法要参与事务，如何参与事务，以及一些相关属性如隔离级别、超时时间等。

> #### 6、事务注解的本质是什么？

`@Transactional`这个注解仅仅是一些（`和事务相关的`）元数据，在运行时被事务基础设施读取消费，并使用这些元数据来配置bean的事务行为。大致来说具有两方面功能，**一是表明该方法要参与事务**，**二是配置相关属性来定制事务的参与方式和运行行为**。

声明式事务主要得益于SpringAOP。使用一个事务拦截器，在方法调用的`前后/周围进行事务性增强（advice）`，来驱动事务完成。

@Transactional注解既可以标注在类中，也可以标注在方法上。当在类上，默认应用到类里的所有方法。如果此时方法上也标注了，则方法上优先级高。另外注意方法一定要是public的。

### 1.5、循环依赖

> #### 1、Spring是如何解决循环依赖的？

![image-20220724110050537](https://oss.zhulinz.top//img/202207241100737.png)

1. 首先A完成初始化第一步并将自己提前曝光出来（通过ObjectFactory将自己提前曝光），在初始化的时候，发现自己依赖对象B，此时就会去尝试 get(B)，这个时候发现B还没有被创建出来。
2. 然后B就走创建流程，在B初始化的时候，同样发现自己依赖C，C也没有被创建出来。
3. 这个时候C又开始初始化进程，但是初始化的过程中发现自己依赖A，于是尝试get(A)。这个时候由于A已经添加至缓存中（一般都是添加至三级缓存 singletonFactories），通过ObjectFactory提前曝光，所以通过 ObjectFactory#getObject()方法来拿到A对象。C拿到A对象后顺利完成初始化，然后将自己添加到一级缓存中。
4. 回到B，B也可以拿到C对象，完成初始化，A可以顺利拿到B完成初始化。

## 二、SpringMVC

### 2.1、说说SpringMVC的理解？

**MVC是一种设计模式**

![image-20220722213930324](https://oss.zhulinz.top//img/202207222139753.png)

- M-Model 模型（完成业务逻辑：有javaBean构成，service+dao+entity）
- V-View 视图（做界面的展示 jsp，html……）
- C-Controller 控制器（接收请求—>调用模型—>根据结果派发页面）

springMVC是一个MVC的开源框架，springMVC=struts2+spring，springMVC就相当于是Struts2加上sring的整合，但是这里有一个疑惑就是，springMVC和spring是什么样的关系呢？这个在百度百科上有一个很好的解释：意思是说，springMVC是spring的一个后续产品，其实就是spring在原有基础上，又提供了web应用的MVC模块，可以简单的把springMVC理解为是spring的一个模块（类似AOP，IOC这样的模块），网络上经常会说springMVC和spring无缝集成，其实springMVC就是spring的一个子模块，所以根本不需要同spring进行整合。

**工作原理**

![image-20220722214050977](https://oss.zhulinz.top//img/202207222140229.png)

1. 用户发送请求至前端控制器DispatcherServlet。 

2. DispatcherServlet收到请求调用HandlerMapping处理器映射器。

3. 处理器映射器找到具体的处理器(可以根据xml配置、注解进行查找)，生成处理器对象及处理器拦截器(如果有则生成)一并返回给DispatcherServlet。 

4. DispatcherServlet调用HandlerAdapter处理器适配器。

5. HandlerAdapter经过适配调用具体的处理器(Controller，也叫后端控制器)。 

6. Controller执行完成返回ModelAndView。 

7. HandlerAdapter将controller执行结果ModelAndView返回给DispatcherServlet。 

8. DispatcherServlet将ModelAndView传给ViewReslover视图解析器。

9. ViewReslover解析后返回具体View。

10. DispatcherServlet根据View进行渲染视图（即将模型数据填充至视图中）。

11. DispatcherServlet响应用户。

**组件说明：**

以下组件通常使用框架提供实现：

- DispatcherServlet：作为前端控制器，整个流程控制的中心，控制其它组件执行，统一调度，降低组件之间的耦合性，提高每个组件的扩展性。HandlerMapping：通过扩展处理器映射器实现不同的映射方式，例如：配置文件方式，实现接口方式，注解方式等。
- HandlAdapter：通过扩展处理器适配器，支持更多类型的处理器。
- ViewResolver：通过扩展视图解析器，支持更多类型的视图解析，例如：jsp、freemarker、pdf、 excel等。

**组件：** 

1. 前端控制器DispatcherServlet（不需要工程师开发）,由框架提供 作用：接收请求，响应结果，相当于转发器，中央处理器。有了dispatcherServlet减少了其它组件之间的耦合度。 用户请求到达前端控制器，它就相当于mvc模式中的c，dispatcherServlet是整个流程控制的中心，由它调用其它组件处理用户的请求，dispatcherServlet的存在降低了组件之间的耦合性。

2. 处理器映射器HandlerMapping(不需要工程师开发),由框架提供 作用：根据请求的url查找Handler HandlerMapping负责根据用户请求找到Handler即处理器，springmvc提供了不同的映射器实现不同的映射方式，例如：配置文件方式，实现接口方式，注解方式等。

3. 处理器适配器HandlerAdapter 作用：按照特定规则（HandlerAdapter要求的规则）去执行Handler 通过HandlerAdapter对处理器进行执行，这是适配器模式的应用，通过扩展适配器可以对更多类型的处理器进行执行。

4. 处理器Handler(需要工程师开发) 注意：编写Handler时按照HandlerAdapter的要求去做，这样适配器才可以去正确执行Handler Handler 是继DispatcherServlet前端控制器的后端控制器，在DispatcherServlet的控制下Handler对具体的用户请求进行处理。 由于Handler涉及到具体的用户业务请求，所以一般情况需要工程师根据业务需求开发Handler。 

5. 视图解析器View resolver(不需要工程师开发),由框架提供 作用：进行视图解析，根据逻辑视图名解析成真正的视图（view） View Resolver负责将处理结果生成View视图，View Resolver首先根据逻辑视图名解析成物理视图名即具体的页面地址，再生成View视图对象，最后对View进行渲染将处理结果通过页面展示给用户。 springmvc框架提供了很多的View视图类型，包括：jstlView、freemarkerView、pdfView等。 一般情况下需要通过页面标签或页面模版技术将模型数据通过页面展示给用户，需要由工程师根据业务需求开发具体的页面。

6. 视图View(需要工程师开发jsp...) View是一个接口，实现类支持不同的View类型（jsp、freemarker、pdf...）

**核心架构的具体流程步骤如下：** 

1. 首先用户发送请求——>DispatcherServlet，前端控制器收到请求后自己不进行处理，而是委托给其他的解析器进行处理，作为统一访问点，进行全局的流程控制；

2. DispatcherServlet——>HandlerMapping， HandlerMapping 将会把请求映射为HandlerExecutionChain 对象（包含一个Handler 处理器（页面控制器）对象、多个HandlerInterceptor 拦截器）对象，通过这种策略模式，很容易添加新的映射策略； 

3. DispatcherServlet——>HandlerAdapter，HandlerAdapter 将会把处理器包装为适配器，从而支持多种类型的处理器，即适配器设计模式的应用，从而很容易支持很多类型的处理器； 

4. HandlerAdapter——>处理器功能处理方法的调用，HandlerAdapter 将会根据适配的结果调用真正的处理器的功能处理方法，完成功能处理；并返回一个ModelAndView 对象（包含模型数据、逻辑视图名）； 

5. ModelAndView的逻辑视图名——> ViewResolver， ViewResolver 将把逻辑视图名解析为具体的View，通过这种策略模式，很容易更换其他视图技术； 6、View——>渲染，View会根据传进来的Model模型数据进行渲染，此处的Model实际是一个Map数据结构，因此很容易支持其他视图技术； 

6. 返回控制权给DispatcherServlet，由DispatcherServlet返回响应给用户，到此一个流程结束。

   

看到这些步骤我相信大家很感觉非常的乱，这是正常的，但是这里主要是要大家理解springMVC中的几个组件：

- 前端控制器（DispatcherServlet）：接收请求，响应结果，相当于电脑的CPU。
- 处理器映射器（HandlerMapping）：根据URL去查找处理器。
- 处理器（Handler）：需要程序员去写代码处理逻辑的。
- 处理器适配器（HandlerAdapter）：会把处理器包装成适配器，这样就可以支持多种类型的处理器，类比笔记本的适配器（适配器模式的应用）。
- 视图解析器（ViewResovler）：进行视图解析，多返回的字符串，进行处理，可以解析成对应的页面。

## 二、SpringBoot

### 什么是SpringBoot？

SpringBoot是 Spring开源组织下的子项目，是Spring组件一站式解决方案，主要是简化了使用Spring的难度，简省了繁重的配置，提供了各种启动器，开发者能快速上手。

- 用来简化Spring应用的初始搭建以及开发过程，使用特定的方式来进行配置
- 创建独立的Spring引用程序main方法运行
- 嵌入的tomcat无需部署war文件
- 简化maven配置
- 自动配置Spring添加对应的功能starter自动化配置
- SpringBoot来简化Spring应用开发、约定大于配置、去繁化简。

### 2.1、为什么要使用SpringBoot？

1. **独立运行**

   SpringBoot内嵌了各种Servlet容器、Tomcat、Jetty等，现在不再需要打成war包部署到容器中，SpringBoot只要打成一个可执行的jar包就能独立运行，所有的依赖包都在一个jar包内。

2. **简化配置**

   spring-boot-starter-web启动器自动依赖其他组件，简少了maven的配置。

3. **自动配置**

   SpringBoot能根据当前类路径下的类、jar包来自动配置bean，如添加一个spring-boot-starter-web启动器就能拥有web的功能，无需其他配置。

4. **无代码生成和XML配置**

   SpringBoot配置过程中无代码生成，也无需XML配置文件就能完成所有配置工作，这一切都是借助于条件注解完成的。

5. **应用监控**

   SpringBoot提供了一系列端点可以监控服务及应用，做健康检测。

### 2.2、SpringBoot的核心注解有哪些？主要由哪几个注解组成的？

启动类上面的注解是@SpringBootApplication，它也是SpringBoot的核心注解，主要组合包含了以下3个注解：

- SpringBootConfiguration：组合了@Configuration注解，实现配置文件的功能。

- EnableAutoConfiguration：打开自动配置的功能，也可以关闭某个自动配置的选项，如关闭数据源自动配置功能

  ```java
  @SpringBootApplication(exclude = { DataSourceAutoConfiguration.class})
  ```

- ComponentScan：Spring组件扫描

### 2.3、运行SpringBoot有哪几种方式？

- 打包用命令或者放到容器中运行。
- 用Maven/Gradle插件运行。
- 直接执行main运行。

### 2.4、如何理解SpringBoot的starters？

Starters可以理解为启动器，它包含了一系列可以集成到应用里面的依赖包，你可以一站式集成Spring及其技术，而不需要到处找示例代码和依赖包。如你想使用Spring JPA访问数据库，只要加入spring-boot-starter-data-jpa启动器依赖就能使用了。Starters包含了许多项目中需要用到的依赖，它们能快速持续的运行，都是一系列得到支持的管理传递性依赖。

### 2.5、SpringBoot中的监视器是什么？

SpringBoot actuator是spring启动框架中的重要功能之一。Spring Boot监视器可帮助您访问生成环境中正在运行的应用程序的当前状态。有几个指标必须在生成环境中进行检查和监控。即使一些外部应用程序可能正在使用这些服务来向相关人员触发警报信息。监视器模块公开了一组可直接作为HTTP URL访问的REST端点来检查状态。

### 2.6、如何使用Spring Boot实现异常处理？

Spring提供了一种使用ControllerAdvice处理异常的非常有用的方法。可以通过实现一个ControllerAdvice类，来处理控制器类抛出的所有异常。

### 2.7、如何理解SpringBoot的配置加载顺序？

在SpringBoot中，可以使用以下几种方式来加载配置

1. properties文件
2. YAML文件
3. 系统环境变量
4. 命令行参数

### 2.8、SpringBoot的核心配置文件有哪几个？它们的区别是什么？

核心配置文件是application和bootstrap配置文件

application配置文件主要用于SpringBoot项目的自动化配置

bootstrap配置文件有以下几个应用场景

- 使用SpringCloud Config配置中心时，这时需要在bootstrap配置文件中添加连接到配置中心的配置属性来加载外部配置中心的配置信息。
- 一些固定的不能被覆盖的属性
- 一些加密/解密的信息。

### 2.9、SpringBoot如何保证接口幂等？

接口的幂等性是指：以相同的请求调用这个接口一次和调用这个接口多次，对系统产生的影响是相同的。如果一个接口满足这个特性，那么我们就说这个接口是一个幂等接口。

**接口幂等和防止重复提交是一回事吗？**

严格来说，并不是

- **幂等：**更多的是在重复请求已经发生，或是无法避免的情况下，采取一定的技术手段让这些重复请求不给系统带来副作用。
- **防止重复：**提交更多的是不让用户发起多次一样的请求。比如说用户在线购物下单时点了提交订单按钮，但是由于网络原因响应很慢，此时用户比较心急多次点击了订单提交按钮。这种情况下就可能会造成多次下单。一般防止重复提交的方案有：将订单按钮置灰、跳转到结果页等。主要还是从客户端的角度来解决问题。

**哪些情况下客户端是防止不了重复提交的？**

虽然在客户端做一些防止接口重复提交的事（比如将订单按钮置灰，跳转到结果页等），但是如下情况依然客户端是很难控制接口重复提交到后台的，这也进一步表明了`接口幂等和防止重复提交不是一回事`以及`后端接口保证接口幂等的必要性所在`。

- **接口超时重试：**接口可能会因为某些原因而调用失败，出于容错性考虑会加上失败重试的机制。如果接口调用一半，再次调用就会因为脏数据的存在而出现异常。
- **消息重复消费：**在使用消息中间件来处理消息队列，且手动ack确认消息被正在消费时。如果消费者突然断开连接，那么已经执行了一半的消息会重新放回队列。被其他消费者重新消费时就会导致结果异常，如数据库重复数据，数据库数据冲突，资源重复等。
- **请求重发：**网络抖动引发的nginx重发请求，造成重复调用。

**什么是接口幂等？**

在Http/1.1中，对幂等性进行了定义。它描述了一次和多次请求某一个资源对于资源本身应该具有同样的结果（网络超时问题除外），即第一次请求的时候对资源产生了副作用，但是以后的多次请求都不会再对资源产生副作用。副作用是不会对结果产生破坏或者产生不可预料的结果，也就是说，其任意多次执行对资源本身所产生的影响均与一次执行的影响相同。

**restful请求，幂等情况**

**SELECT查询操作**

1. GET：只是获取资源，对资源本身没有任何副作用，天然的幂等性。
2. HEAD：本质上和GET一样，获取头信息，主要是探活的作用，具有幂等性。
3. OPTIONS：获取当前URL所支持的方法，因此也是具有幂等性的。

**DELETE删除操作**

1. 删除的操作，如果从删除的一次和删除多次的角度看，数据并不会变化，这个角度看它是幂等的
2. 但是如果，从另外一个角度，删除数据一般是返回受影响的行数，删除一次和多次删除返回的受影响行数是不一样的，所以从这个角度它需要保证幂等。（折中而言DELETE操作通常也会被纳入保证接口幂等的要求）

**ADD/EDIT操作**

1. PUT：用于更新资源，有副作用，但是它应该满足幂等性，比如根据id更新数据，调用多次和N次的作用是相同的（根据业务需求而变）。
2. POST：用于添加资源，多次提交很可能产生副作用，比如订单提交，多次提交很可能产生多笔订单。

#### 常见的保证幂等的方式？

数据库层面

**悲观锁**

> 典型的数据库悲观锁：for update

```sql
select * from t_order where order_id = trade_no for update;
```

1. 当线程A执行for update，数据会对当前记录加锁，其他线程执行到此行代码的时候，会等待线程A释放锁之后，才可以获取锁，继续后续操作。
2. 事务提交后，for update获取的锁会自动释放。

**唯一ID/索引**

> 针对是插入操作

数据库唯一主键的实现主要是利用数据库中主键唯一约束的特性，一般来说唯一主键比较使用于“插入”时的幂等性，其能保证一张表中只能存在一条带该唯一主键的记录。

使用数据库唯一主键完成幂等性时需要注意的是，该主键一般来说并不是使用数据库中自增主键，而是使用分布式ID充当主键，这样才能保证在分布式环境下ID的全局唯一性。

- **去重表**

本质上也是一种唯一索引方案。

这种方法适用于在业务中唯一标的插入场景中，比如在以上的支付场景中，如果一个订单只会支付一次，所以订单ID可以作为唯一标识。然后可以创建一张去重表，并且把唯一标识作为唯一索引，在我们实现时，把创建支付单据和写入去去重表，放在一个事务中，如果重复创建，数据库会抛出唯一约束异常，操作就会回滚。

**乐观锁（基于版本号或者时间戳）**

> 针对更新操作

- 使用版本号或者时间戳

  这种方法适合在更新的场景中，比如要更新商品的名字，这时就可以在更新的接口中增加一个版本号、来做幂等。

  ```java
  boolean updateGoodsName(int id,String newName,int version);
  ```

- 状态机

  本质上也是乐观锁，这种方法适合在有状态机流转的情况下，比如就会订单的创建和付款，订单的付款肯定是在之前，这时可以通过在设计状态字段时，使用int类型，并且通过值类型的大小来做幂等，比如订单的创建为0，付款成功为100。付款失败为99。

  ```java
  update `order` set status=#{status} where id=#{id} and status<#{status}
  ```

**分布式锁**

分布式锁实现幂等的逻辑是，在每次执行方法之前判断，是否可以获取到分布式锁，如果可以，则表示为第一次执行方法，否则直接舍弃请求即可。

需要注意的是分布式锁的key必须为业务的唯一标识，通常为redis分布式锁或者zookeeper来实现分布式锁。

### 2.10、Spring、SpringMVC和SpringBoot有什么区别？

- **Spring**

  Spring最重要的特征是依赖注入。所有Spring Modules不是依赖注入就是IOC控制反转。恰当的使用DI或者是IOC的时候，可以开发松耦合应用。

- **SpringMVC**

  Spring MVC提供了一种分离式的方法来开发Web应用。通过运用像DispatcherServlet，ModelAndView和ViewResolver等一些简单的概念，开发web应用将会变的非常简单。

- **SpringBoot**

  Spring和SpringMVC的问题在于需要配置大量的参数，Spring Boot通过一个自动配置和启动的项来解决这个问题。

### 2.11、SpringBoot自动配置的原理？

在Spring程序main方法中，添加@SpringBootApplication或者@EnableAutoConfiguration会自动去maven中读取每个starter中的spring.factories文件，该文件中配置了所有需要被创建的Spring容器中的bean。

### 2.12、spring-boot-starter-parent有什么作用？

新建一个SpringBoot项目，默认都是有parent的，这个parent就是spring-boot-starter-parent，spring-boot-starter-parent主要有如下作用：

- 定义了Java编译版本
- 使用UTF-8格式编码
- 继承自spring-boor-dependencies，这里面定义了依赖的版本，也正是因为继承了这个依赖，所以我们在写依赖时才不需要写版本号
- 执行打包操作的配置
- 自动化的资源过滤
- 自动化的插件配置
