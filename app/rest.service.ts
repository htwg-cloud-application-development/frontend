import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';

import { CONFIG } from './config';

@Injectable()
export class RestService {

    constructor(private http: Http) {}

    private httpGet(path: String): Observable<Response> {
        return this.http.get(CONFIG.rest_api + path);
    }

    private httpPost(path: String, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.post(CONFIG.rest_api + path, body, options);
    }

    getCourses(): any {
        return this.httpGet('/governance/courses');
    }

    login(username: String, password: String): any {
        return this.httpGet("/login?username=" + username + "&password=" + password);
    }

    getUserCourses(token: String): any {
        return this.httpGet("/import/" + token);
    }

    sendImportCourses(token: String, body: Object) {
        return this.httpPost("/import/courses/" + token, JSON.stringify(body));
    }
}