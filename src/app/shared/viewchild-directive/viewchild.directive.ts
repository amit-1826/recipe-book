import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[view-child]'
})
export class ViewChildDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}