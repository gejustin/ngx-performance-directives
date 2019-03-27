import { NgModule } from '@angular/core';

import { OnLoadModule } from './on-load/on-load.module';
import { AnimationFrameModule } from './animation-frame/animation-frame.module';
import { IdleCallbackModule } from './idle-callback/idle-callback.module';

@NgModule({
    imports: [OnLoadModule, AnimationFrameModule, IdleCallbackModule],
    exports: [OnLoadModule, AnimationFrameModule, IdleCallbackModule],
})
export class PerformanceDirectivesModule {}
