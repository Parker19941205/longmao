export class GameData {
    public  static GatesData = null
    public  static AnisData = null
    public  static BulletsData = null
    public  static BatteryData = null
    public  static SignInData = null



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








}