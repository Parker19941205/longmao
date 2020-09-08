import { PlatformCommon, ADConfig } from "./PlatformManager";
import { AdStub, AdBannerStub, AdInsertStub } from "../config/Config";
import { Def } from "../frameworks/Def";
import { EvalSourceMapDevToolPlugin } from "webpack";
import FightScene from "../FightScene";
import { TipUI } from "../TipUI";

export class VivoManager implements PlatformCommon{
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
        //https://yuema.sfplay.net/longmao_assets/vivo

        this.sdkConfig = new ADConfig();
        this.sdkConfig.videoId = new Map<string, string>()
        this.sdkConfig.videoId.set(Def.videoType.signget, "5e64a0191cbb43898ce5d20203d34769")
        this.sdkConfig.videoId.set(Def.videoType.video_battery, "be0662750c2146098aa25e4439c8097b")
        this.sdkConfig.videoId.set(Def.videoType.qiqiugift, "aca266efb1a548c8a35e98c53d275313")
        this.sdkConfig.videoId.set(Def.videoType.buyhighbullet, "2d987392c4214158b6c6dc2936cb9886")
        this.sdkConfig.videoId.set(Def.videoType.upbullet, "80544847253a47729549d92e795cf4e0")
        this.sdkConfig.videoId.set(Def.videoType.guajishouyi, "86474123d5234d4ca30ceb983122a418")
        this.sdkConfig.videoId.set(Def.videoType.video_offline, "ff31d72ed0f144078f10087fc1a94e56")
        this.sdkConfig.videoId.set(Def.videoType.video_rebirth, "c0c465d4fbae47119f97e1775d1c825a")
        this.sdkConfig.videoId.set(Def.videoType.video_score, "cdf225bd125643ba8590f1f25923fbc5")
    


        // 初始化广告banner
        let res = qg.getSystemInfoSync()
        console.log("屏幕的高========>",res.screenHeight)
        console.log("屏幕的宽========>",res.screenWidth)

