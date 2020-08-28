import { Def } from "../frameworks/Def";
import { Platform } from "../platform/PlatformManager";

/*=======================================================================
 * File Name    : public static readonly js
 * Creator      : 
 * Date         : 2015/12/27 16:43:58
 * Description  : 
 * Modify       : 
 * =======================================================================*/



export class Config {
    /**当前平台 */
    public static readonly httpUrl = "https://yuema.sfplay.net:8081/";//"http://192.168.1.28:8080/" //
    /**事件统计 */
    public static readonly httpUrl_Census = "https://yuema.sfplay.net:9090/";

    /*  =======================================玩家配置 ======================================= */
    /**次日领取钻石数量 */
    public static dayRewardNum = 100;
    public static readonly QQZoneParms = {
        APPID: 101559478,
        APPKey: "392e93c8c92957cdf4a01154c182783f",
        factoryId: "2511070469"
    }
    public static readonly shareBoyImg = [
        { id: "G4n9TQVtTL2l8Crq4EOiHg", url: "https://mmocgame.qpic.cn/wechatgame/zy7todtTIicqBzUvNWGmIf7YsPcaib47uiajic50e0BNPibPcsia6sQOyszEHYZVHVbpiaX/0" },
        { id: "PtCtubIjSwmRyvoJ0Y7vwQ", url: "https://mmocgame.qpic.cn/wechatgame/zy7todtTIicq6g8gD1riaOSvHHqxQuyibHeDtHyYT0sg0UQXYcJH6DUC2CiaPOkDnOAf/0" },
        { id: "PjiYHRpqTVW8xM6poVBKPQ", url: "https://mmocgame.qpic.cn/wechatgame/zy7todtTIicruu8kFn91wuhL1xgpH2sR2tavGNATXSPDfcSE8Cz0InKpGkS5bGKSq/0" }
    ]
    public static readonly shareGirlImg = [
        { id: "bbFUCxcVRcKsJYdWnXDlDQ", url: "https://mmocgame.qpic.cn/wechatgame/zy7todtTIicqQicKsbfkVMPiaphVH4fRKZL5MTaO0HlRRkZ5zVTQ4jG1ib88iauX3EiaBw/0" },
        { id: "9idxyOv7RN2cEDhdWoVYmw", url: "https://mmocgame.qpic.cn/wechatgame/zy7todtTIicoMLfAXIJKAHOYvcaCCugcRDvrWwoJXOoiaRE3ickjtw2ty4YAZLq96Ns/0" },

    ]
    public static readonly shareTypeRewards = [
        { info: "获得钻石x{0}", num: 10, reward: { type: "diamond", num: 20 }, double: 10 },
        { info: "无限短信{0}/{1}", num: 3, reward: { type: "gift", name: "MoreNote" } },
        { info: "秒回大礼包{0}/{1}", num: 4, reward: { type: "gift", name: "ImmediatelyReply" } },
        { info: "有钱任性礼包{0}/{1}", num: 3, reward: { type: "gift", name: "MoreMoney" } },
        { info: "免费解锁{0}/{1}", num: 1, reward: { type: "role", name: "MoreMoney" } },
    ]
    /**分享的文字 */
    public static shareMsg = {
        BoyMsg: ["@你 约到女神，只差这一步！！", "是朋友就帮我点一下，约到女神就靠你啦！", "女神约我去爬山，我要不要答应她？", "快来帮帮我！怎样才能约到心仪的她？！"],
        GirlMsg: ["@你 约到男神，只差这一步！！", "是朋友就帮我点一下，约到男神就靠你啦！", "男神约我去爬山，我要不要答应他？", "快来帮帮我！怎样才能约到心仪的他？！"]
    }

    public static readonly PlayerData = {
        GoldNum: 10, //初始钻石数
        NoteNum: 40, //短信恢复上限数
        NoteTime: 180, //短信刷新时间
        DefeatedTime: 3600, //失败惩罚时间
    }

    public static readonly TimeToGold = 20; //1小时 == 20 钻. 不满1小时 ，按1小时计算。

