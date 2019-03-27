import { of, SchedulerLike } from 'rxjs';
import { first, subscribeOn } from 'rxjs/operators';

import { isPlatformBrowser } from '@angular/common';

export function schedulerStreamFactory(scheduler: SchedulerLike) {
    return (platformId: Object) => {
        let nextEvent$ = of(true);

        if (isPlatformBrowser(platformId)) {
            nextEvent$ = nextEvent$.pipe(subscribeOn(scheduler));
        }

        return nextEvent$.pipe(first());
    };
}
