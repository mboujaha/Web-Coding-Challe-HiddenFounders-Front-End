import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthGuardService} from './services/authGuard.service';
import {PreferredComponent} from './shops-list/preferred/preferred.component';
import {NearbyComponent} from './shops-list/nearby/nearby.component';
import {PreferredShopsGuardService} from './services/preferredShopsGuard.service';
/*
 the app-route-module defines the route for the entire application.
 Application of the guards to protects the urls.
*/
const appRoutes: Routes = [
  {path: '', redirectTo: '/shops', pathMatch: 'full'},
  {
    path: 'shops', component: NearbyComponent, children: [
    {path: 'nearby', canActivate: [PreferredShopsGuardService], component: NearbyComponent, pathMatch: 'full'}
  ]
  },
  {
    path: 'shops/preferred',
    canActivate: [PreferredShopsGuardService],
    component: PreferredComponent,
    pathMatch: 'full'
  },
  {path: 'login', canActivate: [AuthGuardService], component: LoginComponent, pathMatch: 'full'},
  {path: 'register', canActivate: [AuthGuardService], component: RegisterComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouteModule {
}
