import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';

import { RestService } from './rest.service';
import { COMMON_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { HTTP_PROVIDERS, HTTP_BINDINGS } from '@angular/http';

bootstrap(AppComponent, [RestService, COMMON_DIRECTIVES, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, HTTP_PROVIDERS, HTTP_BINDINGS]);