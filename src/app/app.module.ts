import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeService } from './services/recipe.service';
import { ShoppingListService } from './services/shopping-list.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthComponent } from './modules/auth/auth.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AuthInterceptorService } from './modules/auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { ViewChildDirective } from './shared/viewchild-directive/viewchild.directive';
import { RecipesModule } from './modules/recipes/recipes.module';
import { ShoppingModule } from './modules/shopping-list/shopping.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    AuthComponent,
    ViewChildDirective
  ],
  entryComponents: [
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    SimpleNotificationsModule.forRoot(),
    RecipesModule,
    ShoppingModule,
    SharedModule
  ],
  providers: [RecipeService, ShoppingListService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
