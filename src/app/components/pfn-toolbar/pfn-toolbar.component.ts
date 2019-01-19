import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
@Component({
  selector: 'app-pfn-toolbar',
  templateUrl: './pfn-toolbar.component.html',
  styleUrls: ['./pfn-toolbar.component.css']
})
export class PfnToolbarComponent {
  @Output() filterData = new EventEmitter();

  handleFilter(searchTerm): void {
    this.filterData.emit(searchTerm);
  }

}
