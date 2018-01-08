var aldR = {

    // 2 字符操作

    // 2-1 去除字符串空格
    //type 1-所有空格  2-前后空格  3-前空格 4-后空格
    //aldR.trim('  DDSS5asd',1)
    //result：DDSS5asd
    //该方法可以兼容IE8
    trim: function (str, type) {
        switch (type) {
            case 1:
                return str.replace(/\s+/g, "");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, "");
            case 4:
                return str.replace(/(\s*$)/g, "");
            default:
                return str;
        }
    },

    // 2-2 字母大小写切换
    //type 1-首字母大写  2-首页母小写  3-大小写转换 4-全部大写 5-全部小写
    //aldR.changeCase('ccdde',1)
    //result：Ccdde
    changeCase: function (str, type) {
        function ToggleCase(str) {
            var itemText = ""
            str.split("").forEach(
                function (item) {
                    if (/^([a-z]+)/.test(item)) {
                        itemText += item.toUpperCase();
                    } else if (/^([A-Z]+)/.test(item)) {
                        itemText += item.toLowerCase();
                    } else {
                        itemText += item;
                    }
                });
            return itemText;
        }
        switch (type) {
            case 1:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
                });
            case 2:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
                });
            case 3:
                return ToggleCase(str);
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    },

    // 2-3 字符串循环复制
    //repeatStr(str->字符串, count->次数)
    //aldR.repeatStr('123',3)
    //"result：123123123"
    repeatStr: function (str, count) {
        var text = '';
        for (var i = 0; i < count; i++) {
            text += str;
        }
        return text;
    },

    // 2-4 字符替换
    //replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
    //字符格式自己理解:D 不好字述
    //aldR.replaceStr('18819322663',[3,5,3],0)
    //result：188*****663
    //aldR.replaceStr('asdasdasdaa',[3,5,3],1)
    //result：***asdas***
    //aldR.replaceStr('1asd88465asdwqe3',[5],0)
    //result：*****8465asdwqe3
    //aldR.replaceStr('1asd88465asdwqe3',[5],1,'+')
    //result："1asd88465as+++++"
    replaceStr: function(str, regArr, type, ARepText) {
        var regtext = '',
            Reg = null,
            replaceText = ARepText || '*';
        //repeatStr是在上面定义过的 2-3字符串循环复制
        if (regArr.length === 3 && type === 0) {
            regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
            Reg = new RegExp(regtext);
            var replaceCount = this.repeatStr(replaceText, regArr[1]);
            return str.replace(Reg, '$1' + replaceCount + '$2')
        }
        else if (regArr.length === 3 && type === 1) {
            regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
            Reg = new RegExp(regtext);
            var replaceCount1 = this.repeatStr(replaceText, regArr[0]);
            var replaceCount2 = this.repeatStr(replaceText, regArr[2]);
            return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
        }
        else if (regArr.length === 1 && type === 0) {
            regtext = '(^\\w{' + regArr[0] + '})'
            Reg = new RegExp(regtext);
            var replaceCount = this.repeatStr(replaceText, regArr[0]);
            return str.replace(Reg, replaceCount)
        }
        else if (regArr.length === 1 && type === 1) {
            regtext = '(\\w{' + regArr[0] + '}$)'
            Reg = new RegExp(regtext);
            var replaceCount = this.repeatStr(replaceText, regArr[0]);
            return str.replace(Reg, replaceCount)
        }
    },

    //2-5 正哲检测字符串
    //aldR.checkType('165226226326','phone')
    //result：false
    //大家可以根据需要扩展
    checkType: function (str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'text':
            return /^\w+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        case 'QQ':
            return /^[1-9][0-9]{4,9}$/gim.test(str);
        default:
            return true;
        }
    },

    //2-6 检测密码强度
    //小于6位为0.只有数字为1，数字+小写为2，数字+大小写为3，数字+大小写+标点为4
    //aldR.checkPwd('12asdASAD')
    //result：3(强度等级为3)
    checkPwd: function (str) {
        var nowLv = 0;
        if (str.length < 6) {
            return nowLv
        }
        if (/[0-9]/.test(str)) {
            nowLv++
        }
        if (/[a-z]/.test(str)) {
            nowLv++
        }
        if (/[A-Z]/.test(str)) {
            nowLv++
        }
        if (/[\.|-|_]/.test(str)) {
            nowLv++
        }
        return nowLv;
    },  

    // 2-7 查找字符串中某字符出现的次数
    //var strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
    //aldR.countStr(strTest,'blog')
    //result：6
    countStr: function (str, strSplit) {
        return str.split(strSplit).length - 1
    },

    // 3 数组操作

    // 3-1 数组去重
    removeRepeatArray: function (arr) {
        return arr.filter(function (item, index, self) {
        return self.indexOf(item) === index;
        });
    },

    // 3-2 数组最大值
    maxArr: function (arr) {
        return Math.max.apply(null, arr);
    },
    // 3-2 数组最小值
    minArr: function (arr) {
        return Math.min.apply(null, arr);
    },

    // 3-3 求和
    //主要是针对数字类型的数组
    sumArr: function (arr) {
        return arr.reduce(function (pre, cur) {
            return pre + cur
        })
    },
    // 3-3 数组平均值
    //小数点可能会有很多位，这里不做处理，
    covArr: function (arr) {
        return this.sumArr(arr) / arr.length;
    },

    // 3-4 返回数组（字符串）一个元素出现的次数
    //aldR.getEleCount('asd56+asdasdwqe','a')
    //result：3
    //aldR.getEleCount([1,2,3,4,5,66,77,22,55,22],22)
    //result：2
    getEleCount: function (obj, ele) {
        var num = 0;
        for (var i = 0, len = obj.length; i < len; i++) {
            if (ele === obj[i]) {
                num++;
            }
        }
        return num;
    },
    
    // 3-5 返回数组（字符串）出现最多的几次元素和出现次数
    //arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
    //返回值：el->元素，count->次数
    //aldR.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])
    //默认情况，返回所有元素出现的次数
    //result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2},{"el":"4","count":1},{"el":"5","count":1},{"el":"6","count":1}]
    //aldR.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)
    //传参（rank=3），只返回出现次数排序前三的
    //result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2}]
    //aldR.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)
    //传参（ranktype=1,rank=null），升序返回所有元素出现次数
    //result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1},{"el":"3","count":2},{"el":"1","count":4},{"el":"2","count":6}]
    //aldR.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)
    //传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
    //result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1}]
    getCount: function (arr, rank, ranktype) {
        var obj = {},
            k, arr1 = []
        //记录每一元素出现的次数
        for (var i = 0, len = arr.length; i < len; i++) {
            k = arr[i];
            if (obj[k]) {
                obj[k]++;
            } else {
                obj[k] = 1;
            }
        }
        //保存结果{el-'元素'，count-出现次数}
        for (var o in obj) {
            arr1.push(['el:'+o, 'count:'+ obj[o]]);
        }
        //排序（降序）
        arr1.sort(function (n1, n2) {
            return n2.count - n1.count
        });
        //如果ranktype为1，则为升序，反转数组
        if (ranktype === 1) {
            arr1 = arr1.reverse();
        }
        var rank1 = rank || arr1.length;
        return arr1.slice(0, rank1);
    },

    // 4-1 cookie
    //设置cookie
    setCookie: function (name, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + '=' + value + ';expires=' + oDate;
    },
    //获取cookie
    getCookie: function (name) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            if (arr2[0] == name) {
                return arr2[1];
            }
        }
        return '';
    },
    //删除cookie
    removeCookie: function (name) {
        this.setCookie(name, 1, -1);
    },
    
    // 4-2 Window.localStorage
    //设置localStorage   DEMO功能:每日首次提醒
    setLocalStorage:function(value){
        var date=new Date();
        window.localStorage.setItem(date.toLocaleDateString(), value);
    },

    //获取localStorage   
    getLocalStorage:function(value){
        var date=new Date();
       return window.localStorage.getItem(date.toLocaleDateString()!= value);
    },

    //删除localStorage
    removeLocalStorage:function(){
        var date=new Date();
        localStorage.removeItem(date.toLocaleDateString());
    },

    // 4-3 现金额大写转换函数
    //ecDo.upDigit(168752632)
    //result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
    //ecDo.upDigit(1682)
    //result："人民币壹仟陆佰捌拾贰元整"
    //ecDo.upDigit(-1693)
    //result："欠人民币壹仟陆佰玖拾叁元整"
    upDigit: function (n) {
        var fraction = ['角', '分', '厘'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠人民币' : '人民币';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    } ,

    
    // 4-4 日期到期时间计算
    //ecDo.getEndTime('2017/7/22 16:0:0')
    //result："剩余时间6天 2小时 28 分钟20 秒"
    getEndTime: function (endTime) {
        var startDate = new Date(); //开始时间，当前时间
        var endDate = new Date(endTime); //结束时间，需传入时间参数
        var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
        var d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
        }
        return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
    },
    
    
    // 4-5 手机类型判断
    browserInfo: function (type) {
        switch (type) {
            case 'android':
                return navigator.userAgent.toLowerCase().indexOf('android') !== -1
            case 'iphone':
                return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
            case 'ipad':
                return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
            case 'weixin':
                return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
            default:
                return navigator.userAgent.toLowerCase()
        }
    }
    
}