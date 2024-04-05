import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./interceptors/auth/auth-interceptor.service";
import {TranslationService} from "./services/translation/translation.service";
import {AuthService} from "./services/auth/auth.service";

const setTranslationFactory = (translationService: TranslationService) => {
  return () => translationService.getTranslationMessages('en');
};

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID, useValue: window.navigator.language
    },
    {
      provide: APP_INITIALIZER,
      useFactory: setTranslationFactory,
      deps: [TranslationService], multi: true
    },
    TranslationService,
    AuthService
  ]
})
export class CoreModule {}
