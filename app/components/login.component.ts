import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ConnectionBackend, Response } from '@angular/http';
import { NgForm } from '@angular/common';

import { RestService } from '../rest.service';

@Component({
    selector: 'cloud-app',
    templateUrl: '/tpl/login.html',
    providers: [RestService, ConnectionBackend],
    directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent {

    model = new Login();
    loginError = false;
    showLogin = true;

    constructor(private rest: RestService) {}

    onSubmit() {
        this.rest.login(this.model.username, this.model.password).subscribe((res: Response) => {
            this.handleLogin(res.json());
        });
    }

    handleLogin(json) {
        if (json.token == null) {
            this.loginError = true;
        } else {
            this.showLogin = false;
        }
    }
}

class Login {
    constructor(
        public username: string,
        public password: string
    ) {  }
}