import { Bullet } from "./Bullet";
import { Enemy } from "./Enemy";
import { GameData } from "./GameData";
import { type } from "os";
import { tools } from "./tool";
import CollisionEvent from "./CollisionEvent";
import { create } from "domain";
import { FightUI } from "./FightUI";
import { FightVictory } from "./FightVictory";
import { PauseUI } from "./PauseUI";
import { FightFail } from "./FightFail";
import { Battery } from "./Battery";
import { EqiupChange } from "./EqiupChange";
import { Utils } from "./frameworks/Utils";
import { Shake } from "./Shake";
import { AudioMgr } from "./AudioMarger";
import { Help } from "./Help";
import { SignUI } from "./SignUI";
import { SDK } from "./platform/SDK";
import { PlatformManager } from "./platform/PlatformManager";
import { Def } from "./frameworks/Def";
import { EvalSourceMapDevToolPlugin } from "webpack";
import { Lib } from "./frameworks/Lib";
import { GuajiUI } from "./GuajiUI";
import { OnlineOffUI } from "./OnlineOffUI";

const {ccclass, property} = cc._decorator;

// 轨迹类型
export enum TrackType
{
	"Beeline",  //直线
	"Parabola", //抛物线
	"Free",	    //自由曲线
}

// 炸弹类型(固定值，不能修改位置)
export enum BombType
{
    "NULL",
	"Normal",   // 普通弹
	"Air",		// 母弹
	"AirSon",	// 子弹
	"Ice",		// 冰弹
	"Rock",		// 重炮弹
	"Screen",	// 全屏弹
	"Protect",	// 守卫弹
}

// Action类型之Tag
export enum ActType
{
	"TAG_ACT_SHAKE",	//震动
	"TAG_ACT_ROTATE",	//旋转
	"TAG_ACT_SLOW",		//减速
}

const ORIGIN_WIDTH 			=	960
const ORIGIN_HEIGHT 		=	640 

//let winSize=cc.director.getWinSize()

@ccclass
export default class FightScene extends cc.Component {

    @property(cc.Prefab)
    bulletBomb: cc.Prefab = null;

    @property(cc.Button)
    pauseBtn: cc.Button = null;

    @property(cc.Node)
    batteryNode :cc.Node = null;   //炮台

    @property(cc.Button)
    startGameBtn: cc.Button = null;

    @property(cc.Button)
    eqiupChangeBtn: cc.Button = null;
    
    @property(cc.Button)
    signBtn: cc.Button = null;  //签到

    @property(cc.Prefab)      // 守卫炸弹
    shouweiBomb: cc.Prefab = null;

    @property(cc.Button)
    guajishouyiBtn: cc.Button = null;  //挂机收益


    private startX = 0
    private startY = 0
    private g_sensitivity = 2.0		//灵敏度
    private newStar: cc.Node = null

    private GRAVITY		= 20	    // 重力
    private AIR_DRAG	= 600	// 空气阻力
    private g_air_time	= 0.1	// 子母弹生子弹间隔（秒）
    private multiple = 1.2	//默认加速倍数
    private dropTime = 0

    private speed = 600
    private angle = 5
    private directionX = 1
    private directionY = -1
    
    private vx = 0
    private vy = 0
    weapon: any;
    private countTime = 0
    private sumTime = 5
    private cdNormal = 1

    private bulletList = new Array<any>();
    private enemyList = new Array<any>();

    private g_curSpedMultiple = 1  //当前加速倍数
    public GatesData = null
    private curWave = 0
    private enemyData = null
    private isloadEnemy = false
    //private tagMap
    public mainObj
    private tagMap: Map<any, any> = new Map(); //TAG标记的总表(所有精灵)
    private fightUI
    private g_fight_scene
    private time = 0
    private balanceUI
    private g_game_over = false
    private battery
    public g_game_start = false
    public weaponNode = null
    private currentGates = 0
    private bulletinitPos = null
    public isguajiing = true      // 是否在挂机
    public issetBulletRock = false
    private deadPrefebAni
    public SCREEN_WIDTH
    public SCREEN_HEIGHT
    public isOutEnemy = false
    private bottom_bg
    public autoCdType = 0
    public StopBannerNode = false


    public gjcdNormal = 6
    public gjsumTime = 5
    public gjcountTime = 0
    private QiqiuitemType = 0
    private QiqiuNode = null
    private hard_level = 1

    onDestroy() {
        console.log("离线========>")
        //cc.sys.localStorage.setItem("offlineTime",Lib.GetTimeBySecond());
    }

