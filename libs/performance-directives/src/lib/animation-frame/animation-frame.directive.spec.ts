import { animationFrameScheduler } from 'rxjs';

import { createTestSuite } from '../core/directive-test-factory';

import { AnimationFrameDirective } from './animation-frame.directive';

createTestSuite(AnimationFrameDirective, 'gejAnimationFrame', animationFrameScheduler);
