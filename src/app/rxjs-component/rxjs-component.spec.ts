import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { RxjsComponent } from './rxjs-component';

describe('RxjsComponent', () => {
  let component: RxjsComponent;
  let fixture: ComponentFixture<RxjsComponent>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsComponent);
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
