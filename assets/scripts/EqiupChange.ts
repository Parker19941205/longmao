/*
    Declare:更换炮台类
    Date:2014/5/7
    **/

import { GameData } from "./GameData";
import { Utils } from "./Utils";
import { TipUI } from "./TipUI";
import FightScene from "./FightScene";


export class EqiupChange {
    private FightScene:FightScene
    private previewBg
    private buttonArray:Map<any,any> = new Map()
    private node



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
            closeBtn.on("touchend", (event) => {   
                resource.removeFromParent()
            }, this);





            let btn_template = scrollViewContent.getChildByName("paodanitem");

            let batteryData = GameData.BatteryData
            let i = 0
            for(const key of Object.keys(batteryData)) {
     
                var button = cc.instantiate(btn_template) //.clone();
                let titileicon = button.getChildByName("titilebg").getChildByName("titileicon")
                var icon = titileicon.getComponent(cc.Sprite)
                Utils.loadSprite("res/" + batteryData[key].TITLE_ICON, icon)

        
                button.active = true;
                button.index = key;
                button.targetOff(that)
                button.setPosition(0,-35-i*60)
                button.on("touchend", that.GotoSelectLayer, that);
                scrollViewContent.addChild(button);
                

                let equipBtn = button.getChildByName("equipBtn")
                equipBtn.index = key;
                equipBtn.on("touchend", that.changeBattry, that);
                //that.buttonArray.push(equipBtn)
                that.buttonArray.set(key,equipBtn)


                i = i + 1
            }


            // 初始化
            let CurrentBattery = cc.sys.localStorage.getItem("CurrentBattery");
            if(CurrentBattery == null){
                cc.sys.localStorage.setItem("CurrentBattery","BATT_1");
            }
            cc.sys.localStorage.setItem("BATT_1",true);
            that.initBatteryPreview("BATT_1")


            that.resetAllButton()
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
        cc.log("index==============>,event======>",index,event)

        let equipIndex = cc.sys.localStorage.getItem(index);
        cc.log("equipIndex==========>",equipIndex)
        if(equipIndex == null){  // 购买炮台
            this.buyBattry(index)
            return
        }

   
        cc.sys.localStorage.setItem("CurrentBattery",index);

        //let batteryData = GameData.BatteryData
        //var file =  batteryData[index].ANI_FILE;

        this.FightScene.changeBattery()
        this.resetAllButton()
    }
    
    // 购买炮台
    buyBattry(index){
        let payPrice = Number(GameData.BatteryData[index].PAY_PRICE)
        var curGolds = Number(cc.sys.localStorage.getItem("CurrentGolds"))
        if(curGolds >= payPrice){
            cc.sys.localStorage.setItem(index,true);
            cc.sys.localStorage.setItem("CurrentGolds",curGolds - payPrice);
            this.FightScene.updateFightUI()
            this.resetAllButton()
        }else{
            new TipUI(this.FightScene,"金币不足")
        }
    }


    //更新按钮状态
    resetAllButton(){
        //cc.log("size===========>",this.buttonArray.size)

        this.buttonArray.forEach((value , key) =>{
            var node = value
            var res = "res/wuqiup_pay1" //正常状态

            let saveData = cc.sys.localStorage.getItem(key);
            if(saveData){ // 已购买
                res = "res/battery_btn3"
            }
            let CurrentBattery = cc.sys.localStorage.getItem("CurrentBattery");
            if(CurrentBattery == key){ // 已装备
                res = "res/battery_btn1"
            }


            var button:cc.Button = node.getComponent(cc.Button)

             cc.loader.loadRes(res, cc.SpriteFrame, function(err, spriteFrame) {
                 if (!err) {
                     button.normalSprite = spriteFrame
                     button.pressedSprite = spriteFrame
                     button.hoverSprite = spriteFrame
                 }
             });
        });
    }



    initBatteryPreview(index){
        let aniNode = this.previewBg.getChildByName("aniNode")
        let batteryData = GameData.BatteryData

        var dirPath = "ani/" + batteryData[index].ANI_FILE;
        Utils.loadDragonBones2(aniNode,dirPath)



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
