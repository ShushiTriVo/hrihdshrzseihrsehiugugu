import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { Geolocation, PositionError, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/debounceTime';

import { DeviceInfo, EMServices, GoogleMaps, Locations } from '../../providers/providers';
// import { EMServices, GoogleMaps, Locations } from '../../providers/providers';

import { SelectServicePage } from '../select-service/select-service'; 


declare var google;

export interface Icon {
  id: number;
  name: string;
  icon: string;
  isShow: boolean;
}

export interface SlideService {
  title: string;
  name: string;
  icon: string;
  isChecked: boolean;
  image: string;
  description: string;
}

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  @ViewChild('ggmap') mapElement: ElementRef;
  @ViewChild(Slides) slides: Slides;

  searchControl: FormControl;
  holderText: string = "Bạn cần sửa gì?";
  emServiceSelected: any;
  jobs: string = "it";
  level: number = 3;
  map: any;

  servicesBarItems: Icon[] = [
    {
      id: 0,
      name: "all-services",
      icon: "./assets/imgs/AllServices.Icon.svg",
      isShow: true
    },
    {
      id: 1,
      name: "air-conditioner",
      icon: "./assets/imgs/AirConditioner.Orange.svg",
      isShow: false
    },
    {
      id: 2,
      name: "washing-machine",
      icon: "./assets/imgs/WashingMachine.LightGreen.svg",
      isShow: false
    },
    {
      id: 3,
      name: "notification",
      icon: "./assets/imgs/Notification.Icon.svg",
      isShow: false
    }
  ];

  serviceSlideList: SlideService[] = [
    {
      title: "Hướng dẫn",
      name: "help",
      icon: "",
      isChecked: false,
      image: "",
      description: "Hướng dẫn sử dụng"
    },
    {
      title: "Máy lạnh",
      name: "air-conditioner",
      icon: "",
      isChecked: false,
      image: "",
      description: "Dịch vụ sửa chữa máy lạnh"
    },
    {
      title: "Máy giặt",
      name: "washing-machine",
      icon: "",
      isChecked: false,
      image: "",
      description: "Dịch vụ sửa chữa máy giặt"
    },
    {
      title: "Thông báo",
      name: "notification",
      icon: "",
      isChecked: false,
      image: "",
      description: "Thông báo từ hệ thống"
    }
  ];

  showServiceSlide: boolean = true;
  //isShowQuickClick: boolean = true;

  screenType: number = 1;
  serviceSlideTop: number;
  serviceSlideHeight: number;
  bottomBarTop: number;
  bottomBarHeight: number;

  seachingFull: boolean = false;
  currentPosition: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public emDataServices: EMServices,
    public geolocation: Geolocation,
    public maps: GoogleMaps,
    public locations: Locations,
    public deviceInfo: DeviceInfo
  ) {
    this.searchControl = new FormControl();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    // calculate the service slide position
    this.serviceSlideTop = Math.round(this.deviceInfo.ScreenHeight() * 6 / 10);
    this.serviceSlideHeight = Math.round(this.deviceInfo.ScreenHeight() * 3 / 10);

    // calculate the bottom bar position
    this.bottomBarTop = Math.round(this.deviceInfo.ScreenHeight() * 9 / 10);
    this.bottomBarHeight = Math.round(this.deviceInfo.ScreenHeight() / 10);

    this.screenType = this.deviceInfo.ScreenType();

    // this.systemIcons.initializeSystemIcons();
    this.servicesBarItems.forEach(element => {
      console.log("[MainPage] [ionViewDidLoad]: item.icon = " + element.icon);
    });
    this.platform.ready().then(() => {
      let mapLoaded = this.maps.init(this.mapElement.nativeElement);
      let locationsLoaded = this.locations.load();
      
      Promise.all([
        mapLoaded,
        locationsLoaded
      ]).then((result) => {

        let locations = result[1];

        for(let location of locations){
            this.maps.addMarker(location.latitude, location.longitude);
        }

      });

      
      this.setFilteredItems();
      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        console.log("[MainPage] [ionViewDidLoad] implement later... " );        
  
      });
    });   
    console.log("[MainPage] [ionViewDidLoad] device resolution: (witdh: " 
      + this.deviceInfo.ScreenWidth() + ", height: " + this.deviceInfo.ScreenHeight() + ")");   
    console.log("[MainPage] [ionViewDidLoad]: screen type: " + this.deviceInfo.ScreenType());
    console.log("[MainPage] [ionViewDidLoad]: serviceSlideTop: " + this.serviceSlideTop + " serviceSlideHeight: "
      + this.serviceSlideHeight);
  }

  clearSelectedService() {
    this.emServiceSelected = "";
  }

  resetSelectedService() {
    this.emServiceSelected = this.emDataServices.getSelectedItem();
  }

  setFilteredItems() {
    var dataService = this.emDataServices.getSelectedItem(); 
    if (dataService != "") {
      this.emServiceSelected = this.emDataServices.getSelectedItem();
    }
  }

  searchService() {
    this.navCtrl.setRoot(SelectServicePage);
  }

  hideServiceSlide() {
    console.log("[MainPage] [hideServiceSlide]: stub...");
    this.showServiceSlide = !this.showServiceSlide;
    this.addServiceButtonToMenuBar();    
  }

  addServiceButtonToMenuBar() {

  }

  // isShowQuickClick() {
  //   let i = this.getCurrentSlide();
  //   return !this.serviceSlideList[i].isChecked;
  // }

  addToServicesBar() {
    console.log("[MainPage] [addBottomMenu]: stub...");
    //this.isShowQuickClick = !this.isShowQuickClick;
    let i = this.getCurrentSlide();
    if (!this.serviceSlideList[i].isChecked) {
      this.servicesBarItems[i].isShow = true;      
    }
    else {
      this.servicesBarItems[i].isShow = false;
    }
    this.serviceSlideList[i].isChecked = !this.serviceSlideList[i].isChecked;
  }
  searchingZoomOut() {
    this.seachingFull = true;
  }

  searchingZoomIn() {
    this.seachingFull = false;
  }

  logoClicked() {
    console.log("[MainPage] [logoClicked] ...");
  }

  servicesBarItemClicked(serviceName: any) {
    if (serviceName == "all-services") {
      if (this.servicesBarItems[0].isShow) {
        this.showServiceSlide = !this.showServiceSlide;
      }
    } else if (serviceName == "notification") {
      if (this.servicesBarItems[1].isShow) {
        this.showServiceSlide = !this.showServiceSlide;
      }
    }
  }

  getCurrentSlide() {
    return this.slides.getActiveIndex();
  }

  gotoSlide(slideIndex: any) {
    this.slides.slideTo(slideIndex, 500);
  }

  gotoNextSlide() {
    console.log("[MainPage] [gotoNextSlide] ...");
    let currentIndex = this.getCurrentSlide();
    if (currentIndex < 3) {
      this.gotoSlide(currentIndex + 1);
    }
  }

  gotoPrevSlide() {
    console.log("[MainPage] [gotoPrevSlide] ...");
    let currentIndex = this.getCurrentSlide();
    if (currentIndex > 0) {
      this.gotoSlide(currentIndex - 1);
    }
  }
}
