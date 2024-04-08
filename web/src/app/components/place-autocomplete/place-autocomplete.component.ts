import {Component, ElementRef, Input, OnInit, Output, ViewChild,EventEmitter} from '@angular/core';
import {PlaceSearchResult} from "../../models/place-search-result.model";



@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrl: './place-autocomplete.component.css'
})
export class PlaceAutocompleteComponent implements OnInit {

  @ViewChild('inputField') inputField?: ElementRef;

  autocomplete: google.maps.places.Autocomplete | undefined;

  @Input() placeholder = '';

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  constructor() {
  }


  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField!.nativeElement);
     this.autocomplete.addListener('place_changed',() =>{
       const place = this.autocomplete!.getPlace();
       const result: PlaceSearchResult ={
         address: this.inputField!.nativeElement.value,
         location: place.geometry!.location
       };
       this.placeChanged.emit(result);

     })
  }
}
