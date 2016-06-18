import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CONFIG } from './config';

@Injectable()
export class RestService {

    constructor(private http: Http) {}

    private httpGet(path: String): any {
        return this.http.get(CONFIG.rest_api + path);
    }

    private httpPost(path: String, body: string, options?: RequestOptionsArgs): Observable<Response> {
        var response = this.http.post(CONFIG.rest_api + path, body, this.createPostOptions());
        response.subscribe(
            (res: Response) => {},
            (err: Response) => {},
            () => {}
        );
        return response;
    }

    private createPostOptions(): Object {
        return {headers: this.createJsonHeader()};
    }

    private createJsonHeader(): Headers {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    getCourses(): any {
        return this.httpGet('/governance/courses');
    }

    getCourseDetails(courseId: number): any {
        return this.httpGet('/governance/courses/' + courseId);
    }

    validateGroup(groupId: number): Observable<Response> {
        return this.httpPost('/validator/groups/' + groupId + '/validate', JSON.stringify({}));
    }

    getPmdResult(groupId: number): any {
        return this.httpGet('/validator/groups/' + groupId + '/pmd/last-result');
    }

    getCheckstyleResult(groupId: number): any {
        return this.httpGet('/validator/groups/' + groupId + '/checkstyle/last-result');
    }

    login(username: String, password: String): Observable<Response> {
        return this.httpPost("/governance/login", JSON.stringify({"username": username, "password": password}));
    }

    getUserCourses(token: String): any {
        return this.httpGet("/governance/import/" + token);
    }

    sendImportCourses(token: String, body: Object): Observable<Response> {
        return this.httpPost("/governance/import/courses/" + token, JSON.stringify(body));
    }
}