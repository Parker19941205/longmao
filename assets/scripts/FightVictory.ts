/*
    Declare:战斗胜利类
    Date:2014/5/7
    **/

import { AudioMgr } from "./AudioMarger";
import { SDK } from "./platform/SDK";
import { Def } from "./frameworks/Def";
import { PlatformManager, Platform } from "./platform/PlatformManager";


export class FightVictory {
    private FightScene;
    private txt_gold;
    private earnStar = 0
	private earnGem = 0
    private earnGold = 0
    private _count_stars = 0
    private _count_gems = 0
    private _count_golds = 0
    private resource = null
    private isDouble = true
    private earnGolds = 0

     // 构造方法
     constructor(scene:any) {
        cc.log("构造战斗胜利类=============>")
        this.FightScene = scene

        AudioMgr.getInstance().playEffect("victory");
   
        this.creatBullet()
        return this
     }

     creatBullet(){
        var CanvasNode = cc.find( 'Canvas' );
        if( !CanvasNode ) { cc.log( 'find Canvas error' ); return; } 
        var that = this

        var onResourceLoaded = function(errorMessage, loadedResource )
        {
            if( errorMessage ) { cc.log( 'Prefab error:' + errorMessage ); return; }
            if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( 'Prefab error' ); return; } 
            var resource = cc.instantiate( loadedResource );
            that.FightScene.node.addChild(resource,100)
            //bullet.setPosition(that.battery.node.position.x,that.battery.node.position.y)
            that.resource = resource

            that.earnGolds = Number(that.FightScene.getFightUI().getGolds()) + Number(Math.floor(that.FightScene.getFightUI().getGolds() * that.FightScene.getGoldIncRate()))
            // cc.log("earnGolds========>",that.earnGolds)
            // cc.log("getGolds========>",that.FightScene.getFightUI().getGolds())
            // cc.log("getGoldIncRate========>",that.FightScene.getGoldIncRate())
            // cc.log("getGoldIncRate2========>",Number(Math.floor(that.FightScene.getFightUI().getGolds() * that.FightScene.getGoldIncRate())))

            var win_Score = resource.getChildByName("win_bg").getChildByName("win_bg2").getChildByName("win_Score").getComponent(cc.Label)
            win_Score.string = String(Number(that.earnGolds)*2)


            var next_btn = resource.getChildByName("next_btn")
            next_btn.on("touchend", (event) => {   // 双倍领取
                if(that.isDouble == true){
                    SDK.getInstance().ShowVideoAd(() => {
                        var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
                        cc.sys.localStorage.setItem("CurrentGolds",Number(curGolds) + Number(that.earnGolds)*2)

                        that.FightScene.updateFightUI()
                        resource.removeFromParent()
                        that.FightScene.goHome()
                    }, Def.videoType.video_score);
                }else{
                    var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
                    cc.sys.localStorage.setItem("CurrentGolds",Number(curGolds) + Number(that.earnGolds))
                    
                    that.FightScene.updateFightUI()
                    resource.removeFromParent()
                    that.FightScene.goHome()
                }
             }, this);



             var nothanksNode = resource.getChildByName("nothanksNode")
            //  var callback = cc.callFunc(function () {
            //     nothanksNode.active =  true
            //  })
     
            //  var action = cc.sequence(cc.delayTime(3),callback)
            //  resource.runAction(action)


           

             nothanksNode.on("touchend", (event) => {   //  普通领取
                var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
                cc.sys.localStorage.setItem("CurrentGolds",Number(curGolds) + Number(that.earnGolds))
                that.FightScene.updateFightUI()

                resource.removeFromParent()
                that.FightScene.goHome()

             }, this);



             //关卡加1下一关
             var lastSaevGates = cc.sys.localStorage.getItem("CurrentGates");
             var currentGates = Number(lastSaevGates) + 1
             cc.sys.localStorage.setItem("CurrentGates",Number(currentGates));


             var share_btn = resource.getChildByName("share_btn")
             // 分享功能
             if(PlatformManager.CurrentPlatform == Platform.BYTEDANCE || PlatformManager.CurrentPlatform == Platform.QQGAME || PlatformManager.CurrentPlatform == Platform.Baidu){
                share_btn.active = true
            }

            // 分享录屏
            share_btn.on("touchend", function (event) {
                console.log("点击分享录屏=============>")
                if(PlatformManager.CurrentPlatform == Platform.BYTEDANCE){
                    PlatformManager.getInstance().shareVideo()
                }
                if(PlatformManager.CurrentPlatform == Platform.QQGAME || PlatformManager.CurrentPlatform == Platform.Baidu){
                    SDK.getInstance().share()
                }

            }, this);
            


            // 双倍复选框
            var doubleGet = resource.getChildByName("doubleGet")
            doubleGet.on('toggle', that.callback1, that);


             AudioMgr.getInstance().playEffect("BGM003");
             AudioMgr.getInstance().playEffect("SE012");


            //插屏
            PlatformManager.getInstance().showInsertAd(null,null,Def.insertType.resultui_insert)
        };
        cc.loader.loadRes('prefab/FightVictory', onResourceLoaded );

    }


    // 复选框回调
    callback1 (event) {
        var toggle = event;
        //do whatever you want with toggle
        var textlabel = this.resource.getChildByName("next_btn").getChildByName("textlabel").getComponent(cc.Label)
        var videosmallicon = this.resource.getChildByName("next_btn").getChildByName("videosmallicon")
        
        if(toggle.isChecked){
            textlabel.string = "双倍领取"
            this.isDouble = true
            videosmallicon.active = true

            var win_Score = this.resource.getChildByName("win_bg").getChildByName("win_bg2").getChildByName("win_Score").getComponent(cc.Label)
            win_Score.string = String(Number(this.earnGolds)*2)

        }else{
            textlabel.string = "单倍领取"
            this.isDouble = false
            videosmallicon.active = false

            var win_Score = this.resource.getChildByName("win_bg").getChildByName("win_bg2").getChildByName("win_Score").getComponent(cc.Label)
            win_Score.string = String(Number(this.earnGolds))

        }
    }


     


}
