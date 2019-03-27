import { async, TestBed } from '@angular/core/testing';

import { PerformanceDirectivesModule } from './performance-directives.module';

describe('DeferredDirectivesModule', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PerformanceDirectivesModule],
        });
    });

    it('should create', () => {
        expect(PerformanceDirectivesModule).toBeDefined();
    });
});
