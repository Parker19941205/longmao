import {Def} from "./Def"
export class AudioMgr {
    private static instance: AudioMgr = null;
    private audioID;
    public static getInstance(): AudioMgr {
        if (this.instance == null) {
            this.instance = new AudioMgr()
        }
        return this.instance;
    }
    playEffect(audioName, loop?, volume?) {
      
        let path = Def.AUDIO_DIR + audioName;
        cc.loader.loadRes(path, cc.AudioClip, (err, clip) => {
            if (err) {
                cc.error(err);
                return;
            }
            this.audioID = cc.audioEngine.play(clip, loop ? loop : false, volume ? volume : 1);
        });
        return this.audioID;
    }

    playLoadEffect(audioPath) {
        cc.loader.loadRes(audioPath, cc.AudioClip, (err, clip) => {
            if (err) {
                cc.error(err);
                return;
            }
            cc.audioEngine.play(clip, false, 1);
        });
    }
    pauseEffect(audioId) {
        if (audioId) {
            cc.audioEngine.pauseEffect(audioId);
        } else {
            cc.audioEngine.pauseEffect(this.audioID);
        }

    }
    resumeEffect(audioId) {
        if (audioId) {
            cc.audioEngine.resumeEffect(audioId);
        } else {
            cc.audioEngine.resumeEffect(this.audioID);
        }

    }
    resumeAllEffects() {
        cc.audioEngine.resumeAllEffects();
    }
    pauseAllEffects() {
        cc.audioEngine.pauseAllEffects();
    }
    stopEffect(audioId) {
        if (audioId) {
            cc.audioEngine.stopEffect(audioId);
        } else {
            cc.audioEngine.stopEffect(this.audioID);
        }

    }
    stopAllEffects() {
        cc.audioEngine.stopAllEffects();
    }

}

