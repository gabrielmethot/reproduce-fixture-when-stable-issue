import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { PromiseComponent } from './promise-component';

describe('PromiseComponent', () => {
  let component: PromiseComponent;
  let fixture: ComponentFixture<PromiseComponent>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromiseComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PromiseComponent);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update message on submit', async () => {
    const message = fixture.debugElement.query(By.css('h1')).nativeElement as HTMLElement;
    expect(message.innerHTML).toBe('Hello World!');

    component.submit();
    httpTesting.expectOne('http://example.com').flush(null);
    await fixture.whenStable();

    expect(message.innerHTML).toBe('HTTP request completed!');
  });
});
