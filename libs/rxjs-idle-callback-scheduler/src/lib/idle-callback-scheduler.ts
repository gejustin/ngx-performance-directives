import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';

export class IdleCallbackScheduler extends AsyncScheduler {
    public flush(action?: AsyncAction<any>): void {
        this.active = true;
        this.scheduled = undefined;

        const { actions } = this;
        let error: any;
        let index = -1;
        const count: number = actions.length;
        action = action || actions.shift();

        if (action) {
            do {
                if ((error = action.execute(action.state, action.delay))) {
                    break;
                }
            } while (++index < count && (action = actions.shift()));
        }

        this.active = false;

        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    }
}
