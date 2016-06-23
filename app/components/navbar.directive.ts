import { Directive, ElementRef, Input, Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Directive({ selector: '[bs-navbar]' })
@Component({
    selector: '[bs-navbar]',
    templateUrl: '/tpl/navbar.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NavbarDirective {
    constructor() {
    }
}