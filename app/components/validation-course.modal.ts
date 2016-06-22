import { Component } from '@angular/core';

import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap/index';
import { Response } from '@angular/http';
import { NgForm } from '@angular/common';

import { RestService } from '../rest.service';

export class CourseModalContext extends BSModalContext {

    constructor(public course: Object, public courseValidation: Object, public groupValidation) {
        super();
    }
}

@Component({
    selector: 'modal-content',
    templateUrl: '/tpl/modal.login.html',
    providers: [RestService],
})
export class CourseModalWindow implements ModalComponent<CourseModalContext> {
    context: CourseModalContext;
    model: Login = new Login('', '');
    loginError: boolean = false;
    showLoader: boolean = false;

    constructor(public dialog: DialogRef<ModalContext>, private rest: RestService) {
        this.context = dialog.context;
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
            (res: Response) => { this.setCourseValidation(course, null); },
            (err: Response) => { this.setCourseValidation(course, null); }
        );
    }

    setCourseValidation(course, value) {
        this.context.courseValidation[course.id] = value;
        for (var group of course.groups) {
            this.context.groupValidation[group.userId] = value;
        }
    }
}

class Login {
    constructor(
        public username: string,
        public password: string
    ) {  }
}