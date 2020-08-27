
export class Lib {
    public static GetTimeBySecond(): number {
        let date = new Date;
        let datetime = Math.floor(date.getTime() / 1000);
        return datetime;
    }
    public static SecondToHours(second_num): string {
        let Seconds: any = second_num % 60;
        Seconds = Math.floor(Seconds / 10).toString() + Seconds % 10;
        let Minutes: any = Math.floor(second_num / 60) % 60;
        Minutes = Math.floor(Minutes / 10).toString() + Minutes % 10;
        let Hours: any = Math.floor(second_num / 60 / 60);
        Hours = Math.floor(Hours / 10).toString() + Hours % 10;
        return Hours + ":" + Minutes + ":" + Seconds;
    }
    SecondToHours2(second_num): string {
        let Seconds: any = second_num % 60;
        Seconds = Math.floor(Seconds / 10).toString() + Seconds % 10;
        let Minutes: any = Math.floor(second_num / 60) % 60;
        Minutes = Math.floor(Minutes / 10).toString() + Minutes % 10;
        let Hours: any = Math.floor(second_num / 60 / 60);
        Hours = Math.floor(Hours / 10).toString() + Hours % 10;
        return Hours + ":" + Minutes;
    }
    public static TimeToChinese(time) {
        if (time == null) {
            return "";
        }
        let date = new Date;
        let datetime = Math.floor(date.getTime() / 1000);
        let second_num = datetime - time;
        if (second_num <= 0) {
            second_num = 1;
        }
        let time_str;
        if (Math.floor(second_num / 60 / 60 / 24) > 0) //天
        {
            time_str = Math.floor(second_num / 60 / 60 / 24) + "天前";
        } else if (Math.floor(second_num / 60 / 60) > 0) //小时
        {
            time_str = Math.floor(second_num / 60 / 60) + "小时前";
        } else if (Math.floor(second_num / 60) > 0) //分钟
        {
            time_str = Math.floor(second_num / 60) + "分钟前";
        } else //秒 
        {
            time_str = Math.floor(second_num) + "秒前";
        }
        return time_str;
    }
    public static GetTimeByHours(): string {
        let date = new Date;
        let Hours: any = date.getHours();
        Hours = Math.floor(Hours / 10).toString() + Hours % 10;
        let Minutes: any = date.getMinutes();
        Minutes = Math.floor(Minutes / 10).toString() + Minutes % 10;
        return Hours + ":" + Minutes;
    }
    public static encrypt(str, pwd): string {
        if (pwd == null || pwd.length <= 0) {
            //alert("Please enter a password with which to encrypt the message.");
            return null;
        }
        let prand: any = "";
        for (let i = 0; i < pwd.length; i++) {
            prand += pwd.charCodeAt(i).toString();
        }
        let sPos = Math.floor(prand.length / 5);
        let mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
        let incr = Math.ceil(pwd.length / 2);
        let modu = Math.pow(2, 31) - 1;
        if (mult < 2) {
            //alert("Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password.");
            return null;
        }
        let salt: any = Math.round(Math.random() * 1000000000) % 100000000;
        prand += salt;
        while (prand.length > 10) {
            prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
        }
        prand = (mult * prand + incr) % modu;
        let enc_chr: any = "";
        let enc_str: any = "";
        for (let i = 0; i < str.length; i++) {
            let temp = (str.charCodeAt(i) ^ Math.floor((prand / modu) * 255)) + ""
            enc_chr = parseInt(temp);
            if (enc_chr < 16) {
                enc_str += "0" + enc_chr.toString(16);
            } else enc_str += enc_chr.toString(16);
            prand = (mult * prand + incr) % modu;
        }
        salt = salt.toString(16);
        while (salt.length < 8) salt = "0" + salt;
        enc_str += salt;
        return enc_str;
    }
    public static decrypt(str, pwd): string {
        if (str == null || str.length < 8) {
            //alert("A salt value could not be extracted from the encrypted message because it's length is too short. The message cannot be decrypted.");
            return;
        }
        if (pwd == null || pwd.length <= 0) {
            //alert("Please enter a password with which to decrypt the message.");
            return;
        }
        let prand: any = "";
        for (let i = 0; i < pwd.length; i++) {
            prand += pwd.charCodeAt(i).toString();
        }
        let sPos = Math.floor(prand.length / 5);
        let mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
        let incr = Math.round(pwd.length / 2);
        let modu = Math.pow(2, 31) - 1;
        let salt = parseInt(str.substring(str.length - 8, str.length), 16);
        str = str.substring(0, str.length - 8);
        prand += salt;
        while (prand.length > 10) {
            prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
        }
        prand = (mult * prand + incr) % modu;
        let enc_chr: any = "";
        let enc_str: any = "";
        for (let i = 0; i < str.length; i += 2) {
            enc_chr = parseInt((parseInt(str.substring(i, i + 2), 16) ^ Math.floor((prand / modu) * 255)) + "");
            enc_str += String.fromCharCode(enc_chr);
            prand = (mult * prand + incr) % modu;
        }
        return enc_str;
    }
    public static ShowTB(table_raw, n) {
        if (!table_raw) {
            cc.log("table_raw is null");
            return;
        }
        if (!n) {
            n = 1;
        }

        function showTB(table, deepth, max_deepth) {
            if (deepth > n || deepth > max_deepth) {
                return;
            }
            let str_blank = "";
            for (let i = 0; i < deepth; i++) {
                str_blank += "  ";
            }
            for (let i in table) {
                let property = table[i];
                if (typeof (property) != "object") {
                } else {
                    if (property instanceof Array) {
                        cc.log(str_blank + "[" + i + "] = ");
                    } else {
                        cc.log(str_blank + "{" + i + "} = ");
                    }

                    showTB(property, deepth + 1, max_deepth);
                }
            }
        }
        showTB(table_raw, 1, n);
    }

