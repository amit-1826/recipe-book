import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {

    @Input() message: string;
    @Output() close = new EventEmitter<any>();

    constructor(){}

    onClose() {
        this.close.emit();
    }

}