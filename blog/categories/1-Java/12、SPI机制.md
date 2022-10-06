---
title: Java中的SPI机制学习 
description: SPI（Service ProviderInterface），是JDK内置的一种服务提供发现机制，可以用来启用框架扩展和替换组件，主要是被框架的开发人员使用，比如java.sql.Driver接口，其他不同厂商可以针对同一接口做出不同的实现，MySQL和PostgreSQL都有不同的实现提供给用户，而Java的SPI机制可以为某个接口寻找服务实现。Java中SPI机制主要思想是将装配的控制权移到程序之外，在模块化设计中这个机制尤其重要，其核心思想就是解耦。
date: 2022-09-15
image: https://knowledgeimagebed.oss-cn-hangzhou.aliyuncs.com/img/202209061024530.png
tags:
 - SPI 
categories:
 - Java 
publish: true
---

## 一、概念

### 1、什么是SPI？

SPI(Service Provider Interface)服务提供发现接口，是JDK内置的一种服务提供发现机制，一直“`基于接口的编程+策略模式+配置文件`”组合实现的动态加载机制。

在面向对象的设计里，模块之间一般基于接口编程，且不对实现类进行硬编码。因为一旦代码里涉及了具体的实现类，就违反了可拔插的原则，如果需要替换一种实现，就需要修改代码。

为了实现在模块装配的时候不在程序里动态表明，就需要一种服务发现机制。Java中SPI就是这样一个机制，为某个接口寻找服务实现的机制。主要的核心思想是**解耦、增加可扩展性**。

### 2、可以用来做什么？

SPI可以用来`启用框架扩展`和`替换组件`，主要被框架的开发人员使用。Java中就预留了`java.sql.Driver`接口，不同的数据库厂商都可以根据这一接口做出不同的实现。还有其他，日志门面接口实现类加载（SLF4J加载不同提供商的日志实现类）、Spring中也大量使用了SPI,比如：对servlet3.0规范对ServletContainerInitializer的实现、自动类型转换Type Conversion SPI(Converter SPI、Formatter SPI)等。

### 3、SPI和API的比较

- API在大多数情况下，都是实现方制定接口并完成对接口的实现，调用方仅仅依赖接口调用，且无权选择不同实现。从使用人员上来说，API直接被应用开发人员使用。`组织上位于实现方所在的包中，实现和接口在一个包中`。
- SPI是调用方来制定接口规范，提供给外部来实现，调用方在调用时则选择自己需要的外部实现。从使用人员上来说，SPI被框架扩展人员使用。`组织上位于调用方所在的包中，实现位于独立的包中`。

