/*
    Declare:战斗UI类
    Date:2014/5/7
    **/

import FightScene, { BombType } from "./FightScene";
import { Bullet } from "./Bullet";
import { GameData } from "./GameData";
import { TipUI } from "./TipUI";
import { resolveSrv } from "dns";


export class FightUI {

    private FightScene:FightScene
    private txt_gold;
    private earnStar = 0
	private earnGem = 0
    private earnGold = 0
    private _count_stars = 0
    private _count_gems = 0
    private _count_golds = 0
    private gold_icon
    private goldNode


     // 构造方法
     constructor(scene:any) {
        cc.log("构造战斗UI类=============>")

        this.FightScene = scene
        this.txt_gold =  this.FightScene.node.getChildByName("goldNode").getChildByName("goldBg").getChildByName("gold_label")
        //this.gold_label.active = false
        this.gold_icon =  this.FightScene.node.getChildByName("goldNode").getChildByName("goldBg").getChildByName("gold_icon")
        this.goldNode =  this.FightScene.node.getChildByName("goldNode")




        let bulletRockBtn = this.FightScene.node.getChildByName("skillNode").getChildByName("bulletRockBtn")
        bulletRockBtn.on("touchend", (event) => {   // 重型弹
            if(bulletRockBtn.index == true || this.FightScene.isguajiing == true){
                cc.log("冷却中=======>")
                return
            }
            var cdTime = this.getNeedCD(BombType.Rock)

            this.FightScene.createBulletRock()
            this.checkCDTime(bulletRockBtn,cdTime)
        }, this);


        let airBulletBtn = this.FightScene.node.getChildByName("skillNode").getChildByName("AirBulletButton")
        airBulletBtn.on("touchend", (event) => {   // 空气弹
            if(airBulletBtn.index == true || this.FightScene.isguajiing == true){
                cc.log("冷却中=======>")
                return
            }
            var cdTime = this.getNeedCD(BombType.Air)

            this.FightScene.createBulletAir()
            this.checkCDTime(airBulletBtn,cdTime)
        }, this);

        let iceBulletBtn = this.FightScene.node.getChildByName("skillNode").getChildByName("IceBulletButton")
        iceBulletBtn.on("touchend", (event) => {   // 冰弹
            if(iceBulletBtn.index == true || this.FightScene.isguajiing == true){
                cc.log("冷却中=======>")
                return
            }
            var cdTime = this.getNeedCD(BombType.Ice)

            this.FightScene.createBulletIce()
            this.checkCDTime(iceBulletBtn,cdTime)
        }, this);


        
        let bulletScreenBtn = this.FightScene.node.getChildByName("buyNode").getChildByName("BulletScreenBtn")
        bulletScreenBtn.on("touchend", (event) => {   // 全屏弹
            if(this.FightScene.isguajiing == true){
                return
            }


            let num =  cc.sys.localStorage.getItem("ScreenbulletNum");
            if(num > 0){
                this.FightScene.createBulletScreen()
                cc.sys.localStorage.setItem("ScreenbulletNum",Number(num) - 1);
                this.updateAll()

            }else{
                new TipUI(this.FightScene,"数量不足")
            }
        }, this);


        let bulletProtectBtn = this.FightScene.node.getChildByName("buyNode").getChildByName("BulletProtectBtn")
        bulletProtectBtn.on("touchend", (event) => {   // 守卫弹
            if(this.FightScene.isguajiing == true){
                return
            }

            let num =  cc.sys.localStorage.getItem("ProtectNum");
            if(num > 0){
                this.FightScene.createBulletProtect()
                cc.sys.localStorage.setItem("ProtectNum",Number(num) - 1);
                this.updateAll()
            }else{
                new TipUI(this.FightScene,"数量不足")
            }
            
        }, this);









        var bulletNormalBtn = this.FightScene.node.getChildByName("buyNode").getChildByName("bulletNormalBtn")


        bulletNormalBtn.getChildByName("lvupBtn").on("touchend", (event) => {   // 升级
           cc.log("升级=========>")
           var isCanLv = this.dealUpLv(BombType.Normal)
           if(isCanLv){
            let level =  cc.sys.localStorage.getItem("bullet" + BombType.Normal);
            cc.sys.localStorage.setItem("bullet" + BombType.Normal,Number(level) + 1);

            //this.updateInfo(bulletNormalBtn,BombType.Normal)
            this.updateAll()
           }
        }, this);

        bulletRockBtn.getChildByName("lvupBtn").on("touchend", (event) => {   // 升级
            cc.log("升级=========>")
            var isCanLv = this.dealUpLv(BombType.Rock)
            if(isCanLv){
                let level =  cc.sys.localStorage.getItem("bullet" + BombType.Rock);
                cc.sys.localStorage.setItem("bullet" + BombType.Rock,Number(level) + 1);
    
                //this.updateInfo(bulletRockBtn,BombType.Rock)
                this.updateAll()
            }
         }, this);

         airBulletBtn.getChildByName("lvupBtn").on("touchend", (event) => {   // 升级
            cc.log("升级=========>")
            var isCanLv = this.dealUpLv(BombType.Air)
            if(isCanLv){
                let level =  cc.sys.localStorage.getItem("bullet" + BombType.Air);
                cc.sys.localStorage.setItem("bullet" + BombType.Air,Number(level) + 1);
    
                //this.updateInfo(airBulletBtn,BombType.Air)
                this.updateAll()
            }
         }, this);

         iceBulletBtn.getChildByName("lvupBtn").on("touchend", (event) => {   // 升级
            cc.log("升级=========>")
            var isCanLv = this.dealUpLv(BombType.Ice)
            if(isCanLv){
                let level =  cc.sys.localStorage.getItem("bullet" + BombType.Ice);
                cc.sys.localStorage.setItem("bullet" + BombType.Ice,Number(level) + 1);
    
                //this.updateInfo(iceBulletBtn,BombType.Ice)
                this.updateAll()
            }
         }, this);


         bulletScreenBtn.getChildByName("lvupBtn").on("touchend", (event) => {   // 升级
            cc.log("升级=========>")
            var isCanLv = this.dealUpLv(BombType.Screen)
            if(isCanLv){
                let level =  cc.sys.localStorage.getItem("bullet" + BombType.Screen);
                cc.sys.localStorage.setItem("bullet" + BombType.Screen,Number(level) + 1);
    
                //this.updateInfo(bulletScreenBtn,BombType.Screen)
                this.updateAll()
            }
         }, this);


         bulletProtectBtn.getChildByName("lvupBtn").on("touchend", (event) => {   // 升级
            cc.log("升级=========>")

            var isCanLv = this.dealUpLv(BombType.Protect)
            if(isCanLv){
                let level_m =  cc.sys.localStorage.getItem("bullet" + BombType.Protect);
                cc.sys.localStorage.setItem("bullet" + BombType.Protect,Number(level_m) + 1);
    
                //this.updateInfo(bulletProtectBtn,BombType.Protect)
                this.updateAll()
            }
        }, this);



        bulletScreenBtn.getChildByName("buyBtn").on("touchend", (event) => {   // 全屏弹购买
            cc.log("购买=========>")
            var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
            if(curGolds > 500){
                let num =  cc.sys.localStorage.getItem("ScreenbulletNum");
                cc.sys.localStorage.setItem("ScreenbulletNum",Number(num) + 1);
                cc.sys.localStorage.setItem("CurrentGolds",Number(curGolds) - 500);


                //this.updateInfo(bulletScreenBtn,BombType.Screen)
                this.updateAll()
            }else{
                new TipUI(this.FightScene,"金币不足")
            }
         }, this);

         bulletProtectBtn.getChildByName("buyBtn").on("touchend", (event) => {   // 保护弹购买
            cc.log("购买=========>")
            var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
            if(curGolds > 800){
                let num =  cc.sys.localStorage.getItem("ProtectNum");
                cc.sys.localStorage.setItem("ProtectNum",Number(num) + 1);
                cc.sys.localStorage.setItem("CurrentGolds",Number(curGolds) - 800);

                //this.updateInfo(bulletProtectBtn,BombType.Protect)

                this.updateAll()
            }else{
                new TipUI(this.FightScene,"金币不足")
            }
         }, this);







   





        let level = cc.sys.localStorage.getItem("bullet" + BombType.Normal);
        if(level == null){
            cc.sys.localStorage.setItem("bullet" + BombType.Normal,1);
        }
        let level2 = cc.sys.localStorage.getItem("bullet" + BombType.Rock);
        if(level2 == null){
            cc.sys.localStorage.setItem("bullet" + BombType.Rock,1);
        }
        let level3 = cc.sys.localStorage.getItem("bullet" + BombType.Air);
        if(level3 == null){
            cc.sys.localStorage.setItem("bullet" + BombType.Air,1);
        }
        let level4 = cc.sys.localStorage.getItem("bullet" + BombType.Ice);
        if(level4 == null){
            cc.sys.localStorage.setItem("bullet" + BombType.Ice,1);
        }

        let level5 = cc.sys.localStorage.getItem("bullet" + BombType.Screen);
        if(level5 == null){
            cc.sys.localStorage.setItem("bullet" + BombType.Screen,1);
        }

        let level6 = cc.sys.localStorage.getItem("bullet" + BombType.Protect);
        if(level6 == null){
            cc.sys.localStorage.setItem("bullet" + BombType.Protect,1);
        }



        let ScreenbulletNum = cc.sys.localStorage.getItem("ScreenbulletNum");
        if(ScreenbulletNum == null){
            cc.sys.localStorage.setItem("ScreenbulletNum",0);
        }
        let ProtectNum = cc.sys.localStorage.getItem("ProtectNum");
        if(ProtectNum == null){
            cc.sys.localStorage.setItem("ProtectNum",0);
        }

        let CurrentGolds = cc.sys.localStorage.getItem("CurrentGolds");
        if(CurrentGolds == null){
            cc.sys.localStorage.setItem("CurrentGolds",0);
        }


    
        // this.updateInfo(bulletNormalBtn,BombType.Normal)
        // this.updateInfo(bulletRockBtn,BombType.Rock)
        // this.updateInfo(airBulletBtn,BombType.Air)
        // this.updateInfo(iceBulletBtn,BombType.Ice)
        // this.updateInfo(bulletScreenBtn,BombType.Screen)
        // this.updateInfo(bulletProtectBtn,BombType.Protect)


       


        this.updateScoreInfo()
        this.getGoldPos()
        this.updateAll()


        




        return this
     }


