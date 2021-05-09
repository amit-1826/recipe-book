import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationsService } from "angular2-notifications";

@Injectable({providedIn: 'root'})
export class NotificationMsgService {

    constructor(private notificationsService: NotificationsService) {

    }

    showErrorNotification(message: string, extraOptions?: any) {
        this.notificationsService.error(
            'Error', message,  extraOptions || {
                timeOut: 3000,
                showProgressBar: false,
                pauseOnHover: false,
                clickToClose: true
              }
        )
    }

    showSuccessNotification(message: string, extraOptions?: any) {
        this.notificationsService.success(
            'Success', message,  extraOptions || {
                timeOut: 3000,
                showProgressBar: false,
                pauseOnHover: false,
                clickToClose: true
              }
        )
    }

    errorHandler(error: any) {
        if (error) {
            if (error.error && error.error.message) {
                this.showErrorNotification(error.error.message);
                return;
            } else if (error.error && error.error.error && error.error.error.message) {
                this.showErrorNotification(error.error.error.message);
                return;
            }
            this.showErrorNotification(error);
        }

    }
}