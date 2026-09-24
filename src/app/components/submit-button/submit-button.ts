import { Component, input } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'app-submit-button',
  styleUrl: './submit-button.css',
  templateUrl: './submit-button.html',
})
export class SubmitButton {
  buttonText = input.required<string>();

  private clickSubject = new Subject<void>();

  constructor() {
    this.clickSubject
      .pipe(
        debounceTime(300),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.onSubmit();
      });
  }

  handleClick(): void {
    this.clickSubject.next();
  }

  private onSubmit(): void {}
}
