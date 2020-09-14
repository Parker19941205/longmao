export class GameData {
    public  static GatesData = null
    public  static AnisData = null
    public  static BulletsData = null
    public  static BatteryData = null
    public  static SignInData = null
    public  static uuid = "nouuid"

    public static loadDataFromFile(callback: Function) {
        var loadFileNum = 0

        // 关卡资源
        cc.loader.loadRes("gates", function (err, asset) {
            GameData.GatesData = asset.json // JSON.parse(asset.json);
            loadFileNum = loadFileNum + 1
            callback(loadFileNum)
            cc.loader.releaseAsset(asset)
        });

        // 动画资源
        cc.loader.loadRes("anis", function (err, asset) {
            GameData.AnisData = asset.json // JSON.parse(asset.json);
            loadFileNum = loadFileNum + 1
            callback(loadFileNum)
            cc.loader.releaseAsset(asset)
        });

        // 炮弹资源
        cc.loader.loadRes("bullets", function (err, asset) {
            GameData.BulletsData = asset.json // JSON.parse(asset.json);
            loadFileNum = loadFileNum + 1
            callback(loadFileNum)
            cc.loader.releaseAsset(asset)
        });

        // 炮台资源
        cc.loader.loadRes("battery", function (err, asset) {
            GameData.BatteryData = asset.json // JSON.parse(asset.json);
            loadFileNum = loadFileNum + 1
            callback(loadFileNum)
            cc.loader.releaseAsset(asset)
        });

        // 签到奖励
        cc.loader.loadRes("signIn", function (err, asset) {
            GameData.SignInData = asset.json // JSON.parse(asset.json);
            loadFileNum = loadFileNum + 1
            callback(loadFileNum)
            cc.loader.releaseAsset(asset)
        });

    }


    // 新用户全局唯一标识符
    public static makeUUid() {
        let localuuid = cc.sys.localStorage.getItem('uuid');
        this.uuid = localuuid;
        console.log("当前这个玩家的uuid========>",this.uuid)
        if(this.uuid == null || this.uuid == "nouuid" || this.uuid.length == 0){
            let uuid = this.uuidMake()
            console.log("生成的uuid========>",uuid)
            this.uuid = uuid

            cc.sys.localStorage.setItem('uuid', uuid);
        }
    }

    public static uuidMake() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
    
        var uuid = s.join("");
        return uuid;
    }



}