import { Component, OnInit, Input } from '@angular/core';
import { User } from 'ngx-login-client';
import { ListConfig } from 'patternfly-ng';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input() users: User[];

  listConfig: ListConfig;

  ngOnInit() {
    this.listConfig = {
      useExpandItems: true
    } as ListConfig;
  }

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

}
