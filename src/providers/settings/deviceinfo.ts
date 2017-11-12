import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export enum ScreenTypeConst {
    PHONE  = 1,
    TABLET = 2,
    WEB    = 4
};

@Injectable()
export class DeviceInfo {

    screenHeight: number;
    screenWidth: number;
    screenType: ScreenTypeConst = ScreenTypeConst.WEB;

    constructor() {
        this.screenHeight = 0;
        this.screenWidth = 0;
    }
    // constructor(innerHeight: any, innerWidth: any, screenType: any) {
    //     this.screenHeight = innerHeight;
    //     this.screenWidth = innerWidth;
    //     this.screenType = screenType;
    //     if (innerWidth<768) {
    //        this.screenType = ScreenTypeConst.Phone;
    //     } else if (innerWidth<1200) {
    //         this.screenType = ScreenTypeConst.Tablet;
    //     } else {
    //         this.screenType = ScreenTypeConst.Web;
    //     }
    // }

    ScreenHeight() {
        return this.screenHeight;
    }

    ScreenWidth() {
        return this.screenWidth;
    }

    ScreenType() {
        return this.screenType;
    }

    setWidth(innerWidth: any) : void {
        this.screenWidth = innerWidth;
        if (innerWidth<768) {
           this.screenType = ScreenTypeConst.PHONE;
        } else if (innerWidth<1200) {
            this.screenType = ScreenTypeConst.TABLET;
        } else {
            this.screenType = ScreenTypeConst.WEB;
        }
    }

    setHeight(innerHeight: any) : void {
        this.screenHeight = innerHeight;
    }
}