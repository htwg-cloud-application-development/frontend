import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { CONFIG } from './config';

@Injectable()
export class RestService {

    constructor(private http: Http, private modal: Modal) {}

    private httpGet(path: string): Observable<Response> {
        var response = this.http.get(this.getUrl(path)).share();
        response.subscribe(
            null,
            (err: Response) => { this.handleError(path, err); },
            null
        );
        return response;
    }

    private getUrl(path: string): string {
        return CONFIG.rest_api + path;
    }

    private handleError(path: string, res: Response): void {
        var title = 'Error';
        var message = 'Request to <strong>' + this.getUrl(path) + '</strong> has returned <strong>' + res.status + '</strong>.';
        this.modal.alert()
            .titleHtml('<h3 class="modal-title text-danger">' + title + '</h3>')
            .body('<span class="text-danger">' + message + '</span>')
            .open();
    }

    private httpPost(path: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        var response = this.http.post(this.getUrl(path), body, this.createPostOptions()).share();
        response.subscribe(
            null,
            (err: Response) => { this.handleError(path, err); },
            null
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

    getCourses(): Observable<Response> {
        return this.httpGet('/governance/courses');
    }

    getCourseDetails(courseId: number): Observable<Response> {
        return this.httpGet('/governance/courses/' + courseId);
    }

    validateGroup(groupId: number): Observable<Response> {
        return this.httpPost('/validator/groups/' + groupId + '/validate', JSON.stringify({}));
    }

    validateCourse(courseId: number): Observable<Response> {
        return this.httpPost('/validator/courses/' + courseId + '/validate', JSON.stringify({}));
    }

    validateDuplications(courseId: number): Observable<Response> {
        return this.httpPost('/validator/courses/' + courseId + '/validate/duplication', JSON.stringify({}));
    }

    getPmdResult(groupId: number): Observable<Response> {
        return this.httpGet('/validator/groups/' + groupId + '/pmd/last-result');
    }

    getCheckstyleResult(groupId: number): Observable<Response> {
        return this.httpGet('/validator/groups/' + groupId + '/checkstyle/last-result');
    }

    login(username: String, password: String): Observable<Response> {
        return this.httpPost("/governance/login", JSON.stringify({"username": username, "password": password}));
    }

    getUserCourses(token: String): Observable<Response> {
        return this.httpGet("/governance/import/" + token);
    }

    sendImportCourses(token: String, body: Object): Observable<Response> {
        return this.httpPost("/governance/import/courses/" + token, JSON.stringify(body));
    }

    getDuplications(courseId: number): Observable<Response> {
        return this.httpGet('/validator/groups/' + courseId + '/cpd/last-result');
    }
}