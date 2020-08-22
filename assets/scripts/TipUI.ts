import FightScene from "./FightScene";
import { removeListener } from "process";

const { ccclass, property } = cc._decorator;
@ccclass
export class TipUI  {
    private FightScene:FightScene

    // 构造方法
    constructor(scene:any,strs:string) {
        this.FightScene = scene

        this.creatUI(strs)
        return this
    }


    creatUI(strs){
        var CanvasNode = cc.find( 'Canvas' );
        if( !CanvasNode ) { cc.log( 'find Canvas error' ); return; } 
        var that = this

        var onResourceLoaded = function(errorMessage, loadedResource )
        {
            if( errorMessage ) { cc.log( 'Prefab error:' + errorMessage ); return; }
            if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( 'Prefab error' ); return; } 
            var resource = cc.instantiate( loadedResource );
            that.FightScene.node.addChild(resource)


            let tipsLayer = resource

            tipsLayer.stopAllActions();
           // tipsLayer.setPosition(0, 0)
            let tips = tipsLayer.getChildByName("tips")
            let tipStr = tipsLayer.getChildByName("tipStr")
            //let strs = Lib.AddNewlineCharacter2(strings, 9)
            tips.removeAllChildren(true)

           
            tipStr.active = true
            tipStr.getComponent(cc.Label).string = strs
            tipsLayer.setScale(0, 0.1);
            tipsLayer.runAction(cc.sequence(cc.scaleTo(0.1, 1, 0.1), cc.scaleTo(0.1, 1, 1), cc.delayTime(2), cc.spawn(cc.moveBy(2, cc.v2(0, 100)), cc.fadeOut(1)), cc.callFunc(() => {
                resource.removeFromParent()
            })));

        };
        cc.loader.loadRes('prefab/TipUI', onResourceLoaded );
    }
}