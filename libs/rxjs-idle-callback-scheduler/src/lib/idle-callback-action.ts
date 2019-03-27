import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { root } from 'rxjs/internal/util/root';

import { IdleCallbackScheduler } from './idle-callback-scheduler';

export class IdleCallbackAction<T> extends AsyncAction<T> {
    constructor(
        protected scheduler: IdleCallbackScheduler,
        protected work: (this: IdleCallbackAction<T>, state?: T) => void
    ) {
        super(scheduler, work);
    }

    protected requestAsyncId(scheduler: IdleCallbackScheduler, id?: any, delay: number = 0): any {
        // If delay is greater than 0, request as an async action.
        if (delay !== null && delay > 0) {
            return super.requestAsyncId(scheduler, id, delay);
        }
        // Push the action to the end of the scheduler queue.
        scheduler.actions.push(this);
        // If a microtask has already been scheduled, don't schedule another
        // one. If a microtask hasn't been scheduled yet, schedule one now. Return
        // the current scheduled microtask id.
        return (
            scheduler.scheduled ||
            (scheduler.scheduled = root.requestIdleCallback(scheduler.flush.bind(scheduler, null)))
        );
    }

    protected recycleAsyncId(scheduler: IdleCallbackScheduler, id?: any, delay: number = 0): any {
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return super.recycleAsyncId(scheduler, id, delay);
        }
        // If the scheduler queue is empty, cancel the requested microtask and
        // set the scheduled flag to undefined so the next AsapAction will schedule
        // its own.
        if (scheduler.actions.length === 0) {
            root.cancelIdleCallback(id);
            scheduler.scheduled = undefined;
        }
        // Return undefined so the action knows to request a new async id if it's rescheduled.
        return undefined;
    }
}
