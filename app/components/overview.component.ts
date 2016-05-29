import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ConnectionBackend, Response } from '@angular/http';

import { RestService } from '../rest.service';

@Component({
    selector: 'cloud-app',
    templateUrl: '/tpl/overview.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [RestService, ConnectionBackend]
})
export class OverviewComponent {
    courses: Array;

    constructor(rest: RestService) {
        rest.getCourses().subscribe((res: Response) => {
            this.courses = res.json();
        });
    }
}