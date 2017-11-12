import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import { TranslateService } from '@ngx-translate/core';
import { Api } from '../api/api';


export interface EMService {
    title: string;
    description: string;
    image: string;
}

@Injectable()
export class EMServices {

    services: EMService[];
    items = [];
    selectedItem: string = "";

    constructor(translate: TranslateService, public api: Api ) {
        translate.get(["EM_SERVICE1_TITLE",
        "EM_SERVICE1_DESCRIPTION",
        "EM_SERVICE2_TITLE",
        "EM_SERVICE2_DESCRIPTION",
        "EM_SERVICE3_TITLE",
        "EM_SERVICE3_DESCRIPTION",
        "EM_SERVICE4_TITLE",
        "EM_SERVICE4_DESCRIPTION",
        "EM_SERVICE5_TITLE",
        "EM_SERVICE5_DESCRIPTION",
        "EM_SERVICE6_TITLE",
        "EM_SERVICE6_DESCRIPTION",
      ]).subscribe(
        (values) => {
          console.log('Loaded values', values);
          this.services = [
            {
              title: values.EM_SERVICE1_TITLE,
              description: values.EM_SERVICE1_DESCRIPTION,
              image: 'assets/img/ica-slidebox-img-1.png',
            },
            {
              title: values.EM_SERVICE2_TITLE,
              description: values.EM_SERVICE2_DESCRIPTION,
              image: 'assets/img/ica-slidebox-img-2.png',
            },
            {
              title: values.EM_SERVICE3_TITLE,
              description: values.EM_SERVICE3_DESCRIPTION,
              image: 'assets/img/ica-slidebox-img-3.png',
            },
            {
              title: values.EM_SERVICE4_TITLE,
              description: values.EM_SERVICE4_DESCRIPTION,
              image: 'assets/img/ica-slidebox-img-3.png',
            },
            {
              title: values.EM_SERVICE5_TITLE,
              description: values.TUTORIAL_SLIDE5_DESCRIPTION,
              image: 'assets/img/ica-slidebox-img-3.png',
            },
            {
              title: values.EM_SERVICE6_TITLE,
              description: values.EM_SERVICE6_DESCRIPTION,
              image: 'assets/img/ica-slidebox-img-3.png',
            }
          ];
        });
    }

    initializeItems() {
        this.items = [];
        this.services.forEach(service => {
            console.log("[EMServices] - [initializeItems] - push item: " + service.title);
            this.items.push(service.title);
        });
        return this.items;
        /*this.items = [
          'Amsterdam',
          'Bogota',
          'Buenos Aires',
          'Cairo',
          'Dhaka',
          'Edinburgh',
          'Geneva',
          'Genoa',
          'Glasglow',
          'Hanoi',
          'Hong Kong',
          'Islamabad',
          'Istanbul',
          'Jakarta',
          'Kiel',
          'Kyoto',
          'Le Havre',
          'Lebanon',
          'Lhasa',
          'Lima',
          'London',
          'Los Angeles',
          'Madrid',
          'Manila',
          'New York',
          'Olympia',
          'Oslo',
          'Panama City',
          'Peking',
          'Philadelphia',
          'San Francisco',
          'Seoul',
          'Taipeh',
          'Tel Aviv',
          'Tokio',
          'Uelzen',
          'Washington'
        ];*/
    }
    
    getItems(searchTerm) {
        // Reset items back to all of the items
        this.initializeItems();    
    
        // if the value is an empty string don't filter the items
        if (searchTerm && searchTerm.trim() != '') {
          return this.items = this.items.filter((item) => {
            return (item.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          })
        }
        else {
            return [];
        }
    }

    getSelectedItem() {
        return this.selectedItem;
    }

    doSelectItem(item) {
        this.selectedItem = item;
    }

}