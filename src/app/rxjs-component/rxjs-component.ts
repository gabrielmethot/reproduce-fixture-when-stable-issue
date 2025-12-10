import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-rxjs-component',
  imports: [],
  templateUrl: './rxjs-component.html',
  styleUrl: './rxjs-component.css',
})
export class RxjsComponent {
  private httpClient = inject(HttpClient);
  private submit$ = new Subject<void>();
  protected readonly message = signal('Hello World!');

  constructor() {
    this.submit$
      .pipe(
        switchMap(() =>
          this.httpRequest().pipe(tap(() => this.message.set('HTTP request completed!')))
        ),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  private httpRequest(): Observable<void> {
    return this.httpClient.get<void>('http://example.com');
  }

  submit(): void {
    this.submit$.next();
  }
}
