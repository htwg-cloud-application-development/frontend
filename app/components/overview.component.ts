import { Component, ViewChild, Renderer } from '@angular/core';
import { ConnectionBackend, Response } from '@angular/http';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { DialogRef, ModalComponent } from 'angular2-modal';

import { RestService } from '../rest.service';
import { CoursePipe } from './course.pipe';
import { ShortenRepoPipe } from './shorten-repo.pipe';
import { CourseModalWindow, CourseModalContext } from './validation-course.modal';
import { HeaderDirective, EntriesDirective } from './navbar.directive';
import { ValuesPipe } from './values.pipe';
import { KeysPipe } from './keys.pipe';

declare var $:any;

export class ModalContext extends BSModalContext {
    public pmd;
    public checkstyle;

    constructor(public group) {
        super();
        this.size = 'lg';
    }
}

@Component({
    selector: 'modal-content',
    templateUrl: '/tpl/modal.html',
    providers: [RestService, ConnectionBackend],
    pipes: [ValuesPipe, KeysPipe]
})
export class ModalWindow implements ModalComponent<ModalContext> {
    context: ModalContext;
    loaderCheckstyle = true;
    loaderPmd = true;

    constructor(public dialog: DialogRef<ModalContext>, private rest: RestService) {
        this.context = dialog.context;
        this.loadPmd(rest);
        this.loadCheckstyle(rest);
    }

    loadPmd(rest: RestService) {
        rest.getPmdResult(this.context.group.userId).subscribe(
            (res: Response) => {
                this.loaderPmd = false;
                this.context.pmd = res.json();
            },
            (err: Response) => {
                this.loaderPmd = false;
            }
        );
    }

    loadCheckstyle(rest: RestService) {
        rest.getCheckstyleResult(this.context.group.userId).subscribe(
            (res: Response) => {
                this.loaderCheckstyle = false;
                this.context.checkstyle = res.json();
            },
            (err: Response) => {
                this.loaderCheckstyle = false;
            }
        );
    }

    beforeDismiss() {
        return true;
    }

    beforeClose() {
        return true;
    }

    onXClick() {
        this.dialog.destroy();
    }
}

@Component({
    selector: 'cloud-app',
    templateUrl: '/tpl/overview.html',
    directives: [HeaderDirective, EntriesDirective],
    providers: [RestService, ConnectionBackend],
    pipes: [CoursePipe, ShortenRepoPipe]
})
export class OverviewComponent {
    @ViewChild('inputCourseFilter') inputElementRef;
    courses: Array<Object>;
    filterCourse: String;
    groupValidation = {};
    courseValidation = {};

    constructor(private modal: Modal, renderer: Renderer, private rest: RestService) {
        rest.getCourses().subscribe(
            (res: Response) => {
                this.courses = res.json();
                renderer.invokeElementMethod(this.inputElementRef.nativeElement, 'focus', []);
            },
            (err: Response) => {}
        );
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
            (res: Response) => { this.setGroupValidation(group, null); this.updateGroup(group, res.json()) },
            (err: Response) => { this.setGroupValidation(group, null); }
        );
    }

    setGroupValidation(group, value) {
        this.groupValidation[group.userId] = value;
    }

    updateGroup(group, json) {
        group.pmd = json.pmd;
        group.checkstyle = json.checkstyle;
    }

    onValidateCourse(event: MouseEvent, course) {
        event.preventDefault();
        this.modal.open(CourseModalWindow, new CourseModalContext(course, this.courseValidation, this.groupValidation));
    }
}