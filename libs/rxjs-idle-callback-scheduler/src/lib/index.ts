import { IdleCallbackAction } from './idle-callback-action';
import { IdleCallbackScheduler } from './idle-callback-scheduler';

export const idleCallbackScheduler = new IdleCallbackScheduler(IdleCallbackAction);
