import { Component, signal, viewChild } from '@angular/core';
import { GreetingComponent } from '../components/greeting/greeting.component';
import { CounterComponent } from '../components/counter/counter.component';
import { PulserviewComponent } from '../components/pulserview/pulserview.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  imports: [
    GreetingComponent,
    CounterComponent,
    PulserviewComponent,
    AppComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
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
    if (!this.isPinMode) {
      this.handleLogout();
    }
  }

  handleInput(val: string) {
    if (this.pinValue.length < 6) {
      this.pinValue += val;
      if (this.pinValue.length == 6) {
        this.submitPin();
      }
    }
  }

  submitPin() {
    if (this.pinValue === '123459') {
      this.isAuthorized = true;
      this.pulser()?.startPump();
      this.enableDisableButtons(true, 0);
    } else {
      // Trigger Shake instead of Alert
      this.triggerShake();
      this.pinValue = ''; // Optional: clear pin on wrong attempt
      this.pulser()?.stopPump();
      this.enableDisableButtons(false, -1);
    }
  }
  handleLogout() {
    this.isAuthorized = false;
    this.pulser()?.stopPump();
    this.enableDisableButtons(false, -1);
  }
  enableDisableButtons(shouldDisable: boolean, indexToSkip: number) {
    const fuelOptions = document.querySelectorAll('.fuel-option-wrap');

    fuelOptions.forEach((element, index) => {
      if (index !== indexToSkip) {
        if (shouldDisable) {
          element.classList.add('disabled-element');
        } else {
          element.classList.remove('disabled-element');
        }
      }
    });
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
