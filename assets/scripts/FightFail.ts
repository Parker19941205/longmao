/*
    Declare:战斗失败类
    Date:2014/5/7
    **/

import { AudioMgr } from "./AudioMarger";


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
        
            continue_btn.on("touchend", (event) => {   // 下一关
                resource.removeFromParent()
                that.FightScene.goHome()
             }, this);


            


             AudioMgr.getInstance().playEffect("BGM004");



        };
        cc.loader.loadRes('prefab/FightFail', onResourceLoaded );
    }


   
    


     


}
