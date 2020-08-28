import { PlatformCommon, ADConfig } from "./PlatformManager";
// import { Log } from "../frameworks/Log";
// import { GameMarger } from "../margers/GameMarger";

export class EditorManager implements PlatformCommon {
    shareVideo(args?: any, callback?: Function) {
        // let videopath = cc.sys.localStorage.getItem('RecorderPath');
        // console.log("videopath====================",videopath)
        // if(videopath == null){
        //     GameMarger.getInstance().ShowTips("还没有分享的内容")
        //     return
        // }
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

    initSdk(args?: any, callback?: Function) {
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
        //Log.debug("播放视频完成")
        if (callback) {
            callback()
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