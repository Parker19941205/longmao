import { PlatformCommon, ADConfig } from "./PlatformManager";
import { Def } from "../frameworks/Def";
import FightScene from "../FightScene";

/**qq游戏 */
export class QQGameManager implements PlatformCommon {
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
    private BannerAd = null;
    private stub: String = ""
    private BannerAdHight: number = 0
    private BannerAdWight: number = 0
    private InterstitialAd = null;
    private FightScene:FightScene

    //https://yuema.sfplay.net/longmao_assets/qqgame

    private VideoMap: Map<string, any> = new Map();
    private insertVideoMap: Map<string, any> = new Map();

    initSdk(scene,args?: any, callback?: Function) {
        this.FightScene = scene

        let videoAd1 = tt.createRewardedVideoAd({ adUnitId: "5a49ed91cc2878f6a48b8af407cbee81"})
        let videoAd2 = tt.createRewardedVideoAd({ adUnitId: "199a796bc49706575ee4ebef66084e6a"})
        let videoAd3 = tt.createRewardedVideoAd({ adUnitId: "93ae0a035e4fc51bdc37ce5856c93a1a"})
        let videoAd4 = tt.createRewardedVideoAd({ adUnitId: "710a590380f449cdf1107744a40cb6e5"})
        let videoAd5 = tt.createRewardedVideoAd({ adUnitId: "06f8f0a175d91767f7b49d04bb9b1c16"})
        let videoAd6 = tt.createRewardedVideoAd({ adUnitId: "195f8e1c19deab4d2a18652bf502ecd9"})
        let videoAd7 = tt.createRewardedVideoAd({ adUnitId: "20efb49c7706214651d65c2e34e26f10"})
        let videoAd8 = tt.createRewardedVideoAd({ adUnitId: "4dca13047f1111b058fb0a336f9936de"})
        let videoAd9 = tt.createRewardedVideoAd({ adUnitId: "ade9bc53d0a84dd28ae39982a45ec122"})


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
        const { windowWidth, windowHeight } = tt.getSystemInfoSync();
        console.log("屏幕的高========>",windowHeight)
        console.log("屏幕的宽========>",windowWidth)

        this.BannerAd = tt.createBannerAd({
        adUnitId: '1a3bd9818b04a0e6767dea2c2dda6ba5',
        style: {
            left: 0,
            top: 0,
            width: 300,
        }
        })

        // 尺寸调整时会触发回调，通过回调拿到的广告真实宽高再进行定位适配处理
        // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
        this.BannerAd.onResize((size) => {
            console.log(" 尺寸调整时会触发回调==============>") 
            // good
            console.log(size.width, size.height);
            
            this.BannerAdHight = size.height
            this.BannerAdWight = size.width

            this.BannerAd.style.top = windowHeight - this.BannerAdHight
            this.BannerAd.style.left = windowWidth/2 - this.BannerAdWight/2 + 20
        });

        this.BannerAd.onError((err) => {
            console.log(' banner 广告错误',err.errCode);
        })



        let insvideoAd1 = tt.createInterstitialAd({ adUnitId: "9876b3bf1a43301d7b9db2e9cf49218f"})
        let insvideoAd2 = tt.createInterstitialAd({ adUnitId: "92318f6484044c4cd70af7df27756b11"})
        let insvideoAd3 = tt.createInterstitialAd({ adUnitId: "afb9cd8fe07550bcd24475ff67600c10"})


        this.insertVideoMap.set(Def.insertType.parseui_insert, insvideoAd1);
        this.insertVideoMap.set(Def.insertType.signui_insert, insvideoAd2);
        this.insertVideoMap.set(Def.insertType.resultui_insert, insvideoAd3);


         /* 建议放在onReady里执行，提前加载广告 */
        this.insertVideoMap.forEach((value , key) =>{
            value.load().catch((err) => {
                console.error('load',err)
            })
            value.onLoad(() => {
                console.log('onLoad event emit') 
            })
            value.onClose(() => {
            console.log('close event emit')
            })       
            value.onError((e) => {
            console.log('error', e)
            })    
        })





    }
    login(args?: any, callback?: Function) {
        if (callback) {
            callback()
        }
    }
    pay(args?: any, callback?: Function) {
        if (callback) {
            callback()
        }
    }

    share(args?: any, callback?: Function) {
        tt.shareAppMessage({
            title: args.title,
            desc: args.msg,
            imageUrl: "http://yuema.sfplay.net/yuemaIcon/icon.png",
            query: "",
            success() {
              console.log("分享成功");
              if(callback){
                callback()
              }
            },
            fail(e) {
              console.log("分享失败");
            },
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
        console.log("这个banner的高=====>", this.BannerAdHight);
    }

    hideBanner(args?: any, callback?: Function) {
        console.log("隐藏banner==============>",this.BannerAd) 
        if(this.BannerAd != null){
            this.BannerAd.hide()
        }
    }


    showInsertAd(args?: any, callback?: Function,stub?: string) {
        console.log("播放插屏==============>",stub) 

        let videoAd1 = this.insertVideoMap.get(stub);
        if (videoAd1 == null) {
            console.log("==============>其他插屏")
            videoAd1 = this.insertVideoMap.get("其他")
        }

        /* 建议放在需要展示插屏广告的时机执行 */
        videoAd1.show().catch((err) => {
            console.error('插屏组件出现问题',err)
        })
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
        }).catch((err) => {
            console.log("广告组件出现问题", err);
            // 可以手动加载一次
            videoAd.load().then(() => {
                console.log("手动加载成功");
                // 加载成功后需要再显示广告
                return videoAd.show();
            });
        });




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
        }

        videoAd.onClose(closefunc)
    }

    homeToBackgroud(args?: any, callback?: Function) {
        if (callback) {
            callback()
        }
    }
    backgroudToHome(args?: any, callback?: Function) {
        if (callback) {
            callback()
        }
    }
    openNotify() {
    }
    registerNotify(key: string, second: number, content: string) {
    }
    deleteNotify(key: string) {
    }
    otherFun(args?: any, callback?: Function) {
        if (callback) {
            callback()
        }
    }
    shark(args?: any, callback?: Function) {
        if (callback) {
            callback()
        }
    }

}