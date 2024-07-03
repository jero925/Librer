import { Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading = signal<boolean>(false);

  constructor(private spinnerService: NgxSpinnerService) { }

  requestCount: number = 0;

  public show() {
    this.requestCount++;
    this.spinnerService.show(undefined,
      {
        type: 'ball-scale-ripple',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        size: 'default'
      }
    )
    this.isLoading.set(false);
  }
  public hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.spinnerService.hide();
    }
    this.isLoading.set(true);
  }
}