     updateAll(){
        var bulletNormalBtn = this.FightScene.node.getChildByName("buyNode").getChildByName("bulletNormalBtn")
        let bulletRockBtn = this.FightScene.node.getChildByName("skillNode").getChildByName("bulletRockBtn")
        let airBulletBtn = this.FightScene.node.getChildByName("skillNode").getChildByName("AirBulletButton")
        let iceBulletBtn = this.FightScene.node.getChildByName("skillNode").getChildByName("IceBulletButton")
        let bulletScreenBtn = this.FightScene.node.getChildByName("buyNode").getChildByName("BulletScreenBtn")
        let bulletProtectBtn = this.FightScene.node.getChildByName("buyNode").getChildByName("BulletProtectBtn")


        this.updateInfo(bulletNormalBtn,BombType.Normal)
        this.updateInfo(bulletRockBtn,BombType.Rock)
        this.updateInfo(airBulletBtn,BombType.Air)
        this.updateInfo(iceBulletBtn,BombType.Ice)
        this.updateInfo(bulletScreenBtn,BombType.Screen)
        this.updateInfo(bulletProtectBtn,BombType.Protect)


     }







    playGoldNum(earnGold?:number,times?:number){
        if( times == null ){
            times = 1
        }
	    this.rollNumLabelAtlas(this.txt_gold, earnGold, times)
	    //self.earnGold = 0
	    //self:playGoldIcon(times)
    }