    public static readonly FirstRole = [6, 18];// [6, 17]; //第一次出现的角色，左边为玩家是女性， 右边为玩家是男性

    public static readonly InterstitialAdNum = 10; //插屏出现频率

    /*
        团队配置
    */
    public static readonly TeamConfig = {
        name: "蜜桃女友", //名字
        info: "私人恋爱专家", //简介
        weibo: "暂未开通=.=", //微博
        mail: "lianaiyouxi@outlook.com", //邮箱
    };

    /*
        摇一摇配置
    */
    public static readonly ShakeTime = 1800 //[0, 120, 1800, 7200, 14400, 21600, 21600, 21600, 21600, 21600, 21600, 21600, 21600, 21600, 21600, 21600, 21600, 21600, 21600];
    public static readonly ShakeRole = {
        BoyList: [2, 3, 4, 5, 7, 8, 9],
        GirlList: [16, 18, 19, 20, 21, 22, 23],
    };
    public static readonly ResetShake = 20; //重摇消耗钻石
    /*
        扫一扫配置
    */
    public static readonly ScanTime = 3600;
    public static readonly ScanRole = {
        BoyList: [
            { role_id: 10, diamond: 50 },
            { role_id: 11, diamond: 50 },
            { role_id: 12, diamond: 50 },
            { role_id: 13, diamond: 50 },
            { role_id: 14, diamond: 50 },
            { role_id: 15, diamond: 50 }
        ],
        GirlList: [
            { role_id: 24, diamond: 50 },
            { role_id: 25, diamond: 50 },
            { role_id: 26, diamond: 50 },
            { role_id: 27, diamond: 50 },
            { role_id: 28, diamond: 50 },
            { role_id: 29, diamond: 50 }
        ],
    };
    public static readonly ScanPos = [{ x: 37, y: 240 }, { x: 153, y: 162 }, { x: -15, y: 130 }, { x: 175, y: 37 }, { x: 153, y: -97 }, { x: 43, y: -164 }, { x: -91, y: -164 }, { x: -153, y: -33 }, { x: -154, y: 97 }, { x: -97, y: 223 }];

