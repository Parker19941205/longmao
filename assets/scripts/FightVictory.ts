/*
    Declare:战斗胜利类
    Date:2014/5/7
    **/


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
        
            next_btn.on("touchend", (event) => {   // 下一关
                resource.removeFromParent()
                that.FightScene.enterNextGate()
             }, this);




        };
        cc.loader.loadRes('prefab/FightVictory', onResourceLoaded );
    }


   
    


     


}
