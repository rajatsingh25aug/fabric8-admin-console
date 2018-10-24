import { Component, OnInit } from '@angular/core';
import { Filter } from '/home/rsinghmn/angular/fabric8-admin-console/node_modules/patternfly-ng';
import { FilterConfig } from '/home/rsinghmn/angular/fabric8-admin-console/node_modules/patternfly-ng';
import { FilterField } from '/home/rsinghmn/angular/fabric8-admin-console/node_modules/patternfly-ng';
import { FilterEvent } from '/home/rsinghmn/angular/fabric8-admin-console/node_modules/patternfly-ng';
import { FilterType } from '/home/rsinghmn/angular/fabric8-admin-console/node_modules/patternfly-ng';
import { DataStoreService } from '../../services/data-store.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private store: DataStoreService) {
  }
  allItems: any[];
  items: any[];
  filterConfig: FilterConfig;
  filtersText: String = '';
  ngOnInit(): void {
    this.store.users.subscribe(users => this.items = users);
     this.allItems = this.items;
     console.log('items' + this.allItems); // [{
    //   name: 'Fred Flintstone',
    //   address: '20 Dinosaur Way, Bedrock, Washingstone',
    //   birthMonth: 'February',
    //   birthMonthId: 'month2',
    //   weekDay: 'Sunday',
    //   weekdayId: 'day1'
    // }, {
    //   name: 'John Smith',
    //   address: '415 East Main Street, Norfolk, Virginia',
    //   birthMonth: 'October',
    //   birthMonthId: '10',
    //   weekDay: 'Monday',
    //   weekdayId: 'day2'
    // }];
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
  }

  // Filter functions

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
    this.filterConfig.resultsCount = this.items.length;
  }

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
}
