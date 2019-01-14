import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { SortField } from '../../shared/sort-field';
import { SortEvent } from '../../shared/sort-event';
import { SortConfig } from 'patternfly-ng';
import { User } from 'ngx-login-client';

@Component({
  selector: 'app-pfn-toolbar',
  templateUrl: './pfn-toolbar.component.html',
  styleUrls: ['./pfn-toolbar.component.css']
})
export class PfnToolbarComponent implements OnInit, OnChanges {

  sortConfig: SortConfig;
  isAscendingSort: Boolean = true;
  currentSortField: SortField;
  @Input() items: User[];

  ngOnInit() {
    this.sortConfig = {
      fields: [
        {
          id: 'name',
          title: 'Name',
          sortType: 'alpha'
        },
        {
          id: 'email',
          title: 'Email',
          sortType: 'alpha'
        }
      ],
      isAscending: this.isAscendingSort
    } as SortConfig;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.items = changes.items.currentValue;
    console.log('ngOnchanges');
  }
  toggleView() {
    const x = document.getElementById('expandTemplate');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }
  sortChanged(event: SortEvent): void {
    console.log('sortChanged Function......');
    console.log('event is', event);
    this.currentSortField = event.field;
    console.log('currentSort Field', this.currentSortField);
    this.isAscendingSort = event.isAscending;
    console.log('isAscendig Field', this.isAscendingSort);
    this.items.sort((item1: any, item2: any) => this.compare(item1, item2));
  }
  compare(item1: any, item2: any): number {
    console.log('compare function......');
    let compValue = 0;
    if (this.currentSortField.id === 'name') {
      compValue = item1.attributes.fullName.localeCompare(item2.attributes.fullName, 'en', {
        sensitivity: 'base'
      });
    } else if (this.currentSortField.id === 'email') {
      compValue = item1.attributes.email.localeCompare(item2.attributes.email);
    }
    if (!this.isAscendingSort) {
      compValue = compValue * -1;
    }
    return compValue;
  }
}
