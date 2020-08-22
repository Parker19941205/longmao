/*
    Declare:更换炮台类
    Date:2014/5/7
    **/

import { GameData } from "./GameData";
import { Utils } from "./Utils";


export class EqiupChange {
    private FightScene;
    private previewBg

     // 构造方法
     constructor(scene:any) {
        cc.log("构造更换炮台类=============>")
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
            that.FightScene.node.addChild(resource,200)
            //bullet.setPosition(that.battery.node.position.x,that.battery.node.position.y)


            let paotanScrollView = resource.getChildByName("paotanScrollView")
            let scrollViewContent = paotanScrollView.getChildByName("view").getChildByName("content")
            let previewBg = resource.getChildByName("previewBg")
            that.previewBg  = previewBg

            
            let closeBtn = resource.getChildByName("closeBtn")
            closeBtn.on("touchend", (event) => {   // 开始游戏
                resource.removeFromParent()
            }, this);






            let btn_template = scrollViewContent.getChildByName("paodanitem");

            let batteryData = GameData.BatteryData
            let i = 0
            for(const key of Object.keys(batteryData)) {
                cc.log("key=============>",key)
                cc.log("value=============>",batteryData[key])
    
                // for(const data of Object.values(enemies[key])){
                //    // cc.log("data=============>",data)
                //     var EnemyObj = new Enemy(this,key)
                //     EnemyObj.init(data)
                // }

                cc.log("TITLE_ICON=============>",batteryData[key].TITLE_ICON)

                var button = cc.instantiate(btn_template) //.clone();
                let titileicon = button.getChildByName("titilebg").getChildByName("titileicon")
                var icon = titileicon.getComponent(cc.Sprite)
                Utils.loadSprite("res/" + batteryData[key].TITLE_ICON, icon)

                // 方法2
                // var s = "resources/res/paotai3.png"
                // icon.spriteFrame = new cc.SpriteFrame(cc.url.raw(s))


                button.active = true;
                button.index = key;
                button.targetOff(that)
                button.setPosition(0,-35-i*60)
                button.on("touchend", that.GotoSelectLayer, that);
                scrollViewContent.addChild(button);


                
                let equipBtn = button.getChildByName("equipBtn")
                equipBtn.index = key;
                equipBtn.on("touchend", that.changeBattry, that);



                i = i + 1
            }


            that.initBatteryPreview("BATT_1")

        };
        cc.loader.loadRes('prefab/PaodanChange', onResourceLoaded );
    }


    GotoSelectLayer(event) {
        var index = event.currentTarget.index;
        cc.log("index==============>",index)

        this.initBatteryPreview(index)
    }
    
    changeBattry(event) {
        var index = event.currentTarget.index;
        cc.log("index==============>",index)
        let batteryData = GameData.BatteryData
        var file =  batteryData[index].ANI_FILE;
       // this.initBatteryPreview(index)

       this.FightScene.changeBattery(file)
    }
    

    initBatteryPreview(index){
        let aniNode = this.previewBg.getChildByName("aniNode")
        let batteryData = GameData.BatteryData

        var dirPath = "ani/" + batteryData[index].ANI_FILE;
        Utils.loadDragonBones(aniNode, dirPath)


        let gjnode = this.previewBg.getChildByName("gjSprite").getChildByName("label")  // 攻击
        var gjlabel =gjnode.getComponent(cc.Label)
        gjlabel.string =  batteryData[index].ATK_INC + "%" 

        let sdnode = this.previewBg.getChildByName("sdSprite").getChildByName("label")  // 速度
        var sdlabel =sdnode.getComponent(cc.Label)
        sdlabel.string =  batteryData[index].ATK_SPEED + "%" 

        let jqhdnode = this.previewBg.getChildByName("jqhdSprite").getChildByName("label")  // 金钱获得
        var jqhdlabel =jqhdnode.getComponent(cc.Label)
        jqhdlabel.string =  batteryData[index].GOLD_INC + "%" 

        let bsjlnode = this.previewBg.getChildByName("bsjlSprite").getChildByName("label")  // 宝石奖励
        var bsjllabel =bsjlnode.getComponent(cc.Label)
        bsjllabel.string =  batteryData[index].PAY_PRICE





    }

     


}
