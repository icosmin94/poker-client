import { Injectable } from '@angular/core';
import {TableComponent} from '../components/table/table.component';
import {CardRiverEvent, CardsFlopEvent, CardTurnEvent, RsocketEvent} from '../models/rsocket-event';

@Injectable({
  providedIn: 'root'
})


export class EventHandlerService {

  constructor() { }

  strategies: Map<string, (tableComponent: TableComponent, payload: any) => void> = new Map([
    ['CARDS_FLOP', this.handleFlopEvent],
    ['RESET_TABLE', this.handleResetTableEvent],
    ['CARD_TURN', this.handleTurnEvent],
    ['CARD_RIVER', this.handleRiverEvent]
  ]);


  public handleEvent(tableComponent: TableComponent, event: RsocketEvent): void {
    const strategy = this.strategies.get(event.eventName);
    if (strategy) {
      strategy(tableComponent, event.payload);
    } else {
      console.error(`Could not find strategy for event of type ${event.eventName}`);
    }
  }

  private handleResetTableEvent(tableComponent: TableComponent): void {
    tableComponent.resetCards();
  }

  private handleFlopEvent(tableComponent: TableComponent, payload: any): void {
    const event = new CardsFlopEvent();
    Object.assign(event, payload);
    for (let i = 0; i < event.cardNames.length; i++) {
      tableComponent.setCard(event.cardNames[i], i);
    }
  }

  private handleTurnEvent(tableComponent: TableComponent, payload: any): void {
    const event = new CardTurnEvent();
    Object.assign(event, payload);
    tableComponent.setCard(event.cardName, 3);
  }

  private handleRiverEvent(tableComponent: TableComponent, payload: any): void {
    const event = new CardRiverEvent();
    Object.assign(event, payload);
    tableComponent.setCard(event.cardName, 4);
  }
}
