/*
    Declare:暂停UI
    Date:2014/5/7
    **/

import { PlatformManager, Platform } from "./platform/PlatformManager";
import { Def } from "./frameworks/Def";
import { SDK } from "./platform/SDK";


export class PauseUI {
    private FightScene;
    private continu_btn
    private goback_btn
        
    
     // 构造方法
     constructor(scene:any) {
        cc.log("构造暂停UI类=============>")
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
            var prefabNode = cc.instantiate( loadedResource );
            that.FightScene.node.addChild(prefabNode,2000)

            var btnNode = prefabNode.getChildByName("btnNode")
            that.continu_btn = btnNode.getChildByName("continu_btn")
            that.goback_btn = btnNode.getChildByName("goback_btn")

            that.showing(btnNode)


            that.continu_btn.on("touchend", (event) => {
                cc.log("恢复=========>")
                that.closing(btnNode,prefabNode)
            }, this);



            //主页
            that.goback_btn.on("touchend", (event) => {
                cc.log("主页=========>")
                that.closing(btnNode,prefabNode)
                that.FightScene.getFightScene().goHome()
            }, this);

            //插屏
            PlatformManager.getInstance().showInsertAd(null,null,Def.insertType.parseui_insert)



        };
        cc.loader.loadRes('prefab/PauseUI', onResourceLoaded );
      
    }


    // 弹出动画
    showing(btnNode){
        if(btnNode == null) {
            return
        } 
        
        btnNode.setScale(0)
        var that = this
        var array = new Array()
        array.push(cc.scaleTo(0.3, 1.0))
        array.push(cc.callFunc(function () {
            that.FightScene.getFightScene().pauseAll()
        }))
        btnNode.runAction(cc.sequence(array))

    }
    
    //关闭动画
    closing(btnNode,prefabNode){
        this.FightScene.getFightScene().resumeAll()
        cc.log("关闭动画=========>",btnNode)
        if(btnNode == null) {
            return
        } 
        
        var that = this
        var array = new Array()
        array.push(cc.scaleTo(0.3, 0))
        array.push(cc.callFunc(function () {
            prefabNode.removeFromParent()
            that.FightScene.StopBannerNode  = false

            if(PlatformManager.CurrentPlatform == Platform.Vivo){
                SDK.getInstance().CloseBannerAd()
            }
        }))
        btnNode.runAction(cc.sequence(array))

    }
     


}
