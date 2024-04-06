import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {

  searchValue: string='';

  @Input() searchPlaceHolder:string='';
  @Input() mobileSearchStatus: string='';
  @Output() mobileSearchStatusChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSearchValueChange(){
    this.mobileSearchStatusChange.emit(this.searchValue);
  }
}
