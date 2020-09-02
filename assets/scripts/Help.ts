/*
    Declare:引导类
    Date:2014/5/7
    **/

import { AudioMgr } from "./AudioMarger";


export class Help {
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
        cc.log("构造引导类=============>")
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
            //bullet.setPosition(that.battery.node.position.x,that.battery.node.position.y)


            var masklayer = resource.getChildByName("masklayer")
            var bgcontent = resource.getChildByName("bgcontent")
            var sprite = bgcontent.getComponent(cc.Sprite);
            var lastSaevGates = cc.sys.localStorage.getItem("CurrentGates");

            var index = 0
            masklayer.on("touchend", (event) => {   // 下一关
                //cc.log("下一张==========>")
                var s = "res/helper_103"
                var s1 = "res/helper_104"

                if(Number(lastSaevGates) == 2 || Number(lastSaevGates) == 3){
                    that.FightScene.topEnemyMove = false
                    resource.removeFromParent()
                    return
                }



                if(index == 0){
                    cc.loader.loadRes(s,cc.SpriteFrame,(er:Error,res:cc.SpriteFrame)=>{
                        if(er){
                            return;
                        }
                        sprite.spriteFrame = res;
                        index = index + 1
                    })
                }else if(index == 1){
                    cc.loader.loadRes(s1,cc.SpriteFrame,(er:Error,res:cc.SpriteFrame)=>{
                        if(er){
                            return;
                        }
                        sprite.spriteFrame = res;
                        index = index + 1
                    })
                }else{
                    that.FightScene.topEnemyMove = false
                    resource.removeFromParent()
                }
             }, this);



            
             if(Number(lastSaevGates) == 2){
                var s = "res/helper_106"
                cc.loader.loadRes(s,cc.SpriteFrame,(er:Error,res:cc.SpriteFrame)=>{
                    if(er){
                        return;
                    }
                    sprite.spriteFrame = res;
                })

             }else if(Number(lastSaevGates) == 3){
                var s = "res/helper_107"
                cc.loader.loadRes(s,cc.SpriteFrame,(er:Error,res:cc.SpriteFrame)=>{
                    if(er){
                        return;
                    }
                    sprite.spriteFrame = res;
                })
             }


         
            that.FightScene.topEnemyMove = true
            
        };
        cc.loader.loadRes('prefab/helper_102', onResourceLoaded );
    }


   
    


     


}
