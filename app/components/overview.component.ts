import { Component, ViewChild, Renderer, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ConnectionBackend, Response } from '@angular/http';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { RestService } from '../rest.service';
import { CoursePipe } from './course.pipe';
import { ShortenRepoPipe } from './shorten-repo.pipe';
import { ModalWindow, ModalContext } from './custom-modal';
import { CourseModalWindow, CourseModalContext } from './validation-course.modal';

declare var $:any;

@Component({
    selector: 'cloud-app',
    templateUrl: '/tpl/overview.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [RestService, ConnectionBackend],
    pipes: [CoursePipe, ShortenRepoPipe]
})
export class OverviewComponent {
    @ViewChild('inputCourseFilter') inputElementRef;
    courses: Array<Object>;
    filterCourse: String;
    groupValidation = {};
    courseValidation = {};

    constructor(private modal: Modal, renderer: Renderer, private rest: RestService, viewContainer: ViewContainerRef) {
        rest.getCourses().subscribe(
            (res: Response) => {
                this.courses = res.json();
                renderer.invokeElementMethod(this.inputElementRef.nativeElement, 'focus', []);
            },
            (err: Response) => {}
        );

        this.modal.defaultViewContainer = viewContainer;
    }

    public ngAfterViewChecked(): void {
        if ($('[data-toggle="popover"]').length > 0) {
            $('[data-toggle="popover"]').popover();
        }
    }

    onGroupClick(event: MouseEvent, group) {
        event.preventDefault();
        this.modal.open(ModalWindow, new ModalContext(group));
    }

    onValidateGroup(event: MouseEvent, group) {
        event.preventDefault();
        this.setGroupValidation(group, true);
        this.rest.validateGroup(group.userId).subscribe(
            (res: Response) => { this.setGroupValidation(group, null); },
            (err: Response) => { this.setGroupValidation(group, null); }
        );
    }

    setGroupValidation(group, value) {
        this.groupValidation[group.userId] = value;
    }

    onValidateCourse(event: MouseEvent, course) {
        event.preventDefault();
        this.modal.open(CourseModalWindow, new CourseModalContext(course, this.courseValidation, this.groupValidation));
    }
}