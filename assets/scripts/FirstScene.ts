import { GameData } from "./GameData";

const { ccclass, property } = cc._decorator;
@ccclass
export class FirstScene extends cc.Component {

    protected initData(...args) { }
    public onShow(...args) { }
   

     onstart(){
        console.log("FirstScene=====>onstart================>")
     }




     onLoad()  {
        console.log("FirstScene======>onLoad================>")

        GameData.loadDataFromFile((loadFileNum) => {
            cc.log("loadFileNum===============>",loadFileNum)
            if(loadFileNum == 5){
                console.log("切到主场景=========>")
                cc.director.loadScene("FightScene")
            }
        });

    }
 
 
    // update(){
    // }




}