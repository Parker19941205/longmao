import { PlatformCommon, ADConfig } from "./PlatformManager";
import { AdStub, AdBannerStub, } from "../config/Config";
import { Console } from "console";
import { Def } from "../frameworks/Def";
import FightScene from "../FightScene";

export class BaiduManager implements PlatformCommon {
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
    hasInsertAd: boolean = false;
    /**是否有视频 */
    hasVideoAd: boolean = true;
    sdkConfig: ADConfig;
    private BannerAd;
    // 是否有过回调
    isCallBack: boolean = false;
    private FightScene:FightScene
    private BannerAdHight: number = 0
    private BannerAdWight: number = 0
    private stub: String = ""

    //https://smartprogram.baidu.com/docs/game/api/adApi/swan.createBannerAd/  百度sdk文档
    //http://games.kkmh.com/kkH5sdk/sdk-doc/ 快看sdk文档
    private VideoMap: Map<string, any> = new Map();
    initSdk(scene,args?: any, callback?: Function) {
        this.FightScene = scene
        this.sdkConfig = new ADConfig();
        this.sdkConfig.appId = "afc60474"

        let videoAd1 = swan.createRewardedVideoAd({ adUnitId: "7204490",appSid: this.sdkConfig.appId})
        let videoAd2 = swan.createRewardedVideoAd({ adUnitId: "7205955",appSid: this.sdkConfig.appId})
        let videoAd3 = swan.createRewardedVideoAd({ adUnitId: "7205960",appSid: this.sdkConfig.appId})
        let videoAd4 = swan.createRewardedVideoAd({ adUnitId: "7205961",appSid: this.sdkConfig.appId})
        let videoAd5 = swan.createRewardedVideoAd({ adUnitId: "7205962",appSid: this.sdkConfig.appId})
        let videoAd6 = swan.createRewardedVideoAd({ adUnitId: "7205963",appSid: this.sdkConfig.appId})
        let videoAd7 = swan.createRewardedVideoAd({ adUnitId: "7205965",appSid: this.sdkConfig.appId})
        let videoAd8 = swan.createRewardedVideoAd({ adUnitId: "7205966",appSid: this.sdkConfig.appId})
        let videoAd9 = swan.createRewardedVideoAd({ adUnitId: "7205967",appSid: this.sdkConfig.appId})


        this.VideoMap.set(Def.videoType.signget, videoAd1);
        this.VideoMap.set(Def.videoType.video_battery, videoAd2);
        this.VideoMap.set(Def.videoType.qiqiugift, videoAd3);
        this.VideoMap.set(Def.videoType.buyhighbullet, videoAd4);
        this.VideoMap.set(Def.videoType.upbullet, videoAd5);
        this.VideoMap.set(Def.videoType.guajishouyi, videoAd6);
        this.VideoMap.set(Def.videoType.video_offline, videoAd7);
        this.VideoMap.set(Def.videoType.video_rebirth, videoAd8);
        this.VideoMap.set(Def.videoType.video_score, videoAd9);
        this.VideoMap.set("其他", videoAd7);


         // 初始化广告banner
         const { windowWidth, windowHeight } = swan.getSystemInfoSync();
         console.log("屏幕的高========>",windowHeight)
         console.log("屏幕的宽========>",windowWidth)
 
         this.BannerAd = swan.createBannerAd({
         appSid: this.sdkConfig.appId,
         adUnitId: "7205971",
         style: {
             left: 0,
             top: 0,
             width: 300,
         }
         })
 
         this.BannerAd.onError((err) => {
             console.log(' banner 广告错误',err.errCode);
         })

         let onLoadFuc = function () {
            console.log(' banner 加载完成')
        }
        
        this.BannerAd.onLoad(onLoadFuc);

    }
    
    login(args?: any, callback?: Function) {
    }
    pay(args?: any, callback?: Function) {
    }

    share(args?: any, callback?: Function) {
        console.log("转发=================>")
        swan.shareAppMessage({
            title: args.title,
            content: args.msg,
            imageUrl: "http://yuema.sfplay.net/yuemaIcon/longmaoIcon.png",
            success: res => {
                console.log('onShareAppMessage share success', JSON.stringify(res));
                if(callback){
                    callback()
                }
            },
            fail: err => {
                console.log('onShareAppMessage share fail', JSON.stringify(err));
            }
        });
    }



    showBanner(stub?: string) {
        console.log("显示banner==============>",stub) 
        console.log("banner对象是否存在==============>",this.BannerAd) 
        this.stub = stub

        if(this.BannerAd == null){
            return
        }


        this.BannerAd.show()
        console.log("显示banner宽==============>",this.BannerAd.style.width) 
        console.log("显示banner高==============>",this.BannerAd.style.height) 

        const { windowWidth, windowHeight } = swan.getSystemInfoSync();
        this.BannerAd.style.top = windowHeight - this.BannerAd.style.height
        this.BannerAd.style.left = windowWidth/2 - this.BannerAd.style.width/2
    }

    hideBanner() {
        console.log("隐藏banner==============>",this.BannerAd) 
        if(this.BannerAd != null){
            this.BannerAd.hide()
        }
    }


    showInsertAd(args?: any, callback?: Function) {
    }

    showVideoAd(args?: any, callback?: Function,stub?: string) {
        let videoAd = this.VideoMap.get(stub);
        if (videoAd == null) {
            console.log("==============>其他视频")
            videoAd = this.VideoMap.get("其他")
        }

         // 显示广告
         videoAd.show().then(() => {
            console.log("广告显示成功");
            this.FightScene.pauseAll()
        }).catch((err) => {
            console.log("广告组件出现问题", err);
            // 可以手动加载一次
            videoAd.load().then(() => {
                console.log("手动加载成功");
                // 加载成功后需要再显示广告
                this.FightScene.pauseAll()
                return videoAd.show();
            });
        });



        var that = this
        let closefunc = (res)=>{
            console.log('视频广告关闭回调')
            if (res && res.isEnded) {
                if (callback) {
                    console.log("callback===========>"),
                    callback()
                }
                console.log("正常播放结束，可以下发游戏奖励");
            } else {
                console.log("播放中途退出，不下发游戏奖励");
            }
            videoAd.offClose(closefunc)
            videoAd.load()
            that.FightScene.resumeAll()
        }

        videoAd.onClose(closefunc)







        
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