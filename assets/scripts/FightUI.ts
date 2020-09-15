/*
    Declare:战斗UI类
    Date:2014/5/7
    **/

import FightScene, { BombType } from "./FightScene";
import { Bullet } from "./Bullet";
import { GameData } from "./GameData";
import { TipUI } from "./TipUI";
import { resolveSrv } from "dns";
import { SDK } from "./platform/SDK";
import { Def } from "./frameworks/Def";
import { DataCensus } from "./frameworks/DataCensus";


export class FightUI {

    private FightScene:FightScene
    private txt_gold;
    private earnStar = 0
	private earnGem = 0
    private earnGold = 0
    private _count_stars = 0
    private _count_gems = 0
    public _count_golds = 0
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
           let level =  cc.sys.localStorage.getItem("bullet" + BombType.Normal);
        //    if(Number(level)%3 == 0 && Number(level) != 1 ){
        //         SDK.getInstance().ShowVideoAd(() => {
        //             cc.sys.localStorage.setItem("bullet" + BombType.Normal,Number(level) + 1);
        //             this.updateAll()
        //         }, Def.videoType.upbullet);
        //         return
        //     }


           var isCanLv = this.dealUpLv(BombType.Normal)
           if(isCanLv){
                cc.sys.localStorage.setItem("bullet" + BombType.Normal,Number(level) + 1);
                this.updateAll()

                 // 事件统计
                DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.upgrade_general,null,true)
           }else{
                SDK.getInstance().ShowVideoAd(() => {
                    cc.sys.localStorage.setItem("bullet" + BombType.Normal,Number(level) + 1);
                    this.updateAll()


                    this.FightScene.scheduleOnce(() => {
                          // 事件统计
                        DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_users_upgrade)
                    },0)

                    this.FightScene.scheduleOnce(() => {
                       // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_times_upgrade,null,true)
                    },0.5)

                    this.FightScene.scheduleOnce(() => {
                        // 事件统计
                        DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.upgrade_general,null,true)
                    },1.0)

                  
                
                }, Def.videoType.upbullet);
           }
        }, this);


        bulletRockBtn.getChildByName("lvupBtn").on("touchend", (event) => {   // 升级
            let level =  cc.sys.localStorage.getItem("bullet" + BombType.Rock);
            // if(Number(level)%3 == 0 && Number(level) != 1 ){
            //     SDK.getInstance().ShowVideoAd(() => {
            //         cc.sys.localStorage.setItem("bullet" + BombType.Rock,Number(level) + 1);
            //         this.updateAll()
            //     }, Def.videoType.upbullet);
            //     return
            // }


            var isCanLv = this.dealUpLv(BombType.Rock)
            if(isCanLv){
                cc.sys.localStorage.setItem("bullet" + BombType.Rock,Number(level) + 1);
                this.updateAll()

                // 事件统计
                DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.upgrade_bomb,null,true)
            }else{
                SDK.getInstance().ShowVideoAd(() => {
                    cc.sys.localStorage.setItem("bullet" + BombType.Rock,Number(level) + 1);
                    this.updateAll()

                
                    
                    this.FightScene.scheduleOnce(() => {
                      // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_users_upgrade)
                    },0)

                  this.FightScene.scheduleOnce(() => {
                     // 事件统计
                     DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_times_upgrade,null,true)

                  },0.5)

                  this.FightScene.scheduleOnce(() => {
                     // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.upgrade_bomb,null,true)
                  },1.0)


                }, Def.videoType.upbullet);
            }
         }, this);

         airBulletBtn.getChildByName("lvupBtn").on("touchend", (event) => {   // 升级
            let level =  cc.sys.localStorage.getItem("bullet" + BombType.Air);
            // if(Number(level)%3 == 0 && Number(level) != 1 ){
            //     SDK.getInstance().ShowVideoAd(() => {
            //         cc.sys.localStorage.setItem("bullet" + BombType.Air,Number(level) + 1);
            //         this.updateAll()
            //     }, Def.videoType.upbullet);
            //     return
            // }

          

            var isCanLv = this.dealUpLv(BombType.Air)
            if(isCanLv){
                cc.sys.localStorage.setItem("bullet" + BombType.Air,Number(level) + 1);
                this.updateAll()

                // 事件统计
                DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.upgrade_grapeshot,null,true)
            }else{
                SDK.getInstance().ShowVideoAd(() => {
                    cc.sys.localStorage.setItem("bullet" + BombType.Air,Number(level) + 1);
                    this.updateAll()


                     
                    this.FightScene.scheduleOnce(() => {
                      // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_users_upgrade)
                      },0)
  
                    this.FightScene.scheduleOnce(() => {
                       // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_times_upgrade,null,true)
  
                    },0.5)
  
                    this.FightScene.scheduleOnce(() => {
                       // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.upgrade_grapeshot,null,true)

                    },1.0)


                }, Def.videoType.upbullet);
            }
         }, this);

         iceBulletBtn.getChildByName("lvupBtn").on("touchend", (event) => {   // 升级
            let level =  cc.sys.localStorage.getItem("bullet" + BombType.Ice);

            // if(Number(level)%3 == 0 && Number(level) != 1 ){
            //     SDK.getInstance().ShowVideoAd(() => {
            //         cc.sys.localStorage.setItem("bullet" + BombType.Ice,Number(level) + 1);
            //         this.updateAll()
            //     }, Def.videoType.upbullet);
            //     return
            // }


            var isCanLv = this.dealUpLv(BombType.Ice)
            if(isCanLv){
                cc.sys.localStorage.setItem("bullet" + BombType.Ice,Number(level) + 1);
                this.updateAll()

                // 事件统计
                DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.upgrade_cold,null,true)
            }else{
                SDK.getInstance().ShowVideoAd(() => {
                    cc.sys.localStorage.setItem("bullet" + BombType.Ice,Number(level) + 1);
                    this.updateAll()

                   

                    this.FightScene.scheduleOnce(() => {
                         // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_users_upgrade)
                        },0)
    
                      this.FightScene.scheduleOnce(() => {
                         // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_times_upgrade,null,true)
    
                      },0.5)
    
                    this.FightScene.scheduleOnce(() => {
                           // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.upgrade_cold,null,true)
  
                    },1.0)


                }, Def.videoType.upbullet);
            }
         }, this);


         bulletScreenBtn.getChildByName("lvupBtn").on("touchend", (event) => {   // 升级
            cc.log("升级=========>")
            let level =  cc.sys.localStorage.getItem("bullet" + BombType.Screen);
            // if(Number(level)%3 == 0 && Number(level) != 1 ){
            //     SDK.getInstance().ShowVideoAd(() => {
            //         cc.sys.localStorage.setItem("bullet" + BombType.Screen,Number(level) + 1);
            //         this.updateAll()
            //     }, Def.videoType.upbullet);
            //     return
            // }



            var isCanLv = this.dealUpLv(BombType.Screen)
            if(isCanLv){
                cc.sys.localStorage.setItem("bullet" + BombType.Screen,Number(level) + 1);
                this.updateAll()

                // 事件统计
                DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.upgrade_fullscreen,null,true)
            }else{
                SDK.getInstance().ShowVideoAd(() => {
                    cc.sys.localStorage.setItem("bullet" + BombType.Screen,Number(level) + 1);
                    this.updateAll()

                    
                    this.FightScene.scheduleOnce(() => {
                        // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_users_upgrade)
                       },0)
   
                     this.FightScene.scheduleOnce(() => {
                       // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_times_upgrade,null,true)

                     },0.5)
   
                   this.FightScene.scheduleOnce(() => {
                    // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.upgrade_fullscreen,null,true)
                   },1.0)



                   
                }, Def.videoType.upbullet);
            }
         }, this);


         bulletProtectBtn.getChildByName("lvupBtn").on("touchend", (event) => {   // 升级
            let level_m =  cc.sys.localStorage.getItem("bullet" + BombType.Protect);
            cc.log("升级=========>",level_m)
            // if(Number(level_m)%3 == 0 && Number(level_m) != 1 ){
            //     SDK.getInstance().ShowVideoAd(() => {
            //         cc.sys.localStorage.setItem("bullet" + BombType.Protect,Number(level_m) + 1);
            //         this.updateAll()
            //     }, Def.videoType.upbullet);
            //     return
            // }
           


            var isCanLv = this.dealUpLv(BombType.Protect)
            if(isCanLv){
                cc.sys.localStorage.setItem("bullet" + BombType.Protect,Number(level_m) + 1);
                this.updateAll()

                // 事件统计
                DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.upgrade_guard,null,true)
            }else{
                SDK.getInstance().ShowVideoAd(() => {
                    cc.sys.localStorage.setItem("bullet" + BombType.Protect,Number(level_m) + 1);
                    this.updateAll()

                

                    this.FightScene.scheduleOnce(() => {
                        // 事件统计
                        DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_users_upgrade)
                       },0)
   
                     this.FightScene.scheduleOnce(() => {
                         // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_times_upgrade,null,true)
   
                     },0.5)
   
                   this.FightScene.scheduleOnce(() => {
                          // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.upgrade_guard,null,true)
 
                   },1.0)



                }, Def.videoType.upbullet);
            }


        }, this);



        bulletScreenBtn.getChildByName("buyBtn").on("touchend", (event) => {   // 全屏弹购买
            cc.log("购买=========>")
            var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
            var buygold = bulletScreenBtn.getChildByName("buyBtn").getChildByName("buygold").getComponent(cc.Label)
            var need = Number(buygold.string)
            // if(curGolds > need){
            //     let num =  cc.sys.localStorage.getItem("ScreenbulletNum");
            //     cc.sys.localStorage.setItem("ScreenbulletNum",Number(num) + 1);
            //     cc.sys.localStorage.setItem("CurrentGolds",Number(curGolds) - need);


            //     //this.updateInfo(bulletScreenBtn,BombType.Screen)
            //     this.updateAll()
            // }else{
            //     //new TipUI(this.FightScene,"金币不足")

            //     SDK.getInstance().ShowVideoAd(() => {
            //         let num =  cc.sys.localStorage.getItem("ScreenbulletNum");
            //         cc.sys.localStorage.setItem("ScreenbulletNum",Number(num) + 1);
            //         this.updateAll()
            //     }, Def.videoType.buyhighbullet);
            // }

            SDK.getInstance().ShowVideoAd(() => {
                let num =  cc.sys.localStorage.getItem("ScreenbulletNum");
                cc.sys.localStorage.setItem("ScreenbulletNum",Number(num) + 1);
                this.updateAll()

                this.FightScene.scheduleOnce(() => {
                    // 事件统计
                    DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_users_bullet)
                },0)

                 this.FightScene.scheduleOnce(() => {
                 // 事件统计
                DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_times_bullet,null,true)
                 },0.5)

               this.FightScene.scheduleOnce(() => {
                 // 事件统计
                 DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.purchase_users_fullscreen)
               },1.0)

               this.FightScene.scheduleOnce(() => {
                 // 事件统计
                 DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.purchase_times_fullscreen,null,true)
               },1.5)


            }, Def.videoType.buyhighbullet);
         }, this);

         bulletProtectBtn.getChildByName("buyBtn").on("touchend", (event) => {   // 保护弹购买
            var curGolds = cc.sys.localStorage.getItem("CurrentGolds")
            var buygold = bulletProtectBtn.getChildByName("buyBtn").getChildByName("buygold").getComponent(cc.Label)
            var need = Number(buygold.string)
            cc.log("购买=========>",need)
            // if(curGolds > need){
            //     let num =  cc.sys.localStorage.getItem("ProtectNum");
            //     cc.sys.localStorage.setItem("ProtectNum",Number(num) + 1);
            //     cc.sys.localStorage.setItem("CurrentGolds",Number(curGolds) - need);

            //     //this.updateInfo(bulletProtectBtn,BombType.Protect)

            //     this.updateAll()
            // }else{
            //     //new TipUI(this.FightScene,"金币不足")

            //     SDK.getInstance().ShowVideoAd(() => {
            //         let num =  cc.sys.localStorage.getItem("ProtectNum");
            //         cc.sys.localStorage.setItem("ProtectNum",Number(num) + 1);
            //         this.updateAll()
            //     }, Def.videoType.buyhighbullet);
            // }

            SDK.getInstance().ShowVideoAd(() => {
                let num =  cc.sys.localStorage.getItem("ProtectNum");
                cc.sys.localStorage.setItem("ProtectNum",Number(num) + 1);
                this.updateAll()

        
                this.FightScene.scheduleOnce(() => {
                     // 事件统计
                DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_users_bullet)
                },0)

                 this.FightScene.scheduleOnce(() => {
                // 事件统计
                DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.ad_times_bullet,null,true)
                 },0.5)

               this.FightScene.scheduleOnce(() => {
                   // 事件统计
                DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.purchase_users_bullet)
               },1.0)

               this.FightScene.scheduleOnce(() => {
                  // 事件统计
                  DataCensus.userStepCensus(this.FightScene,Def.userStepEventID.user_step,Def.videoAbUploadValue.purchase_times_bullet,null,true)
               },1.5)


            }, Def.videoType.buyhighbullet);
         }, this);










        let level = cc.sys.localStorage.getItem("bullet" + BombType.Normal);
        if(level == null || level.length == 0){
            cc.sys.localStorage.setItem("bullet" + BombType.Normal,1);
        }
        let level2 = cc.sys.localStorage.getItem("bullet" + BombType.Rock);
        if(level2 == null || level2.length == 0){
            cc.sys.localStorage.setItem("bullet" + BombType.Rock,1);
        }
        let level3 = cc.sys.localStorage.getItem("bullet" + BombType.Air);
        if(level3 == null || level3.length == 0){
            cc.sys.localStorage.setItem("bullet" + BombType.Air,1);
        }
        let level4 = cc.sys.localStorage.getItem("bullet" + BombType.Ice);
        if(level4 == null || level4.length == 0){
            cc.sys.localStorage.setItem("bullet" + BombType.Ice,1);
        }

        let level5 = cc.sys.localStorage.getItem("bullet" + BombType.Screen);
        if(level5 == null || level5.length == 0){
            cc.sys.localStorage.setItem("bullet" + BombType.Screen,1);
        }

        let level6 = cc.sys.localStorage.getItem("bullet" + BombType.Protect);
        if(level6 == null || level6.length == 0){
            cc.sys.localStorage.setItem("bullet" + BombType.Protect,1);
        }



        let ScreenbulletNum = cc.sys.localStorage.getItem("ScreenbulletNum");
        if(ScreenbulletNum == null || ScreenbulletNum.length == 0){
            cc.sys.localStorage.setItem("ScreenbulletNum",1);
        }
        let ProtectNum = cc.sys.localStorage.getItem("ProtectNum");
        if(ProtectNum == null || ProtectNum.length == 0){
            cc.sys.localStorage.setItem("ProtectNum",1);
        }

        let CurrentGolds = cc.sys.localStorage.getItem("CurrentGolds");
        if(CurrentGolds == null || CurrentGolds.length == 0){
            cc.sys.localStorage.setItem("CurrentGolds",1000);
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
        if(this.FightScene.isguajiing == true){
            return
        }

        if( times == null ){
            times = 1
        }
	    this.rollNumLabelAtlas(this.txt_gold, earnGold, times)
	    //self.earnGold = 0
	    //self:playGoldIcon(times)
    }

    earnMoney(star, gem, gold){
        //cc.log("获得分数========>",gold)
        if(this.FightScene.isguajiing == true){
            return
        }

        let CurrentGolds = cc.sys.localStorage.getItem("CurrentGolds");
       // this.earnGold = CurrentGolds


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



        let bulletScreenBtn = this.FightScene.node.getChildByName("buyNode").getChildByName("BulletScreenBtn")
        let bulletProtectBtn = this.FightScene.node.getChildByName("buyNode").getChildByName("BulletProtectBtn")
        //this.updateInfo(bulletScreenBtn,BombType.Screen)
        //this.updateInfo(bulletProtectBtn,BombType.Protect)
    }


    getGolds(){
	    return  this._count_golds || 0
    }

    // 文字标签控件滚动数字
    rollNumLabelAtlas(label?:any, totalNum?:any, times?:any){
        //totalNum = 100
        //times = 1
        //cc.log("totalNum===============>",totalNum)


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
                //cc.log("ZHGE ===============>,cellNum====>",curNum,cellNum)

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
        //cc.log("获取炮弹数据===========>",bulletId)
         return GameData.BulletsData[bulletId] || {}
     }


    updateInfo(node,bulletType){
        let level_label = node.getChildByName("lvicon").getChildByName("level").getComponent(cc.Label)
        let need_label = node.getChildByName("lvupBtn").getChildByName("need").getComponent(cc.Label)
     
        let level = cc.sys.localStorage.getItem("bullet" + bulletType);
        level_label.string = level

        var Golds = this.getNeedGolds(bulletType)
        //cc.log("升到下级所需的金币==============>",Golds)

        need_label.string = Golds


        var curGolds = Number(cc.sys.localStorage.getItem("CurrentGolds"))
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


        //游戏开始升级按钮隐藏
        if(this.FightScene.g_game_start == true){
            node.getChildByName("lvupBtn").active = false
            var buyBtn = node.getChildByName("buyBtn")
            if(buyBtn){
                buyBtn.active = true
                var videoicon = node.getChildByName("buyBtn").getChildByName("videoicon")
                var buygold = node.getChildByName("buyBtn").getChildByName("buygold").getComponent(cc.Label)

                videoicon.active = false

                // 金币不足显示视频icon
                if(bulletType == BombType.Protect){

                    // var beishu = Math.floor(Number(level)/10)
                    // var shuzhi =  800 + (beishu*800)

                    // buygold.string = String(shuzhi)
                    // if(curGolds < shuzhi){
                    //     videoicon.active = true
                    //     buygold.string = ""
                    // }


                    videoicon.active = true
                    buygold.string = ""
                }else if(bulletType == BombType.Screen){
                    // var beishu = Math.floor(Number(level)/10)
                    // var shuzhi =  500 + (beishu*500)

                    // buygold.string = String(shuzhi)
                    // if(curGolds < shuzhi){
                    //     videoicon.active = true
                    //     buygold.string = ""
                    // }

                    videoicon.active = true
                    buygold.string = ""
                }
            }

          
        
            node.active = true

             // 得到当前关卡
            var lastSaevGates = cc.sys.localStorage.getItem("CurrentGates");
            if(Number(lastSaevGates) == 1){
                if(bulletType == BombType.Rock || bulletType == BombType.Air){
                    node.active = false
                }
            }else if(Number(lastSaevGates) == 2){
                if(bulletType == BombType.Rock){
                    node.active = false
                }
            }


            // 隐藏普通子弹
            if(bulletType == BombType.Normal){
                node.active = false
            }



        }else{
            node.getChildByName("lvupBtn").active = true
            var buyBtn = node.getChildByName("buyBtn")
            let videoicon =  node.getChildByName("lvupBtn").getChildByName("videoicon")
            if(videoicon){
                videoicon.active = false
            }

            if(buyBtn){
                buyBtn.active = false
            }

            if(bulletType == BombType.Normal){
                node.active = true
            }

            let need = node.getChildByName("lvupBtn").getChildByName("need")
            need.active = true

            // if(Number(level)%3 == 0 && Number(level) != 1 ){
            //    let videoicon =  node.getChildByName("lvupBtn").getChildByName("videoicon")
            //     if(videoicon){
            //         videoicon.active = true
            //         need.active = false
            //     }
            // }

            // 金币不足显示视频icon
            var curGolds = Number(cc.sys.localStorage.getItem("CurrentGolds"))
            let balance = Number(curGolds) - Number(Golds)
            if(balance < 0){
                if(videoicon){
                    videoicon.active = true
                    need.active = false
                }
            }



        }





    }

    updateScoreInfo(){
        //cc.log("updateScoreInfo============>")
        
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
            //new TipUI(this.FightScene,"金币不足")
            isCanLv = false
        }else{
            cc.log("足够====>",balance)
            this.earnGold = Number(balance)
            cc.sys.localStorage.setItem("CurrentGolds",Number(balance));
            this.updateScoreInfo()
        }


        return isCanLv
    }

    // 技能CD时间
    checkCDTime(BulletBtn,cdTime){
        BulletBtn.index = true
        var bar = BulletBtn.getComponent(cc.ProgressBar)
        bar.progress = 1
        var jindu = 1
        //  this.FightScene.schedule(function(){
        //  }, 0.01);
        cdTime = cdTime || 6
        cc.log("cdTime===============>",cdTime)
        cc.log("cdTime2===============>",0.01/cdTime)


        var callback = (cc.callFunc(function () {
            jindu = jindu - (1/(100*cdTime))
            //jindu = jindu - 0.1/cdTime
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













    



}
