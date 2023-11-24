/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-23 16:52:28
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-26 16:56:14
 * @FilePath: /yangyang/assets/Scripts/ad/AdMgr.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, sys, __private, director } from 'cc';
import { DEBUG, WECHAT } from 'cc/env';
import { events } from '../enum/Enums';
import { Global } from '../Global';
import { WxPlatform } from './WxPlatform';

export class AdMgr {

    static bannerOn = false;

    static closeAd() {
        const system = sys.platform;

        switch (system) {

            case sys.Platform.WECHAT_GAME:
                WxPlatform.ins.hideBanner();
                this.bannerOn = false;
                break;
            case sys.Platform.BYTEDANCE_MINI_GAME:

                break;
            case sys.Platform.ANDROID:

                break;
        }
    }



    static showBanner() {
        const system = sys.platform;

        switch (system) {

            case sys.Platform.WECHAT_GAME:
                if (!this.bannerOn)
                    WxPlatform.ins.showBanner();
                break;
            case sys.Platform.BYTEDANCE_MINI_GAME:

                break;
            case sys.Platform.ANDROID:

                break;
        }

    }
    static showInterstial(delay = 0) {

        const system = sys.platform;

        switch (system) {

            case sys.Platform.WECHAT_GAME:
                WxPlatform.ins.showInterstitialAd(delay);

                break;
            case sys.Platform.BYTEDANCE_MINI_GAME:

                break;
            case sys.Platform.ANDROID:

                break;
        }

    }

    static showVideo(CB = null) {


        if (DEBUG) {
            CB && CB();
        }


        const system = sys.platform;

        switch (system) {

            case sys.Platform.WECHAT_GAME:
                /* ads here!! */
                Global.Pause();
                WxPlatform.ins.showRewardVideo((data) => {
                    //通过data判断激励视频广告是否加载成功、失败；判断是否中途退出还是完整播放
                    if (data == 1) {
                        CB & CB();
                        Global.Pause(false);
                        director.emit(events.Toast, "获取奖励成功");

                    } else {
                        Global.Pause(false);
                        director.emit(events.Toast, "获取奖励失败");
                    }

                })
                break;
            case sys.Platform.BYTEDANCE_MINI_GAME:

                break;
            case sys.Platform.ANDROID:

                break;
        }

    }


}

