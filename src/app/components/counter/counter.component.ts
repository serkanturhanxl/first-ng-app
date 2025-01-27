import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  counterValue = signal(0)
  increase() {
    //this.counterValue.set(this.counterValue() + 1)
    this.counterValue.update((valx) => valx + 1);
  }
  decriese() { 
    this.counterValue.update((valx) => valx - 1);
  }
  reset() {
    this.counterValue.set(0);
   }
}
