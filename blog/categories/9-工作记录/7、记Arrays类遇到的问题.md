---
title: 记Arrays类将数组转集合
date: 2022-10-10
description: 在使用Arrays类中的`asList()方法`将String数组转换成List集合后执行`add()方法`报错，`java.lang.UnsupportedOperationException`。定位原因是`asList()方法`转换的List类型是Arrays中的内部类ArrayList，而不是`java.util.ArrayList`。
tags:
 - Collection
categories:
 - 工作
publish: true
---

在使用Arrays类中的`asList()方法`将String数组转换成List集合后执行`add()方法`报错，`java.lang.UnsupportedOperationException`。定位原因是`asList()方法`转换的List类型是Arrays中的内部类ArrayList，而不是`java.util.ArrayList`。

<!-- more -->

## 一、问题记录

使用`Arrays.asList()`方法将String[]数组转换成List集合后，执行add()方法时报错`java.lang.UnsupportedOperationException`。

```java
String[] strArr = new String[]{"a", "b", "c"};
List<String> list = Arrays.asList(strArr);
System.out.println(list);
list.add("d");
System.out.println(list);
```

> **报错原因：**

通过阅读Arrays类中的源码可知，调用`Arrays.asList()`方法生成的是Arrays类中的`内部类ArrayList`，而不是`java.util.ArrayList`。内部类ArrayList继承了AbstractList，在AbstractList中的add()、remove()方法都是默认抛出`UnsupportedOperationException`错误且不做任何操作。`java.util.ArrayList`中是重写了add()、remove()方法，而内部类ArrayList中没有重写，所以会报错。

```java
@SafeVarargs
@SuppressWarnings("varargs")
public static <T> List<T> asList(T... a) {
    return new ArrayList<>(a);
}

/**
 * @serial include
 */
private static class ArrayList<E> extends AbstractList<E>
    implements RandomAccess, java.io.Serializable
{
    private static final long serialVersionUID = -2764017481108945198L;
    private final E[] a;

    ArrayList(E[] array) {
        a = Objects.requireNonNull(array);
    }

    @Override
    public int size() {
        return a.length;
    }

    @Override
    public Object[] toArray() {
        return a.clone();
    }

    @Override
    @SuppressWarnings("unchecked")
    public <T> T[] toArray(T[] a) {
        int size = size();
        if (a.length < size)
            return Arrays.copyOf(this.a, size,
                                 (Class<? extends T[]>) a.getClass());
        System.arraycopy(this.a, 0, a, 0, size);
        if (a.length > size)
            a[size] = null;
        return a;
    }

    @Override
    public E get(int index) {
        return a[index];
    }

    @Override
    public E set(int index, E element) {
        E oldValue = a[index];
        a[index] = element;
        return oldValue;
    }

    @Override
    public int indexOf(Object o) {
        E[] a = this.a;
        if (o == null) {
            for (int i = 0; i < a.length; i++)
                if (a[i] == null)
                    return i;
        } else {
            for (int i = 0; i < a.length; i++)
                if (o.equals(a[i]))
                    return i;
        }
        return -1;
    }

    @Override
    public boolean contains(Object o) {
        return indexOf(o) != -1;
    }

    @Override
    public Spliterator<E> spliterator() {
        return Spliterators.spliterator(a, Spliterator.ORDERED);
    }

    @Override
    public void forEach(Consumer<? super E> action) {
        Objects.requireNonNull(action);
        for (E e : a) {
            action.accept(e);
        }
    }

    @Override
    public void replaceAll(UnaryOperator<E> operator) {
        Objects.requireNonNull(operator);
        E[] a = this.a;
        for (int i = 0; i < a.length; i++) {
            a[i] = operator.apply(a[i]);
        }
    }

    @Override
    public void sort(Comparator<? super E> c) {
        Arrays.sort(a, c);
    }
}
```

> AbstractList类中的add()、remove()方法。

```java
/**
 * {@inheritDoc}
 *
 * <p>This implementation always throws an
 * {@code UnsupportedOperationException}.
 *
 * @throws UnsupportedOperationException {@inheritDoc}
 * @throws ClassCastException            {@inheritDoc}
 * @throws NullPointerException          {@inheritDoc}
 * @throws IllegalArgumentException      {@inheritDoc}
 * @throws IndexOutOfBoundsException     {@inheritDoc}
 */
public void add(int index, E element) {
    throw new UnsupportedOperationException();
}

/**
 * {@inheritDoc}
 *
 * <p>This implementation always throws an
 * {@code UnsupportedOperationException}.
 *
 * @throws UnsupportedOperationException {@inheritDoc}
 * @throws IndexOutOfBoundsException     {@inheritDoc}
 */
public E remove(int index) {
    throw new UnsupportedOperationException();
}
```

## 二、解决方法

将数组转换成集合的方法，可以使用Hutool工具中的CollUtil类。

```java
String[] strArr = new String[]{"a", "b", "c"};
List<String> list= CollUtil.newArrayList(strArr);
//List<String> list = new ArrayList<>(strArr.length);
//Collections.addAll(list, strArr);
System.out.println(list);
list.add("d");
System.out.println(list);
```

当然，也可以用原生jdk中的方法，(ps：Hutool中的转换集合方法更多样)，`转换方式也多种多样，不必局限`

```java
String[] strArr = new String[]{"a", "b", "c"};
List<String> list = new ArrayList<>(strArr.length);
Collections.addAll(list, strArr);
System.out.println(list);
list.add("d");
System.out.println(list);
```







