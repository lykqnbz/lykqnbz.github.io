---
layout:     post
title:      "流离在过去的Css样式"
subtitle:   "健忘的福音"
date:       2017-11-16 08:50:15
author:     "AXiang"
header-img: "img/post-bg-css.jpg"
catalog:  true
tags:
    - 前端
    - Css
---

> 记一下老忘记但是炒鸡好用的单个Css样式

#### 333
<style>
.demo {
    margin-bottom: 40px;
}
.demo font,.demo-title {
    color: #1e70cd;
    margin: 60px 0 5px;
    text-align: center;
    font-size: 20px;
    font-weight: 300;
    line-height: 35px;
    display: block;
}
.demo .demo-iframe {
    margin: 1em auto;
    box-shadow: 0px 0px 1px 0px #aaa;
    background: #eee;
    position: relative;
}
.demo iframe {
    display: block;
    width: 100%;
    border: none;
    margin: 0;
    box-sizing: border-box;
    height: 400px;
    width: 1px;
    min-width: 100%;
}
</style>
<div class="demo">
	<font>简易视差Demo</font>
	<div class="demo-iframe">
		<iframe frameborder="0" scrolling="yes" src="http://wangxiang.vip/practiced-parallax_image/" style="height:340px"></iframe>
    </div>
</div>


