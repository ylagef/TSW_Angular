import { enableProdMode, TRANSLATIONS_FORMAT, TRANSLATIONS } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// use the require method provided by webpack
declare const require;
// we use the webpack raw-loader to return the content as a string
let translations = null;

if (localStorage.getItem('locale') == 'es') {
  translations = require(`raw-loader!./locale/messages.es.xlf`);
} else {
  translations = require(`raw-loader!./locale/messages.en.xlf`);
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    { provide: TRANSLATIONS, useValue: translations },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }
  ]
});