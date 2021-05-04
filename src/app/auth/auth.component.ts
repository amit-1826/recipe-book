import { Component } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {    
    isLoginMode = false;
    constructor(private authService: AuthService){}

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
            this.login();
        }
        // authForm.reset();
    }

    login() {

    }

    signup(authForm: NgForm) {
        const email = authForm.value.email;
        const password = authForm.value.password;
        this.authService.signUp(email, password).subscribe(response => {
            console.log('res', response);
        }, error => {
            console.log('error: ', error);
        })
    }
}