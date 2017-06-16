/**
 * Created by zoulifeng on 2017/6/13.
 */
;(function ($) {
    var JRotate = function (box, config) {
        var self = this;
        this.setting = {
            "width": 1000,//设置容器的宽
            "height": 270,//设置容器的高默认等于第一张图片的高度
            "firstW": 640,//第一张图片的宽度
            "scale": .8,//图片大小变化率
            "vertical": "middle",//对齐方式middle top bottom
            "opacity": .9, //透明度的变化
            "autoPlay": false, //是否开启自动轮播 true false 默认false不开启
            "delay": 2000,// 轮播时间间隔
            "speed": 200,//过渡时间间隔
        };

        $.extend(this.setting, config);
        this.boxs = $(box); //获取该容器
        this.boxItems = this.boxs.find('li.cal-item'); //获取容器下所有的子项 li
        this.firstItem = this.boxItems.first(); //第一项

        // this.lastItem = this.boxItems.last();
        this.nextBtn = this.boxs.find('.next-btn'); //next 按钮
        this.preBtn = this.boxs.find('.pre-btn'); //prev 按钮

        this.currentCenter = Math.floor(this.boxItems.length / 2); //获取最大的z-index,基数向下取值
        this.rotateFlag = true;  //用来防止多次点击出现bug的标识，只有上一个点击完成才允许下一次点击
        this.zIndexArr = [];  //存放li  的z-index值;
        this.timer;
        if (this.boxItems.length % 2 == 0) {
            //如果是偶数项，则复制第一项到ul末尾，行程奇数项
            var node = this.boxItems.eq(0).clone();
            this.boxs.find('ul').append(node)
            //更新容器所有子项为当前
            this.boxItems = this.boxs.find('li.cal-item');
        }
        //初始容器样式
        this.setInitValue();


        //点击next按钮事件
        this.nextBtn.click(function () {
            clearInterval(self.timer)
            if (self.rotateFlag) {
                self.rotateFlag = false;
                self.moveItem('next');
            }
        })
        //点击prev事件
        this.preBtn.click(function () {
            clearInterval(self.timer)
            if (self.rotateFlag) {
                self.rotateFlag = false;
                self.moveItem('prev');
            }


        })

        //点击列表某一项的时候显示该项为轮播当前项
        this.boxItems.click(function (e) {

            var currentPosition = $(this).css('zIndex');
            //如果是最前面显示的当前项则可以点击链接跳转，否则显示该项为轮播当前项
            if (currentPosition != self.currentCenter) {
                self.moveItem(null, $(this))
                e.preventDefault();//阻止浏览器默认事件 这里主要是a标签的 href 跳转事件
                return;
            }
        });

        this.boxItems.hover(function () {
            clearInterval(self.timer)
        }, function () {
            self.autoPlay()
        })


    }
    JRotate.prototype = {
        moveItem: function (v, item) {
            var self = this;
            var boxsSize = self.boxItems.length;
            var nowIndex = 1;
            if (item) {
                nowIndex = item.css('zIndex')
            }

            var count = self.currentCenter - nowIndex;
            this.zIndexArr = [];
            this.ver = [];

            this.boxItems.each(function (i) {
                var that = $(this);
                var next;
                if (item) {
                    if (item.hasClass('l')) {
                        next = that.nextAll()[count - 1] ? that.nextAll()[count - 1] : self.boxItems[that.index() + count - boxsSize]
                    } else {
                        next = that.prevAll()[count - 1] ? that.prevAll() [count - 1] : self.boxItems[boxsSize - count + that.index()]
                    }


                } else {
                    count = 1
                    if (v == 'prev') {
                        next = that.nextAll()[count - 1] ? that.nextAll()[count - 1] : self.boxItems[that.index() + count - boxsSize]
                        // next = that.next()[0] ? that.next() : self.firstItem
                    } else {
                        next = that.prevAll()[count - 1] ? that.prevAll() [count - 1] : self.boxItems[boxsSize - count + that.index()]
                        // next = that.prev()[0] ? that.prev() : self.lastItem
                    }
                }


                next = $(next);

                var width = next.width(),
                    height = next.height(),
                    zIndex = next.css("zIndex"),
                    opacity = next.css("opacity"),
                    left = next.css("left"),
                    vertical = next.attr('class'),
                    top = next.css("top");
                self.ver.push(vertical)
                self.zIndexArr.push(zIndex);
                that.animate({
                    width: width,
                    height: height,
                    // zIndex :zIndex,
                    opacity: opacity,
                    left: left,
                    top: top
                }, self.setting.speed, function () {
                    self.rotateFlag = true;
                });

            })
            //zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的zindex
            self.boxItems.each(function (i) {
                $(this).attr('class', self.ver[i])
                $(this).css("zIndex", self.zIndexArr[i]);
            });
        },
        autoPlay: function () {
            var self = this;
            if (self.setting.autoPlay) {
                this.timer = setInterval(function () {
                    self.moveItem('prev');
                }, self.setting.delay)
            }

        },
        setTop: function (height) {
            if (this.setting.vertical == 'middle') {
                return (this.setting.height - height) / 2
            } else if (this.setting.vertical == 'top') {
                return 0
            } else {
                return (this.setting.height - height)
            }

        },
        setPosition: function () {
            var self = this,
                rw = self.setting.firstW,
                rh = self.setting.height,
                zindex = Math.floor(this.boxItems.length / 2),//中间位置的z-index值
                left,
                top,
                opacity = self.setting.opacity, //透明度
                avW = (self.setting.width - self.setting.firstW) / ((zindex) * 2), //每一项的间距
                lItem = this.boxItems.slice(Math.ceil(this.boxItems.length / 2)), //左边项集合
                rItem = this.boxItems.slice(1, Math.ceil(this.boxItems.length / 2));//右边项集合


            rItem.each(function (i) {
                zindex--;
                rw = rw * self.setting.scale; //前一项宽*scale
                rh = rh * self.setting.scale;//前一项高*scale
                left = self.setting.width - (rw + zindex * avW); //该项left的值 总宽 - 该项宽 -该项距离右边宽
                top = self.setTop(rh);
                opacity = opacity * self.setting.opacity;
                $(this).addClass('r'); //标记为右边
                $(this).css({
                    zIndex: zindex,
                    width: rw,
                    height: rh,
                    left: left,
                    top: top,
                    opacity: opacity
                });
            });
            var lw, lh;
            //左边第一项的宽高与右边最后一项呈对称关系，所以相等
            lw = rItem.last().width();
            lh = rItem.last().height();
            lItem.each(function (i) {
                left = i * avW;
                top = self.setTop(lh);
                $(this).addClass('l');
                $(this).css({
                    zIndex: i,
                    width: lw,
                    height: lh,
                    left: left,
                    top: top,
                    opacity: opacity
                });
                lw = lw / self.setting.scale;
                lh = lh / self.setting.scale;
                opacity = opacity / self.setting.opacity;

            });
            //

            //自动轮播
            self.autoPlay();


        },
        setInitValue: function () {
            var self = this;
            //设置容器的宽高
            this.boxs.css({
                width: this.setting.width,
                height: this.setting.height
            });
            this.firstItem.addClass('c');//第一项为中间的当前项（激活项）
            this.firstItem.css({//设置第一项为基准
                zIndex: Math.floor(this.boxItems.length / 2),
                left: (this.setting.width - this.setting.firstW) / 2,
                top: 0
            });
            this.setPosition();
        }
    }
    JRotate.init = function (id, config) {
        new JRotate(id, config)
    }
    window['JRotate'] = JRotate;
    // window.JRotate = JRotate;
})(jQuery);
