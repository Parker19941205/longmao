import { Config, UriMap, CENSUSID } from "../config/Config"

import { Def } from "./Def";
import { PlatformManager, Platform } from "../platform/PlatformManager";
import { Utils } from "./Utils";
import { HttpManager } from "./HttpMarger";
import { GameData } from "../GameData";

/**渠道平台 */
export enum channelName {
    "test",
    /**快看 */
    "快看",
    /**微信 */
    "微信",
    /**字节跳动 */
    "字节跳动",
    /**vivo */
    "Vivo",
     /**baidu */
    "Baidu",
     /**QQ */
    "QQGAME",
    /**4399 */
    "SISANJIUJIU",
    /**OPPO */
    "OPPO"

}


//数据统计类
export class DataCensus {

    // 播放视频部分：
    public static allVideoCensus(type:string) {
        let appId = 3001
        let channel = channelName[PlatformManager.CurrentPlatform]
        let uid = GameData.data.uuid
        if(uid == null){
            uid = "nouuid"
        }


        let feild = CENSUSID[type].keyvalue
        console.log("feild=============>",feild)
        let isCensus = this.issetLocalFeild(feild)
        console.log("isCensus=============>",isCensus)
        
        let key = "video_count"
        let value = feild
        //console.log("config=============>", GameData.data.PlayerData.config)

        let objectValue = {"appId":appId,"channel":channel,"uid":uid,"key":key,"value":value}
        HttpManager.getInstance().httpPost(UriMap.Census, objectValue, (str: string) => {
        },Config.httpUrl_Census)


        // 统计人数只统计一次
        if(isCensus){
            key = "video_person"
            value = feild

            objectValue = {"appId":appId,"channel":channel,"uid":uid,"key":key,"value":value}
            HttpManager.getInstance().httpPost(UriMap.Census, objectValue, (str: string) => {
                //console.log("http回调值=============>",str)
            },Config.httpUrl_Census)


            cc.sys.localStorage.setItem(feild, true);
        }
    }
    
    // 用户步骤部分：
    public static userStepCensus(FightScene,eventId:string,uploadValue:string,suffixValue?:any,isOneNot?:boolean,isleijia?:boolean) {
        // 4399不统计
        if(PlatformManager.CurrentPlatform == Platform.SISANJIUJIU){
            console.log("4399不统计=============>")
            return
        }




        let appId = 3001
        let channel = channelName[PlatformManager.CurrentPlatform]
        let uid = GameData.uuid
        if(uid == null){
            uid = "nouuid"
        }

        console.log("feild=============>",uploadValue)
        let isCensus = this.issetLocalFeild(uploadValue)
        if(isOneNot){
            isCensus = true
        }
        console.log("isCensus=============>",isCensus)



        // 统计人数只统计一次
        if(isCensus){
            let key = eventId
            let value = uploadValue
         
            // 有后缀值
            if(suffixValue){
                value = uploadValue + "_" + suffixValue
            }


             //更新炮台
            // FightScene.scheduleOnce(() => {
               
            // }, 0)

            let objectValue = {"appId":appId,"channel":channel,"uid":uid,"key":key,"value":value}
            HttpManager.getInstance().httpPost(UriMap.Census, objectValue, (str: string) => {
                //console.log("http回调值=============>",str)
            },Config.httpUrl_Census)

            


            if(isleijia){
                cc.sys.localStorage.setItem(uploadValue, suffixValue);
            }else{
                cc.sys.localStorage.setItem(uploadValue, true);
            }
        }
    }




    // 本地是否有了这个字段
    public static issetLocalFeild(feild) {
        let feildValue = cc.sys.localStorage.getItem(feild);
        console.log("这个字段值=============>",feildValue)
        if(feildValue == null){
            return true
        }
        return false
    }








}
