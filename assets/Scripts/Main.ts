
import { _decorator, Component, Node, game, CameraComponent, CCString, director, Canvas, instantiate, Vec3, view } from 'cc';

import { AssetType, Clips, Props, scenes, ui } from './enum/Enums';
import { GameConfig } from './GameConfig';
import { Global } from './Global';
import { AudioMgr } from './manager/AudioMgr';
import { EnergyMgr } from './manager/EnergyMgr';
import { GameMgr } from './manager/GameMgr';
import { LevelMgr } from './manager/LevelMgr';
import { PoolMgr } from './manager/PoolMgr';
import ResMgr from './manager/ResMgr';
import { Tools } from './utils/Tools';

const { ccclass, property } = _decorator;
@ccclass('adConfig')
export class adConfig {
    @property
    platform = "platform";
    @property
    id = 0
    @property({ type: CCString })
    bannerId: string[] = [];
    @property({ type: CCString })
    intersitialId: string[] = [];
    @property({ type: CCString })
    videoId: string[] = [];
    @property({ type: CCString })
    customId: string[] = [];
}

@ccclass('Main')
export class Main extends Component {
    @property({ type: Vec3, tooltip: "start Cube Euler", group: Props.Setting, displayOrder: 0 })
    startEuler: Vec3 = new Vec3(0, 45);
    @property({ tooltip: "start Energy Set up", group: Props.Setting, displayOrder: 0 })
    startEnergy = 6;
    @property({ tooltip: "add Energy Set up", group: Props.Setting, displayOrder: 0 })
    addEnergy = 6;
    @property({ tooltip: "max Level Set up", group: Props.Setting, displayOrder: 0 })
    maxLevel = 10;
    @property({ type: adConfig, tooltip: "Id for banner", group: Props.AdConfig, displayOrder: 1 })
    Platforms: adConfig[] = [];
    /**
     * @scene {0} for cubes
     * @scene {1} for shelf
     */

    @property({ type: CameraComponent, group: Props.Comps })
    uiCam: CameraComponent = null;

    @property({ type: CameraComponent, group: Props.Comps })
    sceneCam: CameraComponent = null;

    public static ins: Main = null;
    public level: LevelMgr = null;
    public game: GameMgr = null;
    public canvas: Node = null;

    /**
   * @layer {0} for baseUI
   * @layer {1} for popWin
   * @layer {2} for globalToast
   */
    private layer: Node[] = [];
    private scene: Node[] = [];


    onLoad() {
        /* set normal performance */
        game.frameRate = 60;
        this.setting();
        /* detect language environment */
        Global.en = Tools.isEn();
        Global.runtime = true;

    }

    async start() {
        this.initUI();
        /* load game Res */
        await this.loadRes();
        this.initScene();
        /* init game managers||components */
        this.initMgr();
        /* show homeView UI */
        ResMgr.ins.getUI(ui.HomeView);
    }

    initUI() {
        const scene = director.getScene();
        this.canvas = scene.getComponentInChildren(Canvas).node;
        for (var i = 0; i <= 5; i++) {
            /* if layer0 exist, we clone it, otherwise create a new one */
            const node = this.layer[0] ? instantiate(this.layer[0]) : Tools.createUI();
            node.name = "layer" + i;
            node.parent = this.canvas;
            Global.layer[i] = this.layer[i] = node;
        }
    }

    initScene() {
        const CubeScene = new Node(scenes.CubeScene);
        CubeScene.parent = this.node;
        this.scene[0] = Global.scene[0] = CubeScene;
        const CubeNode = new Node(scenes.CubeNode);
        CubeNode.setParent(CubeScene);
        const shelfNode = PoolMgr.ins.getNode(scenes.ShelfScene, this.node);
        shelfNode.active = false;
        const width = view.getVisibleSize();
        let ratio = (width.y / width.x) / (1334 / 750);
        if (ratio < 0.9) ratio = 0.9;
        if (ratio > 1.25) ratio = 1.25;
        shelfNode.setPosition(0, -4.6, -16 * ratio);
        this.scene[1] = Global.scene[1] = shelfNode;
    }


    /* starts game, also your get get levels by using levelmgr */
    async startGame() {
        if (EnergyMgr.ins.changeEnergy()) {
            this.scene[1].active = true;
            AudioMgr.ins.playSound(Clips.btn);
            await LevelMgr.ins.loadLevel(Global.level);
        }
    }

    /* load game res */
    async loadRes() {
        await ResMgr.ins.loadBundle(1, 0.1);
        await ResMgr.ins.loadRes(1, AssetType.Prefab, 0.6)
        await ResMgr.ins.loadRes(1, AssetType.Sound, 0.16)
        await ResMgr.ins.loadRes(1, AssetType.Json, 0.16)

    }

    /* init setting */
    setting() {
        GameConfig.addEnergy = this.addEnergy;
        GameConfig.startEnergy = this.startEnergy;
        GameConfig.maxLevel = this.maxLevel;
    }

    /* init level,game,audio managers */
    initMgr() {
        Main.ins = this;
        LevelMgr.ins.init(this.scene[0].getChildByName(scenes.CubeNode), this.startEuler);
        GameMgr.ins.init(this.sceneCam, this.scene[0], this.scene[1]);
        AudioMgr.ins.playMusic(Clips.bgm);
    }



}

