// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import FightScene from "./FightScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CollisionEvent extends cc.Component {

    public fightScene:any;
    private _armatureDisPlay: any;
    private _armature: any;
    // constructor(child) {
    //     cc.log('child=============>',child)
    //     super();
    // }

    onLoad(){
        //cc.log("动画onload==============>")
        //获取 ArmatureDisplay
       // this._armatureDisPlay = this.getComponent(dragonBones.ArmatureDisplay)
        //获取 Armatrue
      //  this._armature = this._armatureDisPlay.armature()
        //添加动画监听
     //   this._armatureDisPlay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this.animationEventHandler, this)
     //   this._armatureDisPlay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this.animationEventHandler, this)
   
        //this.attack()
        //this.attack2()
      // this._armatureDisPlay.playAnimation('run', 0);
    }

    attack(){
        //cc.log("动画执行方式一==============>", this._armature)
         //动画执行方式一
         this._armature.animation.fadeIn('run', -1, -1, 0, 'hit');
    }

    attack2(){
        //cc.log("动画执行方式二==============>", this._armatureDisPlay)
        //动画执行方式二
        this._armatureDisPlay.playAnimation('run', 1);
    }

    animationEventHandler(event) {
        if (event.type == dragonBones.EventObject.FADE_IN_COMPLETE) {
        cc.log(event.detail.animationName + ' fade in complete');
        } else if (event.type == dragonBones.EventObject.FADE_OUT_COMPLETE) {
        cc.log(event.detail.animationName + ' fade out complete');
        }
    }



    onCollisionEnter(other:any, self:any) {
        //cc.log("碰撞产生开始other============>",other);
        //cc.log("碰撞产生开始self============>",self);
        //console.log('self=================>',self.tag);
        
        //cc.log("self=>tag============>",self.tag)
        //cc.log("other=>tag============>",other.tag)

       
        //var idTag_1 = other.node.idTag
        //var idTag_2 = self.node.idTag
        //cc.log("idTag_1============>",idTag_1);
        //cc.log("idTag_2============>",idTag_2);


        if(this.fightScene){
            //cc.log("碰撞回调一次============>");
            this.fightScene.contactListener(other,self)
        }
      
    }


     /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay(other:any, self:any) {
        //cc.log("每次计算碰撞结果后调用============>");


        // console.log('self===========>',self);
        // console.log('on collision stay');
        // console.log('other================>',other.tag);
        // console.log('self=================>',self.tag);



    }

    onCollisionExit(other:any, self:any) {
        //cc.log("碰撞产生结束other============>",other);
        //cc.log("碰撞产生结束self============>",self);
        //cc.log("碰撞结束============>");

        //cc.log("group11============>",contactA.node.group)
        //cc.log("group22============>",contactB.node.group)

    }









}
