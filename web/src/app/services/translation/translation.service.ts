import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StorageService} from "../storage/local/storage.service";

@Injectable()
export class TranslationService {
  public messages:any = {};
  public language = 'en';
  constructor(private http: HttpClient,
              private storageService: StorageService) { }

  getMessage(key: string) {
    return this.messages[key] || key;
  }

  getTranslationMessages(lang: string) : Promise<any> {
    if (this.storageService.hasValue('language')) {
      this.language = this.storageService.get('language')!;
    }
    return new Promise<any>((resolve, reject) => {
        const transPath = `assets/lang/${this.language}.json`;
        this.http.get<any>(transPath).subscribe(
          message => {
            if (message) {
              this.messages = message;
              resolve(this.messages);
            }
          }, error => {
            resolve(this.messages);
          }
        );
      });
  }
}
