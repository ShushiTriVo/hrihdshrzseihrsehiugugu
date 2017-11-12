import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EMServices } from '../../providers/data/em-services';
import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-select-service',
  templateUrl: 'select-service.html',
})
export class SelectServicePage{
    
    items: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public emDataService: EMServices) {
        this.items = emDataService.initializeItems();
    }

    ionViewDidLoad() {
        console.log('[SelectServicePage] loading page...');
      }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.items = this.emDataService.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    selectItem(item: any) {
        console.log("[SelectServicePage] - [selectItem]: item = " + item);
        this.emDataService.doSelectItem(item);
        // this.navCtrl.setRoot(MainPage);
        this.navCtrl.pop();
    }
}