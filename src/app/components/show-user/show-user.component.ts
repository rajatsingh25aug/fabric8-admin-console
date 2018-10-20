import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../services/data-store.service';
import { SearchUserService } from '../../services/search-user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  users;
  constructor(
    private store: DataStoreService,
    private searchuserservices: SearchUserService,
    private router: Router
  ) { }
  sortedArray: any;
  sort(sortBy: string, order: string) {
    if (order === 'desc') {
      this.users.sort(function(a, b) {
        return b.attributes[sortBy].localeCompare(a.attributes[sortBy], 'en', {sensitivity: 'base'}); // descending
      });
    } else if (order === 'asc') {
      this.users.sort(function(a, b) {
        return a.attributes[sortBy].localeCompare(b.attributes[sortBy], 'en', {sensitivity: 'base'}); // descending
      });
    }
  }
  profile1(username) {
    // this.router.navigate(['profile']);
    this.users = username;
    return this.users;
  }
  ngOnInit() {
    this.store.users.subscribe(users => this.users = users);
  }

}