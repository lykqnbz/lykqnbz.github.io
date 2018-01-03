var aldR = {
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
    }
}