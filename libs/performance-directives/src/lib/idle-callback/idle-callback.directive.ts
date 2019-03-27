import { Directive, PLATFORM_ID } from '@angular/core';

import { idleCallbackScheduler } from '@gej/rxjs-idle-callback-scheduler';

import { AsyncNgIfDirective } from '../core/async-ng-if-directive.interface';
import { DisplayStream } from '../core/display-stream.interface';
import { schedulerStreamFactory } from '../core/scheduler-stream-factory';

@Directive({
    selector: '[gejIdleCallback]',
    providers: [
        {
            provide: DisplayStream,
            useFactory: schedulerStreamFactory(idleCallbackScheduler),
            deps: [PLATFORM_ID],
        },
    ],
})
export class IdleCallbackDirective extends AsyncNgIfDirective {}
