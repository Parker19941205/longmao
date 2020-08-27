/*
    Declare:签到类
    Date:2014/5/7
    **/

import { AudioMgr } from "./AudioMarger";
import { GameData } from "./GameData";
import { Utils } from "./Utils";
import { TipUI } from "./TipUI";
import { Lib } from "./Lib";


export class SignUI {
    private FightScene;
    private Scene:cc.Node
    private rewardData = null
    private isDouble = false
    private curDayId = 0

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

        cc.log("time==>",Date.parse(new Date().toString()))
        cc.log("time2==>",Lib.GetTimeBySecond())

        


        var onResourceLoaded = function(errorMessage, loadedResource )
        {
            if( errorMessage ) { cc.log( 'Prefab error:' + errorMessage ); return; }
            if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( 'Prefab error' ); return; } 
            var resource = cc.instantiate( loadedResource );
            that.FightScene.node.addChild(resource,100)
            that.Scene = resource

            let closeButton = resource.getChildByName("closeButton");
            closeButton.on("touchend", (event) => {
                resource.removeFromParent()
             }, this);


             let SignInDays =  cc.sys.localStorage.getItem("SignInDays");
             cc.log("SignInDays========>",SignInDays)
             if(SignInDays == null){
                cc.sys.localStorage.setItem("SignInDays",0);
             }


            //  let SignedToday =  cc.sys.localStorage.getItem("SignedToday");
            //  cc.log("SignedToday========>",SignedToday)
            //  if(SignedToday == null){
            //     cc.sys.localStorage.setItem("SignedToday",false);
            //  }


             
            var getSignButton = resource.getChildByName("getSignButton")
            getSignButton.on("touchend", (event) => {   //  双倍领取
                that.isDouble = true
                that.getReword()
             }, this);


             
            var normalSign = resource.getChildByName("normalSign")
            normalSign.on("touchend", (event) => {   // 普通领取
                that.isDouble = false
                that.getReword()
             }, this);




            let rewordBg = resource.getChildByName("rewordBg");
            let rewordItem = rewordBg.getChildByName("rewordItem");



            let SignInData = GameData.SignInData
            let i = 0
            for(const key of Object.keys(SignInData)) {
     
                cc.log("key====>,AMOUNT========>",key,SignInData[key].AMOUNT)
                var button = cc.instantiate(rewordItem) //.clone();
                button.active = true;
                var x = i%3
                var y = Math.floor(i/3)
                //cc.log("x====>,y=====>",x,y)

                button.setPosition(-160+x*160,110-(y*110))
                rewordBg.addChild(button)


                var rewordnum = button.getChildByName("rewordnum").getComponent(cc.Label)  // 奖励数值
                rewordnum.string = SignInData[key].AMOUNT


                let rewordicon = button.getChildByName("rewordicon").getComponent(cc.Sprite)  // 奖励icon
                Utils.loadSprite("res/" + SignInData[key].SMALL_ICON, rewordicon)

                let SignInDays = cc.sys.localStorage.getItem("SignInDays")
                that.curDayId = Number(SignInDays) + 1

                if(Number(key) == that.curDayId){                 // 今日的签到奖励
                    let todayicon = button.getChildByName("todayicon")
                    todayicon.active = true

                    that.updatePreView(SignInData[key])
                    that.rewardData = SignInData[key]
                }


                i = i + 1
            }


           
        };
        cc.loader.loadRes('prefab/SignUI', onResourceLoaded );
    }


   
    updatePreView(data){
        var previewnum = this.Scene.getChildByName("previewbg").getChildByName("previewnum").getComponent(cc.Label)  // 奖励数值
        var previewicon = this.Scene.getChildByName("previewbg").getChildByName("previewicon").getComponent(cc.Sprite) 


        previewnum.string = data.AMOUNT
        Utils.loadSprite("res/" + data.BIG_ICON, previewicon)

    }



    getReword(){
        if(this.rewardData == null){
            return
        }

        var SignedTime = cc.sys.localStorage.getItem("SignedTime")
        //cc.log("今天====>",Lib.compare_time(SignedTime * 1000))
        
        var SignedToday = Lib.compare_time(SignedTime * 1000)
        if(SignedToday == true){
            new TipUI(this.FightScene,"今日已经签到")
            return
        }


        cc.log("rewardData==========>",this.rewardData)

        let kind = Number(this.rewardData.KIND)
        let amount = Number(this.rewardData.AMOUNT)
        if(this.isDouble){
            amount = 2*amount
        }


        if(kind == 1){		//宝石

        }else if(kind == 2){	//金币
            cc.log("金币==========>",amount)
            var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
           cc.sys.localStorage.setItem("CurrentGolds",Number(curGolds)+ amount)
        }else if(kind == 3){	//全屏弹
            let num =  cc.sys.localStorage.getItem("ScreenbulletNum");
            cc.sys.localStorage.setItem("ScreenbulletNum",Number(num) + amount);
        }else if(kind == 4){	//守卫弹
            let num =  cc.sys.localStorage.getItem("ProtectNum");
            cc.sys.localStorage.setItem("ProtectNum",Number(num) + amount);
        }
        cc.sys.localStorage.setItem("SignInDays",this.curDayId);
        cc.sys.localStorage.setItem("SignedTime",Lib.GetTimeBySecond());
        



        this.FightScene.updateFightUI()
        new TipUI(this.FightScene,"签到成功")
    }





     


}
