# JRotate
旋转木马轮播插件
---
### 效果预览
[click me](https://wohenxion.github.io/JRotate/)


### 兼容 ie8

#### 旋转木马必要样式
---
  

```
.cal-main{
            position: relative;
            width: 1000px;
            height:270px;
            margin: 100px auto
    
            }
.cal-main img{display: block;width: 100%}
.cal-item{position:absolute;left: 0;top: 0}
```


#### html结构
---



```
<div class="cal-main">
    <ul>
        <li class="cal-item"><a href="https://github.com/wohenxion" target="_blank"><img src="images/1.jpg" alt=""></a></li>
        <li class="cal-item"><a href="https://github.com/wohenxion" target="_blank"><img src="images/2.jpg" alt=""></a></li>
        <li class="cal-item"><a href="https://github.com/wohenxion" target="_blank"><img src="images/3.jpg" alt=""></a></li>
        <li class="cal-item"><a href="https://github.com/wohenxion" target="_blank"><img src="images/4.jpg" alt=""></a></li>
        <li class="cal-item"><a href="https://github.com/wohenxion" target="_blank"><img src="images/5.jpg" alt=""></a></li>
        <li class="cal-item"><a href="https://github.com/wohenxion" target="_blank"><img src="images/1.jpg" alt=""></a></li>
        <li class="cal-item"><a href="https://github.com/wohenxion" target="_blank"><img src="images/2.jpg" alt=""></a></li>
        <li class="cal-item"><a href="https://github.com/wohenxion" target="_blank"><img src="images/3.jpg" alt=""></a></li>
        <li class="cal-item"><a href="https://github.com/wohenxion" target="_blank"><img src="images/4.jpg" alt=""></a></li>
    
    </ul>
    <button type="button" class="next-btn">next</button>
    <button type="button" class="pre-btn">prev</button>
</div>
```

####  引入必要的JS
---

> 因为依赖JQuery



```
<script src="js/jquery.js"></script>
<script src="js/jRotate.js"></script>
```

> 初始化插件


```
<script>
    var a =JRotate.init('.cal-main',{
        "autoPlay": true,
        "width": 900,//设置容器的宽
        "height": 270,//设置容器的高默认等于第一张图片的高度
        "firstW": 640,//第一张图片的宽度
    });

</script>
```


> 以下为插件参数


```
"width": 1000,//设置容器的宽
"height": 270,//设置容器的高默认等于第一张图片的高度
"firstW": 640,//第一张图片的宽度
"scale": .8,//图片大小变化率
"vertical": "middle",//对齐方式middle top bottom
"opacity": .9, //透明度的变化
"autoPlay": false, //是否开启自动轮播 true false 默认false不开启
"delay": 2000,// 轮播时间间隔
"speed": 200,//过渡时间间隔
```
