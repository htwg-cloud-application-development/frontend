import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarDirective } from './navbar.directive';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext, Modal } from 'angular2-modal/plugins/bootstrap';
import { Response } from '@angular/http';

import { RestService } from "../rest.service";

declare var $:any;

class Login {
    constructor(
        public username: string,
        public password: string
    ) {  }
}

class ModalContext extends BSModalContext {
    constructor(public course: Object, public collapse: Object) {
        super();
    }
}

@Component({
    selector: 'modal-content',
    templateUrl: '/tpl/modal.login.html',
    providers: [RestService],
})
export class ModalWindow implements ModalComponent<ModalContext> {
    context: ModalContext;
    model: Login = new Login('', '');
    loginError: boolean = false;
    showLoader: boolean = false;

    constructor(public dialog: DialogRef<ModalContext>, private rest: RestService) {
        this.context = dialog.context;
    }

    onXClick() {
        this.context.collapse.$target = null;
        this.dialog.dismiss();
    }

    onLoginSubmit() {
        this.showLoader = true;
        this.rest.login(this.model.username, this.model.password).subscribe(
            (res: Response) => { this.handleLogin(res.json()); },
            (err: Response) => {}
        );
    }

    handleLogin(json) {
        if (json.token == null) {
            this.loginError = true;
            this.showLoader = false;
        } else {
            this.context.collapse.unlocked = true;
            this.context.collapse.$target.collapse('show');
            this.requestDuplications(this.context.course);
            this.dialog.destroy();
        }
    }

    requestDuplications(course) {
        this.rest.getDuplications(course.id).subscribe(
            (res: Response) => { course.duplication = res.json(); },
            (err: Response) => {}
        );
    }
}

@Component({
    selector: 'cloud-app',
    templateUrl: '/tpl/duplications.html',
    directives: [NavbarDirective]
})
export class DuplicationsComponent implements AfterViewChecked {
    @ViewChild('accordion') accordion: ElementRef;
    courses: Array<Object> = [];
    running = {};
    collapse = {init: false, unlocked: false, $target: null};

    constructor(private rest: RestService, private modal: Modal) {
        rest.getCourses().subscribe(
            (res: Response) => {
                this.courses = res.json();
            },
            (err: Response) => {}
        );
    }

    ngAfterViewChecked() {
        var $collapse = $(this.accordion.nativeElement).find('.collapse');
        var self = this;
        if ($collapse.length > 0 && !this.collapse.init) {
            this.collapse.init = true;
            $collapse.on('show.bs.collapse', function () {
                return self.collapse.unlocked;
            });
            $collapse.on('shown.bs.collapse', function () {
                if (self.collapse.unlocked) {
                    self.collapse.unlocked = false;
                }
            });

        }
    }

    onToggle(event: MouseEvent, course) {
        event.preventDefault();
        var $target = $(event.target).closest('.panel').find('.collapse');
        if (!$target.is(this.collapse.$target)) {
            this.collapse.$target = $target;
            this.modal.open(ModalWindow, new ModalContext(course, this.collapse));
        } else {
            this.collapse.$target = null;
        }
    }

    onValidation(course) {
        this.setRunning(course, true);
        this.rest.validateDuplications(course.id).subscribe(
            (res: Response) => { this.setRunning(course, null); course.duplication = res.json(); },
            (err: Response) => { this.setRunning(course, null); }
        );
    }

    setRunning(course, flag) {
        this.running[course.id] = flag;
    }
}