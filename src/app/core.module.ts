import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./modules/auth/auth-interceptor.service";
import { RecipeService } from "./services/recipe.service";

@NgModule({
    providers: [
        RecipeService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ]
})
export class CoreModule { }