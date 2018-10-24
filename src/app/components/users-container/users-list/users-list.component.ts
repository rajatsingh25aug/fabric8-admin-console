import { Component, OnInit, Input } from '@angular/core';
import { User } from 'ngx-login-client';
import { ListConfig } from '/home/rsinghmn/angular/fabric8-admin-console/node_modules/patternfly-ng';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input() users: User[];

  items: User[];
  listConfig: ListConfig;

  ngOnInit() {
    this.items = this.users;

    this.listConfig = {
      useExpandItems: true
    } as ListConfig;
  }

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

}