    earnMoney(star, gem, gold){
        //cc.log("获得分数========>",gold)

        this.earnStar = this.earnStar + (star || 0)
        this.earnGem = this.earnGem + (gem || 0)
        this.earnGold = this.earnGold + (gold || 0)

        this._count_stars = this._count_stars + (star || 0)
        this._count_gems = this._count_gems + (gem || 0)
        this._count_golds = this._count_golds + (gold || 0)

        //cc.log("当前总分数========>",this.earnGold)
        if(gem && gem > 0){
            //this.playGemNum(this.earnGem)
        }

        cc.sys.localStorage.setItem("CurrentGolds",this.earnGold);
    }


    // 文字标签控件滚动数字
    rollNumLabelAtlas(label?:any, totalNum?:any, times?:any){
        //totalNum = 100
        //times = 1

        let num = Number(totalNum)
        let count = Number(times) * 10
        let total  = 0
        //let cellNum = Number(num/count + 1)
        let cellNum = Math.floor(num/count + 1)

        if(num <= count){
            count = num
            cellNum = 1
        }else{
            count = count + 1
        }
        // cc.log("count===============>",count)
        // cc.log("cellNum===============>",cellNum)
        // cc.log("num===============>",num)
        

        var that = this
        var _increaseNum = cc.callFunc(function () {
            if(total != num){
                total = total + cellNum
                //cc.log("total===============>",total)

                if(total > num){
                    cellNum = cellNum - (total - num)
                    total = num
                }

                var cclabel =label.getComponent(cc.Label)

                let curNum = Number(cclabel.string)
                let showNum = String(curNum + cellNum)


                //cc.log("showNum===============>",showNum)
                cclabel.string = showNum

            }
        })

        

        if(count > 0){
            var array = new Array()
            for(var i=0;i<count;i++){
                array.push(_increaseNum)
                array.push(cc.delayTime(0.05))
            }
            label.runAction(cc.sequence(array));
        }
       
    }

     
    getNeedGolds(id?:any){
        let need_golds = null
        let level = cc.sys.localStorage.getItem("bullet" + id);



        let next_lvl = Number(level) + 1
        let bulletId = this.getBulletId(id, next_lvl)
        let res = this.getBulletRes(bulletId)
        
        if(res != null && res["UPGRADE_GOLD"] != null ){
            need_golds = Number(res["UPGRADE_GOLD"])  
        }
        return need_golds
    }


