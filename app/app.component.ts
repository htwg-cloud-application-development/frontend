import { Component, Type } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

import { OverviewComponent } from './components/overview.component';
import { ImportComponent } from './components/login.component';
import { AboutComponent } from './components/about.component';
import { DuplicationsComponent } from './components/duplications.component';

@Component({
    selector: 'cloud-app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [Location]
})

@Routes([
    { path: '/', component: <Type>OverviewComponent},
    { path: '/import', component: <Type>ImportComponent},
    { path: '/about', component: <Type>AboutComponent},
    { path: '/duplications', component: <Type>DuplicationsComponent}
])
export class AppComponent {

    constructor(private router: Router) {}
}