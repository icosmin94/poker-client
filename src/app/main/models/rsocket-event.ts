export class RsocketEvent {
  timeStamp: number;
  eventName: string;
  payload: any;
  constructor() {
  }
}

export class CardsFlopEvent {
  cardNames: [string];
}

export class CardTurnEvent {
  cardName: string;
}

export class CardRiverEvent {
  cardName: string;
}
