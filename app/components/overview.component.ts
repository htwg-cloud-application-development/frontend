import { Component, ViewChild, Renderer } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ConnectionBackend, Response } from '@angular/http';

import { RestService } from '../rest.service';
import { CoursePipe } from './course.pipe';

@Component({
    selector: 'cloud-app',
    templateUrl: '/tpl/overview.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [RestService, ConnectionBackend],
    pipes: [CoursePipe]
})
export class OverviewComponent {
    @ViewChild('inputCourseFilter') inputElementRef;
    courses: Array;
    filterCourse: String;

    constructor(renderer: Renderer, rest: RestService) {
        rest.getCourses().subscribe((res: Response) => {
            this.courses = res.json();
            renderer.invokeElementMethod(this.inputElementRef.nativeElement, 'focus', []);
        });
    }

}