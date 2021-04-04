import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  BufferEncoders,
  Encodable,
  encodeAndAddCustomMetadata,
  encodeAndAddWellKnownMetadata,
  IdentitySerializer,
  JsonSerializer,
  MESSAGE_RSOCKET_COMPOSITE_METADATA,
  MESSAGE_RSOCKET_ROUTING,
  RSocketClient
} from 'rsocket-core';

import RSocketWebSocketClient from 'rsocket-websocket-client';
import {ReactiveSocket} from 'rsocket-types';
import {OAuthService} from 'angular-oauth2-oidc-codeflow';

const metadataMimeType = MESSAGE_RSOCKET_COMPOSITE_METADATA.string;
const bearerMimeType = 'message/x.rsocket.authentication.bearer.v0';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute,
              private oauthService: OAuthService) { }

  public tableId: number;
  public cards: string[] ;
  public cardsNumber: number;
  public cursor: number;

  public client: RSocketClient<Encodable, any>;

  private colors = ['C', 'D', 'H', 'S'];
  private cardNumbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];



  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.tableId = +params.id;
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
        metadataMimeType,
      },
      transport: new RSocketWebSocketClient({
        url: 'ws://localhost:7000/rsocket',
        debug: true
      }, BufferEncoders),
      errorHandler: (error => console.log(error)),
    });
    const socketChannel = 'table-connection.' + this.tableId;
    this.client.connect().subscribe({
      onComplete: (socket: ReactiveSocket<any, any>) => {
        socket
          .metadataPush( {
            data: null,
            metadata: encodeAndAddWellKnownMetadata(
              encodeAndAddCustomMetadata(
                Buffer.alloc(0),
                bearerMimeType,
                Buffer.from(this.oauthService.getAccessToken())
              ),
              MESSAGE_RSOCKET_ROUTING,
              Buffer.from(String.fromCharCode(socketChannel.length) + socketChannel)
            )
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
