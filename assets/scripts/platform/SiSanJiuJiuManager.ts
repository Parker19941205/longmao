import { PlatformCommon, ADConfig } from "./PlatformManager";
import FightScene from "../FightScene";
import { TipUI } from "../TipUI";
// import { Log } from "../frameworks/Log";
// import { GameMarger } from "../margers/GameMarger";

export class SiSanJiuJiuManager implements PlatformCommon {
    shareVideo(args?: any, callback?: Function) {
       
    }
    stopRecorderManager(args?: any, callback?: Function) {
    }
    recorderManager(args?: any, callback?: Function) {
    }
    /*是否有广告**/
    hasAd: boolean = true;
    /**是否有banner */
    hasBanner: boolean = true;
    /**是否有插屏 */
    hasInsertAd: boolean = true;
    /**是否有视频 */
    hasVideoAd: boolean = true;
    sdkConfig: ADConfig;
    private FightScene:FightScene

    
    initSdk(scene,args?: any, callback?: Function) {
        this.FightScene = scene
        console.log("4399=====initSdk")
         //<script src="http://h.api.4399.com/h5mini-2.0/h5api-interface.php"></script>

        // 判断是否成功引入4399HTML5 API，可不判断
        // if (('h5api' in window)) {
        //     // 返回boolean值，true为已登录，false未登录
        //     let result = h5api.isLogin()

        //     if (result) {
        //         // 做点什么
        //         console.log('已登录')
        //     }
        //     else {
        //         // 做点什么
        //         console.log('未登录')
        //         // 定义回调函数
        //         var callback1 = cc.callFunc(function(data) {
        //             // 做点什么
        //             console.log('用户编号：', data.uId)
        //             console.log('用户昵称：', data.userName)
        //             console.log('')
        //         })

        //          // 没登录就打开登录面板，有登录有返回用户信息
        //          h5api.login(callback1)
        //     }
        // }
        // else {
        //     console.log('找不到 4399HTML5 API')
        //     console.log('')
        // }

    }
    login(args?: any, callback?: Function) {
    }
    pay(args?: any, callback?: Function) {
    }
    share(args?: any, callback?: Function) {
    }
    showBanner(args?: any, callback?: Function) {
    }
    hideBanner(args?: any, callback?: Function) {
    }
    showInsertAd(args?: any, callback?: Function) {
    }
    showVideoAd(args?: any, callback?: Function) {
        console.log("开始播放广告视频===========>")
        // 定义回调函数
        let callback1 = (data)=>{
            // 做点什么
            console.log("是否可播放广告： ", data.canPlayAd, '\n', "剩余次数： ", data.remain)

            if(data.canPlayAd == false && data.remain == 0){
                new TipUI(this.FightScene,"今日广告次数已用完")
            }
        }

        // 判断是否成功引入4399HTML5 API，可不判断
        if (('h5api' in window)) {
            // 返回boolean值，true为有广告资源可以播放，false为无法播放广告
            let result = h5api.canPlayAd(callback1)

            if (result) {
                // 做点什么
                console.log('有广告资源可播放')
                /**
                 * 此callback回调函数的形式
                 *
                 * @param obj  广告状态
                 */
                var that = this
                let callback2 = (obj)=>{
                    console.log('代码:' + obj.code + ',消息:' + obj.message)
                    if(obj.code === 10000){
                        console.log('开始播放')
                    } else if(obj.code === 10001){
                        console.log('播放结束')
                        that.FightScene.resumeAll()
                        if (callback) {
                            callback()
                        }
                    } else {
                        console.log('广告异常')
                    }
                }


                h5api.playAd(callback2);
                this.FightScene.pauseAll()
            }
            else {
                // 做点什么
                console.log('没有广告资源可播放')
            }
        }
        else {
            console.log('找不到 4399HTML5 API')
            console.log('')
        }












    }
    otherFun(args?: any, callback?: Function) {
    }
    /**点击home*/
    homeToBackgroud(args?: any, callback?: Function) {

    }
    /**回到界面*/
    backgroudToHome(args?: any, callback?: Function) {

    }
    openNotify() { }
    registerNotify(key: string, second: number, content: string) { }
    deleteNotify(key: string) { }
    shark(args?: any, callback?: Function) { }
    /**分享 */
    openShare(args?: any, callback?: Function) { }


    
}