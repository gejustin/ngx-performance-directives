import { animationFrameScheduler } from 'rxjs';

import { Directive, PLATFORM_ID } from '@angular/core';

import { DisplayStream } from '../core/display-stream.interface';
import { AsyncNgIfDirective } from '../core/async-ng-if-directive.interface';
import { schedulerStreamFactory } from '../core/scheduler-stream-factory';

@Directive({
    selector: '[gejAnimationFrame]',
    providers: [
        {
            provide: DisplayStream,
            useFactory: schedulerStreamFactory(animationFrameScheduler),
            deps: [PLATFORM_ID],
        },
    ],
})
export class AnimationFrameDirective extends AsyncNgIfDirective {}
