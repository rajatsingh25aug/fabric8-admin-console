import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AUTH_API_URL, SSO_API_URL, WIT_API_PROXY, REALM, UserService, AuthenticationService } from 'ngx-login-client';
import { ADMIN_API_URL } from '../shared/admin-api';
import { Broadcaster, Logger } from 'ngx-base';
import { Router } from '@angular/router';
import { WindowService } from './window.service';
import { empty } from 'rxjs';

// describe('LoginService', () => {
//     const authService: jasmine.SpyObj<AuthenticationService> = jasmine.createSpyObj
//     ('AuthenticationService', ['getToken', 'logIn', 'isLoggedIn', 'onLogIn', 'logout']);
//     // authService.logIn.and.returnValue(true);

//   beforeEach(async() => {
//     TestBed.configureTestingModule({
//     imports: [HttpClientTestingModule],
//     providers: [
//       { provide: AUTH_API_URL, useValue: 'https://auth.example.com/api/' },
//       { provide: SSO_API_URL, useValue: 'https://sso.example.com/auth/api/' },
//       { provide: WIT_API_PROXY, useValue: 'https://wit.example.com/api/'},
//       { provide: ADMIN_API_URL, useValue: 'https://admin.example.com/api/'},
//       { provide: REALM, useValue: 'realm' },
//       Broadcaster,
//       Logger,
//       {provide: AuthenticationService, useValue: authService},
//       {
//         provide: Router
//       },
//       LoginService,
//       WindowService
//     ]
//   });
// });
//   it('should be created', () => {
//     const service: LoginService = TestBed.get(LoginService);
//     expect(service).toBeTruthy();
//   });
//   it('should handle new login', () => {
//     const loginService: jasmine.SpyObj<LoginService> = TestBed.get(LoginService);
//     const windowService: jasmine.SpyObj<WindowService> = TestBed.get(WindowService);
//     // spyOn(windowService, 'getNativeWindow').and.returnValue({
//     //     location: {
//     //       search: '?token_json=some_token'
//     //     }
//     //   });
//     // const router: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['url', 'navigateByUrl']);
//     // router.url.and.returnValue({
//     //   location: {
//     //     search: '?error=some_error&token_json=some_token'
//     //   }
//     // });
//     // authService.getToken.and.returnValue('some_token');
//      window.location.search = '?token_json=some_token';
//     // const originalUrl: string = router.url;
//     // authService.getToken();
//     // expect(authService.getToken).toBeUndefined();
//     loginService.login();

//      expect(authService.logIn).toHaveBeenCalledWith('some_token');
//     // router.navigateByUrl(originalUrl);
//     //  expect(router.navigateByUrl).toHaveBeenCalledWith(originalUrl);
//   });
//   // it('should handle existing Login', () => {

//   // });
// });

describe('LoginService', () => {
  let service: LoginService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  const authServiceSpy = jasmine.createSpyObj('AuthenticationService',
      [ 'logIn', 'logout', 'onLogIn', 'isLoggedIn' ]
  );

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [
              LoginService,
              { provide: AuthenticationService, useValue: authServiceSpy },
              { provide: Router, useValue: routerSpy },
              { provide: AUTH_API_URL, useValue: 'https://auth.example.com/auth/api/'},
              { provide: SSO_API_URL, useValue: 'https://sso.example.com/auth/api/'},
              { provide: WIT_API_PROXY, useValue: 'https://wit.example.com/api/'},
              { provide: ADMIN_API_URL, useValue: 'https://admin.example.com/api/'},
              { provide: REALM, useValue: 'realm'},
              Broadcaster,
              Logger,
          ]
      });
      service = TestBed.get(LoginService);
  });

  it('should be createable', () => {
      expect(service).toBeTruthy();
  });

  describe('Login method', () => {
      it('should call logIn its an existing login', () => {
          spyOn(service, '_search').and.returnValue('&test1=test1&token_json=TOKEN');
          service._search();
          service.login();
          expect(authServiceSpy.logIn).toHaveBeenCalled();
      });
      it('should call isLoggedIn and onLogIn when its a new login', () => {
          spyOn(service, '_search').and.returnValue('?error=some_error');
          service._search();
          authServiceSpy.isLoggedIn.and.returnValue(true);
          service.login();
          expect(authServiceSpy.isLoggedIn).toHaveBeenCalled();
          expect(authServiceSpy.onLogIn).toHaveBeenCalled();
      });
  });
});
