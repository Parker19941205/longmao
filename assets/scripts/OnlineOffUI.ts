/*
    Declare:离线收益类
    Date:2014/5/7
    **/

import { AudioMgr } from "./AudioMarger";
import { GameData } from "./GameData";
import { Utils } from "./frameworks/Utils";
import { TipUI } from "./TipUI";
import { Lib } from "./frameworks/Lib";
import { SDK } from "./platform/SDK";
import { Def } from "./frameworks/Def";
import { DataCensus } from "./frameworks/DataCensus";


export class OnlineOffUI {
    private FightScene;
    private Scene:cc.Node
    private rewardData = null
    private isDouble = false
    private curDayId = 0
    private currentGuajiNum = 0

     // 构造方法
     constructor(scene:any,goldNum) {
        this.FightScene = scene
        cc.log("离线收益类============>")



        this.currentGuajiNum = goldNum
   
        this.creatUI()
        return this
     }

     creatUI(){
        var CanvasNode = cc.find( 'Canvas' );
        if( !CanvasNode ) { cc.log( 'find Canvas error' ); return; } 
        var that = this



        var onResourceLoaded = function(errorMessage, loadedResource )
        {
            if( errorMessage ) { cc.log( 'Prefab error:' + errorMessage ); return; }
            if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( 'Prefab error' ); return; } 
            var resource = cc.instantiate( loadedResource );
            that.FightScene.node.addChild(resource,100)
            that.Scene = resource

            let closeButton = resource.getChildByName("close_btn");
            closeButton.on("touchend", (event) => {
                resource.removeFromParent()
             }, this);


            var nothanksNode =  resource.getChildByName("nothanksNode")  

            
            var action1 = cc.delayTime(2)
            var action2 = cc.callFunc(function(){
                nothanksNode.active = true
            })


            let array =  new Array()
            array.push(action1)
            array.push(action2)
            resource.runAction(cc.sequence(array))

            let goldNum = resource.getChildByName("win_bg").getChildByName("goldNum").getComponent(cc.Label)
            goldNum.string = String(that.currentGuajiNum)


             
            var double_btn = resource.getChildByName("double_btn")
            double_btn.on("touchend", (event) => {   //  双倍领取
                that.isDouble = true
                that.getReword()
             }, this);


             nothanksNode.on("touchend", (event) => {   //  不了，谢谢
                cc.log("不了，谢谢============>",)
                that.isDouble = false
                that.successCallBack()
             }, this);


           
        };
        cc.loader.loadRes('prefab/OnlineOffShouYi', onResourceLoaded );
    }


    getReword(){
        if(this.currentGuajiNum == 0){
            return
        }

      
        SDK.getInstance().ShowVideoAd(() => {
            this.successCallBack()

            this.FightScene.scheduleOnce(() => {
                // 事件统计
                DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_users_hangupwindow)
            },0)
 
            this.FightScene.scheduleOnce(() => {
                 // 事件统计
                DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_times_hangupwindow,null,true)
             },0.5)
 
        }, Def.videoType.video_offline);
    }

     successCallBack(){
        let amount = Number(this.currentGuajiNum)
        if(this.isDouble){
            amount = 2*amount
        }

        var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
        cc.sys.localStorage.setItem("CurrentGolds",Number(curGolds) + amount)

        cc.sys.localStorage.setItem("GuajiGold",0);


        this.FightScene.updateFightUI()
        this.Scene.removeFromParent()
     }






}
