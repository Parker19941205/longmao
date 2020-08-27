import { Effect } from "./Effect"
import { removeListener } from "process"
import { GameData } from "./GameData"
import FightScene, { BombType, ActType, TrackType } from "./FightScene"
import { tools } from "./tool"
import { Utils } from "./Utils"
import CollisionEvent from "./CollisionEvent"
import { Shake } from "./Shake"
import { AudioMgr } from "./AudioMarger"

export class Bullet {
    scene: any
    bullet:any

    private startX = 0
    private startY = 0
    private g_sensitivity = 2.0		//灵敏度
    private newStar: cc.Node = null

    private GRAVITY		= 20	    // 重力
    private AIR_DRAG	= 600	// 空气阻力
    private g_air_time	= 0.2	// 子母弹生子弹间隔（秒）
    private multiple = 1.2	//默认加速倍数
    private dropTime = 0

    private speed = 600
    private angle = 0
    private directionX = 1
    private directionY = -1
    
    private vx = 1
    private vy = 1
    weapon: any;
    private countTime = 0
    private sumTime = 5
    private cdNormal = 5
    private battery:any;

    private saveSpeed:number
    private bottom_bg
    private bulletBomb
    private isDying = false
    private res
    private bulletId = ""
    private info
    private physicsATK
    private atkData
    //private isDeath = false
    private sprite
    private trackType
    private bombType
    private sum_time = 0
    private slow_vx
    private isrun = false
    private hasStopped = false
    private sumAirTime = 10
    private countAirTime = 0
    private FightScene:FightScene
    private startPos = null
    private bulletBomb1

     // 构造方法
    constructor(scene, data,startPos?:any,angle?:any) {
       //cc.log("构造子弹=============>")
        this.scene = scene
        this.FightScene = scene
        this.battery = scene.weaponNode
        this.bottom_bg = scene.node.getChildByName("bottom_bg")
        this.res = data
        this.startPos = startPos

        this.angle = angle


        let level = cc.sys.localStorage.getItem("bullet" + Number(this.res["bombType"]));


        this.bulletId = this.getBulletId(this.res["bombType"],level)
        //cc.log("子弹ID==================>",this.bulletId)

        this.info = this.getBulletRes(this.bulletId)
        //cc.log("获取子弹数据==================>",this.info)

        this.trackType = this.res["trackType"]
        this.bombType = this.res["bombType"]

        this.physicsATK = this.info["POWER"] || 0


        if(this.bombType == BombType.Rock){
            this.GRAVITY = 50
            this.speed = 300
        }



        this.init(this.speed)

        return this
    }
   


