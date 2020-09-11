// import { WXManager } from "./WXManager";
// import { AndroidManager } from "./AndroidManager";
// import { IOSManager } from "./IOSManager";
import { Config,AdStub,AdInsertStub } from "../config/Config";
// import { EditorManager } from "./EditorManager";
// import { KKH5Manager } from "./KKH5Manager";
import { ByteDanceManager } from "./ByteDanceManager";
import { EditorManager } from "./EditorManager";
import { SiSanJiuJiuManager } from "./SiSanJiuJiuManager";
import { QQGameManager } from "./QQGameManager";
import { BaiduManager } from "./BaiduManager";
import { VivoManager } from "./VivoManager";
import { OppoManager } from "./OppoManager";
// import { GameData } from "../frameworks/GameData";
// import { VivoManager } from "./VivoManager";
// import { BaiduManager } from "./BaiduManager";
// import { QQGameManager } from "./QQGameManager";
export class ADConfig {
    appId?: string;
    videoId?: Map<string, string>;
    insertId?: Map<Number, string>;
    bannerId?: Map<Number, string>;
}
/**渠道平台 */
export enum Platform {
    /**快看 */
    KUAIKAN = 1,
    /**微信 */
    WEICHAT = 2,
    /**字节跳动 */
    BYTEDANCE = 3,
    /**vivo */
    Vivo = 4,
     /**baidu */
    Baidu = 5,
     /**QQ */
    QQGAME = 6,
     /**4399 */
    SISANJIUJIU = 7,
    /**oppo */
    OPPO = 8,

    EDITOR = 0,
}

export interface PlatformCommon {
    /*是否有广告**/
    hasAd: boolean
    /**是否有banner */
    hasBanner: boolean
    /**是否有插屏 */
    hasInsertAd: boolean
    /**是否有视频 */
    hasVideoAd: boolean;
    sdkConfig: ADConfig;
    /**初始化 必须判断callback是否存在 然后调用返回*/
    initSdk(scene,args?: any, callback?: Function);
    /**登录 必须判断callback是否存在 然后调用返回*/
    login(args?: any, callback?: Function)
    /**支付 必须判断callback是否存在 然后调用返回*/
    pay(args?: any, callback?: Function)
    /**分享 必须判断callback是否存在 然后调用返回*/
    share(args?: any, callback?: Function)
    /**显示banner 必须判断callback是否存在 然后调用返回*/
    showBanner(stub?: string)
    /**关闭banner 必须判断callback是否存在 然后调用返回*/
    hideBanner(args?: any, callback?: Function)
    /**显示插屏 必须判断callback是否存在 然后调用返回*/
    showInsertAd(args?: any, callback?: Function,stub?: string)
    /**播放视频广告 必须判断callback是否存在 然后调用返回*/
    showVideoAd(args?: any, callback?: Function,stub?: string)

    /**点击home 必须判断callback是否存在 然后调用返回*/
    homeToBackgroud(args?: any, callback?: Function)
    /**回到界面 必须判断callback是否存在 然后调用返回*/
    backgroudToHome(args?: any, callback?: Function)
    /**开启通知弹窗 */
    openNotify()
    /**注册一个通知 */
    registerNotify(key: string, second: number, content: string)
    deleteNotify(key: string)
    /**其他方法 必须判断callback是否存在 然后调用返回*/
    otherFun(args?: any, callback?: Function)
    /**摇一摇 必须判断callback是否存在 然后调用返回*/
    shark(args?: any, callback?: Function)

    /**接口监听录屏*/
    recorderManager(args?: any, callback?: Function)

    /**接口监听录屏*/
    stopRecorderManager(args?: any, callback?: Function)

    /**接口录屏分享*/
    shareVideo(args?: any, callback?: Function)

}

export class PlatformManager {
    /** 打包的时候需要替换 当前平台 */
    public static CurrentPlatform = Platform.BYTEDANCE;

    private static _instance: PlatformManager;
    private currentPaltform: PlatformCommon;

    public  TalkingdataEvent:number[]=[Platform.KUAIKAN]
    public  PlayVedioEvent:number[]=[Platform.Baidu]


    public static getInstance(): PlatformManager {
        if (this._instance == null) {
            this._instance = new PlatformManager();
        }
        return this._instance;
    }

    // 是否支持Talkingdata统计
    public iSupportTalkingdata():boolean{
        for(let i=0;i<this.TalkingdataEvent.length;i++){
            if(PlatformManager.CurrentPlatform==this.TalkingdataEvent[i]){
                return true;
            }
        }
        return false;
    }


    // 是否支持本地播放视频
    public iSupportPlayVedio():boolean{
        for(let i=0;i<this.PlayVedioEvent.length;i++){
            if(PlatformManager.CurrentPlatform==this.PlayVedioEvent[i]){
                return true;
            }
        }
        return false;
    }


