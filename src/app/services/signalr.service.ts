import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private readonly hubConnection: HubConnection;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5031/pulserconnection")
      .build();
  }
  getHubConnection(): HubConnection {
    return this.hubConnection;
  }
  async startStopPump(isStarted:boolean): Promise<void> {
    try {
      await this.hubConnection.invoke('PumpStartStop', isStarted);
    } catch (error) {
      console.error('Error invoking PumpStartStop:', error);
    }
  }

  async connect(): Promise<void> {
    try {
      await this.hubConnection.start();
      console.log('SignalR connected');
    } catch (error) {
      console.error('SignalR connection error:', error);
    }
  }
  
}
