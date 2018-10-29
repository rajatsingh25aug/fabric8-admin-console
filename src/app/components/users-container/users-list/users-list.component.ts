import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
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
export class UsersListComponent implements OnInit, OnChanges {

  @Input() users: User[];

  listConfig: ListConfig;
  /* Config Files starts */
  actionConfig: ActionConfig;
  actionsText: String = '';
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
      appliedFilters: []
    } as FilterConfig;
    this.toolbarConfig = {
      filterConfig: this.filterConfig,
      sortConfig: this.sortConfig
    } as ToolbarConfig;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.items = changes.users.currentValue;
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
      this.users.forEach((item) => {
        if (this.matchesFilters(item, filters)) {
          this.items.push(item);
        }
      });
    } else {
      this.items = this.users;
    }
    this.toolbarConfig.filterConfig.resultsCount = this.items.length;
  }

  // Handle filter changes
  filterChanged($event: FilterEvent): void {
    console.log(this.items);
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
      match = item.attributes.fullName.match(re) !== null;
    } else if (filter.field.id === 'address') {
      match = item.attributes.email.match(re) !== null;
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
}
