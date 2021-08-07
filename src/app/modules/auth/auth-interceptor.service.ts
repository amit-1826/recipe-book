import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { exhaustMap, map, take } from "rxjs/operators";
import { AppState } from "src/app/store/appReducer";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService,
        private store: Store<AppState>) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.store.select('auth').pipe(take(1), map((authState) => { return authState.user }), exhaustMap((user) => {
            console.log('ueser after ainterceptor: ', user);


            // here interceptor was being used for login and signup as well so that does not required auth param
            if (!user) {
                return next.handle(req);
            }

            const modifiedRequest = req.clone({
                params: new HttpParams().set('auth', user.token)
            })
            return next.handle(modifiedRequest);
        }))
        /*  return this.authService.user.pipe(take(1), exhaustMap(user => {
 
             // here interceptor was being used for login and signup as well so that does not required auth param
             if (!user) {
                 return next.handle(req);
             }
 
             const modifiedRequest = req.clone({
                 params: new HttpParams().set('auth', user.token)
             })
             return next.handle(modifiedRequest);
         })) */
    }


}