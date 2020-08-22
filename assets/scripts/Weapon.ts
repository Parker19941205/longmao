// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import FightScene from "./FightScene";

export  class Weapon  {

   
    update (dt) {
        // if self.isPause then
        //     return
        // end
        // self.sumTime = self.sumTime + delay
        // if self.sumTime - self.countTime > self.cdNormal then
        //     self.countTime = self.sumTime
        //     if self.scene:isEnemyActivity() then
        //         self.cdNormal = self:createBulletNormal()
        //     end
        // end


    }

    createBullet(){
    }

    //--普通弹
    createBulletNormal(){
	// let res = {}
	// res.ani = "bullets/NormalBullet.ExportJson"
	// res.index = 0
	// res.trackType = TrackType.Parabola
	// res.bombType = BombType.Normal
	// res.xOffset = 0
	// res.yOffset = 0
	// res.bulletId = Bullet:getBulletId(res.bombType, UserData:getBulletLevel(res.bombType))
	// local bullet, cdTime = self:createBullet(res)
	// self.scene:addBullet(bullet)
    // return cdTime * (1 - Battery:getAtkSpeedRate())
    }


    createCannon(){



    }










}
