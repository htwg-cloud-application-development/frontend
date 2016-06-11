import { Component } from '@angular/core';

import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap/index';

import { ValuesPipe } from './values.pipe';

export class ModalContext extends BSModalContext {
    constructor(public group) {
        super();
        this.size = 'lg';
    }
}

@Component({
    selector: 'modal-content',
    templateUrl: '/tpl/modal.html',
    pipes: [ValuesPipe]
})
export class ModalWindow implements ModalComponent<ModalContext> {
    context: ModalContext;

    constructor(public dialog: DialogRef<ModalContext>) {
        this.context = dialog.context;
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
