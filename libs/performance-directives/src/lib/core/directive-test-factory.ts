import { Component, PLATFORM_ID, Type } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AsyncNgIfDirective } from './async-ng-if-directive.interface';

export function createTestSuite(directive: Type<AsyncNgIfDirective>, selector: string, scheduler: { flush: Function }) {
    {
        const testDirectiveQueryPredicate = By.css('[test-target="testDirective"]');

        describe(`${directive.name}`, () => {
            let fixture: ComponentFixture<TestComponent>;

            beforeEach(() => {
                TestBed.configureTestingModule({
                    declarations: [directive, TestComponent],
                    providers: [
                        {
                            provide: PLATFORM_ID,
                            useValue: 'browser',
                        },
                    ],
                });
            });

            describe('Platform Browser', () => {
                beforeEach(() => {
                    TestBed.overrideProvider(PLATFORM_ID, {
                        useValue: 'browser',
                    });
                    fixture = TestBed.createComponent(TestComponent);
                    fixture.detectChanges();
                });

                it('should not be rendered initially', () => {
                    expect(fixture.debugElement.query(testDirectiveQueryPredicate)).toBeFalsy();
                    expect(fixture.nativeElement.textContent).toBe('');
                });

                it('should be rendered when the next event is fired', () => {
                    scheduler.flush();
                    expect(fixture.debugElement.query(testDirectiveQueryPredicate)).toBeTruthy();
                    expect(fixture.nativeElement.textContent).toBe('Hello, World!');
                });
            });

            describe('Other Platforms', () => {
                beforeEach(() => {
                    TestBed.overrideProvider(PLATFORM_ID, {
                        useValue: 'server',
                    });
                    fixture = TestBed.createComponent(TestComponent);
                    fixture.detectChanges();
                });

                it('should be rendered immediately when used on non-browser platforms', () => {
                    expect(fixture.debugElement.query(testDirectiveQueryPredicate)).toBeTruthy();
                    expect(fixture.nativeElement.textContent).toBe('Hello, World!');
                });
            });
        });
    }

    @Component({
        selector: 'test-cmp',
        template: `
            <div *${selector} test-target="testDirective">Hello, World!</div>
        `,
    })
    class TestComponent {}
}
