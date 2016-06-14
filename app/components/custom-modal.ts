import { Component } from '@angular/core';
import { ConnectionBackend, Response } from '@angular/http';

import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap/index';

import { ValuesPipe } from './values.pipe';
import { KeysPipe } from './keys.pipe';
import { RestService } from '../rest.service';

export class ModalContext extends BSModalContext {
    constructor(public group, public pmd, public checkstyle) {
        super();
        this.size = 'lg';
    }
}

@Component({
    selector: 'modal-content',
    templateUrl: '/tpl/modal.html',
    providers: [RestService, ConnectionBackend],
    pipes: [ValuesPipe, KeysPipe]
})
export class ModalWindow implements ModalComponent<ModalContext> {
    context: ModalContext;
    loaderCheckstyle = true;
    loaderPmd = true;

    constructor(public dialog: DialogRef<ModalContext>, private rest: RestService) {
        this.context = dialog.context;
        this.loadPmd(rest);
        this.loadCheckstyle(rest);
    }

    loadPmd(rest: RestService) {
        rest.getPmdResult().subscribe(
            (res: Response) => {
                this.context.pmd = res.json();
            },
            (err: Response) => {

            },
            (done: Response) => {
                this.loaderPmd = false;
            }
        );
    }

    loadCheckstyle(rest: RestService) {
        rest.getCheckstyleResult().subscribe(
            (res: Response) => {
                this.context.checkstyle = res.json();
            },
            (err: Response) => {

            },
            (done: Response) => {
                this.loaderCheckstyle = false;
            }
        );
    }

    beforeDismiss() {
        return true;
    }

    beforeClose() {
        return true;
    }

    onXClick() {
        this.dialog.destroy();
    }
}
