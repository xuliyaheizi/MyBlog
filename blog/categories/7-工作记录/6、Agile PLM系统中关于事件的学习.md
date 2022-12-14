---
title: Agile PLM系统中关于事件的学习
date: 2022-10-07
description: 在Agile PLM中是有`事件`、`事件处理程序`、`事件订户`。其中事件的配置是对应相对的事件类型和对象类型，事件处理程序是绑定相应的`Java PX程序`（触发此次事件的代码），最后通过事件订户将事件和事件处理程序连接起来。
tags:
 - Agile PLM
categories:
 - 工作
publish: true
---

## 一、事件

在Agile PLM中是有`事件`、`事件处理程序`、`事件订户`。其中事件的配置是对应相对的事件类型和对象类型，事件处理程序是绑定相应的`Java PX程序`（触发此次事件的代码），最后通过事件订户将事件和事件处理程序连接起来。

**事件类型**，在Agile PLM中设计了许多类型的事件接口，在目前为止的开发所涉及的事件为`更新事件(IUpdateEventInfo)`、`更新表事件(IUpdateTableEventInfo)`。其中更新事件下还有`更新标题块事件(IUpdateTitleBlockEventInfo)`、`另存为事件(ISaveAsEventInfo)`、`创建事件(ICreateEventInfo)`。

![IEventInfo](https://oss.zhulinz.top/newImage/202210081045010.png)

**事件订户**，其中有个触发器类型可以配置事件的前后触发顺序，事件在触发顺序上有前置事件和后置事件

- 前置事件(EventConstants.EVENT_TRIGGER_PRE)：前置事件中大多需求是`字段的校验`，校验一些字段是否满足规则，不满足规则的则通过抛出异常来提示信息，并且终止程序（阻止用户的进一步操作）。

  `注意`：在前置事件中还需注意字段的旧值与新值的获取。在操作过程该字段重新赋值，就需要通过`eventInfo.getValue(id)`来获取新赋的值。若无赋值则通过`eventInfo.getDataObject().getValue(id)`来获取旧值。

  ```java
  /**
   * 获取事件更新前的值，如果没有则获取原本的值
   * @param id
   * @return
   */
  private String eventInfoValue(Object id, IUpdateEventInfo eventInfo) throws APIException {
      return Objects.isNull(eventInfo.getValue(id)) ? StringUtil.ConvertString(eventInfo.getDataObject().getValue(id)) :
      StringUtil.ConvertString(eventInfo.getValue(id));
  }
  ```

  

- 后置事件(EventConstants.EVENT_TRIGGER_POST)：后置事件中的大多需求是`字段值带出`、`字段编码`。在字段重新赋值后进行操作。

### 1.1、更新事件(IUpdateEventInfo)

对象信息的更改大多都归为更新事件操作，对象的创建、另存为和标题块的更新。

> #### 1、创建事件(ICreateEventInfo)

创建对象时触发。

```java
public interface ICreateEventInfo extends IUpdateEventInfo {
    String getNewNumber() throws APIException;

    void setNewNumber(String var1) throws APIException;

    Integer getNewSubclassId() throws APIException;

    void setNewSubclassId(Integer var1) throws APIException;
}
```

> #### 2、另存为事件(ISaveAsEventInfo)

将对象另存为时触发。

此事件是在旧对象上点击另存为按钮，创建一个新对象，`IDataObject dataObject = ((ISaveAsEventInfo) iEventInfo).getDataObject();`获取的对象是旧对象，很容易将后续的程序操作作业在旧对象上。要作用于新对象需要`IDataObject dataObject = (IDataObject) iAgileSession.getObject(IItem.OBJECT_TYPE,((ISaveAsEventInfo) eventInfo).getNewNumber());`。

```java
public interface ISaveAsEventInfo extends IUpdateEventInfo {
    String getNewNumber() throws APIException;

    void setNewNumber(String var1) throws APIException;

    Integer getNewSubclassId() throws APIException;

    void setNewSubclassId(Integer var1) throws APIException;
}
```

> #### 3、更新标题块事件(IUpdateTitleBlockEventInfo)

修改对象标题块中的一些字段时触发。

在此事件中很容易出现字段不停更新无限循环的现象，原因是未选择合适的触发条件。在开发中需要通过`Integer[] attributeIds = ((IUpdateTitleBlockEventInfo) iEventInfo).getAttributeIds();`获取更新的`字段ID`，判断其中是否存在程序需要的字段ID，以此来作为程序触发的条件。

```java
public interface IUpdateTitleBlockEventInfo extends IUpdateEventInfo {
    boolean isRedlineUpdate() throws APIException;
}
```

## 二、数据库操作

在一些对于编号流水码的操作中，需要通过查询数据库来确定这个编号前缀对应的流水码最大值。

```java
IAgileSession session = SessionFactory.getSession();
String itemNumber = "LXSQ001111";
String condition = "[1047] like to '" + itemNumber + "%' order by [1047] desc";
IQuery query = (IQuery) session.createObject(IQuery.OBJECT_TYPE, ChangeConstants.CLASS_CHANGE_ORDERS_CLASS);
query.setCriteria(condition);
ITable table = query.execute();
ITwoWayIterator tableIterator = table.getTableIterator();
while (tableIterator.hasNext()) {
    IRow row = (IRow) tableIterator.next();
    if (row.getReferent().getName().split("-").length > 1) {
        System.out.println(Integer.parseInt(row.getReferent().getName().split("-")[1]) + 1);
    } else {
        System.out.println("1");
    }
    break;
}
```



