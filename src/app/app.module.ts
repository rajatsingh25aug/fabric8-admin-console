<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AUTH_API_URL, AuthenticationService, SSO_API_URL, REALM, WIT_API_PROXY, AuthInterceptor, UserService } from 'ngx-login-client';
=======
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import {
  AUTH_API_URL,
  AuthenticationService,
  SSO_API_URL,
  REALM,
  WIT_API_PROXY,
  AuthInterceptor,
  UserService
} from 'ngx-login-client';
>>>>>>> Code Refactoring

import {
  AppComponent
} from './app.component';
import {
  LoginComponent
} from './components/login/login.component';
import {
  Broadcaster,
  Logger
} from 'ngx-base';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  HomeComponent
} from './components/home/home.component';
import {
  PageNotFoundComponent
} from './components/layout/page-not-found/page-not-found.component';
import {
  HeaderComponent
} from './components/layout/header/header.component';
import {
  UsersContainerComponent
} from './components/users-container/users-container.component';
import {
  UsersListComponent
} from './components/users-container/users-list/users-list.component';
import {
  UserStore
} from './store/user.store';
import {
  SearchBarComponent
} from './components/search-bar/search-bar.component';
import {
  ListModule,
  ToolbarModule,
  FilterModule,
  ToastNotificationModule
} from 'patternfly-ng';
import {
  FormsModule
} from '@angular/forms';
import {
  ADMIN_API_URL
} from './shared/admin-api';
import { environment } from '../../src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    UsersContainerComponent,
    UsersListComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ListModule,
    FilterModule,
    FormsModule,
    ToolbarModule,
    ToastNotificationModule
  ],
  providers: [
    AuthenticationService,
    UserService,
    Logger,
    Broadcaster,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: AUTH_API_URL,
      useValue: environment.authUrl
    },
    {
      provide: SSO_API_URL,
      useValue: environment.ssoUrl
    },
    {
      provide: WIT_API_PROXY,
      useValue: environment.witUrl
    },
    {
      provide: ADMIN_API_URL,
      useValue: environment.adminUrl
    },
    {
      provide: REALM,
      useValue: 'realm'
    },
    UserStore
<<<<<<< HEAD
=======
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
>>>>>>> Using Admin Console API
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
