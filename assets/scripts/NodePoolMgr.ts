import { NodePool } from "./ResTools/NodePool";

export default class NodePoolMgr {
    private static instance: NodePoolMgr = null;
    private nodePool: Map<string, NodePool> = new Map();
    private audioID;
    public static getInstance(): NodePoolMgr {
        if (this.instance == null) {
            this.instance = new NodePoolMgr()
        }
        return this.instance;
    }
    public creatreNodePool(key: string, node?: cc.Node, path?: string, prefab?: cc.Prefab, callback?: Function) {
        let flyTipsPool = new NodePool();
        if (node) {
            flyTipsPool.init(node, (error: Error, pool: NodePool) => {
                if (error) {
                    return;
                }
                if (pool == null) {
                    return;
                }
                this.nodePool.set(key, pool)
                if (callback) {
                    callback(pool)
                }
            })
        } else if (prefab) {
            flyTipsPool.init(prefab, (error: Error, pool: NodePool) => {
                if (error) {
                    return;
                }
                if (pool == null) {
                    return;
                }
                this.nodePool.set(key, pool)
                if (callback) {
                    callback(pool)
                }
            })
        } else {
            flyTipsPool.init(path, (error: Error, pool: NodePool) => {
                if (error) {
                    return;
                }
                if (pool == null) {
                    return;
                }
                this.nodePool.set(key, pool)
                if (callback) {
                    callback(pool)
                }
            })
        }

    }
    public getNodePool(key: string, node?: cc.Node, path?: string): NodePool {
        if (!this.nodePool.has(key)) {
            this.creatreNodePool(key, node, path);
        }
        return this.nodePool.get(key)
    }
    public getPrefabNodePool(key: string, prefab?: cc.Prefab): NodePool {
        //cc.log("nodePool===========>",this.nodePool)
        if (!this.nodePool.has(key)) {
            //cc.log("进来了======》")
            this.creatreNodePool(key, null, null, prefab);
        }
        return this.nodePool.get(key)
    }
}