    /*
        谈话界面消费配置
    */
    public static readonly TalkExpend = {
        RemoveBad: 5, //去掉最差答案
        SecondReply: 3, //秒回
        ExpendNote: 1 //每次回复消耗的短信
    }
    public static readonly ShopConfig = [
        {
            index: 0,
            name: "看视频成功",

            image: "i_free.jpg",
            expend: { type: "video" },
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            index: 1,
            name: "男神驾到大礼包",
            image: "i_gift_2.jpg",
            expend: { type: "gift", point: "com.googleplay.wodenvyou.6", name: "MoreBoy" },
            reward: [
                { type: "role", list: [10, 11, 12, 13, 14, 15], sex: 0 }
            ],
        },
        {
            index: 2,
            name: "女神联盟大礼包",
            image: "i_gift_3.jpg",
            expend: { type: "gift", point: "com.googleplay.wodenvyou.5", name: "MoreGirl" },
            reward: [
                { type: "role", list: [24, 25, 26, 27, 28, 29], sex: 1 }
            ],
        },
        {
            index: 3,
            name: "有钱任性大礼包",
            image: "i_gift_4.jpg",
            expend: { type: "gift", point: "com.googleplay.wodenvyou.7", name: "MoreMoney" },
            reward: [
                { type: "gold", num: 200 },
                { type: "note", num: 9999 }
            ],
        },
        {
            index: 4,
            name: "秒回特权大礼包",
            image: "i_gift_1.jpg",
            expend: { type: "gift", point: "com.googleplay.wodenvyou.8", name: "ImmediatelyReply" },
            reward: [
                { type: "gold", num: 100 }
            ],
        },
        {
            index: 5,
            name: "10条短信",
            image: "i_note_1.jpg",
            expend: { type: "gold", num: 20 },
            reward: [
                { type: "note", num: 10 }
            ],
        },
        {
            index: 6,
            name: "35条短信",
            image: "i_note_2.jpg",
            expend: { type: "gold", num: 50 },
            reward: [
                { type: "note", num: 35 }
            ],
        },
        {
            index: 7,
            name: "80条短信",
            image: "i_note_3.jpg",
            expend: { type: "gold", num: 100 },
            reward: [
                { type: "note", num: 80 }
            ],
        },
        {
            index: 8,
            name: "60钻石",
            image: "i_diamond_1.jpg",
            expend: { type: "rmb", point: "com.googleplay.wodenvyou.1" },
            reward: [
                { type: "gold", num: 60 }
            ],
        },
        {
            index: 9,
            name: "200钻石",
            image: "i_diamond_2.jpg",
            expend: { type: "rmb", point: "com.googleplay.wodenvyou.2" },
            reward: [
                { type: "gold", num: 200 }
            ],
        },
        {
            index: 10,
            name: "380钻石",
            image: "i_diamond_3.jpg",
            expend: { type: "rmb", point: "com.googleplay.wodenvyou.3" },
            reward: [
                { type: "gold", num: 380 }
            ],
        },
        {
            index: 11,
            name: "1000钻石",
            image: "i_diamond_4.jpg",
            expend: { type: "rmb", point: "com.googleplay.wodenvyou.4" },
            reward: [
                { type: "gold", num: 1000 }
            ],
        },
        {
            index: 12,
            name: "看视频成功",
            image: "i_free.jpg",
            expend: { type: "video" },
            reward: [
                { type: "note", num: 5 }
            ],
        }
    ]
    /*
        微信商店界面配置
    */
    public static readonly WeChatShopConfig = [
        {
            index: 0,
            name: "杉杉+baby",
            image: "i_gift_3",
            expend: { type: "gold", num: 100, name: "MoreGirl1" },
            reward: [
                { type: "role", list: [27, 28], sex: 1, num: 1 }
            ],
        },
        {
            index: 1,
            name: "莎莎+高雯",
            image: "i_gift_2",
            expend: { type: "gold", num: 100, name: "MoreGirl2" },
            reward: [
                { type: "role", list: [26, 29], sex: 1, num: 1 }
            ],
        },
        {
            index: 2,
            name: "慧媛+joyjo",
            image: "i_gift_2",
            expend: { type: "gold", num: 100, name: "MoreGirl3" },
            reward: [
                { type: "role", list: [24, 25], sex: 1, num: 1 }
            ],
        },
        {
            index: 3,
            name: "鹿+都教授",
            image: "i_gift_2",
            expend: { type: "gold", num: 100, name: "MoreBoy1" },
            reward: [
                { type: "role", list: [13, 15], sex: 0, num: 1 }
            ],
        },
        {
            index: 4,
            name: "杨咩咩+都教授",
            image: "i_gift_2",
            expend: { type: "gold", num: 100, name: "MoreBoy2" },
            reward: [
                { type: "role", list: [12, 14], sex: 0, num: 1 }
            ],
        },
        {
            index: 5,
            name: "峰峰+包子",
            image: "i_gift_2",
            expend: { type: "gold", num: 100, name: "MoreBoy3" },
            reward: [
                { type: "role", list: [11, 10], sex: 0, num: 1 }
            ],
        },

        {
            index: 6,
            name: "10条短信",
            image: "i_note_1",
            expend: { type: "gold", num: 10 },
            reward: [
                { type: "note", num: 5, sex: 1, list: [] }
            ],
        },
        {
            index: 7,
            name: "5钻石",
            image: "i_diamond_1",
            expend: { type: "share", point: "com.yuema.lianai_01" },
            reward: [
                { type: "gold", num: 100, sex: 1, list: [] }
            ],
        },
        {
            index: 8,
            name: "看视频成功",
            image: "i_free.jpg",
            expend: { type: "video" },
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            index: 9,
            name: "看视频成功",

            image: "i_free.jpg",
            expend: { type: "video" },
            reward: [
                { type: "note", num: 3 }
            ],
        }
    ]
    /*
        红包成就配置
    */
    public static readonly AchievementConfig = [{
        index: 0,
        info: "发送短信数",
        Achievement: [{
            info: "低头党",
            title: "成功发送10条短信",
            condition: [
                { type: "consume_note_num", num: 10 }
            ],
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            info: "停不下来",
            title: "成功发送100条短信",
            condition: [
                { type: "consume_note_num", num: 100 }
            ],
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            info: "机不离手",
            title: "成功发送100条短信",
            condition: [
                { type: "consume_note_num", num: 1000 }
            ],
            reward: [
                { type: "gold", num: 10 }
            ],
        }
        ],
    },
    {
        index: 1,
        info: "失败次数",
        Achievement: [{
            info: "不怕，这点痛算什么！",
            title: "第一次攻略失败",
            condition: [
                { type: "defeated_num", num: 1 }
            ],
            reward: [
                { type: "gold", num: 10 }
            ],
        },
        {
            info: "不哭，给你爱的抱抱~",
            title: "第二次攻略失败",
            condition: [
                { type: "defeated_num", num: 2 }
            ],
            reward: [
                { type: "gold", num: 20 }
            ],
        },
        {
            info: "玻璃心",
            title: "失败次数达到4次",
            condition: [
                { type: "defeated_num", num: 4 }
            ],
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            info: "不再犹豫",
            title: "失败次数达到34次",
            condition: [
                { type: "defeated_num", num: 34 }
            ],
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            info: "勇敢的心",
            title: "失败次数达到68次",
            condition: [
                { type: "defeated_num", num: 68 }
            ],
            reward: [
                { type: "gold", num: 10 }
            ],
        },
        ],
    },
    {
        index: 2,
        info: "拥有密友数",
        Achievement: [{
            info: "拥有恋人力",
            title: "密友数达到3人",
            condition: [
                { type: "friend_num", num: 3 }
            ],
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            info: "恋爱的酸臭味",
            title: "密友数达到17人",
            condition: [
                { type: "friend_num", num: 17 }
            ],
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            info: "教科书式恋爱",
            title: "密友数达到34人",
            condition: [
                { type: "friend_num", num: 34 }
            ],
            reward: [
                { type: "gold", num: 10 }
            ],
        }
        ],
    },
    {
        index: 3,
        info: "使用去错功能",
        Achievement: [{
            info: "心疼自己",
            title: "成功去错10次",
            condition: [
                { type: "help_num", num: 10 }
            ],
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            info: "助攻小能手",
            title: "成功去错50次",
            condition: [
                { type: "help_num", num: 50 }
            ],
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            info: "神助攻",
            title: "成功去错100次",
            condition: [
                { type: "help_num", num: 100 }
            ],
            reward: [
                { type: "gold", num: 10 }
            ],
        }
        ],
    },
    {
        index: 4,
        info: "观看视频数",
        Achievement: [{
            info: "赞助商",
            title: "成功观看视频10次",
            condition: [
                { type: "video_num", num: 10 }
            ],
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            info: "广告狂人",
            title: "成功观看视频50次",
            condition: [
                { type: "video_num", num: 50 }
            ],
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            info: "av爱好者",
            title: "成功观看视频100次",
            condition: [
                { type: "video_num", num: 100 }
            ],
            reward: [
                { type: "gold", num: 10 }
            ],
        }
        ],
    },
    {
        index: 5,
        info: "攻略成功次数",
        Achievement: [{
            info: "祝贺！首次攻略成功！",
            title: "第一次攻略成功",
            condition: [
                { type: "succeed_num", num: 1 }
            ],
            reward: [
                { type: "gold", num: 10 }
            ],
        },
        {
            info: "干得漂亮！再次攻略！",
            title: "第二次攻略成功",
            condition: [
                { type: "succeed_num", num: 2 }
            ],
            reward: [
                { type: "gold", num: 20 }
            ],
        }
        ],
    },
    {
        index: 6,
        info: "完美攻略人数",
        Achievement: [{
            info: "愿得一人心",
            title: "完美攻略1人",
            condition: [
                { type: "perfect_num", num: 1 }
            ],
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            info: "重度强迫病患者",
            title: "完美攻略17人",
            condition: [
                { type: "perfect_num", num: 17 }
            ],
            reward: [
                { type: "gold", num: 5 }
            ],
        },
        {
            info: "处女座12级",
            title: "完美攻略34人",
            condition: [
                { type: "perfect_num", num: 34 }
            ],
            reward: [
                { type: "gold", num: 10 }
            ],
        }
        ],
    }
    ]

}
/** 请求路径 */
export interface UriInfo {
    uri: string;
    showLoad?: boolean;
    showLog?: boolean;
    /**是否透明 */
    loadOpact?: boolean;
}
export enum UriMap {
    Config,
    AdConfig,
    Census
}
export let URIID: { [key: number]: UriInfo } = {
    [UriMap.Config]: { uri: "app/config", showLog: true },
    [UriMap.AdConfig]: { uri: "app/adConfig", showLog: true },
    [UriMap.Census]: { uri: "addCustomEvent", showLog: true }
}

