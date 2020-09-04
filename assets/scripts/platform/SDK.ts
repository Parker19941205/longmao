// import { Config } from "../config/Config"
// import { GameData } from "./GameData"
// import { GameMarger } from "../margers/GameMarger"
// import { ListenerManager } from "../margers/ListenerManager";
import { Def } from "../frameworks/Def";
import { PlatformManager, Platform } from "../platform/PlatformManager";
//import { Log } from "./Log";
import { Utils } from "../frameworks/Utils";
import FightScene from "../FightScene";
import { TipUI } from "../TipUI";
//import { KKH5Manager } from "../platform/KKH5Manager";

//10
export class SDK {
    public QQZoneOpenId;
    public BannerAd;
    public videoAd
    public static isShared = false;
    public video_func: Function;
    public videoType;
    public static bannerHeight = 120;
    private FightScene:FightScene
    public videoTips;


    private static instance: SDK;
    private constructor() { }
    public static getInstance(): SDK {
        if (this.instance == null) {
            this.instance = new SDK();
        }
        return this.instance;
    }

    public initSDK(scene) {
        this.FightScene = scene
        PlatformManager.getInstance().initSdk(this.FightScene);
    }
    //开启本地通知
    public OpenNotify() {
        PlatformManager.getInstance().openNotify();
    }
    public OpenNotifyFinish(sdk_data, result) {
        sdk_data.IsOpenPush = result;
    }
    //注册一个通知
    public RegisterNotify(key, second, content) {
        PlatformManager.getInstance().registerNotify(key, second, content);
    }
    //删除一个通知
    public DeleteNotify(key) {
        PlatformManager.getInstance().deleteNotify(key)
    }
    //展示插屏
    public ShowIntersticeAd(sdk_data) {
        //var sdk_data = GameData.getSDKData();
        // if (sdk_data.IsCloseAD == 0) {
        //     GameData.setInterstitialAdNum(sdk_data.InterstitialAdNum + 1);
        //     if (sdk_data.InterstitialAdNum >= Config.InterstitialAdNum) {
        //         PlatformManager.getInstance().showInsertAd()
        //         GameData.setInterstitialAdNum(0);
        //     }
        // }
    }
    //展示banner
    public ShowBannerAd(stub: string) {
        PlatformManager.getInstance().showBanner(stub);
    }
    //关闭banner
    public CloseBannerAd() {
        PlatformManager.getInstance().hideBanner();
    }
    
    //播放视频广告
    public ShowVideoAd(func: Function, videoType,videoTips?:any) {
        this.video_func = func;
        this.videoType = videoType;
        this.videoTips = videoTips;

        PlatformManager.getInstance().showVideoAd("window.SDK.ShowVideoFinish", () => {
            this.ShowVideoFinish();
        }, this.videoType)
    }

    //播放视频广告结束
    private ShowVideoFinish() {
        // if (cc.sys.platform == cc.sys.WECHAT_GAME) {
        //     wx.aldSendEvent(this.videoType)
        // }
        if (this.video_func) {
            var str = "视频播放成功"
            if(this.videoTips){
                str = this.videoTips
            }

            new TipUI(this.FightScene,str)
            this.video_func();
            // GameData.addAchievementConditionNum("video_num", 1);
        } else {
            //Log.debug("回调方法为空")
        }
    }
    /**分享 */
    public share(args?: any, callback?: Function) {
        let msg = "《猫咪射手》是一款萌系休闲冒险手游。"
        PlatformManager.getInstance().share({ msg: msg ,title: "龙猫射手手游"}, callback)
    }


    public static restorePurchase = function () {
        if (cc.sys.isNative && cc.sys.os == "iOS") {
            this.iAP.restorePurchase();
            //_CurScene.OpenPayLayer();
        }
    }
    public Log(str: string) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            //jsb.reflection.callStaticMethod(this.javaclass, "Log", "(Ljava/lang/String;)V", str)
        } else if (cc.sys.os == cc.sys.OS_IOS) {

        } else {
            cc.log("Log: " + str)
        }
    }


    //Talkingdata统计退出游戏
    public level() {
        if( PlatformManager.getInstance().iSupportTalkingdata()){
            //TDGA.onPageLeave();
        } 
    }

    //Talkingdata统计用户注册
    public registerAccount() {
        cc.log("Talkingdata统计用户注册==========")
        if( PlatformManager.getInstance().iSupportTalkingdata()){
            // TDGA.Account({
            //     accountId : TDGA.getDeviceId(),
            //     level : 1,
            //     accountType : 0
            // });
        }
    }

    

}
