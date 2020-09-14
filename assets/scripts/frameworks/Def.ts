
export class Def {
   public static readonly STATE_REPLY = 1;
   public static readonly STATE_WAIT_REPLY = -2;
   public static readonly STATE_WAIT = -3;
   public static readonly STATE_DEFEAT = -4;
   public static readonly STATE_END = -5;

   public static readonly INFO_START = 1; //开场简介
   public static readonly INFO_CONTINUE = 2; //继续简介
   public static readonly INFO_DEFEAT = 3; //失败后简介
   public static readonly INFO_NEXT = 4; //开启一下段对话简介
   public static readonly INFO_SHOW = 5; //开启一下段对话简介

   public static readonly SCREEN_HEIGHT = 800;
   public static readonly SCREEN_WIDTH = 480;

   public static readonly PREFAB_UI_DIR = "prefab/";

   public static readonly AUDIO_DIR = "audio/"
   public static readonly LayerType = {
      ROOT: 0,
      MAIN: 1,
      TEACH: 2,
      TALK: 3,
      MID: 4,
      MIDPOP: 5,
      POP: 6
   }

   public static readonly ShareType = {
      DIAMONED: 0,
      NOTE: 1,
      SECOND: 2,
      MOREMONEY: 3,
      SCANROLE: 4,
   }

   public static readonly ListenerType = {
      ROLE_TALK_REPLY: "ROLE_TALK_REPLY",
      PLAYER_TALK_REPLY: "PLAYER_TALK_REPLY",
      UPDATE_ROLE_LOVER: "UPDATE_ROLE_LOVER",
      UPDATE_RED_PACKET_STATE: "UPDATE_RED_PACKET_STATE",
      ADD_ROLE: "ADD_ROLE",
      ROLE_SKULL: "ROLE_SKULL",
      UPDATE_RESTITEM: "UPDATE_RESTITEM",
      UPDATE_FRIEND_TALK_NUM: "UPDATE_FRIEND_TALK_NUM",
      UPDATE_FRIEND_TALK: "UPDATE_FRIEND_TALK",
      UPDATE_NOTE: "UPDATE_NOTE",
      UPDATE_DIAMOND: "UPDATE_DIAMOND",
      INSUFFICINET_NOTE: "INSUFFICINET_NOTE",
      INSUFFICINET_DIAMOND: "INSUFFICINET_DIAMOND",
      UPDATE_FUN: "UPDATE_FUN",
      REFRESH_TOP_TITLE: "REFRESH_TOP_TITLE",
      REFRESH_NICKNAME: "REFRESH_NICKNAME",
      QUERY_SHARE: "QUERY_SHARE",
      UPDATE_SHARE: "UPDATE_SHARE",
      REFRESH_BOTTOM: "REFRESH_BOTTOM",
      HideLod: "HideLod",
      ResizeBanner: "ResizeBanner",
      UpdateShopUIPos: "UpdateShopUIPos",
   }

   public static readonly videoType = {
      signget: "签到领取",
      qiqiugift: "气球礼包",
      buyhighbullet: "购买高级子弹",
      upbullet: "升级子弹",
      guajishouyi: "挂机收益",
      video_offline: "离线收益",
      video_battery: "更换炮台免费金币",
      video_rebirth: "失败界面",
      video_score: "结算界面双倍",
   }

   public static readonly insertType = {
      parseui_insert: "暂停界面插屏",
      signui_insert: "签到界面插屏",
      resultui_insert: "结算界面插屏",
   }


   public static readonly bannerType = {
      banner_main: "主界面",
      qiqiugift: "气球礼包",
      buyhighbullet: "购买高级子弹",
      upbullet: "升级子弹",
      guajishouyi: "挂机收益",
      video_offline: "离线收益",
      video_battery: "更换炮台免费金币",
      video_rebirth: "失败界面",
      video_score: "结算界面双倍",
   }





   public static readonly insetVideoType = {
      click_reply: "点击回复按钮",
   }


   public static readonly PoolNodePrefab = [
      "MainUI", "MainLinkListUI", "ScanUI", "ShakeUI", "TalkUI", "TeachUI"
   ]



   // 统计保存在本地的字段
   public static readonly userStepEventID = {
      user_step: "user_step",
      user_system: "user_system",
      character: "character_new",
      iap: "iap",
      abtest:"abtest",
   }

