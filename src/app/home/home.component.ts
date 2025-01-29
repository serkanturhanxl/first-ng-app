import { Component, signal } from '@angular/core';
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
  homeMessage = signal('Serkan was here!');
  keyupHandler(event: KeyboardEvent) {
    console.log(`typed ${event.key} key`);
  }
}