    getNeedCD(id?:any){
        let CD = null
        let level = cc.sys.localStorage.getItem("bullet" + id);


        let bulletId = this.getBulletId(id, level)
        let res = this.getBulletRes(bulletId)
        
        if(res != null && res["CD"] != null ){
            CD = Number(res["CD"])  
        }
        return CD
    }


    getBulletId(bulletType, level){
        if(bulletType == null){
            return
        }
        if(level == null || level < 1){
            level = 1
        }

        let bulletId = ""
        if(level < 10){
            bulletId = 'S' + bulletType + '0' + level
        }else{
            bulletId = 'S' + bulletType + level
        }


        return bulletId
    }

    //获取炮弹数据
    getBulletRes(bulletId){
        cc.log("获取炮弹数据===========>",bulletId)
         return GameData.BulletsData[bulletId] || {}
     }


    updateInfo(node,bulletType){
        let level_label = node.getChildByName("lvicon").getChildByName("level").getComponent(cc.Label)
        let need_label = node.getChildByName("lvupBtn").getChildByName("need").getComponent(cc.Label)

        let level = cc.sys.localStorage.getItem("bullet" + bulletType);
        level_label.string = "Lv." + level

        var Golds = this.getNeedGolds(bulletType)
        cc.log("Golds=========>",Golds)

        need_label.string = Golds


        var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
        let balance = Number(curGolds) - Number(Golds)
        if(balance >= 0){
            var redicon =  node.getChildByName("lvupBtn").getChildByName("redicon")
            redicon.active = true
        }else{
            var redicon =  node.getChildByName("lvupBtn").getChildByName("redicon")
            redicon.active = false
        }



        // 购买的数量
        if(bulletType == BombType.Screen || bulletType == BombType.Protect){
            let num_label = node.getChildByName("num").getComponent(cc.Label)
            if(num_label){
                if(bulletType == BombType.Screen){
                    let num =  cc.sys.localStorage.getItem("ScreenbulletNum");
                    num_label.string = String(num)
                }else if(bulletType == BombType.Protect){
                    let num =  cc.sys.localStorage.getItem("ProtectNum");
                    num_label.string = String(num)
                }
            }
        }
        this.updateScoreInfo()


        if(this.FightScene.g_game_start == true){
            node.getChildByName("lvupBtn").active = false
            var buyBtn = node.getChildByName("buyBtn")
            if(buyBtn){
                buyBtn.active = true
            }
        }else{
            node.getChildByName("lvupBtn").active = true
            var buyBtn = node.getChildByName("buyBtn")
            if(buyBtn){
                buyBtn.active = false
            }
        }





    }

