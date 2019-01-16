import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { SortField } from '../../shared/sort-field';
import { SortEvent } from '../../shared/sort-event';
import { SortConfig } from 'patternfly-ng';
import { ToolBarConfig } from 'src/app/shared/toolbar-config';
@Component({
  selector: 'app-pfn-toolbar',
  templateUrl: './pfn-toolbar.component.html',
  styleUrls: ['./pfn-toolbar.component.css']
})
export class PfnToolbarComponent implements OnInit {
  @Input() config: ToolBarConfig;
  @Output() SortChange = new EventEmitter();
  ngOnInit() {
  }
  private sortChange($event: SortEvent): void {
    this.SortChange.emit($event);
  }

}