    init(speed){

        this.saveSpeed = Math.abs(speed)
        this.speed = this.saveSpeed
        this.directionX = 1
        this.directionY = -1

       // cc.log("地面的位置======>",this.bottom_bg.position.y+this.bottom_bg.height/2)
        //let batteryPos = this.battery.node.getChildByName("batteryPos")
        let batteryPos = this.battery

        //batteryPos.active = false
       //cc.log("12121212======>",this.battery.node.position.x)
       //cc.log("23232323======>",this.battery.node.position.y)

       let pos1 = this.battery.position
       let pos2 = batteryPos.position

        
        if(this.angle == null){
		    this.angle = this.battery.angle
        }

        this.multiple = this.scene.getSpedMultiple()
        this.setSpedMultiple(this.multiple)
    

        
        this.slow_vx = 0.2



        this.creatBullet()

        //cc.log("炮台角度======>",this.angle)
    }

    
    creatBullet(){
        //cc.log("创建子弹预制体==============>")
        //我們先動態取得Canvas
        var CanvasNode = cc.find( 'Canvas' );
        if( !CanvasNode ) { cc.log( 'find Canvas error' ); return; } 
        var that = this

        var onResourceLoaded = function(errorMessage, loadedResource )
        {
            if( errorMessage ) { cc.log( 'Prefab error:' + errorMessage ); return; }
            if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( 'Prefab error' ); return; } 
            var bullet = cc.instantiate( loadedResource );
            that.sprite = bullet
            that.scene.addBullet(that)


            if(that.startPos == null){
                bullet.setPosition(that.battery.position.x,that.battery.position.y)
            }else{
                bullet.setPosition(that.startPos.x,that.startPos.y)
            }

  
            that.rotateAction2(3)

        };
        cc.loader.loadRes('prefab/' + that.res["ani"], onResourceLoaded );
    }



    rotateAction2(roTime){
        // if(wayNum && (wayNum < -1 || wayNum >1)){
        //     wayNum = 0
        // }
        // let roWay = Math.random()
        // if(roWay == 0){
        //     roWay = 0.5 
        // }
        // if(wayNum){
        //     roWay = Math.abs(roWay) * wayNum
        // }

        this.sprite.stopActionByTag(ActType.TAG_ACT_ROTATE)

        let action = cc.repeatForever(cc.rotateBy(roTime, 360))
        action.setTag(ActType.TAG_ACT_ROTATE)
        this.sprite.runAction(action)

    }



    // 设置加速倍数
    setSpedMultiple(multiple){
	    this.setSpeed(this.saveSpeed * multiple, this.angle)
    }

    setSpeed(speedm, angle){
        if(this.speed == null){
            return
        }
        let degree = angle && angle || this.angle
        // cc.log("degree===================>",degree);
        // cc.log("speedm===================>",speedm);

        // cc.log("幅度为=====>" + this.angle * Math.PI/180)
        // cc.log("余弦值=====>" + Math.cos(this.angle * Math.PI/180))

        // cc.log("正玄值=====>" + Math.sin(this.angle * Math.PI/180))



        if(this.angle != degree){
            this.angle = degree
        }
        this.speed = speedm
        let speedm1 = Math.abs(this.speed)
        this.vx = speedm1 * Math.cos(this.angle * Math.PI/180)
        this.vy = speedm1 * Math.sin(this.angle * Math.PI/180)

        // cc.log("vx===================>"+ this.vx);
        // cc.log("vy===================>"+ this.vy);


    }


    update(delay){
    //    console.log("delay===================>",delay);
        if(this.sprite == null){
            return
        }

        let xPosStar,yPosStar =this.sprite.getPosition()
        let xPos = yPosStar.x
        let yPos = yPosStar.y


        if (xPos > this.FightScene.SCREEN_WIDTH/2+50){
            //cc.log("子弹超出屏幕外==========>",this.isDying)
            this.die()
            return
        }


        //console.log("xPos===================>",xPos);
        //console.log("yPos===================>",yPos);

        // let xs = 1 * delay + 1
        // let ys = 1 * delay + 1
        // this.newStar.setPosition(yPos.x + xs, yPos.y + ys)
        let fps = cc.game.getFrameRate()
        //console.log("fps===================>",fps);
        let rateX = fps/60
        let rateY = 60/fps
        if(rateX > 1.0) { rateX = 1.0 }
        if(rateY < 1.0) { rateY = 1.0 }
        if(rateX < 0.8) { rateX = 0.8 }


        this.dropTime = this.dropTime + delay

        if(this.trackType == TrackType.Beeline){
            let xs = this.vx * delay
            let ys = this.vy * delay
            this.sprite.setPosition(xPos + xs, yPos + ys)

        }else{
            let air_drag = this.AIR_DRAG * (this.multiple - 1) * delay // 空气阻力
            let sped_gravity = this.GRAVITY * (this.multiple - 1) * this.dropTime * 8

            //cc.log("bombType===============>",this.bombType)

            if(this.bombType != BombType.Rock){
                this.vx = (this.getOriginSpeedX() * this.multiple * rateX - air_drag) * this.directionX
            }        
            this.vy = this.vy - this.GRAVITY * this.dropTime * rateY - sped_gravity

            let dx = xPos + this.vx * delay
            let dy = yPos + this.vy * delay


            if(this.bombType == BombType.Air){
                this.sumAirTime = this.sumAirTime + delay
                if(this.sumAirTime - this.countAirTime > this.g_air_time ){
                    this.countAirTime = this.sumAirTime
                    for(var i = 0;i < 3;i++){
                        let _,src = this.sprite.getPosition()
                        let degree = tools.getRandomNumInt(0,360)
                        //cc.log("随机生成的角度================>",degree)

                        this.FightScene.createBulletAirSon(src,degree)
                    }
                    //cc.log("创建一次================>")
                }
            }



            
                let bottomYPos = this.bottom_bg.position.y+this.bottom_bg.height/2
           
                if(dy <= bottomYPos+40){    // 掉落在地上爆炸
                    if(this.bombType == BombType.Rock){
                        this.vx = this.vx - 2.3
                        //dx = xPos + 30 * delay
                        dy = bottomYPos+40
                        if(this.isrun == false){
                            this.rotateAction2(10)
                            this.isrun = true
                            AudioMgr.getInstance().playEffect("SE002");
                        }

                        if(this.vx <= 0){
                            this.vx = 0
                            if(this.hasStopped == false){
                                this.hasStopped = true
                                var that = this
                                let stopActions = cc.callFunc(function () {
                                    that.sprite.stopActionByTag(ActType.TAG_ACT_ROTATE)
                                })
                                var that1 = this
                                let remove = cc.callFunc(function () {
                                    that1.die()
                                    that1.FightScene.issetBulletRock = false
                                })

                                let array =  new Array()
                                array.push(stopActions)
                                array.push(cc.delayTime(3))
                                array.push(remove)
                                this.sprite.runAction(cc.sequence(array))
                            }
                        }
                    }
                }



                if(dy <= bottomYPos){    // 掉落在地上爆炸
                    //cc.log("爆炸===============>")
                    //调用（抖动持续时长：3秒，x方向幅度：15像素  ， y方向幅度 ： 15像素）：
                    let shake:Shake = Shake.create(0.1,-5,3);
                    this.bottom_bg.runAction(shake);
                    let shake2:Shake = Shake.create(0.1,-5,3);
                    this.FightScene.batteryNode.runAction(shake2);

                    //cc.log(" vx===============>", this.vx)
                    if(this.bombType != BombType.Rock){
                        dy = bottomYPos
                        this.die(true)
                        return
                    }
                }



                //  cc.log("dx和dy===================>",dx,dy);
                this.sprite.setPosition(dx, dy)

    
        }




       



    }

    getOriginSpeedX(){
        if(this.speed == null || this.angle == null){
            return 0
        }

        let vx = this.speed * Math.cos(this.angle * Math.PI/180)
        return vx
    }

    doDeath(){
        //this.isDeath = true
    }



    die(isBomb?:boolean){
        if(this.isDying){
            return
        }
        this.isDying = true
        this.sprite.stopAllActions()

        if(isBomb){

            if(this.bombType == BombType.Ice){
                this.bombEffectIce()
                this.sprite.removeFromParent()

                AudioMgr.getInstance().playEffect("SE004");
            }else if(this.bombType == BombType.Screen){
                this.bombEffectScreen()
                this.sprite.removeFromParent()
                this.FightScene.hurtAllEnemys(this)
                AudioMgr.getInstance().playEffect("SE002");
            }else if(this.bombType == BombType.Protect){
                this.bombEffectProtect()
                this.sprite.removeFromParent()
            }else{
                // 使用给定的模板在场景中生成一个新节点
                this.bulletBomb  = cc.instantiate(this.scene.bulletBomb);
                this.bulletBomb.setPosition(this.sprite.getPosition())
                this.scene.node.addChild(this.bulletBomb);

                //cc.log("bulletBomb=================>", this.bulletBomb.getComponent(dragonBones.ArmatureDisplay))
                var bulletAni =  this.bulletBomb.getComponent(dragonBones.ArmatureDisplay)
                bulletAni.playAnimation('run', 1);
                this.sprite.removeFromParent()

                AudioMgr.getInstance().playEffect("SE002");
                //let armatureDisplay:dragonBones.ArmatureDisplay = this.bulletBomb.getComponent(dragonBones.ArmatureDisplay)
               // armatureDisplay.playAnimation("dead",1);
        
                bulletAni.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
                bulletAni.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);
                bulletAni.addEventListener(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);
            
            }

            //this.doDeath()
        }else{
            this.sprite.removeFromParent()
        }

    }

    //被击中
    hit(enemy,tag?:number){
        if(this.bombType != BombType.Rock && this.bombType != BombType.Protect){
            this.die(true)
        }
        if(this.bombType == BombType.AirSon){
            AudioMgr.getInstance().playEffect("SE006");
        }
        if(this.bombType == BombType.Rock){
            AudioMgr.getInstance().playEffect("SE008");
        }

    }


    _animationEventHandler (event) {
        //cc.log("动画播放回调==============>",event)
        if (event.type == dragonBones.EventObject.START) {
            //cc.log("动画开始播放。==============>",this.bulletBomb)
        }
        else if (event.type === dragonBones.EventObject.LOOP_COMPLETE) {
            //cc.log("动画循环播放完成一次。==============>",this.bulletBomb)
        }
        else if (event.type === dragonBones.EventObject.FADE_IN) {
            //cc.log("FADE_IN==============>",this.bulletBomb)
        }
        
        else if (event.type === dragonBones.EventObject.COMPLETE) {
            //cc.log("播放完成==============>",this.bulletBomb)
            if(this.bulletBomb){
                this.bulletBomb.removeFromParent()
            }
        }
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
       //cc.log("BulletsData===========>",GameData.BulletsData)
	    return GameData.BulletsData[bulletId] || {}
    }

    //获取火力数据
    getPowerData(){
	    return this.atkData
    }


    rotateAction(roTime, wayNum){
        if(wayNum && (wayNum < -1 || wayNum >1)){
            wayNum = 0
        }
        let roWay = Math.random()
        if(roWay == 0){
            roWay = 0.5 
        }
        if(wayNum){
            roWay = Math.abs(roWay) * wayNum
        }

        let action = cc.repeatForever(cc.rotateBy(roTime, 360 * roWay))
        action.setTag(ActType.TAG_ACT_ROTATE)
        this.sprite.runAction(action)


    }



    bombEffectIce(){
        // 使用给定的模板在场景中生成一个新节点
        this.bulletBomb = new cc.Node();
        this.bulletBomb.setPosition(this.sprite.getPosition())
        this.scene.node.addChild(this.bulletBomb);

        var dirPath = "ani/iceBombEffect";
        //this.playAni(this.bulletBomb, dirPath,"run")

        var that = this
        var callfunc = (function(){
            if(that.bulletBomb){
                that.bulletBomb.removeFromParent()
            }
        })


        Utils.loadDragonBones2(this.bulletBomb,dirPath,null,"armatureName","run",callfunc,1)
        this.FightScene.attckEffectIce(this,this.sprite.getPosition())
    }

   

    bombEffectScreen(){
        for(var i=0;i<30;i++){
            let destX = tools.getRandomNumInt(-480,480)
            let destY = tools.getRandomNumInt(-320,320)

            var that = this
            var dirPath = "ani/baozhan";
            var callfunc = (function(){
                let node:cc.Node = that.FightScene.node.getChildByName("bombEffectScreen")
                if(node){
                    //cc.log("删除============>")
                    node.removeFromParent()
                }
            })
    
            let node:cc.Node = new cc.Node();
            node.setPosition(destX,destY)
            this.FightScene.node.addChild(node,0,"bombEffectScreen");
    
            //Utils.loadDragonBones(node,dirPath,null,"run",callfunc,1)
            Utils.loadDragonBones2(node,dirPath,null,"armatureName","run",callfunc,1)
        }
    }


    bombEffectProtect(){
         // 使用给定的模板在场景中生成一个新节点
         this.bulletBomb  = cc.instantiate(this.FightScene.shouweiBomb);
         this.bulletBomb.setPosition(this.sprite.getPosition())
         this.FightScene.node.addChild(this.bulletBomb);


         //cc.log("bulletBomb=================>", this.bulletBomb.getComponent(dragonBones.ArmatureDisplay))
         var bulletAni =  this.bulletBomb.getComponent(dragonBones.ArmatureDisplay)
         bulletAni.playAnimation('attack', 5);
        //this.sprite.removeFromParent()

        // 取得挂点工具
        let attachUtil = bulletAni.attachUtil;
        //cc.log("attachUtil===========>",attachUtil)
        let armature =   attachUtil._boneIndexToNode
        var attachNode8 = armature[8]
        var attachNode9 = armature[9]
        var attachNode10 = armature[10]
        var attachNode11 = armature[11]



        // 将战斗类挂载到脚本上
        var collisionEvent8 = attachNode8.getComponent(CollisionEvent)
        collisionEvent8.fightScene = this.FightScene;

        var collisionEvent9 = attachNode9.getComponent(CollisionEvent)
        collisionEvent9.fightScene = this.FightScene;

        var collisionEvent10 = attachNode10.getComponent(CollisionEvent)
        collisionEvent10.fightScene = this.FightScene;

        var collisionEvent11 = attachNode11.getComponent(CollisionEvent)
        collisionEvent11.fightScene = this.FightScene;


        bulletAni.addEventListener(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);

    }



    // 被子弹攻击
    outHp(physicsATK){
    }










    
}