    updateScoreInfo(){
        let CurrentGolds = cc.sys.localStorage.getItem("CurrentGolds");
        var label =this.txt_gold.getComponent(cc.Label)
        label.string = CurrentGolds
        this.earnGold = Number(CurrentGolds)
    }


    dealUpLv(bulletType){
        var isCanLv = true
        var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
        var needGolds = this.getNeedGolds(bulletType)

        let balance = curGolds - needGolds
        if(balance < 0){
            new TipUI(this.FightScene,"金币不足")
            isCanLv = false
        }else{
            cc.log("足够====>",balance)
            this.earnGold = Number(balance)
            cc.sys.localStorage.setItem("CurrentGolds",Number(balance));
            this.updateScoreInfo()
        }


        return isCanLv
    }


    checkCDTime(BulletBtn,cdTime){
        BulletBtn.index = true
        var bar = BulletBtn.getComponent(cc.ProgressBar)
        bar.progress = 1
        var jindu = 1
        //  this.FightScene.schedule(function(){
        //  }, 0.01);
        cdTime = cdTime || 6
        cc.log("cdTime===============>",cdTime)

        var callback = (cc.callFunc(function () {
            jindu = jindu - (1/(100*cdTime))
            bar.progress = jindu
            if(jindu < 0){
                //cc.log("进来+==")
                BulletBtn.index = false
                BulletBtn.stopAllActions();
            }
        }))


        var action = cc.repeatForever(cc.sequence(cc.delayTime(0.01),callback))
        BulletBtn.runAction(action)

        
    }




    getGoldPos(){
        let worldPos= this.gold_icon.convertToWorldSpaceAR(cc.Vec2.ZERO)
        let point= this.goldNode.convertToNodeSpaceAR(worldPos)
        //cc.log("金币icon位置===========>%d,%d",point.x,point.y)
	    return point
    }


    
    updateUplvBuyBtn(){

        let buyBtnScreen = this.FightScene.node.getChildByName("buyNode").getChildByName("BulletScreenBtn").getChildByName("buyBtn")
        let buyBtnProtect = this.FightScene.node.getChildByName("buyNode").getChildByName("BulletProtectBtn").getChildByName("buyBtn")

        let lvupBtnScreen = this.FightScene.node.getChildByName("buyNode").getChildByName("BulletScreenBtn").getChildByName("lvupBtn")
        let lvupBtnProtect = this.FightScene.node.getChildByName("buyNode").getChildByName("BulletProtectBtn").getChildByName("lvupBtn")
        
        if(this.FightScene.g_game_start == true){
            buyBtnScreen.active = true
            buyBtnProtect.active = true

            lvupBtnScreen.active = false
            lvupBtnProtect.active = false

        }else{
            buyBtnScreen.active = false
            buyBtnProtect.active = false


            lvupBtnScreen.active = true
            lvupBtnProtect.active = true
        }


    }












    



}
