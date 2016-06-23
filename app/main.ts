import { enableProdMode, provide, Type } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ROUTER_PROVIDERS } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { MODAL_BROWSER_PROVIDERS } from 'angular2-modal/platform-browser';
import { BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';

import { CONFIG } from './config';
import { AppComponent } from './app.component';
import { RestService } from './rest.service';

if (CONFIG.mode == "prod") {
    enableProdMode();
}

bootstrap(<Type>AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    provide(LocationStrategy, {useClass: <Type>HashLocationStrategy}),
    MODAL_BROWSER_PROVIDERS,
    BS_MODAL_PROVIDERS,
    RestService
]);