import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslatePipe} from "../pipes/translate/translate.pipe";
import {RouterModule} from "@angular/router";
import {LoaderComponent} from "./loader/loader.component";


@NgModule({
  declarations: [TranslatePipe,LoaderComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [TranslatePipe,LoaderComponent]
})
export class SharedModule {
}
