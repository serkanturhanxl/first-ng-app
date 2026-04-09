import { Component, signal,viewChild } from '@angular/core';
import { GreetingComponent } from '../components/greeting/greeting.component';
import { CounterComponent } from '../components/counter/counter.component';
import { PulserviewComponent } from "../components/pulserview/pulserview.component";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-home',
  imports: [GreetingComponent, CounterComponent, PulserviewComponent, AppComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  pulser = viewChild(PulserviewComponent);

  isPinMode = false;
  isAuthorized = false;
  pinValue: string = '';
  shakeLabel = false; // New flag for the shake animation

  toggleMode() {
    this.isPinMode = !this.isPinMode;
    this.isAuthorized = false;
    this.pinValue = '';
    this.shakeLabel = false;
    if(!this.isPinMode){
      this.pulser()?.stopPump();
    }
  }

  handleInput(val: string) {
    if (this.pinValue.length < 4) {
      this.pinValue += val;
      if(this.pinValue.length == 4)
      {
          this.submitPin();
      }
    }
  }

  submitPin() {
    if (this.pinValue === '1236') {
      this.isAuthorized = true;
      this.pulser()?.startPump();
    } else {
      // Trigger Shake instead of Alert
      this.triggerShake();
      this.pinValue = ''; // Optional: clear pin on wrong attempt
      this.pulser()?.stopPump();
    }
  }
  handleLogout() {
    this.isAuthorized = false;
    this.pulser()?.stopPump();
  }

  triggerShake() {
    this.shakeLabel = true;
    // Remove the class after animation completes (500ms) so it can be re-triggered
    setTimeout(() => {
      this.shakeLabel = false;
    }, 500);
  }

  clearPin() {
    this.pinValue = '';
  }

  homeMessage = signal('Serkan was here!');

  keyupHandler(event: KeyboardEvent) {
    console.log(`typed ${event.key} key`);
  }
}
