---
title: 基于Excel的报表操作
date: 2022-09-05
description: 项目开发中总能遇到各种对excel报表的操作，描述下几种便于操作excel的工具类。
tags:
 - excel
categories:
 - 工作
publish: true
---
## 一、Excel相关工具

### 1、Apache POI

Apache POI 简介是用Java编写的免费开源的跨平台的 Java API，Apache POI提供API给Java程式对Microsoft Office（Excel、WORD、PowerPoint、Visio等）格式档案读和写的功能。POI为“Poor Obfuscation Implementation”的首字母缩写，意为“可怜的模糊实现”。

_____

- [**官方网站**](https://poi.apache.org/)
- [**API文档-4.1**](https://poi.apache.org/apidocs/4.1/)

### 2、Hutool-POI

Java针对MS Office的操作的库屈指可数，比较有名的就是Apache的POI库。这个库异常强大，但是使用起来也并不容易。Hutool针对POI封装一些常用工具，使Java操作Excel等文件变得异常简单。

Hutool-poi是针对Apache POI的封装，因此需要用户自行引入POI库,Hutool默认不引入。到目前为止，Hutool-poi支持：

- Excel文件（xls, xlsx）的读取（ExcelReader）
- Excel文件（xls，xlsx）的写出（ExcelWriter）

_____

- [**Hutool-POI参考文档**](https://hutool.cn/docs/#/poi/%E6%A6%82%E8%BF%B0)
- [**API文档**](https://apidoc.gitee.com/dromara/hutool/)

### 3、Easy Excel

EasyExcel是一个基于Java的、快速、简洁、解决大文件内存溢出的Excel处理工具。他能让你在不用考虑性能、内存的等因素的情况下，快速完成Excel的读、写等功能。

_____

- [**官方网站**](https://easyexcel.opensource.alibaba.com/)
- [**API文档**](https://easyexcel.opensource.alibaba.com/docs/current/api/)

## 二、工作中基于Hutool-POI对excel的操作

```java
ExcelWriter writer = new ExcelWriter(file, "Sheet2");

//设置全局样式和字体样式
StyleSet styleSet = writer.getStyleSet();
styleSet.setBackgroundColor(IndexedColors.WHITE, true);
styleSet.setBorder(BorderStyle.THIN, IndexedColors.GREY_25_PERCENT);
Font font = writer.createFont();
font.setFontName("Arial");
font.setFontHeightInPoints((short) 10);
styleSet.setFont(font, false);
styleSet.setAlign(HorizontalAlignment.LEFT, VerticalAlignment.BOTTOM);

//设置列宽度
writer.setColumnWidth(0, 9);
writer.setColumnWidth(1, 19);
writer.setColumnWidth(2, 23);
writer.setColumnWidth(3, 73);
writer.setColumnWidth(4, 9);
writer.setColumnWidth(5, 9);
writer.setColumnWidth(6, 9);
writer.setColumnWidth(7, 34);
writer.setColumnWidth(8, 10);
writer.setColumnWidth(9, 28);
writer.setColumnWidth(10, 28);
//设置行高
writer.setDefaultRowHeight(25);

//自定义标题名
writer.addHeaderAlias("id", "序号");
writer.addHeaderAlias("parentCode", "");
writer.addHeaderAlias("childCode", "编号");
writer.addHeaderAlias("description", "描述");
writer.addHeaderAlias("num", "数量");
writer.addHeaderAlias("attritionRate", "损耗率");
writer.addHeaderAlias("processingProperties", "制程属性");
writer.addHeaderAlias("refIndItem", "参考指示项");
writer.addHeaderAlias("bomComments", "BOM注释");
writer.addHeaderAlias("bomList01", "替代组 / BOM 列表 01");
writer.addHeaderAlias("bomList02", "替代顺序 / BOM 列表 02");

//写出数据
writer.write(excelRows);

CellStyle columnCenter = writer.createCellStyle();
columnCenter.setAlignment(HorizontalAlignment.CENTER);
columnCenter.setFont(font);
writer.setColumnStyleIfHasData(0, 1, columnCenter);
writer.setColumnStyleIfHasData(2, 0, columnCenter);
writer.setColumnStyleIfHasData(4, 0, columnCenter);

//设置背景颜色
CellStyle columnColor1 = writer.createCellStyle();
// 顶边栏
columnColor1.setBorderTop(BorderStyle.THIN);
columnColor1.setTopBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
// 右边栏
columnColor1.setBorderRight(BorderStyle.THIN);
columnColor1.setRightBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
// 底边栏
columnColor1.setBorderBottom(BorderStyle.THIN);
columnColor1.setBottomBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
// 左边栏
columnColor1.setBorderLeft(BorderStyle.THIN);
columnColor1.setLeftBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
columnColor1.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
columnColor1.setFillPattern(FillPatternType.SOLID_FOREGROUND);
writer.setColumnStyleIfHasData(1, 1, columnColor1);

writer.close();
```

