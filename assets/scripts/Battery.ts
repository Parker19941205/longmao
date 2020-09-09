/*
    Declare:炮台类
    Date:2014/5/7
    **/

import { Utils } from "./frameworks/Utils";
import FightScene from "./FightScene";
import NodePoolMgr from "./NodePoolMgr";


export class Battery {

    private FightScene:FightScene;
    private txt_gold;
    private earnStar = 0
	private earnGem = 0
    private earnGold = 0
    private _count_stars = 0
    private _count_gems = 0
    private _count_golds = 0
    private mao
    private isUpOrDown


     // 构造方法
     constructor(scene:any) {
        cc.log("构造炮台类=============>")

        this.FightScene = scene


        return this
     }



     createBattery(battery,aniNode,callfunc){
        var dirPath = "ani/" + battery;
        //Utils.loadDragonBones(aniNode, dirPath,callfunc)
        Utils.loadDragonBones2(aniNode, dirPath,callfunc)


        // let nodePool = NodePoolMgr.getInstance().getPrefabNodePool(battery)
        // if(nodePool){
        //     //node = nodePool.getNode()
        //     //Utils.loadNodeDragonBones(node,null,"run",callfunc,1)
           
        //     let node = nodePool.getNode()
        //     cc.log("炮台对象池中存在=============>",node)

        //     Utils.loadNodeDragonBones(node,callfunc)
        // }else{

        //     var callfunc2 = (function(){
        //         cc.log("炮台对象池=============>",aniNode)
        //          // 保存到对象池
        //         NodePoolMgr.getInstance().creatreNodePool(battery, aniNode)
        //         callfunc()
        //     })

        //     Utils.loadDragonBones2(aniNode, dirPath,callfunc2)
        // }
     }


  


     createWeapon(battery,aniNode,callfunc){
        let position = this.getWeaponPos()

        let pointNode:cc.Node = this.FightScene.node.getChildByName("pointNode")

        var s = "res/paodank"

        let node:cc.Node = new cc.Node();

        var sprite = node.addComponent(cc.Sprite);
        cc.loader.loadRes(s,cc.SpriteFrame,(er:Error,res:cc.SpriteFrame)=>{
            if(er){
                return;
            }
            sprite.spriteFrame = res;
        })
       
        this.FightScene.weaponNode = node
        node.setPosition(position)
        pointNode.addChild(node,0,"paodank");

        // 创建子弹发射的初始位置节点
        let posNode:cc.Node = new cc.Node();
        posNode.setPosition(60,0)
        node.addChild(posNode,0,"posNode");


        this.FightScene.getBulletinitPos()
     }






     createNPC(index, position){
        //cc.log("createNPC=========>",index)
        //cc.log("position=========>",position)
        let npcAni = ""
        if(index == 1){
            npcAni = "longmao_npc"
        }else if(index == 2){
            npcAni = "people_npc"
        }

    

        let pointNode:cc.Node = this.FightScene.node.getChildByName("pointNode")

        var dirPath = "ani/" + npcAni;

        let node:cc.Node = new cc.Node();
        node.setPosition(position)
        pointNode.addChild(node,0,npcAni);

        Utils.loadDragonBones2(node,dirPath,null,"armatureName","stand")
     }



     getWeaponPos(){
        var batteryNode = this.FightScene.batteryNode.getChildByName("node")
        let bone:dragonBones.ArmatureDisplay = batteryNode.getComponent(dragonBones.ArmatureDisplay)
        
         // 取得挂点工具
         let attachUtil = bone.attachUtil;
         attachUtil.generateAllAttachedNodes();
         // 因为同名骨骼可能不止一个，所以需要返回数组
         let boneNodes = attachUtil.getAttachedNodes("CannonPoint");
        // 取第一个骨骼作为挂点
         let boneNode:cc.Node = boneNodes[0];

        let z= boneNode.convertToWorldSpaceAR(cc.Vec2.ZERO)
        //cc.log("maoPoint===========>", this.FightScene.maoPoint)
        //cc.log("zzzzzzzz===========>%d,%d",z.x,z.y)

        let pointNode:cc.Node = this.FightScene.node.getChildByName("pointNode")
        let point= pointNode.parent.convertToNodeSpaceAR(z)
        //cc.log("point===========>%d,%d",point.x,point.y)
     
        return point
    }


    getMaoPos(){
        var batteryNode = this.FightScene.batteryNode.getChildByName("node")
        let bone:dragonBones.ArmatureDisplay = batteryNode.getComponent(dragonBones.ArmatureDisplay)
        //cc.log("bone===========>",bone)



         // 取得挂点工具
         let attachUtil = bone.attachUtil;
         attachUtil.generateAllAttachedNodes();
         // 因为同名骨骼可能不止一个，所以需要返回数组
         let boneNodes = attachUtil.getAttachedNodes("MaoPoint");
        // 取第一个骨骼作为挂点
         let boneNode:cc.Node = boneNodes[0];

        // cc.log("boneNode===========>",boneNode)



        let z= boneNode.convertToWorldSpaceAR(cc.Vec2.ZERO)
        //cc.log("maoPoint===========>", this.FightScene.maoPoint)
       // cc.log("zzzzzzzz===========>%d,%d",z.x,z.y)

        let pointNode:cc.Node = this.FightScene.node.getChildByName("pointNode")

        let _,yy = pointNode.parent.getPosition()
       // cc.log("yyyyyyyyy===========>%d,%d",yy.x,yy.y)
        let point= pointNode.parent.convertToNodeSpaceAR(z)
      //  cc.log("point===========>%d,%d",point.x,point.y)
     
        return point
    }

    getRolePos(){
        //let Battery,pos = this.FightScene.batteryNode.getChildByName("peoplePointNode").getPosition()

        var batteryNode = this.FightScene.batteryNode.getChildByName("node")
        let bone:dragonBones.ArmatureDisplay = batteryNode.getComponent(dragonBones.ArmatureDisplay)
        
         // 取得挂点工具
         let attachUtil = bone.attachUtil;
         attachUtil.generateAllAttachedNodes();
         // 因为同名骨骼可能不止一个，所以需要返回数组
         let boneNodes = attachUtil.getAttachedNodes("RolePoint");
        // 取第一个骨骼作为挂点
         let boneNode:cc.Node = boneNodes[0];

        let z= boneNode.convertToWorldSpaceAR(cc.Vec2.ZERO)
        //cc.log("maoPoint===========>", this.FightScene.maoPoint)
        //cc.log("zzzzzzzz===========>%d,%d",z.x,z.y)

        let pointNode:cc.Node = this.FightScene.node.getChildByName("pointNode")
        let point= pointNode.parent.convertToNodeSpaceAR(z)
        //cc.log("point===========>%d,%d",point.x,point.y)



        return point
    }

    playNpcActMao(isUpOrDown){
        //cc.log("playNpcActMao===============",isUpOrDown)
        //cc.log("mao===============",this.mao)

        let pointNode:cc.Node = this.FightScene.node.getChildByName("pointNode")
        let longmao_npc = pointNode.getChildByName("longmao_npc")
        if(longmao_npc == null){
            return
        }

        let bone:dragonBones.ArmatureDisplay = longmao_npc.getComponent(dragonBones.ArmatureDisplay)

        if(bone == null){
            return
        }

        if(isUpOrDown == null){
            bone.playAnimation('stand', 0);
        }else if(isUpOrDown != this.isUpOrDown){
            if(isUpOrDown == true){
                bone.playAnimation("stand1",0)
            }else{
                bone.playAnimation("stand2",0)
            }
        }

        this.isUpOrDown = isUpOrDown


    }




}
