import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthenticationService, AUTH_API_URL, SSO_API_URL, WIT_API_PROXY, REALM } from 'ngx-login-client';
import { Broadcaster } from 'ngx-base';
import { HttpClient } from 'selenium-webdriver/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ AuthenticationService, Broadcaster,
        { provide: AUTH_API_URL, useValue: 'https://auth.prod-preview.openshift.io/api/' },
      { provide: SSO_API_URL, useValue: 'https://sso.prod-preview.openshift.io/api/' },
      // { provide: WIT_API_PROXY, useValue: 'https://prod-preview.openshift.io/api/' },
      { provide: REALM, useValue: 'realm' },
      {provide: HttpClient}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
