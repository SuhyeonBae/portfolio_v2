import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushNotificationComponent } from './push-notification/push-notification.component';
import { AddToHomeScreenComponent } from './add-to-home-screen/add-to-home-screen.component';



@NgModule({
  declarations: [PushNotificationComponent, AddToHomeScreenComponent],
  imports: [
    CommonModule
  ],
  exports: [PushNotificationComponent, AddToHomeScreenComponent]
})
export class PartialModule { }
