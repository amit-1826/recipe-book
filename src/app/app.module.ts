import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ViewChildDirective } from './shared/viewchild-directive/viewchild.directive';
import { RecipesModule } from './modules/recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { appReducer } from './store/appReducer';
import { AuthEffect } from './modules/auth/store/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RecipesEffect } from './modules/recipes/store/recipes.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ViewChildDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    RecipesModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffect, RecipesEffect]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
