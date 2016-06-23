import { Component } from '@angular/core';
import { NavbarDirective } from './navbar.directive';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext, Modal } from 'angular2-modal/plugins/bootstrap';
import { Response } from '@angular/http';

import { RestService } from "../rest.service";

class Login {
    constructor(
        public username: string,
        public password: string
    ) {  }
}

class ModalContext extends BSModalContext {
    constructor(public course: Object, public running: Object) {
        super();
    }
}

@Component({
    selector: 'modal-content',
    templateUrl: '/tpl/modal.login.html',
    providers: [RestService],
})
export class ModalWindow implements ModalComponent<ModalContext> {
    context: ModalContext;
    model: Login = new Login('', '');
    loginError: boolean = false;
    showLoader: boolean = false;

    constructor(public dialog: DialogRef<ModalContext>, private rest: RestService) {
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
            this.validate(this.context.course);
            this.dialog.destroy();
        }
    }

    validate(course) {
        this.setRunning(course, true);
        this.rest.validateDuplications(course.id).subscribe(
            (res: Response) => { this.setRunning(course, null); this.context.course["duplication"] = res.json().duplication; },
            (err: Response) => { this.setRunning(course, null); }
        );
    }

    setRunning(course, flag) {
        this.context.running[course.id] = flag;
    }
}

@Component({
    selector: 'cloud-app',
    templateUrl: '/tpl/duplications.html',
    directives: [NavbarDirective]
})
export class DuplicationsComponent {
    courses: Array<Object> = [];
    running = {};

    constructor(private rest: RestService, private modal: Modal) {
        rest.getCourses().subscribe(
            (res: Response) => {
                this.courses = res.json();
            },
            (err: Response) => {}
        );
    }

    onValidation(course) {
        this.modal.open(ModalWindow, new ModalContext(course, this.running));
    }
}