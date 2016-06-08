import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ConnectionBackend, Response } from '@angular/http';
import { NgForm } from '@angular/common';

import { RestService } from '../rest.service';

@Component({
    selector: 'cloud-app',
    templateUrl: '/tpl/import.html',
    providers: [RestService, ConnectionBackend],
    directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent {
    model: Login;
    selected: Object;

    courses: Array<Object>;
    loginError: boolean;
    showLogin: boolean;
    showLoader: boolean;
    showSuccess: boolean;
    token: String;

    constructor(private rest: RestService) {
        this.reset();
    }

    reset() {
        this.model = new Login('', '');
        this.courses = [];
        this.selected = {};
        this.loginError = false;
        this.showLogin = true;
        this.showLoader = false;
        this.showSuccess = false;
        this.token = null;
    }

    onLoginSubmit() {
        this.showSuccess = false;
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
            this.token = json.token;
            this.rest.getUserCourses(json.token).subscribe((res: Response) => {
                this.showLogin = false;
                this.showLoader = false;
                this.courses = res.json().courses;
            });
        }
    }

    onAbort() {
        this.reset();
    }

    onChange(courseId,flag){
        this.selected[courseId] = flag;
    }

    onImportSubmit() {
        this.rest.sendImportCourses(this.token, {"courses": this.getSelectedCourses()}).subscribe(
            (res: Response) => {
                this.reset();
                this.showSuccess = true;
            },
            (err: Response) => {
                this.reset();
                this.showSuccess = true;
            });
    }

    getSelectedCourses(): Array<Object> {
        var result = [];
        for(var key in this.selected) {
            if (this.selected[key]) {
                for (var course of this.courses) {
                    if (course.id == key) {
                        result.push(course);
                    }
                }
            }
        }
        return result;
    }
}

class Login {
    constructor(
        public username: string,
        public password: string
    ) {  }
}
