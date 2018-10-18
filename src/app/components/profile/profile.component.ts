import { Component, OnInit } from '@angular/core';
import { ListEvent } from '/home/rsinghmn/angular/expanding profile/Dummy repo/fabric8-admin-console/node_modules/patternfly-ng';
import { ListConfig } from '/home/rsinghmn/angular/expanding profile/Dummy repo/fabric8-admin-console/node_modules/patternfly-ng';


@Component({
  // encapsulation: ViewEncapsulation.None,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  items: any[];
  listConfig: ListConfig;
  allItems: any[];
  constructor() { }

  ngOnInit(): void {
    this.allItems = [{
      name: 'Fred Flintstone',
      address: '20 Dinosaur Way',
      city: 'Bedrock',
      state: 'Washingstone',
      typeIcon: 'fa-plane',
      clusterCount: 6,
      hostCount: 8,
      imageCount: 8,
      nodeCount: 10
    }, {
      name: 'John Smith',
      address: '415 East Main Street',
      city: 'Norfolk',
      state: 'Virginia',
      typeIcon: 'fa-magic',
      hostCount: 8,
      clusterCount: 6,
      nodeCount: 10,
      imageCount: 8,
      // hideExpandToggle: true
    }];
    this.items = this.allItems;
    this.listConfig = {
      dblClick: false,
      multiSelect: false,
      selectItems: false,
      selectionMatchProp: 'name',
      showCheckbox: false,
      useExpandItems: true
    } as ListConfig;
}
// tslint:disable-next-line:use-life-cycle-interface
ngDoCheck(): void {
}
}