    onLoad(){
        this.g_fight_scene = this
        this.batteryNode.zIndex = 100
        this.bottom_bg = this.node.getChildByName("bottom_bg")

        //let cellNum = Math.floor(12/10 + 1)
        this.SCREEN_WIDTH = cc.winSize.width
        this.SCREEN_HEIGHT = cc.winSize.height
        console.log("窗口的宽=======>",this.SCREEN_WIDTH)
        console.log("窗口的高=======>",this.SCREEN_HEIGHT)


        //监听触摸开始事件
    	this.node.on(cc.Node.EventType.TOUCH_START,this.on_touch_start,this);
    	//监听触摸移动事件
    	//使用自定义回调函数
    	this.node.on(cc.Node.EventType.TOUCH_MOVE,this.on_touch_move,this);
    	//结束触摸移动事件
    	//this.node.off(cc.Node.EventType.TOUCH_END,this.on_touch_end,this);
    	
    	//监听作用域内触摸抬起事件
    	this.node.on(cc.Node.EventType.TOUCH_END,function(t){
            //console.log("触摸内结束");
            this.battery.playNpcActMao()
    	},this);
    	//监听作用域外触摸抬起事件
    	this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(t){
            //console.log("触摸外开始");
            this.battery.playNpcActMao()
        },this);
        

        let CurrentBattery = cc.sys.localStorage.getItem("CurrentBattery");
        if(CurrentBattery == null || CurrentBattery.length == 0){
            cc.sys.localStorage.setItem("CurrentBattery","BATT_1");
        }


        cc.director.getCollisionManager().enabled = true
        cc.director.getCollisionManager().enabledDebugDraw = false
        cc.director.getCollisionManager().enabledDrawBoundingBox = false

    
        GameData.loadDataFromFile((loadFileNum) => {
            cc.log("loadFileNum===============>",loadFileNum)
            if(loadFileNum == 5){
                this.enemyData = GameData.GatesData[this.currentGates.toString()]
                console.log("文件加载完毕===============>",this.enemyData)
                this.hard_level = this.enemyData["hard_level"] || 1.0

                this.fightUI = new FightUI(this)
                //更新炮台
                this.scheduleOnce(() => {
                    this.changeBattery()
                }, 1)
            }
        });


        this.pauseBtn.node.on("touchend", (event) => {   // 暂停
            this.creatPauseUi()
            this.StopBannerNode  = true
            SDK.getInstance().ShowBannerAd(Def.bannerType.banner_main)
        }, this);

        this.startGameBtn.node.on("touchend", (event) => {   // 开始游戏
            this.gameStart()
        }, this);


        this.eqiupChangeBtn.node.on("touchend", (event) => {   // 更换炮台
           new EqiupChange(this)
           this.StopBannerNode  = true
           SDK.getInstance().ShowBannerAd(Def.bannerType.banner_main)
        }, this);

        this.signBtn.node.on("touchend", (event) => {   // 签到
            new SignUI(this)
            this.StopBannerNode  = true
            SDK.getInstance().ShowBannerAd(Def.bannerType.banner_main)
         }, this);


         this.guajishouyiBtn.node.on("touchend", (event) => {   // 挂机收益
            new GuajiUI(this)
            this.StopBannerNode  = true
            SDK.getInstance().ShowBannerAd(Def.bannerType.banner_main)
         }, this);

         


        // 初始化炮台
        this.battery = new Battery(this)   //炮台
      

        AudioMgr.getInstance().playEffect("BGM002",true);
        PlatformManager.getInstance().init();
        SDK.getInstance().initSDK(this)

        this.createQiqiu()
        this.schedule(this.updateData, 1);
        this.createOnlineOff()

