import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../services/data-store.service';
import { SearchUserService } from '../../services/search-user.service';
import { ListConfig } from '/home/rsinghmn/angular/fabric8-admin-console/node_modules/patternfly-ng';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  users;
  items: any[];
  listConfig: ListConfig;
  constructor(
    private store: DataStoreService,
    private searchuserservices: SearchUserService,
    private router: Router
  ) { }
  sortedArray: any;
  sort(sortBy: string, order: string) {
    if (order === 'desc') {
      this.items.sort(function(a, b) {
        return b.attributes[sortBy].localeCompare(a.attributes[sortBy], 'en', {sensitivity: 'base'}); // descending
      });
    } else if (order === 'asc') {
      this.items.sort(function(a, b) {
        return a.attributes[sortBy].localeCompare(b.attributes[sortBy], 'en', {sensitivity: 'base'}); // descending
      });
    }
  }
  profile() {
    // this.users = username;
    // return this.users;
    this.router.navigate(['profile']);
  }
  ngOnInit() {
    this.store.users.subscribe(users => this.items = users);
    this.listConfig = {
      useExpandItems: true
    } as ListConfig;
  }
}
