import { Component, ViewChild, Renderer, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
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
    courses: Array<String>;
    filterCourse: String;

    constructor(private modal: Modal, renderer: Renderer, rest: RestService, viewContainer: ViewContainerRef) {
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
}