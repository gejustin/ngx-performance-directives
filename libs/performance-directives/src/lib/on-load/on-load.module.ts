import { NgModule } from '@angular/core';

import { OnLoadDirective } from './on-load.directive';

@NgModule({
    declarations: [OnLoadDirective],
    exports: [OnLoadDirective],
})
export class OnLoadModule {}
