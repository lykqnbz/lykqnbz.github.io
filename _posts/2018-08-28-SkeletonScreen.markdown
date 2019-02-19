---
layout:     post
title:      "前端骨架屏方案小结"
subtitle:   "Skeleton Screen"
date:       2018-08-28 21:11:14
author:     "AXiang"
header-img: "img/post-bg-2015.jpg"
catalog:  true
tags:
    - 前端
    - 响应式设计
---

> “学习大咖的细节”

## 骨架屏

最近在项目不时有用到骨架屏的需求.在这里按照个人的理解做了一个汇总和分类笔记. 

## 关于骨架屏(简介)
---
骨架屏就是在页面数据尚未加载前先给用户展示出页面的大致结构，直到请求数据返回后再渲染页面，补充进需要显示的数据内容。常用于文章列表、动态列表页等相对比较规则的列表页面。
很多项目中都有应用:ex:饿了么h5版本,知乎,facebook等网站中都有应用。
借个图举例如下:
![骨架例子](/img/in-post/post-responsive/responsive-1808_1.png)

## 两类用途
---
简介中作了关于用途的说明,但是仍然可以继续细分:

1.作为spa中路由切换的loading,结合组件的生命周期和ajax请求返回的时机来使用.
2.作为首屏渲染的优化.

#### 第一类用途

第一类用途需要自己编写骨架屏,推荐两个成熟方便定制的svg组件定制为骨架屏的方案
- [react-content-loader](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fdanilowoz%2Freact-content-loader)
- [vue-content-loader](https://github.com/egoist/vue-content-loader)
- img替换使用的1x1像素gif替换地址:data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7

#### 作为首屏渲染(自动化方案)

该方案是饿了么在骨架屏的实践中总结出的一套方案:

- 骨架屏的dom结构和css通过离线生成后构建的时候注入模板中的节点下面.
- **！！重点标记！！**原理[相关eleme骨架屏插件实现原理](https://github.com/Jocs/jocs.github.io/issues/22)
- 方案的项目地址:[page-skeleton-webpack-plugin](https://github.com/ElemeFE/page-skeleton-webpack-plugin)
- 使用时候的注意点:   
1.cssUnit的配置: 需要使用自适应的单位,按照文档给出的选择范围选,直接用 px 生成的比例会不合适.   
2.puppeteer有大概80M, 安装的时候有可能不能一次下载成功.
- 原理:   

*通过 puppeteer 在服务端操控 headless Chrome 打开开发中的需要生成骨架屏的页面，在等待页面加载渲染完成之后，在保留页面布局样式的前提下，通过对页面中元素进行删减或增添，对已有元素通过层叠样式进行覆盖，这样达到在不改变页面布局下，隐藏图片和文字，通过样式覆盖，使得其展示为灰色块。然后将修改后的 HTML 和 CSS 样式提取出来，这样就是骨架屏了.*
![puppeteer例子2](/img/in-post/post-responsive/responsive-1808_2.png)

## 其他方案
---
结合ssr render/prerender来使用:    
1.事先编写好骨架屏组件通过ssr render 解析注入html文件中(除了需要自己编写外其实过程类似于上面的自动化方案)[参考文章](https://segmentfault.com/a/1190000014832185n)    
2.1中事先编写好的骨架屏组件可以用图片代替 (svg) ;或者设计师设计好.

## 小程序的骨架屏
---
结合目前大火的小程序，也可以预设骨架屏，因为小程序不存在预渲染的概念,但是还是可以通过自己预先编写骨架屏组件放在页面中,等到异步请求的数据回来后更新页面.

## 建议配合其他加载技术一起使用
---
用户的网络环境是复杂的，如果加载持续时间很久，单凭**骨架屏**起不到流畅过渡的效果，建议配合懒加载（先文字后图片）、逐条加载、预加载等技术，以达到更出色的体验。   
以下是传统转菊花和骨架屏配合懒加载等技术的对比。
![puppeteer例子3](/img/in-post/post-responsive/responsive-1808_3.gif)
```css
    <!-- 常用骨架屏动效 -->
    .skeleton .skeleton-content {
        background: #f1f1f1;
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.25) 25%, transparent 25%);
        background-size: 20rem 20rem;
        animation: skeleton-stripes 1s linear infinite;
        border-radius: 5px;
    }
    @keyframes skeleton-stripes {
        from {
            background-position: 0 0;
        }
        to {
            background-position: 20rem 0;
        }
    }

```