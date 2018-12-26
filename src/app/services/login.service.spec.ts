
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AUTH_API_URL, SSO_API_URL, WIT_API_PROXY, REALM, UserService, AuthenticationService } from 'ngx-login-client';
import { ADMIN_API_URL } from '../shared/admin-api';
import { Broadcaster, Logger } from 'ngx-base';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('LoginService', () => {
  beforeEach(() => {
     TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      AuthenticationService,
      Broadcaster,
      { provide: AUTH_API_URL, useValue: 'https://auth.example.com' },
      { provide: SSO_API_URL, useValue: 'https://sso.example.com' },
      { provide: WIT_API_PROXY, useValue: 'https://wit.example.com' },
      { provide: REALM, useValue: 'realm' },
    HttpClient,
    HttpHandler,
    {provide: Router}
    ]
  });

});

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
  it('should redirect to Auth', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service.redirectToAuth).toBe('test');
  });
});
