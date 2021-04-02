import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Encodable, IdentitySerializer, JsonSerializer, RSocketClient} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import {ReactiveSocket} from 'rsocket-types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute) { }

  public id: number;
  public cards: string[] ;
  public cardsNumber: number;
  public cursor: number;

  public client: RSocketClient<Encodable, any>;

  private colors = ['C', 'D', 'H', 'S'];
  private cardNumbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = +params.id;
    });
    this.cardsNumber = 5;
    this.cards = [];
    for (let i = 0; i < this.cardsNumber; i++) {
      this.cards.push('green_back');
    }
    this.cursor = 0;

    this.client = new RSocketClient({
      serializers: {
        data: JsonSerializer,
        metadata: IdentitySerializer
      },
      setup: {
        keepAlive: 60000,
        lifetime: 180000,
        dataMimeType: 'application/json',
        metadataMimeType: 'message/x.rsocket.routing.v0',
      },
      transport: new RSocketWebSocketClient({
        url: 'ws://localhost:7000/rsocket'
      }),
    });

    this.client.connect().subscribe({
      onComplete: (socket: ReactiveSocket<any, any>) => {
        socket
          .metadataPush( {
            data: 'ana are mere',
            metadata: String.fromCharCode('table-connection'.length) + 'table-connection'
          })
          .subscribe({
            onComplete: () => console.log('complete'),
            onError: error => {
              console.log('Connection has been closed due to:: ' + error);
            }
          });

      },
      onError: error => {
        console.log('Connection has been refused due to:: ' + error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.client) {
      this.client.close();
    }
  }

  nextCard(): void {
    if (this.cursor === 0) {
      this.reset();
    }
    const randomColor = this.colors[Math.floor(Math.random() * (this.colors.length ))];
    const randomCardNumber =  this.cardNumbers[Math.floor(Math.random() * (this.cardNumbers.length ))];
    this.cards[this.cursor] =  randomCardNumber + randomColor;
    this.cursor = (this.cursor + 1) % this.cardsNumber;
  }

  reset(): void {
    for (let i = 0; i < this.cardsNumber; i++) {
      this.cards[i] = 'green_back';
    }
    this.cursor = 0;
  }

}
