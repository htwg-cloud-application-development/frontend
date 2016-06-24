import { Component, ViewChild, Renderer } from '@angular/core';
import { ConnectionBackend, Response } from '@angular/http';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { DialogRef, ModalComponent } from 'angular2-modal';

import { RestService } from '../rest.service';
import { CoursePipe } from './course.pipe';
import { ShortenRepoPipe } from './shorten-repo.pipe';
import { HeaderDirective, EntriesDirective } from './navbar.directive';
import { ValuesPipe } from './values.pipe';
import { KeysPipe } from './keys.pipe';

declare var $:any;

class GroupModalContext extends BSModalContext {
    public pmd;
    public checkstyle;

    constructor(public group) {
        super();
        this.size = 'lg';
    }
}
class CourseModalContext extends BSModalContext {

    constructor(public course: Object, public courseValidation: Object, public groupValidation) {
        super();
    }
}
class Login {
    constructor(
        public username: string,
        public password: string
    ) {  }
}

@Component({
    selector: 'modal-content',
    templateUrl: '/tpl/modal.group.html',
    providers: [RestService, ConnectionBackend],
    pipes: [ValuesPipe, KeysPipe]
})
class GroupModalWindow implements ModalComponent<GroupModalContext> {
    context: GroupModalContext;
    loaderCheckstyle = true;
    loaderPmd = true;

    constructor(public dialog: DialogRef<GroupModalContext>, private rest: RestService) {
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

    onXClick() {
        this.dialog.destroy();
    }
}

@Component({
    selector: 'modal-content',
    templateUrl: '/tpl/modal.login.html',
    providers: [RestService],
})
class CourseModalWindow implements ModalComponent<CourseModalContext> {
    context: CourseModalContext;
    model: Login = new Login('', '');
    loginError: boolean = false;
    showLoader: boolean = false;

    constructor(public dialog: DialogRef<CourseModalContext>, private rest: RestService) {
        this.context = dialog.context;
    }

    onXClick() {
        this.dialog.destroy();
    }

    onLoginSubmit() {
        this.showLoader = true;
        this.rest.login(this.model.username, this.model.password).subscribe((res: Response) => {
            this.handleLogin(res.json());
        });
    }

    handleLogin(json) {
        if (json.token == null) {
            this.loginError = true;
            this.showLoader = false;
        } else {
            this.validateCourse(this.context.course);
            this.dialog.destroy();
        }
    }

    validateCourse(course) {
        this.setCourseValidation(course, true);
        this.rest.validateCourse(course.id).subscribe(
            (res: Response) => { this.setCourseValidation(course, null); this.updateCourse(course, res.json()); },
            (err: Response) => { this.setCourseValidation(course, null); }
        );
    }

    setCourseValidation(course, value) {
        this.context.courseValidation[course.id] = value;
        for (var group of course.groups) {
            this.context.groupValidation[group.userId] = value;
        }
    }

    updateCourse(course, json) {
        for (var newGroup of json.groups) {
            for (var oldGroup of course.groups) {
                if (newGroup.userId == oldGroup.userId) {
                    oldGroup.pmd = newGroup.pmd;
                    oldGroup.checkstyle = newGroup.checkstyle;
                }
            }
        }
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
        this.modal.open(GroupModalWindow, new GroupModalContext(group));
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