import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppHeaderComponent} from './app-header/app-header.component';
import {AppRouteModule} from './app-route.module';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from './services/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AuthGuardService} from './services/authGuard.service';
import {PreferredComponent} from './shops-list/preferred/preferred.component';
import {NearbyComponent} from './shops-list/nearby/nearby.component';
import {ShopService} from './services/shop.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PreferredShopsGuardService} from './services/preferredShopsGuard.service';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    LoginComponent,
    RegisterComponent,
    PreferredComponent,
    NearbyComponent
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    InfiniteScrollModule

  ],
  providers: [AuthenticationService, CookieService, AuthGuardService, ShopService, PreferredShopsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
