

String.prototype.format = function() {
    if(arguments.length == 0) return this;
    var param = arguments[0];
    var s = this;
    if(typeof(param) == 'object') {
     for(var key in param)
      s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
     return s;
    } else {
     for(var i = 0; i < arguments.length; i++)
      s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
     return s;
    }
}
 
export class Utils{
    public static loadText = function(textPath, callback) {
        cc.loader.loadRes(textPath, function(err, file) {
            callback(file.text);
        });
    }
    
    public static loadJson = function(jsonPath, callback) {
        cc.loader.loadRes(jsonPath, function(err, jsonAsset) {
            callback(jsonAsset.json);
        });
    }
    
    
    
    public static loadSprite = function(path, sprite) {
        cc.loader.loadRes(path, cc.SpriteFrame, function(err, spriteFrame) {
            // cc.log("进来了====>",path)
            // cc.log("进来了err====>",err)
            // cc.log("sprite====>",sprite)
            if (!err) {
                sprite.spriteFrame = spriteFrame
            }
        })
    }
    
    public static loadButtonSprite = function(path, button) {
        cc.loader.loadRes(path, cc.SpriteFrame, function(err, spriteFrame) {
            if (!err) {
                button.normalSprite = spriteFrame
                button.pressedSprite = spriteFrame
                button.hoverSprite = spriteFrame
            }
        })
    }


    public static loadAtlasSprite = function(atlas, name, sprite) {
        cc.loader.loadRes(atlas, cc.SpriteAtlas, function(err, atlas) {
            var frame = atlas.getSpriteFrame(name);
            sprite.spriteFrame = frame;
        });
    }
    
    public static loadPrefab = function(path, callback, target) {
        cc.loader.loadRes(path, function(err, prefab) {
            if (!err) {
                var ui = cc.instantiate(prefab);
                callback(ui, target)
            }
        })
    }
    
    /**
     * 动态加载龙骨
     * @param node  龙骨组件的节点
     * @param path              龙骨地址
     * @param armatureName      Armature名称
     * @param newAnimation      Animation名称
     * @param completeCallback  动画播放完毕的回调
     * @param playTimes         播放次数 -1是根据龙骨文件 0五险循环 >0是播放次数
     */
    public static loadDragonBones2 = function(node, path, callback?:any, armatureName = "armatureName", newAnimation = "Animation1", completeCallback = null, playTimes = 0) {
        cc.loader.loadResDir(path, function(err, assets) {
            // cc.log("err=======>",err)
            // cc.log("length=======>",assets.length)
            // cc.log("path=======>",path)

            // cc.log("armatureName=======>",err)
            // cc.log("newAnimation=======>",newAnimation)





            if (err || assets.length <= 0) return;
            let animationDisplay:dragonBones.ArmatureDisplay = node.addComponent(dragonBones.ArmatureDisplay)
            assets.forEach(asset => {
                if (asset instanceof dragonBones.DragonBonesAsset) {
                    animationDisplay.dragonAsset = asset;
                }
                if (asset instanceof dragonBones.DragonBonesAtlasAsset) {
                    animationDisplay.dragonAtlasAsset = asset;
                }
            });
            animationDisplay.armatureName = armatureName;
            animationDisplay.playAnimation(newAnimation, playTimes);
            //animationDisplay.playAnimation("run",0);
            //animationDisplay.enableBatch = true

            if(callback){
                //cc.log("加载回调=========>")
                callback()
            }



            if (completeCallback) {
                animationDisplay.addEventListener(dragonBones.EventObject.COMPLETE, completeCallback);
            }
    
        })
    }
    



    public static loadNodeDragonBones = function(node,  callback?:any, newAnimation = "Animation1", completeCallback = null, playTimes = 0) {

            let animationDisplay:dragonBones.ArmatureDisplay = node.getComponent(dragonBones.ArmatureDisplay)
            //animationDisplay.armatureName = armatureName;
            animationDisplay.playAnimation(newAnimation, playTimes);
            //animationDisplay.playAnimation("run",0);
            //animationDisplay.enableBatch = true

            if(callback){
                //cc.log("加载回调=========>")
                callback()
            }


            if (completeCallback) {
                animationDisplay.addEventListener(dragonBones.EventObject.COMPLETE, completeCallback);
            }
    
 
    }

















    public static loadDragonBones = function(node, path,callback?:any, newAnimation = "Animation1", completeCallback?:any,playTimes = 0){
        cc.loader.loadResDir(path,cc.Asset,null,(err, resource)=>{
            //console.log("资源：",resource);
            //let node:cc.Node = new cc.Node();

            // console.log("path====>",path)
            // console.log("newAnimation====>",newAnimation)
            // console.log("playTimes====>",playTimes)


            let armatureDisplay:dragonBones.ArmatureDisplay = node.addComponent(dragonBones.ArmatureDisplay);
            armatureDisplay.dragonAsset = resource[0];
            armatureDisplay.dragonAtlasAsset = resource[3];
            armatureDisplay.armatureName = "armatureName";
            armatureDisplay.playAnimation(newAnimation,playTimes);

            //node.x = 0;
            //node.y = 0;
            //this.node.addChild(node);
            if(callback){
                //cc.log("加载回调=========>")
                callback()
            }
            if (completeCallback) {
                //cc.log("监听播放完成回调=========>")
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, completeCallback);
            }
        });
    }


    public static reloadDragonBones = function(node, path,callback?:any, newAnimation = "Animation1", completeCallback?:any){
        cc.loader.loadResDir(path,cc.Asset,null,(err, resource)=>{
            //console.log("资源：",resource);
            //let node:cc.Node = new cc.Node();
            let armatureDisplay:dragonBones.ArmatureDisplay = node.getComponent(dragonBones.ArmatureDisplay);
            armatureDisplay.dragonAsset = resource[0];
            armatureDisplay.dragonAtlasAsset = resource[3];
            armatureDisplay.armatureName = "armatureName";
            armatureDisplay.playAnimation(newAnimation,0);

            //node.x = 0;
            //node.y = 0;
            //this.node.addChild(node);
            if(callback){
                cc.log("加载回调=========>")
                callback()
            }
            if (completeCallback) {
                cc.log("回调=========>")
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, completeCallback);
            }
        });
    }








    
    public static loadAnimationClip = function(path, node) {
        cc.loader.loadRes(path, function(err, clip) {
            node.getComponent(cc.Animation).addClip(clip, "anim");
        });
    }
    
    public static releaseRes = function(resName, resType) {
        if (resType) {
            cc.loader.releaseRes(resName, resType);
        } else {
            cc.loader.releaseRes(resName);
        }
    }
    
    public static releaseAsset = function(asset) {
        cc.loader.releaseAsset(asset);
    }
    
    public static relasePrefab = function(prefabPath, noRes) {
        var deps = cc.loader.getDependsRecursively(prefabPath);
        if (noRes) {
            //部分共享的资源，不希望它们被释放，可以将这个资源从依赖列表中删除
            for (var i = 0; i < noRes.length; i++) {
                var index = deps.indexOf(noRes[i]._uuid);
                if (index !== -1)
                    deps.splice(index, 1);
            }
        }
        cc.loader.release(deps);
    }
}


 