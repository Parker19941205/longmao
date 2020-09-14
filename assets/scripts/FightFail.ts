/*
    Declare:战斗失败类
    Date:2014/5/7
    **/

import { AudioMgr } from "./AudioMarger";
import { SDK } from "./platform/SDK";
import { Def } from "./frameworks/Def";
import { PlatformManager, Platform } from "./platform/PlatformManager";
import { DataCensus } from "./frameworks/DataCensus";


export class FightFail {
    private FightScene;

     // 构造方法
     constructor(scene:any) {
        cc.log("构造战斗失败类=============>")
        this.FightScene = scene


   
        this.createUI()
        return this
     }

     createUI(){
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

            var continue_btn = resource.getChildByName("continue_btn")
            var nothanksNode = resource.getChildByName("nothanksNode")
            



            nothanksNode.on("touchend", (event) => {   // 回到主页
                resource.removeFromParent()
                that.FightScene.goHome()
             }, this);


             continue_btn.on("touchend", (event) => {   // 重新开始
                SDK.getInstance().ShowVideoAd(() => {
                    resource.removeFromParent()
                    //that.FightScene.goHome()
                    that.FightScene.revive()

                     // 事件统计
                     DataCensus.userStepCensus(Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_users_rebirth)
                     // 事件统计
                     DataCensus.userStepCensus(Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_times_rebirth,null,true)
                }, Def.videoType.video_rebirth);
             }, this);




             var daojishi = resource.getChildByName("daojishi")
            
            var daojishi_label = daojishi.getComponent(cc.Label)
            var jindu = 3
            var callback = (cc.callFunc(function () {
                jindu = jindu - 1
                daojishi_label.string = String(jindu)

                if(jindu <= 0){
                    daojishi.stopAllActions();
                    nothanksNode.active =  true
                }
            }))
    
            var action = cc.repeatForever(cc.sequence(cc.delayTime(1),callback))
            daojishi.runAction(action)


            var share_btn = resource.getChildByName("share_btn")
            // 抖音录屏功能
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


            AudioMgr.getInstance().playEffect("BGM004");

             //插屏
            PlatformManager.getInstance().showInsertAd(null,null,Def.insertType.resultui_insert)
        };
        cc.loader.loadRes('prefab/FightFail', onResourceLoaded );
        
    }


   
    


     


}
