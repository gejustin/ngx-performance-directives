import { Component, PLATFORM_ID } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { OnLoadDirective } from './on-load.directive';

{
    const testDirectiveQueryPredicate = By.css('[test-target="testDirective"]');

    describe('OnLoadDirective', () => {
        let fixture: ComponentFixture<TestComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [OnLoadDirective, TestComponent],
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

            it('should be rendered when the document load event is fired', () => {
                window.dispatchEvent(new Event('load'));
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
        <div *gejOnLoad test-target="testDirective">Hello, World!</div>
    `,
})
class TestComponent {}
