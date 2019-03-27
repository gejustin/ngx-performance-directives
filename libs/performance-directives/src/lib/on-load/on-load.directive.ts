import { Directive, PLATFORM_ID } from '@angular/core';

import { DisplayStream } from '../core/display-stream.interface';
import { AsyncNgIfDirective } from '../core/async-ng-if-directive.interface';

import { onLoadStreamFactory } from './on-load-stream-factory';

@Directive({
    selector: '[gejOnLoad]',
    providers: [
        {
            provide: DisplayStream,
            useFactory: onLoadStreamFactory,
            deps: [PLATFORM_ID],
        },
    ],
})
export class OnLoadDirective extends AsyncNgIfDirective {}
