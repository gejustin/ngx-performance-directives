import { NgModule } from '@angular/core';

import { AnimationFrameDirective } from './animation-frame.directive';

@NgModule({
    declarations: [AnimationFrameDirective],
    exports: [AnimationFrameDirective],
})
export class AnimationFrameModule {}
