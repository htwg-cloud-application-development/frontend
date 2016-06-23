import { Component } from '@angular/core';
import { NavbarDirective } from './navbar.directive';

@Component({
    selector: 'cloud-app',
    templateUrl: '/tpl/about.html',
    directives: [NavbarDirective]
})
export class AboutComponent {
}