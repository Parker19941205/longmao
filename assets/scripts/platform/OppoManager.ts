import { PlatformCommon, ADConfig } from "./PlatformManager";
import { AdStub, AdBannerStub, AdInsertStub } from "../config/Config";
import { Def } from "../frameworks/Def";
import { EvalSourceMapDevToolPlugin } from "webpack";
import FightScene from "../FightScene";
import { TipUI } from "../TipUI";

export class OppoManager implements PlatformCommon{
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
    private BannerAd = null;
    private  showBannerTime: number = 0;
    private  showVideoTime: number = 0;
    private BannerAdHight: number = 0
    private BannerAdWight: number = 0
    private stub:string = ""
    private FightScene:FightScene
    sdkConfig: ADConfig;

    private VideoMap: Map<string, any> = new Map();
    initSdk(scene,args?: any, callback?: Function) {
        this.FightScene = scene
        //https://yuema.sfplay.net/longmao_assets/oppo

        let videoAd1 = qg.createRewardedVideoAd({ adUnitId: "215192"})
        let videoAd2 = qg.createRewardedVideoAd({ adUnitId: "215207"})
        let videoAd3 = qg.createRewardedVideoAd({ adUnitId: "215210"})
        let videoAd4 = qg.createRewardedVideoAd({ adUnitId: "215212"})
        let videoAd5 = qg.createRewardedVideoAd({ adUnitId: "215227"})
        let videoAd6 = qg.createRewardedVideoAd({ adUnitId: "215228"})
        let videoAd7 = qg.createRewardedVideoAd({ adUnitId: "215231"})
        let videoAd8 = qg.createRewardedVideoAd({ adUnitId: "215233"})
        let videoAd9 = qg.createRewardedVideoAd({ adUnitId: "215233"})


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
        let res = qg.getSystemInfoSync()
        console.log("屏幕的高========>",res.screenHeight)
        console.log("屏幕的宽========>",res.screenWidth)
        console.log("平台版本号========>",res.platformVersionCode)

        if(res.platformVersionCode >= 1051){
            this.BannerAd = qg.createBannerAd({
            adUnitId: '215235',
            style: {
                left: 0,
                top: 0,
                width: 400,
            }
            })

            this.BannerAd.onResize((size) => {
                console.log(" 尺寸调整时会触发回调==============>") 
                // good
                console.log(size.width, size.height);
            
                this.BannerAdHight = size.height
                this.BannerAdWight = size.width

                this.BannerAd.style.top = res.screenHeight - this.BannerAdHight
                this.BannerAd.style.left = res.screenWidth/2 - this.BannerAdWight/2+50
            });

            this.BannerAd.onError((err) => {
                console.log(' banner 广告错误',err.errCode);
            })

            // 广告加载回调
            this.BannerAd.onLoad(() => {
                console.log(' banner 广告加载回调');
            })
        }





   
    }

    login(args?: any, callback?: Function) {
    }
    pay(args?: any, callback?: Function) {
    }

    share(args?: any, callback?: Function) {
        console.log("转发=================>")
    }



    showBanner(stub?: string) {
        console.log("banner对象是否存在==============>",this.BannerAd) 
        if(this.BannerAd == null){
            return
        }

        this.BannerAd.show().then(()=>{ 
            console.log('banner广告展示完成');
        }).catch((err)=>{
            console.log('banner广告展示失败', JSON.stringify(err));
        })

    }





    hideBanner(args?: any, callback?: Function) {
        console.log("隐藏banner==============>",this.BannerAd) 
        if(this.BannerAd != null){
            this.BannerAd.hide()
        }
    }



    showInsertAd(args?: any, callback?: Function,stub?: string) {
    }



    showVideoAd(args?: any, callback?: Function,stub?: string) {
        let videoAd = this.VideoMap.get(stub);
        if (videoAd == null) {
            console.log("==============>其他视频")
            videoAd = this.VideoMap.get("其他")
        }

        //videoAd.show()
        // 显示广告
        videoAd.show().then(() => {
            console.log("广告显示成功");
            //this.FightScene.pauseAll()
        }).catch((err) => {
            console.log("广告组件出现问题", err);
            // 可以手动加载一次
            videoAd.load().then(() => {
                console.log("手动加载成功");
                // 加载成功后需要再显示广告
                //this.FightScene.pauseAll()
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
            //that.FightScene.resumeAll()
        }

        videoAd.onClose(closefunc)
    }



    homeToBackgroud(args?: any, callback?: Function) {}
    backgroudToHome(args?: any, callback?: Function) {}
    openNotify() {}
    registerNotify(key: string, second: number, content: string) {}
    deleteNotify(key: string) {}
    otherFun(args?: any, callback?: Function) {}
    shark(args?: any, callback?: Function) {}

} 