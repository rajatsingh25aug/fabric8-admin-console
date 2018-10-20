import { Injectable, OnDestroy, Inject } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataStoreService } from 'src/app/services/data-store.service';
import { AUTH_API_URL } from 'ngx-login-client';

@Injectable({
  providedIn: 'root'
})
export class SearchUserService implements OnDestroy {

  private apiResult;
  private result_Subscription: Subscription;

  constructor(
    private http: HttpClient,
    private savedata: DataStoreService,
    @Inject(AUTH_API_URL) private authApiUrl: string
    ) {
  }

  public getusers(username: string = null) {
    if (username != null) {
      const readyURL = `${this.authApiUrl}search/users?q=${username}`;

      if (username !== '') {
        this.apiResult = this.http.get(readyURL);
        this.saveUser(this.apiResult);
      }
    }
  }
  private saveUser(api_result: Observable<any>) {
    this.result_Subscription = api_result.subscribe(
      res => {
        this.savedata.store_user(res.data);
      });
  }

  ngOnDestroy() {
    this.result_Subscription.unsubscribe();
  }
}
