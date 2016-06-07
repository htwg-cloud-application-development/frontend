import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CONFIG } from './config';

@Injectable()
export class RestService {

    constructor(private http: Http) {}

    private httpGet(path: String): any {
        return this.http.get(CONFIG.rest_api + path);
    }

    getCourses(): any {
        return this.httpGet('/governance/courses');
    }

    login(username: String, password: String): any {
        return this.httpGet("/login?username=" + username + "&password=" + password);
    }
}