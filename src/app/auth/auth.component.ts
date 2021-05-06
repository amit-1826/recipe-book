import { Component } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import { NotificationMsgService } from "../shared/notification-message.service";
import { AuthService } from "./auth.service";

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {    
    isLoginMode = false;
    showLoader = false;
    constructor(private authService: AuthService,
        private notificationMsgService: NotificationMsgService){}

    onModeSwitch() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm) {
        if (!authForm.valid) {
            return;
        }
        if(!this.isLoginMode) {
            this.signup(authForm);
        } else {
            this.login(authForm);
        }
        // authForm.reset();
    }

    login(authForm: NgForm) {
        this.showLoader = true;
        const email = authForm.value.email;
        const password = authForm.value.password;
        this.authService.login(email, password).subscribe(response => {
            this.showLoader = false;
            this.notificationMsgService.showSuccessNotification('Login success');
        }, error => {
            this.showLoader = false;
            this.notificationMsgService.errorHandler(error);
        })

    }

    signup(authForm: NgForm) {
        this.showLoader = true;
        const email = authForm.value.email;
        const password = authForm.value.password;
        this.authService.signUp(email, password).subscribe(response => {
            this.showLoader = false;
            this.notificationMsgService.showSuccessNotification('Sign-up success');
        }, error => {
            this.showLoader = false;
            this.notificationMsgService.errorHandler(error);
        })
    }
}