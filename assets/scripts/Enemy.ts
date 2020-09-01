import { Effect } from "./Effect"
import { removeListener } from "process"
import { BaseAI } from "./BaseAI"
import { GameData } from "./GameData"
import CollisionEvent from "./CollisionEvent"
import FightScene, { BombType, ActType } from "./FightScene"
import { tools } from "./tool"
import { Utils } from "./frameworks/Utils"
import { AudioMgr } from "./AudioMarger"
//import { AniType } from "./FightScene"

//怪物类型
export enum AniType
{
    "NULL",
	"ANI_TYPE_LAND",		//陆怪类
	"ANI_TYPE_AIR",			//空怪类
	"ANI_TYPE_ACC",			//加速类
	"ANI_TYPE_CAR",			//车载类
	"ANI_TYPE_BUILDING",	//建筑类
	"ANI_TYPE_DEFENCE",		//防御类
}

export class Enemy{
    scene: any
    bullet:any

    private startX = 0
    private startY = 0
    private g_sensitivity = 2.0		//灵敏度
    private newStar: cc.Node = null

    private GRAVITY		= 20	    // 重力
    private AIR_DRAG	= 600	// 空气阻力
    private g_air_time	= 0.1	// 子母弹生子弹间隔（秒）
    private multiple = 1.2	//默认加速倍数
    private dropTime = 0

    private speed = 50
    private angle = 0
    private directionX = 1
    private directionY = -1
    
    private vx = 1
    private vy = 1
    weapon: any;
    private countTime = 0
    private preTime = 0
    private curTime = 0
    private battery:any;

    private saveSpeed:number
    private bottom_bg
    public enemy1:any
    private AnisData
    private res
    actions:any
    private sprite:any
    private hardLevel
    private maxHp
    private hp
    private isDeath = false
    private rewards
    private FightScene:FightScene
    private isDying = false
    private batteryBottom
    private aniType
    private data = null
    private slowRate
    private slowTime
    private slowing
    private c_r
	private c_g
    private c_b
    private isRefreshColor
    private width
    private height
    private falling
    private guajiCDTime
    private cdNormal = 6
    private sumTime = 5
    private force = false
    private mon_id = null

     // 构造方法
    constructor(scene, aniID?:any) {
        cc.log("构造敌人=============>",aniID)
        this.scene = scene
        this.FightScene = scene
        this.battery = scene.battery
        this.bottom_bg = scene.node.getChildByName("bottom_bg")   // 地板
        this.batteryBottom = scene.batteryNode.getChildByName("batteryBottom")   // 炮台底

        this.actions =  GameData.AnisData[aniID]
        this.sprite = null

        this.res = this.getAniData()
        this.rewards = this.getDropRewards()
        this.aniType = parseInt(this.getAniType())
        //cc.log("敌人动画类型=============>",this.aniType)




        this.hardLevel = 1							//难度系数
	    this.maxHp = this.res.maxHp * this.hardLevel
        this.hp = this.maxHp
        this.speed = this.res.speed
        this.saveSpeed = this.res.speed




        let speed = Math.abs(this.res.speed)
        // cc.log("speed=============>", speed)
        // cc.log("angle=============>", this.res.angle)
        // cc.log("MathPI=============>", this.res.angle * Math.PI/2)
        // cc.log("PI=============>",  Math.cos( this.res.angle * Math.PI/2))

        this.angle = 180
        this.vx = speed * Math.cos(this.res.angle * Math.PI/2)
        this.vy = 0

        //cc.log("敌人初始x速度=============>",this.vx)
        //cc.log("saveSpeed=============>", this.saveSpeed)
      
        return this
    }
   
    init(data,hardLevel){
        this.setHardLevel(hardLevel)
        this.mon_id = data.mon_id

        this.creatEnemy(data)
    }


    setSpeed(speed, angle?:any){
        if( speed == null ){
            return
        }
        let degree = angle && angle || this.angle
        if(this.angle != degree){
            this.angle = degree
        }
        this.speed = speed
        let speed_m = Math.abs(this.speed)
        //this.vx = speed_m * Math.cos(this.angle * Math.PI/180)
        this.vx = speed_m * Math.cos(this.angle * Math.PI/2)

        this.vy = 0
    }