   public static readonly userStepUploadValue = {
      choosegender:"choosegender",
      step_startgame: "step_startgame",
      step_chat: "step_chat",
      step_reply: "step_reply",
      changegender: "changegender",
      seconddayreward: "seconddayreward",
      unlocktotal:"unlocktotal",
      datesuccess:"datesuccess",
      datefail:"datefail",
      takeoutanswer:"takeoutanswer",
      recall:"recall",
      shake:"shake",
      scan:"scan",
      scantimes:"scantimes",
      shaketimes:"shaketimes",
      replynow:"replynow",
      recallname:"recallname",
      redate:"redate",
      takeoutanswername:"takeoutanswername",
      looksecret:"looksecret",
      unlock:"unlock",
      score:"score",
      scan_diamondunlock:"scan_diamondunlock",
      shake_unlocksuccess:"shake_unlocksuccess",
      shake_unlockfail:"shake_unlockfail",
      paycharacterbag:"paycharacterbag",
      daysuser:"daysuser",
   }

   public static readonly videoAbUploadValue = {
      ad_users_doublesignin:"ad_users_doublesignin",
      ad_times_doublesignin:"ad_times_doublesignin",
      ad_users_balloon:"ad_users_balloon",
      ad_times_balloon:"ad_times_balloon",
      ad_users_doublehangup:"ad_users_doublehangup",
      ad_times_doublehangup:"ad_times_doublehangup",
      ad_users_doubleoffline:"ad_users_doubleoffline",
      ad_times_doubleoffline:"ad_times_doubleoffline",
      ad_users_hangupwindow:"ad_users_hangupwindow",
      ad_times_hangupwindow:"ad_times_hangupwindow",
      ad_users_buff:"ad_users_buff",
      ad_times_buff:"ad_times_buff",
      ad_users_upgrade:"ad_users_upgrade",
      ad_times_upgrade:"ad_times_upgrade",
      ad_users_bullet:"ad_users_bullet",
      ad_times_bullet:"ad_times_bullet",
      ad_users_battery:"ad_users_battery",
      ad_times_battery:"ad_times_battery",
      ad_users_rebirth:"ad_users_rebirth",
      ad_times_rebirth:"ad_times_rebirth",
      ad_users_score:"ad_users_score",
      ad_times_score:"ad_times_score",
      step_startgame:"step_startgame",
      step_changebattery:"step_changebattery",
      upgrade_cold:"upgrade_cold",    
      upgrade_grapeshot:"upgrade_grapeshot",
      upgrade_bomb:"upgrade_bomb",    
      upgrade_guard:"upgrade_guard",    
      upgrade_fullscreen:"upgrade_fullscreen",  
      purchase_users_bullet:"purchase_users_bullet",
      purchase_users_fullscreen:"purchase_users_fullscreen",
      purchase_times_bullet:"purchase_times_bullet",
      purchase_times_fullscreen:"purchase_times_fullscreen",
      balloon_start_gift1:"balloon_start_gift1",
      balloon_success_gift1:"balloon_success_gift1",
      balloon_start_gift2:"balloon_start_gift2",
      balloon_success_gift2:"balloon_success_gift2",

   }



   






  public static readonly CensusEventUI = {
   free_shake_begin: "重新摇一摇开始播放",
   ad_users_doublesignin: "重新摇一摇播放成功",

   talk_second_begin: "对话秒回开始播放",
   talk_second_end: "对话秒回播放成功",

   talk_help_begin: "去掉扣分选项开始播放",
   talk_help_end: "去掉扣分选项播放成功",


   diamon_shop_begin: "商店加钻石开始播放",
   diamon_shop_end: "商店加钻石播放成功",


   note_shop_begin: "商店加短信开始播放",
   note_shop_end: "商店加短信播放成功",

   diamon_shop_three_begin: "三倍领取钻石开始播放",
   diamon_shop_three_end: "三倍领取钻石播放成功",

   note_shop_three_begin: "三倍领取短信开始播放",
   note_shop_three_end: "三倍领取短信播放成功",

   diamon_shop_three_arrive: "到达三倍钻石界面",
   note_shop_three_arrive: "到达三倍短信界面",

   diamon_shop_three_nothinks: "三倍钻石界面点击”不了谢谢“次数",
   note_shop_three_nothinks: "三倍短信界面点击”不了谢谢“次数",

   start_shake_begin: "摇一摇开约开始播放",
   start_shake_end: "摇一摇开约播放成功",

   recall_ui_begin: "撤回开始播放",
   recall_ui_end: "撤回播放成功",

   showInfo_scan_begin: "扫一扫界面看资料开始播放",
   showInfo_scan_end: "扫一扫界面看资料播放成功",


   clearCd_scan_begin: "扫一扫清除时间开始播放",
   clearCd_scan_end: "扫一扫清除时间播放成功",

   arriveToRoleUI: "到达立即约TA界面",

   fail_onreyue_begin: "角色失败界面立即重约开始播放",
   fail_onreyue_end: "角色失败界面立即重约播放成功",


   send_message_begin: "第4和8条信息后视频广告开始播放",
   send_message_end: "第4和8条信息后视频广告播放成功",


}



}

