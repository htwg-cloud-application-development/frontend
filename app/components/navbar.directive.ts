import { Directive, ElementRef, Input, Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Directive({ selector: '[bs-navbar-header]' })
@Component({
    selector: '[bs-navbar-header]',
    templateUrl: '/tpl/navbar-header.html',
    directives: [ROUTER_DIRECTIVES]
})
export class HeaderDirective {
    constructor() {
    }
}

@Directive({ selector: '[bs-navbar-entries]' })
@Component({
    selector: '[bs-navbar-entries]',
    templateUrl: '/tpl/navbar-entries.html',
    directives: [ROUTER_DIRECTIVES]
})
export class EntriesDirective {
    constructor() {
    }
}

@Directive({ selector: '[bs-navbar]' })
@Component({
    selector: '[bs-navbar]',
    templateUrl: '/tpl/navbar.html',
    directives: [HeaderDirective, EntriesDirective]
})
export class NavbarDirective {
    constructor() {
    }
}