![image-20220915231238479](https://oss.zhulinz.top/newImage/202209152312533.png)

### 4、SPI的缺点

- `ServiceLoader`使用的延迟加载，但是只能通过遍历全部获取，将接口的实现类全部加载并实例一遍。造成了资源浪费，不想使用某个实现类时，该类也会被加载并实例。
- 获取某个实现类的方式不够灵活，只能通过`Iterator（遍历）`形式获取，不能根据某个参数来获取对应的实现类。
- **多个并发多线程**使用`ServiceLoader`类的实例是不安全的。

## 二、Java中SPI的原理

当服务的提供者提供了一种接口的实现之后，需要在`classpath`下的`META-INF/services/目录`里创建一个以服务接口命名的文件，这个文件里的内容就是这个接口的具体的实现类。当其他的程序需要这个服务的时候，就可以通过查找这个jar包（一般都是以jar包做依赖）的`META-INF/services/`中的配置文件，配置文件中有接口的具体实现类名，可以根据这个类名进行加载实例化，就可以使用该服务了。JDK中查找服务的实现的工具类是：`java.util.ServiceLoader`。

> **1、先定义一个接口 interface**

```java
public interface Search {
    public List<String> searchDoc(String keyWord);
}
```

> **2、接口的实现类**

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

> **3、在resources下新建META-INF/services/目录，新建接口的全限定名的文件**

![image-20220915224945707](https://oss.zhulinz.top/newImage/202209152250910.png)

```
com.zhulin.service.impl.DataSearch
com.zhulin.service.impl.FileSearch
```

> **4、测试**

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

> **1、基本变量**

```java
//首先该方法实现了Iterable接口，遍历的方式去发现所有服务实现者
public final class ServiceLoader<S> implements Iterable<S>

//方法中的变量
//加载实现类的路径
private static final String PREFIX = "META-INF/services/";

//要被加载的服务的类或接口
private final Class<S> service;

//classloader用来定位、加载和实例服务提供者
private final ClassLoader loader;

//访问控制上下文
private final AccessControlContext acc;

//存储器，按照实例化的顺序缓存已经实例的服务提供者
private LinkedHashMap<String,S> providers = new LinkedHashMap<>();

//迭代器
private LazyIterator lookupIterator;
```

> **2、类的构造器以及配置文件的解析方法**

```java
/**
  *清除此加载器的提供程序缓存，以便重新加载所有提供程序。
  *调用此方法后，迭代器方法的后续调用将懒惰地从头开始查找并实例化提供程序，就像新创建的加载程序所做的那样。
  *此方法适用于可以将新提供程序安装到正在运行的 Java 虚拟机中的情况。
  */
public void reload() {
    providers.clear();
    lookupIterator = new LazyIterator(service, loader);
}

//构造器
private ServiceLoader(Class<S> svc, ClassLoader cl) {
    //校验服务接口
    service = Objects.requireNonNull(svc, "Service interface cannot be null");
    //使用指定的类加载器，如果没有，则使用系统指定类加载器（应用加载器）
    loader = (cl == null) ? ClassLoader.getSystemClassLoader() : cl;
    acc = (System.getSecurityManager() != null) ? AccessController.getContext() : null;
    reload();
}

//解析配置文件中的每一行
private int parseLine(Class<?> service, URL u, BufferedReader r, int lc,List<String> names) throws IOException, ServiceConfigurationError
{
    //读取一行
    String ln = r.readLine();
    if (ln == null) {
        return -1;
    }
    //#代表注释
    int ci = ln.indexOf('#');
    if (ci >= 0) ln = ln.substring(0, ci);
    //去掉空格
    ln = ln.trim();
    //有注释时 n=0，会忽略此行，继续读取下一行
    int n = ln.length();
    if (n != 0) {
        //校验每一行
        if ((ln.indexOf(' ') >= 0) || (ln.indexOf('\t') >= 0))
            fail(service, u, lc, "Illegal configuration-file syntax");
        int cp = ln.codePointAt(0);
        if (!Character.isJavaIdentifierStart(cp))
            fail(service, u, lc, "Illegal provider-class name: " + ln);
        for (int i = Character.charCount(cp); i < n; i += Character.charCount(cp)) {
            cp = ln.codePointAt(i);
            if (!Character.isJavaIdentifierPart(cp) && (cp != '.'))
                fail(service, u, lc, "Illegal provider-class name: " + ln);
        }
        if (!providers.containsKey(ln) && !names.contains(ln))
            names.add(ln);
    }
    //返回下一行的行号
    return lc + 1;
}

//解析配置文件，解析指定url的配置文件
private Iterator<String> parse(Class<?> service, URL u) throws ServiceConfigurationError
{
    InputStream in = null;
    BufferedReader r = null;
    ArrayList<String> names = new ArrayList<>();
    try {
        in = u.openStream();
        r = new BufferedReader(new InputStreamReader(in, "utf-8"));
        int lc = 1;
        //解析配置文件中的每一行
        while ((lc = parseLine(service, u, r, lc, names)) >= 0);
    } catch (IOException x) {
        fail(service, "Error reading configuration file", x);
    } finally {
        try {
            if (r != null) r.close();
            if (in != null) in.close();
        } catch (IOException y) {
            fail(service, "Error closing configuration file", y);
        }
    }
    return names.iterator();
}
```

> **3、迭代器机制**

```java
//遍历服务提供者	以懒加载的方式加载可用的服务提供者
//懒加载的实现是：解析配置文件和实例化服务提供者的工作由迭代器本身完成
public Iterator<S> iterator() {
    return new Iterator<S>() {

        Iterator<Map.Entry<String,S>> knownProviders
            = providers.entrySet().iterator();

        public boolean hasNext() {
            if (knownProviders.hasNext())
                return true;
            return lookupIterator.hasNext();
        }

        public S next() {
            if (knownProviders.hasNext())
                return knownProviders.next().getValue();
            return lookupIterator.next();
        }

        public void remove() {
            throw new UnsupportedOperationException();
        }

    };
}

//服务提供者查找的迭代器
private class LazyIterator implements Iterator<S> {

    Class<S> service;//服务提供者接口
    ClassLoader loader;//类加载器
    Enumeration<URL> configs = null;//保存实现类的url
    Iterator<String> pending = null;//保存实现类的全名
    String nextName = null;//迭代器中下一个实现类的全名

    private LazyIterator(Class<S> service, ClassLoader loader) {
        this.service = service;
        this.loader = loader;
    }

    private boolean hasNextService() {
        if (nextName != null) {
            return true;
        }
        if (configs == null) {
            try {
                String fullName = PREFIX + service.getName();
                if (loader == null)
                    configs = ClassLoader.getSystemResources(fullName);
                else
                    configs = loader.getResources(fullName);
            }
        }
        while ((pending == null) || !pending.hasNext()) {
            if (!configs.hasMoreElements()) {
                return false;
            }
            pending = parse(service, configs.nextElement());
        }
        nextName = pending.next();
        return true;
    }

    private S nextService() {
        if (!hasNextService())
            throw new NoSuchElementException();
        String cn = nextName;
        nextName = null;
        Class<?> c = null;
        try {
            c = Class.forName(cn, false, loader);
        }
        if (!service.isAssignableFrom(c)) {
            fail(service, "Provider " + cn  + " not a subtype");
        }
        try {
            S p = service.cast(c.newInstance());
            providers.put(cn, p);
            return p;
        }
    }

    public boolean hasNext() {
        if (acc == null) {
            return hasNextService();
        } else {
            PrivilegedAction<Boolean> action = new PrivilegedAction<Boolean>() {
                public Boolean run() { return hasNextService(); }
            };
            return AccessController.doPrivileged(action, acc);
        }
    }

    public S next() {
        if (acc == null) {
            return nextService();
        } else {
            PrivilegedAction<S> action = new PrivilegedAction<S>() {
                public S run() { return nextService(); }
            };
            return AccessController.doPrivileged(action, acc);
        }
    }

    public void remove() {
        throw new UnsupportedOperationException();
    }

}
```

> **4、加载、创建ServiceLoader**

```java
//为指定的服务使用指定的类加载器来创建一个ServiceLoader
public static <S> ServiceLoader<S> load(Class<S> service,ClassLoader loader){
    return new ServiceLoader<>(service, loader);
}

//使用线程上下文的类加载器来创建ServiceLoader
public static <S> ServiceLoader<S> load(Class<S> service) {
    ClassLoader cl = Thread.currentThread().getContextClassLoader();
    return ServiceLoader.load(service, cl);
}

//使用扩展类加载器为指定的服务创建ServiceLoader
//只能找到并加载已经安装到当前Java虚拟机中的服务提供者，应用程序类路径中的服务提供者将被忽略
public static <S> ServiceLoader<S> loadInstalled(Class<S> service) {
    ClassLoader cl = ClassLoader.getSystemClassLoader();
    ClassLoader prev = null;
    while (cl != null) {
        prev = cl;
        cl = cl.getParent();
    }
    return ServiceLoader.load(service, prev);
}
```

> **5、总结**

`ServiceLoader`这个类主要实现了`Iterable`接口，实现类迭代器的`hasNext`和`next`方法。然后去调用`lookupIterator`的`hasNext`和`next`方法，`lookupIterator`是懒加载迭代器。

懒加载迭代器`LazyIterator的hasNext`就是去读取目录`META-INF/services/`的配置文件，最后通过反射方法`Class.forName()`加载类对象，并用`newInstance`方法将类实例化，并把实例化后的类缓存到`providers`对象中，(`LinkedHashMap<String,S>`类型）然后返回实例对象。

通过源码得知Java内置的SPI机制只能通过遍历的方式去访问服务提供接口的实现类，而且服务提供接口的配置文件也只能放在`MTEA-INF/services/`目录下。

## 三、Spring中的SPI机制

接口与实现类与上述Java中的SPI例子一样，不同的是`META-INF`目录下的配置文件。Spring中是在`META-INF目录下创建spring.factories文件`，里面写接口和实现类。(多个实现类以逗号隔开)

```tex
com.zhulin.service.Search=com.zhulin.service.impl.FileSearch,com.zhulin.service.impl.DataSearch
```

```java
//测试
public static void main(String[] args) {
    List<Search> searches = SpringFactoriesLoader.loadFactories(Search.class,Thread.currentThread().getContextClassLoader());
    for (Search search : searches) {
        search.searchDoc("hello");
    }
}

//输出
文件搜索hello
数据库搜索hello
```

### 源码分析

> **1、Spring中SPI的变量**

```java
//配置文件路径
public static final String FACTORIES_RESOURCE_LOCATION = "META-INF/spring.factories";
//输出日志
private static final Log logger = LogFactory.getLog(SpringFactoriesLoader.class);
static final Map<ClassLoader, Map<String, List<String>>> cache = new ConcurrentReferenceHashMap();
```

> **2、核心原理**

```java
public static <T> List<T> loadFactories(Class<T> factoryType, @Nullable ClassLoader classLoader) {
    Assert.notNull(factoryType, "'factoryType' must not be null");
    ClassLoader classLoaderToUse = classLoader;
    //确定类加载器
    if (classLoader == null) {
        classLoaderToUse = SpringFactoriesLoader.class.getClassLoader();
    }
    //核心逻辑，解析和加载MEAT-INFO下的文件
    List<String> factoryImplementationNames = loadFactoryNames(factoryType, classLoaderToUse);
    if (logger.isTraceEnabled()) {
        logger.trace("Loaded [" + factoryType.getName() + "] names: " + factoryImplementationNames);
    }

    List<T> result = new ArrayList(factoryImplementationNames.size());
    Iterator var5 = factoryImplementationNames.iterator();
	//遍历实现类的全限定名并进行实例化
    while(var5.hasNext()) {
        String factoryImplementationName = (String)var5.next();
        result.add(instantiateFactory(factoryImplementationName, factoryType, classLoaderToUse));
    }
	//排序
    AnnotationAwareOrderComparator.sort(result);
    return result;
}

public static List<String> loadFactoryNames(Class<?> factoryType, @Nullable ClassLoader classLoader) {
    ClassLoader classLoaderToUse = classLoader;
    //仍然确定类加载器
    if (classLoader == null) {
        classLoaderToUse = SpringFactoriesLoader.class.getClassLoader();
    }
	//获取接口的全限定名
    String factoryTypeName = factoryType.getName();
    return (List)loadSpringFactories(classLoaderToUse).getOrDefault(factoryTypeName, Collections.emptyList());
}

private static Map<String, List<String>> loadSpringFactories(ClassLoader classLoader) {
    Map<String, List<String>> result = (Map)cache.get(classLoader);
    if (result != null) {
        return result;
    } else {
        HashMap result = new HashMap();

        try {
            //获取所有jar包中META-INF/spring.factories文件路径，以枚举值返回
            Enumeration urls = classLoader.getResources("META-INF/spring.factories");

            while(urls.hasMoreElements()) {
                URL url = (URL)urls.nextElement();
                UrlResource resource = new UrlResource(url);
                Properties properties = PropertiesLoaderUtils.loadProperties(resource);
                Iterator var6 = properties.entrySet().iterator();

                while(var6.hasNext()) {
                    Entry<?, ?> entry = (Entry)var6.next();
                    String factoryTypeName = ((String)entry.getKey()).trim();
                    String[] factoryImplementationNames = StringUtils.commaDelimitedListToStringArray((String)entry.getValue());
                    String[] var10 = factoryImplementationNames;
                    int var11 = factoryImplementationNames.length;

                    for(int var12 = 0; var12 < var11; ++var12) {
                        String factoryImplementationName = var10[var12];
                        ((List)result.computeIfAbsent(factoryTypeName, (key) -> {
                            return new ArrayList();
                        })).add(factoryImplementationName.trim());
                    }
                }
            }

            result.replaceAll((factoryType, implementations) -> {
                return (List)implementations.stream().distinct().collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList));
            });
            cache.put(classLoader, result);
            return result;
        } catch (IOException var14) {
            throw new IllegalArgumentException("Unable to load factories from location [META-INF/spring.factories]", var14);
        }
    }
}
```

> **3、类实例与初始化**

```java
private static <T> T instantiateFactory(String factoryImplementationName, Class<T> factoryType, ClassLoader classLoader) {
    try {
        // 1.使用classLoader类加载器加载instanceClassName类
        Class<?> factoryImplementationClass = ClassUtils.forName(factoryImplementationName, classLoader);
        if (!factoryType.isAssignableFrom(factoryImplementationClass)) {
            throw new IllegalArgumentException("Class [" + factoryImplementationName + "] is not assignable to factory type [" + factoryType.getName() + "]");
        } else {
            //实例化
            return ReflectionUtils.accessibleConstructor(factoryImplementationClass, new Class[0]).newInstance();
        }
    } catch (Throwable var4) {
        throw new IllegalArgumentException("Unable to instantiate factory class [" + factoryImplementationName + "] for factory type [" + factoryType.getName() + "]", var4);
    }
}
```

## 参考文章

- [Java常用机制 - SPI机制详解](https://www.pdai.tech/md/java/advanced/java-advanced-spi.html)