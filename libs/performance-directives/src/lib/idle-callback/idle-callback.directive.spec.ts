import { idleCallbackScheduler } from '@gej/rxjs-idle-callback-scheduler';

import { createTestSuite } from '../core/directive-test-factory';

import { IdleCallbackDirective } from './idle-callback.directive';

createTestSuite(IdleCallbackDirective, 'gejIdleCallback', idleCallbackScheduler);
