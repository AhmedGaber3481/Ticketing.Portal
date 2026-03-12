import { CommonModule } from "@angular/common";
import { Toast, ToastType } from "../toaster.model";
import { ToastMessageComponent } from "../toast.message/toast.message";
import { Component } from "@angular/core";
import { ToasterService } from "../toaster.service";

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule, ToastMessageComponent],
  templateUrl: "./toast.notification.html"
})
export class ToastNotificationComponent {
  //private nextId = 1;

  constructor(public toasterService: ToasterService){
  }

  // addToast(type: ToastType, title: string, message: string): void {
  //   this.toasterService.addToast({
  //       id: this.nextId++,
  //       type,
  //       title,
  //       message,
  //     });
  // }

  removeToast(id: any): void {
    this.toasterService.removeToast(id);
  }
}