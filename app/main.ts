import { bootstrap }    from '@angular/platform-browser-dynamic';
import { COMMON_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { HTTP_PROVIDERS, HTTP_BINDINGS } from '@angular/http';
import { MODAL_BROWSER_PROVIDERS } from 'angular2-modal/platform-browser';

import { AppComponent } from './app.component';
import { RestService } from './rest.service';

bootstrap(AppComponent, [
    COMMON_DIRECTIVES,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    HTTP_BINDINGS,
    MODAL_BROWSER_PROVIDERS,
    RestService
]);