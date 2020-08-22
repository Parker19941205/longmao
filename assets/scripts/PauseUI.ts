/*
    Declare:暂停UI
    Date:2014/5/7
    **/


export class PauseUI {
    private FightScene;
    private txt_gold;
    private earnStar = 0
	private earnGem = 0
    private earnGold = 0
    private _count_stars = 0
    private _count_gems = 0
    private _count_golds = 0
    private continu_btn

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
            that.FightScene.node.addChild(prefabNode,100)

            var btnNode = prefabNode.getChildByName("btnNode")
            that.continu_btn = btnNode.getChildByName("continu_btn")
            that.showing(btnNode)


            that.continu_btn.on("touchend", (event) => {
                cc.log("恢复=========>")
                that.closing(btnNode,prefabNode)
            }, this);
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
        }))
        btnNode.runAction(cc.sequence(array))

    }
     


}