export interface CensusConfig {
    keyvalue: string;
}

export let CENSUSID: { [key: string]: CensusConfig } = {
    [Def.CensusEventUI.talk_help_begin]: {keyvalue:"start_takeoutanswer"},
    [Def.CensusEventUI.talk_help_end]: {keyvalue:"success_takeoutanswer"},

    [Def.CensusEventUI.recall_ui_begin]: {keyvalue:"start_recall"},
    [Def.CensusEventUI.recall_ui_end]: {keyvalue:"success_recall"},

    [Def.CensusEventUI.talk_second_begin]: {keyvalue:"start_replynow"},
    [Def.CensusEventUI.talk_second_end]: {keyvalue:"success_replynow"},

    
    [Def.CensusEventUI.showInfo_scan_begin]: {keyvalue:"start_looksecret"},
    [Def.CensusEventUI.showInfo_scan_end]: {keyvalue:"success_looksecret"},


    [Def.CensusEventUI.clearCd_scan_begin]: {keyvalue:"start_rescan"},
    [Def.CensusEventUI.clearCd_scan_end]: {keyvalue:"success_rescan"},


    [Def.CensusEventUI.start_shake_begin]: {keyvalue:"start_datenow"},
    [Def.CensusEventUI.start_shake_end]: {keyvalue:"success_datenow"},

    [Def.CensusEventUI.arriveToRoleUI]: {keyvalue:"arrive_datenow"},

    [Def.CensusEventUI.free_shake_begin]: {keyvalue:"start_reshake"},
    [Def.CensusEventUI.free_shake_end]: {keyvalue:"success_reshake"},


    [Def.CensusEventUI.fail_onreyue_begin]: {keyvalue:"start_redate"},
    [Def.CensusEventUI.fail_onreyue_end]: {keyvalue:"success_redate"},

    [Def.CensusEventUI.diamon_shop_begin]: {keyvalue:"start_freediamond"},
    [Def.CensusEventUI.diamon_shop_end]: {keyvalue:"success_freediamond"},
    
    [Def.CensusEventUI.note_shop_begin]: {keyvalue:"start_freemessage"},
    [Def.CensusEventUI.note_shop_end]: {keyvalue:"success_freemessage"},


    [Def.CensusEventUI.diamon_shop_three_begin]: {keyvalue:"start_triplediamond"},
    [Def.CensusEventUI.diamon_shop_three_end]: {keyvalue:"success_triplediamond"},

    [Def.CensusEventUI.note_shop_three_begin]: {keyvalue:"start_triplemessage"},
    [Def.CensusEventUI.note_shop_three_end]: {keyvalue:"success_triplemessage"},

    [Def.CensusEventUI.diamon_shop_three_arrive]: {keyvalue:"arrive_triplediamond"},
    [Def.CensusEventUI.note_shop_three_arrive]: {keyvalue:"arrive_triplemessage"},


    [Def.CensusEventUI.diamon_shop_three_nothinks]: {keyvalue:"clickcancel_triplediamond"},
    [Def.CensusEventUI.note_shop_three_nothinks]: {keyvalue:"clickcancel_triplemessage"},

    
    [Def.CensusEventUI.send_message_begin]: {keyvalue:"start_sendprocess"},
    [Def.CensusEventUI.send_message_end]: {keyvalue:"success_sendprocess"},

}





