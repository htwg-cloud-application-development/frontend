import { Component, ViewChild, Renderer, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ConnectionBackend, Response } from '@angular/http';
import { Modal, BS_MODAL_PROVIDERS, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { RestService } from '../rest.service';
import { CoursePipe } from './course.pipe';
import { ModalWindow, ModalContext } from './custom-modal';

@Component({
    selector: 'cloud-app',
    templateUrl: '/tpl/overview.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [RestService, ConnectionBackend],
    viewProviders: [ ...BS_MODAL_PROVIDERS ],
    pipes: [CoursePipe]
})
export class OverviewComponent {
    @ViewChild('inputCourseFilter') inputElementRef;
    courses: Array<Object>;
    filterCourse: String;
    currentCourse: Object = {"id": -1};
    groupValidation = {};

    constructor(private modal: Modal, renderer: Renderer, private rest: RestService, viewContainer: ViewContainerRef) {
        rest.getCourses().subscribe((res: Response) => {
            this.courses = res.json();
            renderer.invokeElementMethod(this.inputElementRef.nativeElement, 'focus', []);
        });

        this.modal.defaultViewContainer = viewContainer;
    }

    onGroupClick(event: MouseEvent, group) {
        event.preventDefault();
        this.modal.open(ModalWindow, new ModalContext(group));
    }

    onToggleCollapse(course: any, panel: any) {
        if (panel.getAttribute("aria-expanded") == "false") {
            this.rest.getCourseDetails(course.id).subscribe((res: Response) => {
                this.currentCourse = res.json();
            });
        }
    }

    onValidateGroup(event: MouseEvent, course, group) {
        event.preventDefault();
        this.groupValidation[group.groupId] = true;
        this.rest.validateGroup(course.courseId, group.groupId).subscribe(
            (res: Response) => {},
            (err: Response) => {}
        );
    }
}