/*
    Declare:签到类
    Date:2014/5/7
    **/

import { AudioMgr } from "./AudioMarger";
import { GameData } from "./GameData";
import { Utils } from "./frameworks/Utils";
import { TipUI } from "./TipUI";
import { Lib } from "./frameworks/Lib";
import { SDK } from "./platform/SDK";
import { Def } from "./frameworks/Def";
import { PlatformManager, Platform } from "./platform/PlatformManager";


export class GuajiUI {
    private FightScene;
    private Scene:cc.Node
    private rewardData = null
    private isDouble = false
    private curDayId = 0
    private currentGuajiNum = 0

     // 构造方法
     constructor(scene:any) {
        this.FightScene = scene


   
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
                that.FightScene.StopBannerNode  = false

                if(PlatformManager.CurrentPlatform == Platform.Vivo){
                    SDK.getInstance().CloseBannerAd()
                }
             }, this);



            that.currentGuajiNum =  cc.sys.localStorage.getItem("GuajiGold");
        

            let goldNum = resource.getChildByName("win_bg").getChildByName("goldNum").getComponent(cc.Label)
            goldNum.string = String(that.currentGuajiNum)


             
            var double_btn = resource.getChildByName("double_btn")
            double_btn.on("touchend", (event) => {   //  双倍领取
                that.isDouble = true
                that.getReword()
             }, this);


             
            var normal_btn = resource.getChildByName("normal_btn")
            normal_btn.on("touchend", (event) => {   // 普通领取
                that.isDouble = false
                that.successCallBack()
             }, this);


              // 水印
            var shuiyinLabel = resource.getChildByName("shuiyinLabel")
            if(PlatformManager.CurrentPlatform == Platform.SISANJIUJIU){
               shuiyinLabel.active = true
           }



        };
        cc.loader.loadRes('prefab/GuajiShouYi', onResourceLoaded );

        //PlatformManager.getInstance().showInsertAd("parseui")
    }


    getReword(){
        if(this.currentGuajiNum == 0){
            return
        }

      
        SDK.getInstance().ShowVideoAd(() => {
            this.successCallBack()
        }, Def.videoType.guajishouyi);
    }

     successCallBack(){
        let amount = Number(this.currentGuajiNum)
        if(this.isDouble){
            amount = 2*amount
        }


        var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
        cc.sys.localStorage.setItem("CurrentGolds",Number(curGolds) + amount)

        let num =  cc.sys.localStorage.getItem("GuajiGold");
        //cc.sys.localStorage.setItem("GuajiGold",Number(num) - Number(this.currentGuajiNum));
        cc.sys.localStorage.setItem("GuajiGold",0);
        

        this.FightScene.updateFightUI()

        this.Scene.removeFromParent()

        if(PlatformManager.CurrentPlatform == Platform.Vivo){
            SDK.getInstance().CloseBannerAd()
        }
     }






}