        if(res.platformVersionCode >= 1031){
            this.BannerAd = qg.createBannerAd({
            posId: 'e0991de127b94e7db584a37a66d349b3',
            style: {
            }
            })

            this.BannerAd.onResize((size) => {
                console.log(" 尺寸调整时会触发回调==============>") 
                // good
                console.log(size.width, size.height);
            
                this.BannerAdHight = size.height
                this.BannerAdWight = size.width

                //this.BannerAd.style.top = res.screenHeight - this.BannerAdHight
                //this.BannerAd.style.left = res.screenWidth/2 - this.BannerAdWight/2
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
        qg.share({
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
        console.log("banner对象是否存在==============>",this.BannerAd) 
        if(this.BannerAd == null){
            return
        }

        var nowTime = Date.now();
         console.log("间隔时间==============>" , nowTime - this.showBannerTime)
        if(nowTime - this.showBannerTime > 10000){
            this.BannerAd.show().then(()=>{ 
                console.log('banner广告展示完成');
                this.showBannerTime = nowTime;
            }).catch((err)=>{
                console.log('banner广告展示失败', JSON.stringify(err));
            })
        }





        // let res = qg.getSystemInfoSync()
        // console.log("真实屏幕的高========>",res.screenHeight)
        // console.log("platformVersionCode========>",res.platformVersionCode)

        // // 初始化广告banner
        // if(res.platformVersionCode >= 1031){
        //     var nowTime = Date.now();
        //     console.log("间隔时间==============>" , nowTime - this.showBannerTime)
        //     if(nowTime - this.showBannerTime > 10000){
        //         console.log("进来了==============>")
        //         this.createBanner()
        //     }else{
        //         this.hideBanner()
        //     }
        // }
    }


    createBanner() {
        console.log("创建Banner==================>",this.BannerAd);
        console.log("stub===============>",this.stub)
        if(this.BannerAd != null){
            this.hideBanner()
        }


        let res = qg.getSystemInfoSync()
        // 初始化广告banner
        this.BannerAd = qg.createBannerAd({
            posId: '637a8ee850d94534a8c60948a0af654e',
            style: {
                width:200
            }
        });
        
        var nowTime = Date.now();
        console.log("当前时间戳========>",nowTime);

        this.showBannerTime = nowTime;

        // // 广告展示回调
        this.BannerAd.show().then(()=>{ 
            console.log('banner广告展示完成');
            }).catch((err)=>{
            console.log('banner广告展示失败', JSON.stringify(err));
        })


        // // 广告加载回调
        // this.BannerAd.onLoad(() => {
        //     console.log(' banner 广告加载回调');
        // })


        // // 监听banner广告错误事件
        this.BannerAd.onError((err) => {
            console.log(' banner 广告错误',err.errCode);
        })
      
    }




    hideBanner(args?: any, callback?: Function) {
        console.log("隐藏banner==============>",this.BannerAd) 
        if(this.BannerAd != null){
            this.BannerAd.hide()
            //this.BannerAd.destroy()
            //this.BannerAd.offError()
        }
    }



    showInsertAd(args?: any, callback?: Function,stub?: string) {
        //let posid = this.sdkConfig.insertId.get(stub)

        // let res = qg.getSystemInfoSync()
        // if(res.platformVersionCode >= 1031){
        // }else{
        //     console.log("==============>标准版本号过低")
        //     return
        // }

        // console.log("开始显示插屏视频=============>")
        // const interstitialAd = qg.createInterstitialAd({
        //     posId:'9f03f50ccf37436d99a383c8aeef411c' 
        // });

        // interstitialAd.load()

        // interstitialAd.onError(err => {
        //     console.log("插屏广告加载失败", err);
        //     interstitialAd.offError()
        // });
        

        // interstitialAd.onLoad(err => {
        //     console.log("插屏广告onLoad失败", err);
        //     interstitialAd.offLoad()
        // });




        // interstitialAd.show().then(()=>{ 
        //     console.log('插屏广告展示完成');
        //     if (callback) {
        //         callback()
        //     }
        // }).catch((err)=>{
        //     console.log('插屏广告展示失败', JSON.stringify(err));
        // })
    }



    showVideoAd(args?: any, callback?: Function,stub?: string) {
        let instance = this
        console.log("==============>showVideoAd",stub)

        let res = qg.getSystemInfoSync()
        if(res.platformVersionCode >= 1041){
        }else{
            console.log("==============>标准版本号过低")
            return
        }

        //广告限制一分钟内只能请求一次
        var nowTime = Date.now();
        console.log("激励视频播放时间间隔======>", nowTime - this.showVideoTime);
        if(nowTime - this.showVideoTime < 60*1000){
            new TipUI(this.FightScene,"请一分钟后请求广告")
            return
        }

        let m_posId = this.sdkConfig.videoId.get(stub);
        if(m_posId == null){
            console.log("==============>其他视频")
            m_posId = "cdf225bd125643ba8590f1f25923fbc5"
        }

        let videoAd1 = qg.createRewardedVideoAd({ posId: m_posId})

        videoAd1.onError(err => {
            console.log("激励视频广告加载失败", err);
            videoAd1.offError()
        });

        var that1 = this
        videoAd1.onLoad(function(res) {
            console.log('激励视频广告加载完成-onload触发', JSON.stringify(res));
            instance.showVideoTime = Date.now();
            videoAd1.show().then(()=>{ 
                console.log('激励视频广告展示完成');
                that1.FightScene.pauseAll()
            }).catch((err)=>{
                console.log('激励视频广告展示失败', JSON.stringify(err));
            }) 
            videoAd1.offLoad()
        })


        var that = this
        const func = (res)=>{
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
            videoAd1.offClose()
            videoAd1.load()
            that.FightScene.resumeAll()
        }
        videoAd1.onClose(func);
    }



    homeToBackgroud(args?: any, callback?: Function) {}
    backgroudToHome(args?: any, callback?: Function) {}
    openNotify() {}
    registerNotify(key: string, second: number, content: string) {}
    deleteNotify(key: string) {}
    otherFun(args?: any, callback?: Function) {}
    shark(args?: any, callback?: Function) {}

} 