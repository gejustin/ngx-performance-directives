import { NgModule } from '@angular/core';

import { IdleCallbackDirective } from './idle-callback.directive';

@NgModule({
    declarations: [IdleCallbackDirective],
    exports: [IdleCallbackDirective],
})
export class IdleCallbackModule {}
