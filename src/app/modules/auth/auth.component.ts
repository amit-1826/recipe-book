import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { NotificationsService } from "angular2-notifications";
import { Subscription } from "rxjs";
import { AppState } from "src/app/store/appReducer";
import { AlertComponent } from "../../shared/alert/alert.component";
import { NotificationMsgService } from "../../shared/notification-message.service";
import { ViewChildDirective } from "../../shared/viewchild-directive/viewchild.directive";
import { AuthService } from "./auth.service";
import * as AuthActions from '../auth/store/auth.actions'

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = false;
    showLoader = false;
    private alertSubscription: Subscription;

    @ViewChild(ViewChildDirective, { static: false }) viewChildRef: ViewChildDirective
    constructor(private authService: AuthService,
        private notificationMsgService: NotificationMsgService,
        private router: Router,
        private store: Store<AppState>,
        private componentFactoryResolver: ComponentFactoryResolver) { }

    onModeSwitch() {
        this.isLoginMode = !this.isLoginMode;
    }

    ngOnInit() {
        this.store.select('auth').subscribe(authState => {
            console.log('after login in auth component', authState);

            this.showLoader = authState.loading;
            if (authState.authError) {
                this.notificationMsgService.errorHandler(authState.authError);
            }
        })
    }

    onSubmit(authForm: NgForm) {
        if (!authForm.valid) {
            return;
        }
        if (!this.isLoginMode) {
            this.signup(authForm);
        } else {
            this.login(authForm);
        }
        authForm.reset();
    }

    login(authForm: NgForm) {
        this.showLoader = true;
        const email = authForm.value.email;
        const password = authForm.value.password;
        this.store.dispatch(new AuthActions.LoginStart({ email, password }));
        /* this.authService.login(email, password).subscribe(response => {
            this.showLoader = false;
            this.notificationMsgService.showSuccessNotification('Login success');
            this.router.navigate(['/recipes']);
        }, error => {
            this.showLoader = false;
            this.notificationMsgService.errorHandler(error);
            this.handleError('Error in login');
        }) */

    }

    signup(authForm: NgForm) {
        this.showLoader = true;
        const email = authForm.value.email;
        const password = authForm.value.password;
        this.store.dispatch(new AuthActions.SignUpStart({ email, password }));
        /*  this.authService.signUp(email, password).subscribe(response => {
             this.showLoader = false;
             this.notificationMsgService.showSuccessNotification('Sign-up success');
             this.router.navigate(['/recipes']);
         }, error => {
             this.showLoader = false;
             this.notificationMsgService.errorHandler(error);
             this.handleError('Error in sign up');
         }) */
    }

    private handleError(message: string) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const componentInstanceHost = this.viewChildRef.viewContainerRef;
        componentInstanceHost.clear();
        const componentRef = componentInstanceHost.createComponent(componentFactory);
        componentRef.instance.message = message;
        this.alertSubscription = componentRef.instance.close.subscribe(() => {
            this.alertSubscription.unsubscribe()
            componentInstanceHost.clear();
        })

    }

    ngOnDestroy() {
        if (this.alertSubscription) {
            this.alertSubscription.unsubscribe()
        }
    }
}