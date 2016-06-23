import { Component } from '@angular/core';
import { NavbarDirective } from './navbar.directive';

@Component({
    selector: 'cloud-app',
    templateUrl: '/tpl/duplications.html',
    directives: [NavbarDirective]
})
export class DuplicationsComponent {
}