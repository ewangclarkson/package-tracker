import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {StorageService} from "../../services/storage/local/storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  username: string='';


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storageService: StorageService) {
  }

  ngOnInit(): void {
    const user = this.storageService.getCurrentUser();
    this.username = user.name;
  }

  logout(){
    this.storageService.logout();
    this.document.location.href='/';
  }


}