/** 广告视频 */
export enum AdStub {
    /**切换界面弹视频 */
    MainUI,
    /**去掉扣分答案 */
    Answe,
    /**撤回消息 */
    Return,
    /**秒回 */
    MiaoHui,
}

/** 广告Banner */
export enum AdBannerStub {
    /**主界面列表 */
    Mainlink,
    /** */
    Scan,
}

/** 广告插屏 */
export enum AdInsertStub {
    /**切换界面弹视频 */
    MainUI,
}


//所有的UI界面ID
export enum UIID {
    /**钻石不足 */
    DiamondLackUI,
    /**密友圈 */
    FriendCircleUI,
    /**好友详细资料 */
    FriendIntroUI,
    /**点击引导 */
    GuideUI,
    /**弹出礼包 */
    InterstitialAdUI,
    /**首界面 */
    LoadUI,
    /**失败界面 */
    LoseUI,
    /**主界面好友列表 */
    MainFriendListUI,
    /**主界面聊天列表 */
    MainLinkListUI,
    /**主界面设置 */
    MainSettingUI,
    /**主界面商店 */
    MainShopUI,
    /**主界面 */
    MainUI,
    /**短信弹出礼包 */
    NoteLackUI,
    /**红包弹窗 */
    RedPackUI,
    /**注册界面 */
    RegisterUI,
    /**攻略回调 */
    RoleIntroUI,
    /**扫一扫 */
    ScanUI,
    /**信息修改 */
    SettingPlayerUI,
    /**关于我们 */
    SettingTeamUI,
    /**摇一摇 */
    ShakeUI,
    /**分享弹窗 */
    SharePopUI,
    /**停止弹窗 */
    StopTalkUI,
    /**聊天帮助 */
    TalkHelpUI,
    /**聊天帮助 */
    TalkUI,
    /**新手引导 */
    TeachUI,
    /**toast */
    TipUI,
    /**钻石不足弹窗2 */
    WechatDiamonPop,
    /**短信不足弹窗2 */
    WechatNotePop,
    /**约成功了 */
    WinUI,
    /**撤回消息 */
    ReCallUI,
    /**看视频得钻石、短信 */
    PopAdSuccessUI,
}

