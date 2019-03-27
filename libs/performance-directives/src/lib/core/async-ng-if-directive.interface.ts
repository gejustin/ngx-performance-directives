import { Subscription } from 'rxjs';

import { OnInit, OnDestroy, TemplateRef, ViewContainerRef, ViewRef, Injectable } from '@angular/core';

import { DisplayStream } from './display-stream.interface';

@Injectable()
export abstract class AsyncNgIfDirective implements OnInit, OnDestroy {
    protected subscription: Subscription;

    constructor(
        protected templateRef: TemplateRef<any>,
        protected viewContainerRef: ViewContainerRef,
        protected stream$: DisplayStream
    ) {}

    public ngOnInit() {
        let viewRef: ViewRef;

        this.subscription = this.stream$.subscribe(shouldDisplay => {
            if (shouldDisplay && !viewRef) {
                viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
            } else if (!shouldDisplay && viewRef) {
                this.viewContainerRef.clear();
                viewRef = null;
            }
        });
    }

    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
