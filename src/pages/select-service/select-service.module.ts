import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectServicePage } from './select-service';

@NgModule({
  declarations: [
    SelectServicePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectServicePage),
  ],
  exports: [
    SelectServicePage
  ]
})
export class SelectServicePageModule {}
