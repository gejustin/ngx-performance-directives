import { of, ReplaySubject } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';

export function onLoadStreamFactory(platformId: Object) {
    let onLoad$ = of(true);

    if (isPlatformBrowser(platformId)) {
        const loaded$ = new ReplaySubject<boolean>(1);

        window.addEventListener('load', () => {
            loaded$.next(true);
        });

        onLoad$ = loaded$.asObservable();
    }

    return onLoad$;
}
