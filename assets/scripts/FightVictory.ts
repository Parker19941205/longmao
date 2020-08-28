/*
    Declare:战斗胜利类
    Date:2014/5/7
    **/

import { AudioMgr } from "./AudioMarger";
import { SDK } from "./platform/SDK";
import { Def } from "./frameworks/Def";


export class FightVictory {
    private FightScene;
    private txt_gold;
    private earnStar = 0
	private earnGem = 0
    private earnGold = 0
    private _count_stars = 0
    private _count_gems = 0
    private _count_golds = 0

     // 构造方法
     constructor(scene:any) {
        cc.log("构造战斗胜利类=============>")
        this.FightScene = scene


   
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

            var next_btn = resource.getChildByName("next_btn")
        
            next_btn.on("touchend", (event) => {   // 双倍领取
                SDK.getInstance().ShowVideoAd(() => {
                    var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
                    cc.sys.localStorage.setItem("CurrentGolds",Number(curGolds) + 200)
                    that.FightScene.updateFightUI()

                    resource.removeFromParent()
                    that.FightScene.goHome()
                }, Def.videoType.video_score);
             }, this);



             var nothanksNode = resource.getChildByName("nothanksNode")
             var callback = cc.callFunc(function () {
                nothanksNode.active =  true
             })
     
             var action = cc.sequence(cc.delayTime(3),callback)
             resource.runAction(action)



             nothanksNode.on("touchend", (event) => {   //  普通领取
                SDK.getInstance().ShowVideoAd(() => {
                    var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
                    cc.sys.localStorage.setItem("CurrentGolds",Number(curGolds) + 100)
                    that.FightScene.updateFightUI()

                    resource.removeFromParent()
                    that.FightScene.goHome()
                }, Def.videoType.video_score);
             }, this);




             //关卡加1下一关
             var lastSaevGates = cc.sys.localStorage.getItem("CurrentGates");
             var currentGates = Number(lastSaevGates) + 1
             cc.sys.localStorage.setItem("CurrentGates",Number(currentGates));




             AudioMgr.getInstance().playEffect("BGM003");
             AudioMgr.getInstance().playEffect("SE012");

        };
        cc.loader.loadRes('prefab/FightVictory', onResourceLoaded );
    }


   
    


     


}
