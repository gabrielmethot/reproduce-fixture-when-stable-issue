import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-promise-component',
  imports: [],
  templateUrl: './promise-component.html',
  styleUrl: './promise-component.css',
})
export class PromiseComponent {
  private httpClient = inject(HttpClient);
  protected readonly message = signal('Hello World!');

  private async httpRequest(): Promise<void> {
    await firstValueFrom(this.httpClient.get<void>('http://example.com'));
  }

  async submit(): Promise<void> {
    await this.httpRequest();
    this.message.set('HTTP request completed!');
  }
}
