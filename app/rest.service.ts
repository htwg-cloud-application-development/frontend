import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';

import { CONFIG } from './config';

@Injectable()
export class RestService {

    constructor(private http: Http) {}

    private httpGet(path: String): any {
        return this.http.get(CONFIG.rest_api + path);
    }

    private httpPost(path: String, body: string, options?: RequestOptionsArgs): any {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(CONFIG.rest_api + path, body, {headers: headers});
    }

    getCourses(): any {
        return this.httpGet('/governance/courses');
    }

    getCourseDetails(courseId: number): any {
        return this.httpGet('/governance/courses/' + courseId);
    }

    validateGroup(courseId: number, groupId: number): any {
        return this.httpPost('/validator/courses/' + courseId + '/groups/' + groupId + '/validate', JSON.stringify({}));
    }

    login(username: String, password: String): any {
        return this.httpPost("/governance/login", JSON.stringify({"username": username, "password": password}));
    }

    getUserCourses(token: String): any {
        return this.httpGet("/governance/import/" + token);
    }

    sendImportCourses(token: String, body: Object) {
        return this.httpPost("/governance/import/courses/" + token, JSON.stringify(body));
    }
}