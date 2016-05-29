import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class RestService {
    server = '';

    constructor(private http: Http) {}

    private httpGet(path: String): any {
        return this.http.get(this.server + path + '.json');
    }

    getCourses(): any {
        return this.httpGet('/apiv1/governance-service/courses');
    }
}