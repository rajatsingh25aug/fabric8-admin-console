import { Component, OnInit, Input } from '@angular/core';
import { User } from 'ngx-login-client';
import { ListConfig } from 'patternfly-ng';
/*ToolBAR*/


import { Action } from 'patternfly-ng';
import { ActionConfig } from 'patternfly-ng';
import { Filter } from 'patternfly-ng';
import { FilterConfig } from 'patternfly-ng';
import { FilterField } from 'patternfly-ng';
import { FilterEvent } from 'patternfly-ng';
import { FilterType } from 'patternfly-ng';
import { SortConfig } from 'patternfly-ng';
import { SortField } from 'patternfly-ng';
import { SortEvent } from 'patternfly-ng';
import { ToolbarConfig } from 'patternfly-ng';
import { ToolbarView } from 'patternfly-ng';


/*toolBar Ends*/
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input() users: User[];

  listConfig: ListConfig;
  /* Config Files starts */
  actionConfig: ActionConfig;
  actionsText: String = '';
  allItems: any[];
  filterConfig: FilterConfig;
  filtersText: String = '';
  items: any[];
  isAscendingSort: Boolean = true;
  separator: Object;
  sortConfig: SortConfig;
  currentSortField: SortField;
  toolbarConfig: ToolbarConfig;
  /*Config Files Ends */

  ngOnInit(): void {
    this.allItems = [{
      name: 'Fred Flintstone',
      address: '20 Dinosaur Way, Bedrock, Washingstone',
      birthMonth: 'February',
      weekDay: 'Sunday',
    }, {
      name: 'John Smith',
      address: '415 East Main Street, Norfolk, Virginia',
      birthMonth: 'October',
      weekDay: 'Monday',
    }];
    this.items = this.allItems;
    this.filterConfig = {
      fields: [{
        id: 'name',
        title: 'Name',
        placeholder: 'Filter by Name...',
        type: FilterType.TEXT
      }, {
        id: 'address',
        title: 'Address',
        placeholder: 'Filter by Address...',
        type: FilterType.TEXT
      }] as FilterField[],
      resultsCount: this.items.length,
      appliedFilters: []
    } as FilterConfig;

    this.sortConfig = {
      fields: [{
        id: 'name',
        title: 'Name',
        sortType: 'alpha'
      }, {
        id: 'email',
        title: 'Email',
        sortType: 'alpha'
      }],
      isAscending: this.isAscendingSort
    } as SortConfig;

    this.toolbarConfig = {
      filterConfig: this.filterConfig,
      sortConfig: this.sortConfig
    } as ToolbarConfig;
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

   // Filter

   applyFilters(filters: Filter[]): void {
    this.items = [];
    if (filters && filters.length > 0) {
      this.allItems.forEach((item) => {
        if (this.matchesFilters(item, filters)) {
          this.items.push(item);
        }
      });
    } else {
      this.items = this.allItems;
    }
    this.toolbarConfig.filterConfig.resultsCount = this.items.length;
  }

  // Handle filter changes
  filterChanged($event: FilterEvent): void {
    this.filtersText = '';
    $event.appliedFilters.forEach((filter) => {
      this.filtersText += filter.field.title + ' : ' + filter.value + '\n';
    });
    this.applyFilters($event.appliedFilters);
  }

  matchesFilter(item: any, filter: Filter): boolean {
    let match = true;
    const re = new RegExp(filter.value, 'i');
    if (filter.field.id === 'name') {
      match = item.name.match(re) !== null;
    } else if (filter.field.id === 'address') {
      match = item.address.match(re) !== null;
    }
    return match;
  }

  matchesFilters(item: any, filters: Filter[]): boolean {
    let matches = true;
    filters.forEach((filter) => {
      if (!this.matchesFilter(item, filter)) {
        matches = false;
        return matches;
      }
    });
    return matches;
  }

  // Sort

  compare(item1: any, item2: any): number {
    let compValue = 0;
    if (this.currentSortField.id === 'name') {
      console.log(this.users.length);
      compValue = item1.name.localeCompare(item2.name);
    } else if (this.currentSortField.id === 'address') {
      compValue = item1.address.localeCompare(item2.address);
    }
    if (!this.isAscendingSort) {
      compValue = compValue * -1;
    }
    return compValue;
  }

  // Handle sort changes
  sortChanged($event: SortEvent): void {
    this.currentSortField = $event.field;
    this.isAscendingSort = $event.isAscending;
    this.items.sort((item1: any, item2: any) => this.compare(item1, item2));
  }


}
