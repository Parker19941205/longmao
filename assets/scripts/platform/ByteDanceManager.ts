import { PlatformCommon, ADConfig } from "./PlatformManager";
//import { ListenerManager } from "../margers/ListenerManager";
import { Def } from "../frameworks/Def";
//import { SDK } from "../frameworks/SDK";
//import { GameMarger } from "../margers/GameMarger";

/**字节跳动 */
export class ByteDanceManager implements PlatformCommon {
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


    private VideoMap: Map<string, any> = new Map();
    initSdk(args?: any, callback?: Function) {
      
        let videoAd1 = tt.createRewardedVideoAd({ adUnitId: "2f4lb9m8mglnclljfg"})
        let videoAd2 = tt.createRewardedVideoAd({ adUnitId: "6l9uhjfqqd15g9fb88"})
        let videoAd3 = tt.createRewardedVideoAd({ adUnitId: "ocm6rj85l9f3mgd70h"})
        let videoAd4 = tt.createRewardedVideoAd({ adUnitId: "2j84fmajfp514i3f9i"})
        let videoAd5 = tt.createRewardedVideoAd({ adUnitId: "3mjmehc3ltf1gi78hj"})
        let videoAd6 = tt.createRewardedVideoAd({ adUnitId: "gkf1c99rj18d5bkl8j"})
        let videoAd7 = tt.createRewardedVideoAd({ adUnitId: "1ci02be221cc3boa78"})
        let videoAd8 = tt.createRewardedVideoAd({ adUnitId: "4ohsoghnuga8kdek6b"})
        let videoAd9 = tt.createRewardedVideoAd({ adUnitId: "1fblicttes33fhn4wi"})



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

        

        let appName = tt.getSystemInfoSync().appName;
        if(appName != "Douyin"){
            this.BannerAd = tt.createBannerAd({
            adUnitId: '6a0bb83h6d7h32mt46',
            style: {
                left: 0,
                top: 0,
                width: 200,
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
                this.BannerAd.style.left = windowWidth/2 - this.BannerAdWight/2
            });

            this.BannerAd.onError((err) => {
                console.log(' banner 广告错误',err.errCode);
            })
        }


        // 只有头条支持插屏广告
        // const isToutiaio = tt.getSystemInfoSync().appName === "Toutiao";
        // if (isToutiaio) {
        //     this.InterstitialAd = tt.createInterstitialAd({
        //       adUnitId: "8lcejm1554jdi2lnfj",
        //     });
        //     this.InterstitialAd.load().catch((err) => {
        //         console.error('load',err)})
        //         this.InterstitialAd.onLoad(() => {
        //         console.log('onLoad event emit') })
        //         this.InterstitialAd.onClose(() => {
        //         console.log('close event emit')})
        //         this.InterstitialAd.onError((e) => {
        //         console.log('error', e)})
        // }









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

        let appName = tt.getSystemInfoSync().appName;
        if(appName === "Douyin" || this.BannerAd == null){
            console.log("抖音不支持Banner=====>");
            return
        }



        this.stub = stub
        this.BannerAd.show()

        console.log("这个banner的高=====>", this.BannerAdHight);

         // 初始化广告banner
        // const { windowWidth, windowHeight } = tt.getSystemInfoSync();
        // if(stub!= "" && ( stub == "RoleIntroUI" || stub == "ScanUI" || stub == "ShakeUI"  )){
        //     this.BannerAd.style.top = windowHeight - this.BannerAdHight
        // }else{
        //     this.BannerAd.style.top = windowHeight - this.BannerAdHight - 120
        // }
        
    }

    hideBanner(args?: any, callback?: Function) {
        let appName = tt.getSystemInfoSync().appName;
        if(appName != "Douyin" && this.BannerAd != null){
            console.log("隐藏banner==============>",this.BannerAd) 
            this.BannerAd.hide()
        }
    }


    showInsertAd(args?: any, callback?: Function) {
        console.log("播放插屏appName==============>",tt.getSystemInfoSync().appName) 
        const isToutiaio = tt.getSystemInfoSync().appName === "Toutiao";
        // 插屏广告仅今日头条安卓客户端支持
        if (isToutiaio) {
            console.log("播放插屏==============>",this.InterstitialAd) 
            console.log("播放插屏的位置==============>",args) 
            console.log("length==============>",args.length)  
             /* 建议放在需要展示插屏广告的时机执行 */
             if(this.InterstitialAd && args.length > 0){
                console.log("开始show==============>") 
                this.InterstitialAd.show().catch((err) => {
                    console.error('show',err)
                    console.error('errCode',err.errCode)
                    if(err.errCode == 1004){
                        //GameMarger.getInstance().ShowTips("无适合的广告")
                    }
                })
            }
        }
    }





    showVideoAd(args?: any, callback?: Function,stub?: string) { 
        let videoAd1 = this.VideoMap.get(stub);
        //let videoAd1 = swan.createRewardedVideoAd({ adUnitId: "7166371", appSid: this.sdkConfig.appId })
        if (videoAd1 == null || videoAd1.length == 0) {
            console.log("==============>其他视频")
            videoAd1 = this.VideoMap.get("其他")
        }

        //videoAd1.show()
        // 显示广告
        videoAd1.show().then(() => {
            console.log("广告显示成功");
        }).catch((err) => {
            console.log("广告组件出现问题", err);
            // 可以手动加载一次
            videoAd1.load().then(() => {
                console.log("手动加载成功");
                // 加载成功后需要再显示广告
                return videoAd1.show();
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
            videoAd1.offClose(closefunc)
            videoAd1.load()
        }

        videoAd1.onClose(closefunc)
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


    recorderManager(args?: any, callback?: Function) {
        console.log("进入录屏接口====================")
        tt.getSystemInfo({
            success(res) {
              const screenWidth = res.screenWidth;
              const screenHeight = res.screenHeight;
              const recorder = tt.getGameRecorderManager();
              var maskInfo = recorder.getMark();
              var x = (screenWidth - maskInfo.markWidth) / 2;
              var y = (screenHeight - maskInfo.markHeight) / 2;
          
              recorder.onStart((res) => {
                console.log("录屏开始");
                // do somethine;
              });
              //添加水印并且居中处理
              recorder.start({
                duration: 300,
                isMarkOpen: false,
                locLeft: x,
                locTop: y,
              });
            },
        });
        
    }


    stopRecorderManager(args?: any, callback?: Function) {
        const recorder = tt.getGameRecorderManager();
        console.log("停止录屏接口====================>",args)

        recorder.onStop((res) => {
            console.log("获取录屏地址====================")
            console.log(res.videoPath);
             // do somethine;
            //this.shareVideo(res.videoPath)

            cc.sys.localStorage.setItem('RecorderPath', res.videoPath);
        });

        recorder.stop();
    }


    shareVideo(args?: any, callback?: Function){
        console.log("视频分享====================")
        let videopath = cc.sys.localStorage.getItem('RecorderPath');
        console.log("videopath====================",videopath)
        console.log("videopath.length====================",videopath.length)
        if(videopath == null || videopath.length == 0 ){
            //GameMarger.getInstance().ShowTips("还没有分享的内容")
            return
        }

        // 视频分享
        tt.shareAppMessage({
            channel: "video",
            query: "",
            templateId: "1fidnqkeari9dnd18o", // 替换成通过审核的分享ID
            title: "恋爱攻略",
            desc: "恋爱攻略",
            extra: {
            videoPath: videopath, // 可用录屏得到的本地文件路径
            videoTopics: ["恋爱攻略"],
            },
            success() {
                console.log("分享视频成功");
                //GameMarger.getInstance().ShowTips("分享视频成功")
            },
            fail(e) {
                console.log("分享视频失败");
                //GameMarger.getInstance().ShowTips("分享视频失败")
            },
        });
    }






}