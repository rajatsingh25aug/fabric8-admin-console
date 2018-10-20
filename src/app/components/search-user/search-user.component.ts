import { Component, OnInit } from '@angular/core';
import { SearchUserService } from '../../services/search-user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  constructor(private searchuserService: SearchUserService) { }

  ngOnInit() {
  }

  onSearch(username: string = null) {
    if (username != null) {

      this.searchuserService.getusers(username);

    } else {
      
    }
  }

}
