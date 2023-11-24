/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-21 16:12:45
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-26 17:24:02
 * @FilePath: /yangyang/assets/Scripts/ctrl/AdCtrl.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component } from 'cc';
import { DEBUG } from 'cc/env';
import { Tools } from '../utils/Tools';
const { ccclass, property } = _decorator;

@ccclass('AdCtrl')
export class AdCtrl extends Component {

    onEnable() {
        if (!DEBUG) {
            Tools.clearUI(this.node);
        }

    }



    onGo(event: Event, customEventData: string) {
        window.open(customEventData);
        Tools.clearUI(this.node);
    }


}