    public static CopyTB2(table, copy_table) {
        for (let i in copy_table) {
            let property = copy_table[i];
            if (typeof (property) != "object" || property == null) {
                table[i] = property;
            } else {
                if (property instanceof Array) {
                    table[i] = new Array();
                } else {
                    table[i] = new Object();
                }
                this.CopyTB2(table[i], property);
            }
        }
    }

    public static CopyTB(copy_table) {
        let table = new Object();
        Lib.CopyTB2(table, copy_table);
        return table;
    }

    public static AddNewlineCharacter(str, length) {
        let br = 0;
        let charNum = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i].charCodeAt() >= 0 && str[i].charCodeAt() <= 127) {
                charNum++;
                if (charNum == 2) {
                    br++;
                    charNum = 0;
                }
            } else {
                br++;
            }
            if (str[i] == '\n') {
                br = 0;
            }
            if (br == length + 1) {
                let strH = str.substring(0, i);
                let strL = str.substring(i, str.length);
                str = strH + '\n' + strL;
                br = 0;
            }
        }
        return str;
    }

    public static AddNewlineCharacter2(str, length) {
        if (str == null) {
            str = "";
        }

        if (length == null) {
            length = str.length;
        }

        let str_list = new Array();
        let cur_index = 0;
        let font_num = 0; //当前字数
        let char_num = 0; //当前字符数 2个字符 = 1个字 
        for (let i = 0; i < str.length; i++) {
            if (str[i].charCodeAt() >= 0 && str[i].charCodeAt() <= 127) {
                char_num++;
                if (char_num == 2) {
                    font_num++;
                    char_num = 0;
                }
            } else if (str[i] == '\n') {
                font_num = 0;
                str_list.push(str.substring(cur_index, i));
                cur_index = i + 1;
            } else {
                font_num++;
            }
            if (font_num == length) {
                font_num = 0;
                str_list.push(str.substring(cur_index, i + 1));
                cur_index = i + 1;
            }
        }
        if (cur_index < str.length) {
            str_list.push(str.substring(cur_index, str.length));
        }
        return str_list;
    }

    public static GetNewlineCharacterNum(str) {
        let StrNum = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] == '\n') {
                StrNum++;
            }
        }
        return StrNum;
    }

    public static extend(deep, target, options) {
        let copyIsArray;

        let toString = Object.prototype.toString;

        let hasOwn = Object.prototype.hasOwnProperty;

        let class2type = {

            '[object Boolean]': 'boolean',

            '[object Number]': 'number',

            '[object String]': 'string',

            '[object Function]': 'function',

            '[object Array]': 'array',

            '[object Date]': 'date',

            '[object RegExp]': 'regExp',

            '[object Object]': 'object'

        };

        let type = function (obj) {
            return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
        };

        let isWindow = function (obj) {
            return obj && typeof obj === "object" && "setInterval" in obj;

        };

        let isArray = Array.isArray || function (obj) {

            return type(obj) === "array";

        };

        let isPlainObject = function (obj) {

            if (!obj || type(obj) !== "object" || obj.nodeType || isWindow(obj)) {
                return false;
            }

            if (obj.constructor && !hasOwn.call(obj, "constructor") &&
                !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }

            let key;

            for (key in obj) {
                return key === undefined || hasOwn.call(obj, key);
            }

        };

        let extend = function (deep, target, options) {

            for (let name in options) {
                let src = target[name];
                let copy = options[name];

                if (target === copy) { continue; }

                if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                    let clone: any;
                    if (copyIsArray) {

                        copyIsArray = false;

                        clone = src && isArray(src) ? src : [];
                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }
                    target[name] = extend(deep, clone, copy);

                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
            return target;
        };

        return extend(deep, target, options);
    }
    // 比较时间是否为当天			
    public static compare_time(time: number): boolean {
        let src = new Date(time)
        let src_year = src.getFullYear()
        let src_mo = src.getMonth()
        let src_day = src.getDay()
        let cur = new Date(this.GetTimeBySecond() * 1000)
        let cur_year = cur.getFullYear()
        let cur_mo = cur.getMonth()
        let cur_day = cur.getDay()
        if (src_year == cur_year && src_mo == cur_mo && src_day == cur_day) {
            return true;
        }
        return false;
    }
}
