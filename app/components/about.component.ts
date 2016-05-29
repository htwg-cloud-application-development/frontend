import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
    selector: 'cloud-app',
    templateUrl: '/tpl/about.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AboutComponent {
}