    creatEnemy(data){
        //cc.log("创建敌人预制体==============>")
        //我們先動態取得Canvas
        this.data = data
        var CanvasNode = cc.find( 'Canvas' );
        if( !CanvasNode ) { cc.log( 'find Canvas error' ); return; } 
        var that = this
        var onResourceLoaded = function(errorMessage, loadedResource )
        {
            if( errorMessage ) { cc.log( 'Prefab error:' + errorMessage ); return; }
            if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( 'Prefab error' ); return; } 
            var spritePrefab = cc.instantiate( loadedResource );
            that.sprite = spritePrefab
            that.scene.addEnemy(that)


            let mon_y = -that.FightScene.SCREEN_HEIGHT/2+that.bottom_bg.height-10
            if(that.aniType == AniType.ANI_TYPE_LAND){
                mon_y = -that.FightScene.SCREEN_HEIGHT/2+that.bottom_bg.height-10
            }else if(that.aniType == AniType.ANI_TYPE_AIR){
                mon_y = 110
            }

            that.width = that.res.size.width || 80
	        that.height = that.res.size.height || 80

            //cc.log("width===========>",that.width)
            // 怪物初始位置
            if(that.data != null){
                if(that.aniType == AniType.ANI_TYPE_BUILDING){
                    //spritePrefab.setPosition(that.data.mon_x/2, that.FightScene.SCREEN_HEIGHT + that.height/2)
                    cc.log("解锁====>")
                    spritePrefab.setPosition(that.FightScene.SCREEN_WIDTH/2 - that.data.mon_x/3, mon_y)
                    that.falling = true
                }else{
                    spritePrefab.setPosition(that.FightScene.SCREEN_WIDTH/2 + that.data.mon_x/2, mon_y)  //data.mon_x
                }
            }

    

            // 将战斗类挂载到脚本上
            var collisionEvent = spritePrefab.getComponent(CollisionEvent)
            collisionEvent.fightScene=that.scene;

        };
        cc.loader.loadRes('prefab/' + this.actions.ANI_FILE, onResourceLoaded );
    }

     getAniData(){
        var data = this.actions.ANI_DATA
        var res = {}
        res["maxHp"] = data[0]				// 最大生命值
        res["physicsATK"] = data[1]			// 物理攻击
        res["atkInterval"] = data[2]		// 攻击间隔
        res["speed"] = data[3]				// 初速度
        res["angle"] = data[4]		        // 发射角度
        res["bloodHeight"] = data[5]		// 血条高度
        res["posY"] = data[6]		        // 初始高度
        res["gravity"] = data[7]			// 重力
        res["size"] = cc.size(Number(data[8]) || 0,Number(data[9]) || 0)  // 怪物尺寸
        res["zorder"] = data[10]			// 精灵层级

        //cc.log("data=========>",data)

        return res
    }
   
    //获取动画类型
    getAniType(){
        return this.actions["ANI_TYPE"]
    }


    update(delay){
        //console.log("delay===================>",delay);
        if(this.sprite == null){
            return
        }

        this.curTime = this.curTime + delay
        if(this.preTime == 0){
            this.preTime = this.curTime
        }


        let xPosStar,yPosStar =this.sprite.getPosition()
        let xPos = yPosStar.x
        let yPos = yPosStar.y



        let dx = xPos - this.vx * delay
        let dy = yPos - this.vy * delay
   
        //let yCp = this.bottom_bg.position.y+this.bottom_bg.height/2
        //if(this.isDeath){
            // if(Math.abs(this.res.gravity) > 0){
            //     this.dropTime = this.dropTime + delay
            //     let dx = xPos
            //     let dy = yPos + this.vy * delay
            //     dy = dy - this.res.gravity * this.dropTime
            //     if(dy <= yCp){
            //         dy = yCp
            //         this.doDeath()
            //     }
            //     this.sprite.setPosition(dx, dy)
            // }else{
            //     this.doDeath()
            // }
            //this.doDeath()
            //return
        //}







        //cc.log("dx和dy===================>",dx,dy);
        
        this.sprite.setPosition(dx, dy)

        //cc.log("SCREEN_WIDTH1===================>",this.FightScene.SCREEN_WIDTH/2);
        if(dx <= this.FightScene.SCREEN_WIDTH/2+80){
            //cc.log("进入屏幕===================>");
            this.FightScene.isOutEnemy = true
        }





        let xPosBattery,yPosBattery =this.FightScene.batteryNode.getPosition()
        //cc.log("yPosBattery===================>",yPosBattery.x);
        if(dx <= yPosBattery.x){
            //cc.log("游戏失败===================>");
            this.FightScene.gameOver(false)
            return
        }


        // 挂机中自动发技能
        // if(this.FightScene.isguajiing == true && dx <= (yPosBattery.x + 300) && this.FightScene.issetBulletRock == false){
        //     cc.log("发技能========>")
        //     this.FightScene.createBulletRock()
        // }


        this.FightScene.gjsumTime =this.FightScene.gjsumTime + delay
        // 挂机中自动发技能
        if(this.FightScene.isguajiing == true && dx <= (yPosBattery.x + 500) && this.FightScene.gjsumTime - this.FightScene.gjcountTime > this.FightScene.gjcdNormal){
            this.FightScene.gjcountTime = this.FightScene.gjsumTime
            cc.log("挂机发技能========>", this.FightScene.autoCdType)
            if(this.FightScene.autoCdType == 0){
                this.FightScene.createBulletScreen()
                this.FightScene.autoCdType = 1
            }else{
                this.FightScene.createBulletProtect()
                this.FightScene.autoCdType = 0
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


    // 被子弹攻击
    outHp(physicsATK){
        //cc.log("physicsATK========>",bullet.physicsATK)
        if(this.isDeath){
            return
        }
        this.hp = this.hp - physicsATK
        this.updateHpBar()
    }


    // 被子弹攻击
    hit(bullet,tag?:number){
        //cc.log("被子弹攻击========>",bullet)
        //cc.log("physicsATK========>",bullet.physicsATK)
        if(this.isDeath){
            return
        }
  

        if(bullet.bombType == BombType.Ice){  //被冰弹攻击
            this.sprite.stopActionByTag(ActType.TAG_ACT_SLOW)
            this.slowRate = bullet.info["SLOW_RATE"]
            this.slowTime = bullet.info["SLOW_TIME"]

            var that = this
            var doSlow = function(){
                that.slowdown(true)
            }
            var that1 = this
            var resume = function(){
                that1.slowdown(false)
            }



            let array =  new Array()
            array.push(cc.callFunc(doSlow))
            array.push(cc.delayTime(this.slowTime || 6))
            array.push(cc.callFunc(resume))

            let action = cc.sequence(array)
            action.setTag(ActType.TAG_ACT_SLOW)
            this.sprite.runAction(action)

        }else{
            this.hp = this.hp - bullet.physicsATK
            // if(tag == 10){
            //     this.hp = 0
            // }
    
    
            this.updateHpBar()
            this.hitNum(bullet.physicsATK)
    



        }


    }

   


    //更新血条
    updateHpBar(){
        //cc.log("获取最大生命值========>",this.getMaxHp())
        //cc.log("获取当前生命值========>",this.getCurHp())
       
        let percent = this.getCurHp() / this.getMaxHp()// * 100
        if(percent <= 0){ 
            percent = 0
        }
        //cc.log("更新血条========>",percent)

        var bloodNode = this.sprite.getChildByName("bloodNode")
        var bloodBarNode = bloodNode.getChildByName("bloodBar")
        var bloodBar =  bloodBarNode.getComponent(cc.ProgressBar)

        
        bloodBar.progress = percent

        // if self:getFlip() == ORIENTATION_FLIP_H then
        //     self.hpBar:setScaleX(-1)
        // else
        //     self.hpBar:setScaleX(1)
        // end

        //cc.log("更新血条===========>",this.hp)
        if(this.hp <= 0){
            //this.doDeath()
		    this.die()
        }
    }


    //设置难度倍数
    setHardLevel(level){
        if( level == null){
            level = 1
        }
        this.hardLevel = level

        this.maxHp = this.maxHp * this.hardLevel


        this.hp = this.hp * this.hardLevel

        //cc.log("最大血量", this.maxHp)
        //cc.log("当前血量", this.hp)
    }





    //获取当前生命值
    getCurHp(){
        return Number(this.hp) || 0
    }

    //获取最大生命值
    getMaxHp(){
	    return Number(this.maxHp) || 0
    }

    //获取获取奖励数据
    getDropRewards(){
        return this.actions["DROP_REWARDS"]
    }


    die(force?:any){
        //cc.log("敌人die========================>")
        this.isDeath = true
        this.force = force

        // let armatureDisplay:dragonBones.ArmatureDisplay = node.addComponent(dragonBones.ArmatureDisplay);
        // armatureDisplay.dragonAsset = resource[0];
        // armatureDisplay.dragonAtlasAsset = resource[3];
        // armatureDisplay.armatureName = "armatureName";
        // armatureDisplay.playAnimation("stand",0);

        // if(this.aniType == AniType.ANI_TYPE_AIR){
        //     let bottomYPos = this.bottom_bg.position.y+this.bottom_bg.height/2

        //     var ation1 = cc.rotateBy(2, 360)
        //     var ation2 = cc.moveBy(2,bottomYPos)

        //     // let array =  new Array()
        //     // array.push(cc.spawn(ation1,ation2))
        //     // nodeImg.runAction(cc.sequence(array))
        //     cc.log("动画执行========================>",bottomYPos)

		//     this.sprite.runAction(cc.moveTo(2,bottomYPos)) //cc.spawn(ation1,ation2)
        // }


        if(this.FightScene.isGameOver() == false){
            let star = 0
            let gem = 0
            let gold = this.rewards[2]
            this.FightScene.getFightUI().earnMoney(star, gem, gold)
            this.FightScene.getFightUI().playGoldNum(gold)
        }

        // 隐藏血条
        var bloodNode = this.sprite.getChildByName("bloodNode")
        if(bloodNode){
            bloodNode.active = false
        }

        if(this.aniType == AniType.ANI_TYPE_AIR){
            let bottomYPos = this.bottom_bg.position.y+this.bottom_bg.height/2
            let x = this.sprite.getPosition().x
            var ation1 = cc.rotateBy(1, 360)
            var ation2 = cc.moveTo(1,cc.v2(x,bottomYPos))
            this.sprite.runAction(cc.spawn(ation1,ation2)) //cc.spawn(ation1,ation2)
            this.doDeath()
        }else{
            this.doDeath()
        }
    }

    //动画播放回调
    _animationEventHandler (event) {
        //cc.log("动画播放回调==============>",event)
        if (event.type === dragonBones.EventObject.FADE_IN_COMPLETE) {
            
        }
        else if (event.type === dragonBones.EventObject.FADE_OUT_COMPLETE) {
           
        }
        else if (event.type === dragonBones.EventObject.COMPLETE) {
            //cc.log("播放完成==============>")
            //this.doDeath()


            if(this.isDeath = true){
             
                let bones = this.sprite.getComponent(dragonBones.ArmatureDisplay)
                //cc.log("播放完成bones==============>",bones)
                   // 取得挂点工具
                let attachUtil =  bones.attachUtil;
                attachUtil.generateAllAttachedNodes();
                //cc.log("attachUtil==============>",attachUtil._attachedNodeArray)
             
                var array  = attachUtil._attachedNodeArray
                let pointNode:cc.Node = this.FightScene.node.getChildByName("pointNode")

                //cc.log("骨骼数量==============>",array.length)
                let bonesNum = array.length
                if(bonesNum > 3){
                    bonesNum = 3
                }

                for(var i=0;i<bonesNum;i++){
                   // cc.log("骨骼节点==============>",array[i])
                    var boneNode = array[i]
                    let worldPos= boneNode.convertToWorldSpaceAR(cc.Vec2.ZERO)
                    //cc.log("骨骼位置===========>%d,%d",worldPos.x,worldPos.y)


                    let point= pointNode.convertToNodeSpaceAR(worldPos)
                    this.dropGoldEffect(point,i+1)
                    this.deadEffect(point,1.0)
                    AudioMgr.getInstance().playEffect("SE016");

                }


                this.sprite.removeFromParent()
            }


        }
    }

    doDeath(){
        //this.isDeath = true

        let armatureDisplay:dragonBones.ArmatureDisplay = this.sprite.getComponent(dragonBones.ArmatureDisplay)
        armatureDisplay.playAnimation("dead",1);
        //armatureDisplay.debugBones = true


        armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
        armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);
        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);

    }




    hitNum(physicsATK){
      
        var img:cc.Node = this.FightScene.node.getChildByName("num30Label")
        var nodeImg = cc.instantiate(img);

        var label = nodeImg.getComponent(cc.Label)
        label.string = physicsATK


        nodeImg.setPosition(this.sprite.getPosition())
        this.FightScene.node.addChild(nodeImg)
        nodeImg.active = true

        var randRates=[-0.4, 0.8, -1.2, 1.6, -2.0];
        var randRates2=[0.4, 0.8, 1.2, 1.6, 2.0];
        var arr = tools.makeRandomArr(randRates,1)
        var arr2 = tools.makeRandomArr(randRates2,1)

        var rand = arr[0]
        var rate = arr2[0]
        //cc.log("rand=========>",rand)
        //cc.log("rate=========>",rate)


        //贝塞尔曲线
        var bezier = [cc.v2(20*rand, 30*rate), cc.v2(20*rand, 30*rate), cc.v2(40*rand, 40)];
        var bezierForward = cc.bezierBy(0.8, bezier);
        //nodeImg.runAction(bezierForward);

        var _endNumAction = cc.callFunc(function(){
            nodeImg.removeFromParent()
        })

        let moveArray =  new Array()
        moveArray.push(bezierForward)
        moveArray.push(cc.fadeTo(1.5, 0))

        let array =  new Array()
        array.push(cc.spawn(moveArray))
        array.push(_endNumAction)
        nodeImg.runAction(cc.sequence(array))
    }

    //设置加速倍数
    setSpedMultiple(multiple){
        //this.sprite.slow(multiple)
        this.setSpeed(this.saveSpeed * multiple)
    }


    slowdown(isSlow){
        if(isSlow && this.isDeath == false){
            this.slowing = true
            this.setSlowColor(false)
            this.setSpedMultiple(this.slowRate || 0.1)
        }else{
            this.slowing = false
            this.recoverColor(true)
            this.setSpedMultiple(this.FightScene.getSpedMultiple())
        }
    }

    setSlowColor(isRefreshColor){
	    this.setColor(cc.color(128, 192, 200), isRefreshColor)
    }

    //设置精灵颜色
    setColor(c, isRefreshColor){
        this.c_r = c.r
        this.c_g = c.g
        this.c_b = c.b
        this.isRefreshColor = isRefreshColor
        var colorCode = cc.color(c.r,c.g,c.b,255);

        this.sprite.color = colorCode
    }

    //恢复颜色
    recoverColor(now){
        if(now == true){
            this.sprite.color = cc.color(255, 255, 255,255)
        }else if(this.isRefreshColor == true){
            if(this.c_r + 10 <= 255){
                this.c_r = this.c_r + 10
            }else{
                this.c_r = 255
            }
            if(this.c_g + 10 <= 255){
                this.c_g = this.c_g + 10
            }else{
                this.c_g = 255
            }
            if(this.c_b + 10 <= 255){
                this.c_b = this.c_b + 10
            }else{
                this.c_b = 255
            }
            this.sprite.setColor(cc.color(this.c_r, this.c_g, this.c_b))
            if(this.c_r == 255 && this.c_g == 255 && this.c_b == 255){
                this.isRefreshColor = false
            }
        }
    }




     deadEffect(position, scale){
        var dirPath = "ani/deadsmoke";
        let pointNode:cc.Node = this.FightScene.node.getChildByName("pointNode")

        var callfunc = (function(){
            let deadsmoke:cc.Node = pointNode.getChildByName("deadsmoke")
            if(deadsmoke){
                //cc.log("删除============>")
                deadsmoke.removeFromParent()
            }
        })

        let node:cc.Node = new cc.Node();
        node.setPosition(position)
        pointNode.addChild(node,0,"deadsmoke");

        //Utils.loadDragonBones(node,dirPath,null,"run",callfunc,1)
        Utils.loadDragonBones2(node,dirPath,null,"armatureName","run",callfunc,1)
    }

    // 金币掉落特效
    dropGoldEffect(position,index){
        if(this.force == true){
            return
        }


        var sceneNode:cc.Node = this.FightScene.node.getChildByName("goldEffectNode")

        var goldEffectNode = cc.instantiate(sceneNode);
        goldEffectNode.active = true
        goldEffectNode.setPosition(position.x,position.y)
        this.FightScene.node.addChild(goldEffectNode)


        let goldPos = this.FightScene.getGoldPos()
        let _removeEff = function(){
            //Effect:goldGainEffect(ccp(goldPos.x, goldPos.y))
            AudioMgr.getInstance().playEffect("SE011");
            //eff:die()
            goldEffectNode.removeFromParent()
        }
        let array = new Array()
        array.push(cc.delayTime(0.1 * index))
        array.push(cc.moveTo(0.5,goldPos))
        array.push(cc.callFunc(_removeEff))
        goldEffectNode.runAction(cc.sequence(array))



    }







}
