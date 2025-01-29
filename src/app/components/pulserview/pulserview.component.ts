import { Component, OnInit, signal } from '@angular/core';
import { SignalrService } from '../../services/signalr.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pulserview',
  imports: [FormsModule, CommonModule],
  providers: [SignalrService],
  templateUrl: './pulserview.component.html',
  styleUrl: './pulserview.component.scss'
})
export class PulserviewComponent implements OnInit {
  //pumpValue = signal("")
  amountValue = signal("0")
  gallonValue = signal("0")
  startStopService = signal(false)
  setPulser(amount: string, gallon: string) {
    this.amountValue.set(amount);
    this.gallonValue.set(gallon);
  }
  startStopPump(){
    this.startStopService.set(!this.startStopService());
    this.signalrService.startStopPump(this.startStopService());
  }
  startPump() {
    this.signalrService.startStopPump(true);
  }
  stopPump() {
    this.signalrService.startStopPump(false);
  }
  constructor(private signalrService: SignalrService) { }
  ngOnInit(): void {
    this.connectSignalR();
  }
  private connectSignalR(): void {
    this.signalrService.connect().then(() => {
      this.signalrService.getHubConnection().on('SendPulseData', (amount: string, gallon: string) => {
        //TOOD: set the obj data in it.27.00
        this.setPulser(amount, gallon);
      })

      this.signalrService.getHubConnection().on('ReceiveMessage', (user: string, message: string) => {
        console.log('connectSignalR calledx :' + user + ' - ' + message);
        //this.setPulser(user, message);
      })

    })
  }

}
