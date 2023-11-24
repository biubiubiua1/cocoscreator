/*
 * @Author: iwae iwae@foxmail.com
 * @Date: 2022-09-02 10:22:44
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-26 15:21:36
 * @FilePath: /98KPhysic/assets/src/enum/Enums.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AudioClip, JsonAsset, Prefab, SpriteAtlas } from "cc";



/* for ui prefabs config */
export const ui = ({
    HomeView: { name: 'HomeView', layer: 1, clear: true },
    ResultView: { name: 'ResultView', layer: 2, clear: false },
    TouchView: { name: 'TouchView', layer: 3, clear: false },
    EnergyView: { name: 'EnergyView', layer: 4, clear: true },
    ToastView: { name: 'ToastView', layer: 5, clear: true },

})

export const scenes = {
    ShelfScene: "ShelfScene",
    CubeScene: "CubeScene",
    CubeNode: "CubeNode",
}

export const events = {
    rollBg: "rollBg",
    catWatch: "catWatch",
    Toast: "toast",
    Anm: "anm",
}

export default class texts {

}

export const Effects = {
    Star: "StarEffect",
}

/* keys for storage */
export const Key = {
    Pause: "Pause",
    Timer: "Timer",
    Level: "Level",
    Energy: "Energy",
    Star: "Star",
    LastTime: "LastTime",
}


export const Props = {
    Scenes: "Scenes",
    Layers: "Layers",
    Comps: "Components",
    Setting: "Setting",
    View: "View",
    AdConfig: "AdConfig",
    Ad: "Advertisement",

}

export const Clips = {
    bgm: "bgm",
    counter: "counter",
    btn: "btn",
    touch: "touch",
    gold: "gold",
    reward: "reward",
    merge: "merge",
    win: "win",
    lose: "lose",
}

/**
 * assettypes and paths
 */
export const AssetType = ({
    Prefab: { type: Prefab, path: "Preload/Prefabs/" },
    Json: { type: JsonAsset, path: "Preload/Jsons/" },
    Sound: { type: AudioClip, path: "Preload/Clips/" },
    Atlas: { type: SpriteAtlas, path: "Preload/Atlas/" }
})