        //banner的显示
        this.scheduleOnce(() => {
            this.bannerShowHide()
        }, 3)
    }

    start () {
    }

    // 更换炮台
    changeBattery(){
        let batteryData = GameData.BatteryData
        let index = cc.sys.localStorage.getItem("CurrentBattery");

        let ShiyongBattery = cc.sys.localStorage.getItem("ShiyongBattery");
        if(ShiyongBattery != "" && ShiyongBattery != null){ 
            index = ShiyongBattery 
        }


        var file =  batteryData[index].ANI_FILE;


        var that = this
        that.batteryNode.active = true


        var node = that.batteryNode.getChildByName("node")
        let pointNode:cc.Node = that.node.getChildByName("pointNode")
        pointNode.removeAllChildren()

        this.battery.createBattery(file,node,(function(){
           that.battery.createNPC(1, that.battery.getMaoPos())
           that.battery.createNPC(2, that.battery.getRolePos())   
           that.battery.createWeapon() 
        })
        )
    }
    //https://yuema.sfplay.net/longmao_assets/bytedance



    on_touch_start(t){
        var n_pos = t.getLocation();
        this.startY = n_pos.y
        //console.log("开始触摸的y的坐标=======>",this.startY);
    }





    //自定义回调函数,参数t
    on_touch_move(t){
        //定义一个n_pos变量存储当前触摸点的位置
        if(this.weaponNode == null ||  this.isguajiing == true){
            return
        }


    	var n_pos = t.getLocation();
    	//打印触摸点的坐标，x坐标，y坐标
    	//console.log(n_pos,n_pos.x,n_pos.y);

    	//定义变量delta存储变化距离
    	var delta = t.getDelta();
    	//变化当前节点位置使其跟随触摸点,实现按住移动效果
    	this.node.x += delta.x;
        this.node.y += delta.y;
        

        let up_or_down = n_pos.y - this.startY
        if(up_or_down > 0){
            this.battery.playNpcActMao(true)
        }else{
            this.battery.playNpcActMao(false)
        }


        var deltaDegree = up_or_down/this.node.height * 180 * 1 * this.g_sensitivity
        //console.log("deltaDegree============>",deltaDegree);


       let angle = this.weaponNode.angle + deltaDegree
       //console.log("angle============>",angle);
       if(angle > 90){
            angle = 90
        }else if(angle < -90){
            angle = -90
        }
        this.weaponNode.angle = angle

        this.startY = n_pos.y


        this.getBulletinitPos()
    }


    // 获取子弹从炮弹射出的初始位置
    getBulletinitPos(){
        let pointNode:cc.Node = this.node.getChildByName("pointNode")
        let paodank:cc.Node = pointNode.getChildByName("paodank")
        if(paodank == null){
            return
        }


        let posNode:cc.Node = paodank.getChildByName("posNode")
        let z= posNode.convertToWorldSpaceAR(cc.Vec2.ZERO)
        //cc.log("000000000000===========>%d,%d",z.x,z.y)

        let point= pointNode.parent.convertToNodeSpaceAR(z)
        this.bulletinitPos = point
        //cc.log("aaaaaaaa===========>%d,%d",point.x,point.y)
    }


    getFightUI(){
	    return this.g_fight_scene.fightUI
    }

    rotateCannon(){
    }


    getSpedMultiple(){
        return this.g_curSpedMultiple
    }

    update(delay){
        this.sumTime = this.sumTime + delay

        let pointNode:cc.Node = this.node.getChildByName("pointNode")
        let paodank:cc.Node = pointNode.getChildByName("paodank")
     

        if(this.sumTime - this.countTime > this.cdNormal && this.g_game_over == false && this.g_game_start == true && this.isguajiing == false
        && paodank != null && this.isOutEnemy == true){
            this.countTime = this.sumTime
            //cc.log("创建子弹================>")
            this.createBulletNormal()


            if(this.time < 1){
                //this.fightUI.earnMoney(0,0,3)
                //this.fightUI.playGoldNum(3)
                //this.fightUI.playGoldNum(30)
                //this.time = this.time + 1
            }
        }

        
        this.updateAnimationList(this.bulletList,delay,"bullet")      //更新子弹
        this.updateAnimationList(this.enemyList, delay,"enemy") 	//更新敌人

        
        // cc.log("当前游戏中敌人的数量==========>",this.enemyList.length)
        // cc.log("isloadEnemy==========>",this.isloadEnemy)
        // cc.log("curWave==========>",this.curWave)
        //cc.log("是否需要加载一次敌人==========>",this.isloadEnemy)
        //cc.log("当前游戏中子弹的数量==========>",this.bulletList.length)
        //cc.log("当前游戏中精灵表中的数量==========>",this.tagMap.size)
        if(this.enemyList.length == 0 && this.isloadEnemy == false && this.g_game_over == false && (this.g_game_start == true || this.isguajiing == true)){
            if(this.curWave <= 2){
                this.initEnemys(this.curWave)
            }
        }
    }


    getOriginSpeedX(){
        if(this.speed == null || this.angle == null){
            return 0
        }

        let vx = this.speed * Math.cos(this.angle * Math.PI/180)
        return vx
    }



    //普通弹
    createBulletNormal(){
        if(GameData.BulletsData == null){
            return
        }    

        AudioMgr.getInstance().playEffect("SE001");

        let res = {}
        res["ani"] = "bullets/NormalBullet"
        res["index"] = 0
        res["trackType"] = TrackType.Parabola
        res["bombType"] = BombType.Normal
        res["speed"] = 0
        res["xOffset"] = 0
        res["yOffset"] = 0
        res["physicsATK"] = 0
        //res.bulletId = Bullet.getBulletId(res)

        var bulletObj = new Bullet(this,res,this.bulletinitPos)
    }

    //重炮弹
    createBulletRock(){
        if(GameData.BulletsData == null){
            return
        }    
        AudioMgr.getInstance().playEffect("SE007");

        this.issetBulletRock = true
        cc.log("重炮弹==============>")

        let res = {}
        res["ani"] = "bullets/RockBullet"
        res["index"] = 0
        res["trackType"] = TrackType.Parabola
        res["bombType"] = BombType.Rock
        res["speed"] = 0
        res["xOffset"] = 0
        res["yOffset"] = 0
        res["physicsATK"] = 0
        //res.bulletId = Bullet.getBulletId(res)

        var bulletObj = new Bullet(this,res,this.bulletinitPos)
    }


    // 空气弹
    createBulletAir(){
        if(GameData.BulletsData == null){
            return
        }    
        AudioMgr.getInstance().playEffect("SE005");

        cc.log("空气弹==============>")

        let res = {}
        res["ani"] = "bullets/AirBullet"
        res["index"] = 0
        res["trackType"] = TrackType.Parabola
        res["bombType"] = BombType.Air
        res["speed"] = 0
        res["xOffset"] = 0
        res["yOffset"] = 0
        res["physicsATK"] = 0
        //res.bulletId = Bullet.getBulletId(res)

        var bulletObj = new Bullet(this,res,this.bulletinitPos)
    }


    // 子母弹
    createBulletAirSon(startPos, angle){
        if(GameData.BulletsData == null){
            return
        }    

        cc.log("子母弹==============>")

        let res = {}
        res["ani"] = "bullets/AirSonBullet"
        res["index"] = 0
        res["trackType"] = TrackType.Beeline
        res["bombType"] = BombType.AirSon
        res["speed"] = 0
        res["xOffset"] = 0
        res["yOffset"] = 0
        res["physicsATK"] = 0
        //res.bulletId = Bullet.getBulletId(res)

        var bulletObj = new Bullet(this,res,startPos,angle)
    }

    // 冰弹
    createBulletIce(){
        if(GameData.BulletsData == null){
            return
        }    
        AudioMgr.getInstance().playEffect("SE003");

        cc.log("冰弹==============>")

        let res = {}
        res["ani"] = "bullets/IceBullet"
        res["index"] = 0
        res["trackType"] = TrackType.Parabola
        res["bombType"] = BombType.Ice
        res["speed"] = 0
        res["xOffset"] = 0
        res["yOffset"] = 0
        res["physicsATK"] = 0
        //res.bulletId = Bullet.getBulletId(res)

        var bulletObj = new Bullet(this,res,this.bulletinitPos)
    }   


    // 全屏弹
    createBulletScreen(){
        if(GameData.BulletsData == null){
            return
        }    
        AudioMgr.getInstance().playEffect("SE009");

        cc.log("全屏弹==============>")

        let res = {}
        res["ani"] = "bullets/BulletScreen"
        res["index"] = 0
        res["trackType"] = TrackType.Parabola
        res["bombType"] = BombType.Screen
        res["speed"] = 0
        res["xOffset"] = 0
        res["yOffset"] = 0
        res["physicsATK"] = 0

        var bulletObj = new Bullet(this,res,this.bulletinitPos)
    }


    // 保护弹
    createBulletProtect(){
        if(GameData.BulletsData == null){
            return
        }    
        AudioMgr.getInstance().playEffect("SE001");

        cc.log("保护弹==============>")

        let res = {}
        res["ani"] = "bullets/ProtectBullet"
        res["index"] = 0
        res["trackType"] = TrackType.Parabola
        res["bombType"] = BombType.Protect
        res["speed"] = 0
        res["xOffset"] = 0
        res["yOffset"] = 0
        res["physicsATK"] = 0

        var bulletObj = new Bullet(this,res,this.bulletinitPos)
    }





    // 更新动画
    updateAnimationList(tab:Array<any>,delay:any,listType:string){
        for (var i = 0; i < tab.length; i++) {
            let ani = tab[i]
            if(ani && (ani.isDeath || ani.isDying)){
                //cc.log("iii=====================>",i)
                tab.splice(i,1)
                // 从TAG MAP移除
                let tag = ani.sprite.idTag
                this.tagMap.delete(tag)
                //cc.log("idTag=====================>",tag)


                if(listType == "enemy" && tab.length == 0){
                    cc.log("怪物了打完了，生成下一波怪物=============>")
                    this.isloadEnemy = false
                    this.isOutEnemy = false
                }
                continue
            }


            if(ani && ani.update){ // 更新
				ani.update(delay)
            }
        };
    }


    initEnemys(wave){
        //cc.log("enemyData=============>",this.enemyData)
        if(this.enemyData == null){
            return
        }            

        let waveTable = this.enemyData["waves"]
        let enemies = waveTable[wave || 0]

        // cc.log("enemyData=============>",this.enemyData)
        // cc.log("waveTable=============>",waveTable)
        // cc.log("enemies111=============>",enemies)
        // cc.log("json=============>",JSON.stringify(enemies))
        if(JSON.stringify(enemies) == "{}"){
            cc.log("没有怪物了，则战斗胜利=============>")
            if(this.isguajiing == true){
                this.curWave = 0
            }else{
                // 没有怪物了，则战斗胜利
                this.gameOver(true)
            }
            return
        }


        for(const key of Object.keys(enemies)) {
            //cc.log("key=============>",key)
            //cc.log("value=============>",enemies[key])

            for(const data of Object.values(enemies[key])){
               // cc.log("data=============>",data)
                var EnemyObj = new Enemy(this,key)
                EnemyObj.init(data, this.hard_level)
            }
        }

        this.isloadEnemy = true
        this.curWave = this.curWave + 1
    }


 

    //添加敌人
    addEnemy(obj){
        //cc.log("FightScene添加敌人==============>",obj)
        this.addAnimationToTabel(this.enemyList, obj)
    }


    //添加子弹
    addBullet(obj){
        //cc.log("FightScene添加子弹==============>",obj)
        this.addAnimationToTabel(this.bulletList, obj)
    }


    //添加一个动画到指定的表中
    addAnimationToTabel(tab,ani){
        for(var i=0;i<tab.length;i++){
            if(tab[i] == ani){
                return
            }
        }



        //cc.log("FightScene添加敌人==============>",ani.sprite)
        this.node.addChild(ani.sprite);
        tab.push(ani)

        //cc.log("随机整数=========>",tools.tagGenerator())
        let tag = tools.tagGenerator()
        //cc.log("精灵总表=========>",this.tagMap)
        //TAG绑定精灵
        ani.sprite.idTag = tag
        this.tagMap.set(tag,ani)

        //cc.log("精灵总表=========>",this.tagMap)
    }



    //通过TAG标记获取精灵
    getSpriteByTag(tag){
	    return this.tagMap.get(tag)
    }



    //碰撞监听
    contactListener(contactA, contactB){
        //console.log('碰撞监听=================>');
        if(contactA == null || contactB == null){
            return
        }
        let tagA = contactA.node.idTag
        let tagB = contactB.node.idTag

        //cc.log("group11============>",contactA.node.group)
        //cc.log("group22============>",contactB.node.group)

      

        //console.log('tagA=================>',tagA);
        //console.log('tagB=================>',tagB);

        // spriteA 攻击者，contactB 受击者
        let spriteA = this.getSpriteByTag(tagA)
        let spriteB = this.getSpriteByTag(tagB)

        if(contactA.node.group == "shouwei"){
            if(spriteB){
                spriteB.outHp(15)
            }
            return
        }

        //console.log('spriteA=================>',spriteA);
        //console.log('spriteB=================>',spriteB);

        if(spriteA == null || spriteB == null){
            //console.log('不存在=================>');
            return
        }


      
        let tag = contactA.tag

        spriteB.hit(spriteA,tag)
        spriteA.hit(spriteB,tag)

    }

 
    gameOver(result){
        if(this.g_game_over){
            return
        }

	    this.g_game_over = true

        let isSuccessful = result && true || false
        // if(isSuccessful){
        //     this.balanceUI = new FightVictory(this)
        // }else{
        //     this.balanceUI =  new FightFail(this)
        // }


        if(result == false){
            let pointNode:cc.Node = this.node.getChildByName("pointNode")
            pointNode.removeAllChildren()


            var that = this
            let showPlayerDeath = cc.callFunc(function(){
                var onResourceLoaded = function(errorMessage, loadedResource )
                {
                    let Battery,BatteryPos = that.batteryNode.getPosition()   // 炮台底
                    that.batteryNode.active = false

                    if( errorMessage ) { cc.log( 'Prefab error:' + errorMessage ); return; }
                    if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( 'Prefab error' ); return; } 
                    var prefeb = cc.instantiate( loadedResource );
                    prefeb.setPosition(BatteryPos.x,BatteryPos.y)
                    that.node.addChild(prefeb)
                    var prefebAni = prefeb.getComponent(dragonBones.ArmatureDisplay)
                    prefebAni.playAnimation('run', 1);
                    that.deadPrefebAni = prefeb

                    AudioMgr.getInstance().playEffect("SE009");

                };
                cc.loader.loadRes('prefab/playerdead', onResourceLoaded );
            })
            var that1 = this
            let showBalance = cc.callFunc(function(){
                that.balanceUI =  new FightFail(that1)
            })


            var array = new Array()
            array.push(showPlayerDeath)
            array.push(cc.delayTime(2))
            array.push(showBalance)
            this.node.runAction(cc.sequence(array))
        }else{
            this.balanceUI = new FightVictory(this)
        }

        this.clearAllEnemy()

      
       

    }



    clearAllEnemy(){
        for(var i=0;i<this.enemyList.length;i++){
            let ani = this.enemyList[i]
            if(ani){
                ani.die()
            }
        }
    }



    creatPauseUi(){
        new PauseUI(this)
    }


    getFightScene(){
	    return this.g_fight_scene
    }

    isGameOver(){
	    return this.g_game_over
    }

    // 暂停所有
    pauseAll(){ //android会几率性闪退
        //cc.director.pause()
        cc.game.pause()
    }


    //恢复所有
    resumeAll(){ //android会几率性闪退
        //cc.director.resume()
        cc.game.resume()
    } 



    hurtAllEnemys(bullet){
        for(var i=0;i<this.enemyList.length;i++){
            let ani = this.enemyList[i]
            if(ani){
                ani.hit(bullet)
            }
        }
    }


    enterNextGate(){
        cc.log("下一关")
        this.cleanFightScene()
        this.enemyData = null
        this.currentGates = Number(this.currentGates) + 1
        this.reloadGatesData()

        cc.sys.localStorage.setItem("CurrentGates",Number(this.currentGates));
        this.updateCurrentGates()
        this.playReadyAni()


        let ShiyongBattery = cc.sys.localStorage.getItem("ShiyongBattery");
        if(ShiyongBattery != "" && ShiyongBattery != null){
            cc.sys.localStorage.setItem("ShiyongBattery","");
            this.changeBattery()
        }
    }

  
    // 更新关卡
    updateCurrentGates(){
        var currentLabel = this.node.getChildByName("gatesNode").getChildByName("current").getChildByName("gatesLabel").getComponent(cc.Label)
        currentLabel.string = String(this.currentGates)
        var next = this.node.getChildByName("gatesNode").getChildByName("next")
        var last = this.node.getChildByName("gatesNode").getChildByName("last")
        var current = this.node.getChildByName("gatesNode").getChildByName("current")

        var next2 = this.node.getChildByName("gatesNode").getChildByName("next2")
        var last2 = this.node.getChildByName("gatesNode").getChildByName("last2")


        

        if(Number(this.currentGates) > 1){
         
          var nextLabel = next.getChildByName("gatesLabel").getComponent(cc.Label)
          var lastLabel = last.getChildByName("gatesLabel").getComponent(cc.Label)

        
          var nextLabel2 = next2.getChildByName("gatesLabel").getComponent(cc.Label)
          var lastLabel2 = last2.getChildByName("gatesLabel").getComponent(cc.Label)


          nextLabel.string = String(Number(this.currentGates) + 1)
          lastLabel.string = String(Number(this.currentGates) - 1)


          next.active = true
          last.active = true
          current.active = true

            if(Number(this.currentGates) > 2){
                next2.active = true
                last2.active = true

                nextLabel2.string = String(Number(this.currentGates) + 2)
                lastLabel2.string = String(Number(this.currentGates) - 2)

            }
        }else{
            if(Number(this.currentGates) == 1){
                current.active = true
            }else{
                current.active = false
                next.active = false
                last.active = false
                next2.active = false
                last2.active = false
            }
        }
    }




    cleanFightScene(){
        this.g_game_over = false      
        this.isloadEnemy = false
        this.issetBulletRock = false
        this.curWave = 0
        this.g_game_start = false
    }

    reloadGatesData(){
        this.enemyData = GameData.GatesData[this.currentGates.toString()]
        this.hard_level = this.enemyData["hard_level"] || 1.0
    }


    gameStart(){
        this.clearAllEnemy()
        this.cleanFightScene()
        this.isguajiing = false
        this.startGameBtn.node.active = false
        var guajiNode = this.node.getChildByName("guajiNode")
        guajiNode.active = false
        this.pauseBtn.node.active = true


        // 得到当前关卡
        var lastSaevGates = cc.sys.localStorage.getItem("CurrentGates");
        if(lastSaevGates == null || lastSaevGates.length == 0){
            lastSaevGates = 1
            cc.sys.localStorage.setItem("CurrentGates",Number(lastSaevGates));
        }

        this.currentGates = lastSaevGates
       

        this.enemyData = null
        this.reloadGatesData()
        this.updateCurrentGates()
        this.playReadyAni()


        // 是否有试用炮台
        let ShiyongBattery = cc.sys.localStorage.getItem("ShiyongBattery");
        if(ShiyongBattery != "" && ShiyongBattery != null && Number(this.currentGates) > 1){
            cc.sys.localStorage.setItem("ShiyongBattery","");
            this.changeBattery()
        }


        if(this.QiqiuNode != null){
            this.QiqiuNode.removeFromParent()
        }
    

         // 引导
         if(this.currentGates == 1 || this.currentGates == 2 || this.currentGates == 3){
            this.scheduleOnce(() => {
                new Help(this)
            }, 3)
        }
    }

    // 回到主页
    goHome(){
        this.cleanFightScene()
        this.isguajiing = true
        this.startGameBtn.node.active = true
        this.enemyData = null

        var guajiNode = this.node.getChildByName("guajiNode")
        guajiNode.active = true
        this.pauseBtn.node.active = false

        this.currentGates = 0
        this.reloadGatesData()

        this.updateCurrentGates()

        if(this.deadPrefebAni){
            this.deadPrefebAni.removeFromParent()
            this.deadPrefebAni = null
        }

        let ShiyongBattery = cc.sys.localStorage.getItem("ShiyongBattery");
        if(ShiyongBattery != "" && ShiyongBattery != null){
            cc.sys.localStorage.setItem("ShiyongBattery","");
        }


        //2秒后更新炮台
        this.scheduleOnce(() => {
            this.changeBattery()
        }, 2)

        this.getFightUI().updateAll()
        this.createQiqiu()
    }


    playReadyAni(){
        let pointNode:cc.Node = this.node.getChildByName("pointNode")
        var that = this
        var dirPath = "ani/battlebegin"
        var callfunc = (function(){
            let ready:cc.Node = pointNode.getChildByName("ready")
            if(ready){
                ready.removeFromParent()
                that.g_game_start = true

                that.getFightUI().updateAll()
            }
        })

       
        let node:cc.Node = new cc.Node();
        pointNode.addChild(node,0,"ready");
        //Utils.loadDragonBones(node, dirPath,null,"run",callfunc,1)
        Utils.loadDragonBones2(node,dirPath,null,"armatureName","run",callfunc,1)
    }


    getGoldPos(){
	    return this.fightUI.getGoldPos()
    }


    attckEffectIce(bullet,pos){
        for(var i=0;i < this.enemyList.length;i++ ){
            let ani = this.enemyList[i]
            if(ani){
                let enemyX = ani.sprite.getPosition().x
                //cc.log("子弹位置，敌人的位置=======>",pos.x,enemyX)
                if((pos.x + 200) > enemyX && (pos.x - 200) < enemyX ){
                    ani.hit(bullet)
                }
            }
        }
    }

    updateFightUI(){
        this.getFightUI().updateAll()
    }



    createQiqiu(){
        var that = this
        var onResourceLoaded = function(errorMessage, loadedResource )
        {
            if( errorMessage ) { cc.log( 'Prefab error:' + errorMessage ); return; }
            if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( 'Prefab error' ); return; } 
            var resource = cc.instantiate( loadedResource );

            resource.setPosition(-that.SCREEN_WIDTH/2,that.SCREEN_HEIGHT/2)
            that.node.addChild(resource,100)
            that.QiqiuNode = resource

            var action1 = cc.moveTo(15,cc.v2(that.SCREEN_WIDTH/2,50))
            var action2 = cc.moveTo(15,cc.v2(-that.SCREEN_WIDTH/2,-50))
            var action3 = cc.moveTo(15,cc.v2(that.SCREEN_WIDTH/2+100,-that.SCREEN_HEIGHT/2+50))
            var action4 = cc.callFunc(function(){
                //cc.log("消失=====>",resource)
                //resource. = false

            })
            var action5 = cc.delayTime(3)
            var action6 = cc.callFunc(function(){
                //cc.log("重新开始=====>",that.QiqiuitemType)
                //resource.active = true
                let itemiconNode = resource.getChildByName("itemicon")
                itemiconNode.setContentSize(cc.size(120,80))
                if(that.QiqiuitemType == 0){
                    itemiconNode.setContentSize(cc.size(100,100))
                }


                var resName ="res/qiandao_baodan2"
                if(that.QiqiuitemType == 0){
                    resName = "res/qiandao_baodan2"
                    that.QiqiuitemType = 1
                }else{
                    resName = "res/batteryMagic"
                    that.QiqiuitemType = 0
                }

               


                let rewordicon = resource.getChildByName("itemicon").getComponent(cc.Sprite)  // 奖励icon
                Utils.loadSprite(resName, rewordicon)
                resource.setPosition(-that.SCREEN_WIDTH/2,that.SCREEN_HEIGHT/2)
            })



            let array =  new Array()
            array.push(action1)
            array.push(action2)
            array.push(action3)
            array.push(action4)
            array.push(action5)
            array.push(action6)
            resource.runAction(cc.repeatForever(cc.sequence(array)))

            var clickNode = resource.getChildByName("clickNode")
            clickNode.on("touchend", (event) => {   // 看视频领取
                cc.log("看视频领取==========>")
                SDK.getInstance().ShowVideoAd(() => {
                    that.playSuccessReward()
                }, Def.videoType.qiqiugift);
             }, that);
        }
        cc.loader.loadRes('prefab/QiqiuUI', onResourceLoaded );
    }


    playSuccessReward(){
        if(this.QiqiuitemType == 0){  // 试用高级炮台
            cc.sys.localStorage.setItem("ShiyongBattery","BATT_2");
            this.changeBattery()
        }else{
            let num =  cc.sys.localStorage.getItem("ScreenbulletNum");
            cc.sys.localStorage.setItem("ScreenbulletNum",Number(num) + 1);
            this.updateFightUI()
        }
    }

    // 每秒更新
    updateData(){
        if(this.isguajiing == true){
            let num =  cc.sys.localStorage.getItem("GuajiGold");
            if(num == null || num.length == 0){
                num = 0
            }

            cc.sys.localStorage.setItem("GuajiGold",Number(num) + 4);
        }
        cc.sys.localStorage.setItem("offlineTime",Lib.GetTimeBySecond());
    }


    //离线收益
    createOnlineOff(){
        var offlineTime = cc.sys.localStorage.getItem("offlineTime");
        var currentTime = Lib.GetTimeBySecond()
        console.log("离线收益,offlineTime=====>",offlineTime)
        console.log("离线收益=====>",currentTime - offlineTime)


        if(offlineTime != null && offlineTime.length > 0){
            //cc.log("离线收益=====>",currentTime - offlineTime)
            var time = currentTime - offlineTime
            if(time > 0){
                this.scheduleOnce(() => {
                    new OnlineOffUI(this,time)
                }, 1)
            }
        }

    }




    bannerShowHide(){

        var bannerShowNode = new cc.Node()
        this.node.addChild(bannerShowNode)

        var that = this
        var action1 = cc.delayTime(10)
        var action2 = cc.callFunc(function(){
            //cc.log("消失=====>")
            if(that.StopBannerNode  == false){
                SDK.getInstance().CloseBannerAd()
            }
        })
        var action3 = cc.delayTime(10)
        var action4 = cc.callFunc(function(){
            //cc.log("显示=====>")
            if(that.isguajiing == true){
                SDK.getInstance().ShowBannerAd(Def.bannerType.banner_main)
            }
        })


        let array =  new Array()
        array.push(action1)
        array.push(action2)
        array.push(action3)
        array.push(action4)
        bannerShowNode.runAction(cc.repeatForever(cc.sequence(array)))


        SDK.getInstance().ShowBannerAd(Def.bannerType.banner_main)
    }






}
