import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from '../api/api';

export interface Icon {
    id: number;
    name: string;
    icon: string;
    isShow: boolean;
}

@Injectable()
export class SystemIcons {

    items: Icon[];

    constructor(public api: Api) {

    }

    initializeSystemIcons() {
        this.items = [
            {
                id: 1,
                name: "all-services",
                icon: "assets/imgs/AllServices.Icon.svg",
                isShow: true
            },
            {
                id: 2,
                name: "notification",
                icon: "assets/imgs/Notification.Icon.svg",
                isShow: true
            }
        ];
        
        return this.items;
    }

}