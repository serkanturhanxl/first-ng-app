import { Component, signal } from '@angular/core';
import { GreetingComponent } from '../components/greeting/greeting.component';
import { CounterComponent } from '../components/counter/counter.component';
import { PulserviewComponent } from "../components/pulserview/pulserview.component";
import { AppComponent } from "../app.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [GreetingComponent, CounterComponent, PulserviewComponent, AppComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isPinMode = false;
  pinValue: string = ''; // Stores the actual numbers

  toggleMode() {
    this.isPinMode = !this.isPinMode;
    this.pinValue = ''; // Clear PIN when switching modes
  }

  handleInput(val: string) {
    if (this.pinValue.length < 4) { // Limit to 4 digits
      this.pinValue += val;
    }
  }

  clearPin() {
    this.pinValue = '';
  }

  homeMessage = signal('Serkan was here!');

  keyupHandler(event: KeyboardEvent) {
    console.log(`typed ${event.key} key`);
  }
}
