import { Config, URIID } from "../config/Config";

export class HttpManager {
    private static instance: HttpManager;
    private _xhr: any;
    private constructor() {

    }
    public static getInstance(): HttpManager {
        if (this.instance == null) {
            this.instance = new HttpManager();
        }
        return this.instance;
    }
    httpGet(url: string, params: object = {}, callback: Function) {
        let dataStr = '';
        Object.keys(params).forEach(key => {
            dataStr += key + '=' + encodeURIComponent(params[key]) + '&';
        })
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }

        url = Config.httpUrl;
        let xhr = this._xhr;
        xhr.withCredentials = true;
        xhr.open("GET", url, true);
        // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let response = xhr.responseText;
                if (xhr.status >= 200 && xhr.status < 300) {
                    let httpStatus = xhr.statusText;
                    callback(true, JSON.parse(response));
                } else {
                    callback(false, response);
                }
            } else {
            }
        };
        xhr.ontimeout = function () {
        };
        xhr.send();
    }
    


    httpPost(uriId: number, oparams: object = null, callback?: Function, url?: string) {
        let xhr = cc.loader.getXMLHttpRequest()
        let datastr = null;
        if (oparams) {
           // datastr = JSON.stringify(oparams)
           datastr = ''
            Object.keys(oparams).forEach(key => {
                datastr += key + '=' + encodeURIComponent(oparams[key])+ '&';
            })
            if (datastr !== '') {
                datastr = datastr.substr(0, datastr.lastIndexOf('&'));
            }

            //console.log("dataStr================>",datastr)
        }



        xhr.timeout = 7000; // 
        if (URIID[uriId].showLog) {
            cc.log("request:" + URIID[uriId].uri + "   " + datastr)
        }
        let httpUrl = Config.httpUrl + URIID[uriId].uri
        if (url) {
            httpUrl = url + URIID[uriId].uri;
        }
        console.log("httpUrl================>",httpUrl)
        xhr.open("POST", httpUrl, true);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        //xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let response = xhr.responseText;
                    // if (URIID[uriId].showLog) {
                    //     Log.debug("respose: " + URIID[uriId].uri + "---" + response)
                    // }
                    console.log("respose: " + URIID[uriId].uri + "---" + response)
                    if (HttpManager.isPass(response)) {
                        if (callback) {
                            callback(response);
                        }
                    }
                }
            }
        }
        xhr.ontimeout = function () {
            if (callback) {
                callback()
            }
        }
        xhr.onerror = function () {
            if (callback) {
                callback()
            }

        }
        if (datastr) {
            xhr.send(datastr);
        } else {
            xhr.send();
        }
    }
    private static isPass(json: string): boolean {
        return true;
    }
}