/** UI配置结构体 */
export interface UIConf {
    prefab: string;
    calssName: string;
    preventTouch?: boolean;
    /**banner广告位 */
    bannerStub?: string;
    /**插屏广告位 */
    insertStub?: string
    zIndex: number;
}
export let UICF: { [key: number]: UIConf } = {
    [UIID.DiamondLackUI]: { prefab: "prefab/DiamondLackUI", calssName: "DiamondLackUI", zIndex: Def.LayerType.POP },
    [UIID.FriendCircleUI]: { prefab: "prefab/FriendCircleUI", calssName: "FriendCircleUI", zIndex: Def.LayerType.MIDPOP },
    [UIID.FriendIntroUI]: { prefab: "prefab/FriendIntroUI", calssName: "FriendIntroUI", zIndex: Def.LayerType.POP },
    [UIID.GuideUI]: { prefab: "prefab/GuideUI", calssName: "GuideUI", zIndex: Def.LayerType.POP },
    [UIID.InterstitialAdUI]: { prefab: "prefab/InterstitialAdUI", calssName: "InterstitialAdUI", zIndex: Def.LayerType.POP },
    [UIID.LoadUI]: { prefab: "prefab/LoadUI", calssName: "LoadUI", zIndex: Def.LayerType.POP },
    [UIID.LoseUI]: { prefab: "prefab/LoseUI", calssName: "LoseUI", zIndex: Def.LayerType.POP },
    [UIID.MainFriendListUI]: { prefab: "prefab/MainFriendListUI", calssName: "MainFriendListUI", zIndex: Def.LayerType.MID },
    [UIID.MainLinkListUI]: { prefab: "prefab/MainLinkListUI", calssName: "MainLinkListUI", zIndex: Def.LayerType.MID ,bannerStub: "MainLinkListUI"},
    [UIID.MainSettingUI]: { prefab: "prefab/MainSettingUI", calssName: "MainSettingUI", zIndex: Def.LayerType.MID },
    [UIID.MainShopUI]: { prefab: "prefab/MainShopUI", calssName: "MainShopUI", zIndex: Def.LayerType.MID },
    [UIID.MainUI]: { prefab: "prefab/MainUI", calssName: "MainUI", zIndex: Def.LayerType.MAIN },
    [UIID.NoteLackUI]: { prefab: "prefab/NoteLackUI", calssName: "NoteLackUI", zIndex: Def.LayerType.POP },
    [UIID.RedPackUI]: { prefab: "prefab/RedPackUI", calssName: "RedPackUI", zIndex: Def.LayerType.POP },
    [UIID.RegisterUI]: { prefab: "prefab/RegisterUI", calssName: "RegisterUI", zIndex: Def.LayerType.POP },
    [UIID.RoleIntroUI]: { prefab: "prefab/RoleIntroUI", calssName: "RoleIntroUI", zIndex: Def.LayerType.POP,bannerStub: "RoleIntroUI" },
    [UIID.ScanUI]: { prefab: "prefab/ScanUI", calssName: "ScanUI", zIndex: Def.LayerType.MIDPOP,bannerStub: "ScanUI" },
    [UIID.SettingPlayerUI]: { prefab: "prefab/SettingPlayerUI", calssName: "SettingPlayerUI", zIndex: Def.LayerType.MIDPOP },
    [UIID.SettingTeamUI]: { prefab: "prefab/SettingTeamUI", calssName: "SettingTeamUI", zIndex: Def.LayerType.MIDPOP },
    [UIID.ShakeUI]: { prefab: "prefab/ShakeUI", calssName: "ShakeUI", zIndex: Def.LayerType.MIDPOP ,bannerStub: "ShakeUI"},
    [UIID.SharePopUI]: { prefab: "prefab/SharePopUI", calssName: "SharePopUI", zIndex: Def.LayerType.POP },
    [UIID.StopTalkUI]: { prefab: "prefab/StopTalkUI", calssName: "StopTalkUI", zIndex: Def.LayerType.POP },
    [UIID.TalkHelpUI]: { prefab: "prefab/TalkHelpUI", calssName: "TalkHelpUI", zIndex: Def.LayerType.POP },
    [UIID.TalkUI]: { prefab: "prefab/TalkUI", calssName: "TalkUI", zIndex: Def.LayerType.TALK },
    [UIID.TeachUI]: { prefab: "prefab/TeachUI", calssName: "TeachUI", zIndex: Def.LayerType.TEACH },
    [UIID.TipUI]: { prefab: "prefab/TipUI", calssName: "TipUI", zIndex: Def.LayerType.POP },
    [UIID.WechatDiamonPop]: { prefab: "prefab/WechatDiamonPop", calssName: "WechatDiamonPop", zIndex: Def.LayerType.POP },
    [UIID.WechatNotePop]: { prefab: "prefab/WechatNotePop", calssName: "WechatNotePop", zIndex: Def.LayerType.POP },
    [UIID.WinUI]: { prefab: "prefab/WinUI", calssName: "WinUI", zIndex: Def.LayerType.POP },
    [UIID.ReCallUI]: { prefab: "prefab/ReCallUI", calssName: "ReCallUI", zIndex: Def.LayerType.POP },
    [UIID.PopAdSuccessUI]: { prefab: "prefab/PopAdSuccessUI", calssName: "PopAdSuccessUI", zIndex: Def.LayerType.POP },
}