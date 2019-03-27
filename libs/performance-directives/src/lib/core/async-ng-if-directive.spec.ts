import { Subject } from 'rxjs';

import { Component, Directive } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AsyncNgIfDirective } from './async-ng-if-directive.interface';
import { DisplayStream } from './display-stream.interface';

const subject = new Subject<boolean>();

{
    const testDirectiveQueryPredicate = By.css('[test-target="testDirective"]');

    describe('AsyncNgIfDirective', () => {
        let fixture: ComponentFixture<TestComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, TestDirective],
            });

            fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
        });

        it('should be rendered when the display stream emits true', () => {
            subject.next(true);

            expect(fixture.debugElement.query(testDirectiveQueryPredicate)).toBeTruthy();
            expect(fixture.nativeElement.textContent).toBe('Hello, World!');
        });

        it('should not be rendered when the display stream emits false', () => {
            subject.next(false);
            expect(fixture.debugElement.query(testDirectiveQueryPredicate)).toBeFalsy();
            expect(fixture.nativeElement.textContent).toBe('');
        });
    });
}

export function streamFactory() {
    return subject.asObservable();
}

@Directive({
    selector: '[testDirective]',
    providers: [
        {
            provide: DisplayStream,
            useFactory: streamFactory,
        },
    ],
})
export class TestDirective extends AsyncNgIfDirective {}

@Component({
    selector: 'test-cmp',
    template: `
        <div *testDirective test-target="testDirective">Hello, World!</div>
    `,
})
class TestComponent {}