    public init() {
        switch (cc.sys.platform) {
            case cc.sys.WECHAT_GAME:
                if (PlatformManager.CurrentPlatform == Platform.WEICHAT) {
                    console.log("当前平台是weixin============>")
                    //this.currentPaltform = new WXManager();
                } else if (PlatformManager.CurrentPlatform == Platform.BYTEDANCE) {
                    console.log("当前平台是BYTEDANCE============>")
                    this.currentPaltform = new ByteDanceManager();
                } else if (PlatformManager.CurrentPlatform == Platform.QQGAME) {
                    console.log("当前平台是QQGAME============>")
                    window.tt = window.qq
                    this.currentPaltform = new QQGameManager();
                }
                break
            case cc.sys.ANDROID:
                console.log("当前平台是android============>")
                //this.currentPaltform = new AndroidManager();
                break
            case cc.sys.IPHONE:
                console.log("当前平台是IPHONE============>")
            case cc.sys.IPAD:
                //this.currentPaltform = new IOSManager();
                break
            case cc.sys.VIVO_GAME:
                if (PlatformManager.CurrentPlatform == Platform.Vivo) {
                    console.log("当前平台是vivo============>")
                    this.currentPaltform = new VivoManager();
                }
                break
            case cc.sys.BAIDU_GAME:
                if (PlatformManager.CurrentPlatform == Platform.Baidu) {
                    console.log("当前平台是baidu============>")
                    this.currentPaltform = new BaiduManager();
                }
                break
            case cc.sys.OPPO_GAME:
                if (PlatformManager.CurrentPlatform == Platform.OPPO) {
                    console.log("当前平台是OPPO============>")
                    this.currentPaltform = new OppoManager();
                }
                break
            default:
                if (PlatformManager.CurrentPlatform == Platform.KUAIKAN) {
                    console.log("当前平台是KUAIKAN============>")
                    //this.currentPaltform = new KKH5Manager()
                }else if(PlatformManager.CurrentPlatform == Platform.SISANJIUJIU){
                    console.log("当前平台是4399============>")
                    this.currentPaltform = new SiSanJiuJiuManager()
                } else {
                    console.log("当前平台是EDITOR============>")
                    this.currentPaltform = new EditorManager()
                }
                break
        }
    }
    hasAd(): boolean {
        return this.currentPaltform.hasAd;
    }
    hasBanner(): boolean {
        if (this.hasAd) {
            return this.currentPaltform.hasBanner;
        }
        
        return false;
    }
    hasInsertAd(): boolean {
        if (this.hasAd) {
            return this.currentPaltform.hasInsertAd;
        }
        return false;
    }
    hasVideoAd(): boolean {
        if (this.hasAd) {
            return this.currentPaltform.hasVideoAd;
        }
        return false;
    }
    initConfig() {

    }

    initSdk(scene,args?: any, callback?: Function) {
        this.currentPaltform.initSdk(scene, args, callback)
    }
    login(args?: any, callback?: Function) {
        this.currentPaltform.login(args, callback)
    }
    pay(args?: any, callback?: Function) {
        this.currentPaltform.pay(args, callback)
    }
    /**args:{msg} */
    share(args?: any, callback?: Function) {
        this.currentPaltform.share(args, callback)
    }
    showBanner(stub?: string) {
        this.currentPaltform.showBanner(stub)
    }
    hideBanner(args?: any, callback?: Function) {
        this.currentPaltform.hideBanner(args, callback)
    }
    showInsertAd(args?: any, callback?: Function, stub?: string) {
        this.currentPaltform.showInsertAd(args, callback, stub)
    }
    showVideoAd(args?: any, callback?: Function, stub?: string) {
        this.currentPaltform.showVideoAd(args, callback ,stub)
    }
    otherFun(args?: any, callback?: Function) {
        this.currentPaltform.otherFun(args, callback)
    }
    /**点击home */
    homeToBackgroud(args?: any, callback?: Function) {

    }
    /**回到界面 */
    backgroudToHome(args?: any, callback?: Function) {

    }
    openNotify() {
        this.currentPaltform.openNotify();
    }

    registerNotify(key: string, second: number, content: string) {
        this.currentPaltform.registerNotify(key, second, content)
    }
    deleteNotify(key: string) {
        this.currentPaltform.deleteNotify(key)
    }
    shark(args?: any, callback?: Function) {
        this.currentPaltform.shark(args, callback)
    }

    recorderManager(args?: any, callback?: Function) {
        this.currentPaltform.recorderManager(args, callback)
    }

    stopRecorderManager(args?: any, callback?: Function) {
        this.currentPaltform.stopRecorderManager(args, callback)
    }

    shareVideo(args?: any, callback?: Function) {
        
        this.currentPaltform.shareVideo(args, callback)
    }
    
}