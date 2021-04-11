import {Payload, Responder} from 'rsocket-types';
import {Flowable, Single} from 'rsocket-flowable';
import {JsonSerializer} from 'rsocket-core';
import {TableComponent} from '../components/table/table.component';
import {FlopEvent} from '../models/flopevent';

export class TableRSocketResponder implements Responder<any, any> {

  public tableComponent: TableComponent;

  constructor(tableComponent: TableComponent) {
    this.tableComponent = tableComponent;
  }

  metadataPush(payload: Payload<any, any>): Single<void> {
    return Single.error(new Error('not implemented'));
  }

  fireAndForget(payload: Payload<any, string>): void {
    const flopEvent = new FlopEvent();

    Object.assign(flopEvent, JsonSerializer.deserialize(payload.data));
    this.treatFlopEvent(flopEvent);

    logRequest('fire-and-forget', payload);
  }

  requestResponse(
    payload: Payload<any, any>,
  ): Single<Payload<any, any>> {
    logRequest('request-response', payload);
    return Single.of(make('client response'));
  }

  requestStream(
    payload: Payload<any, any>,
  ): Flowable<Payload<any, any>> {
    logRequest('request-stream', payload);
    return Flowable.just(make('client stream response'));
  }

  requestChannel(
    payloads: Flowable<Payload<any, any>>,
  ): Flowable<Payload<any, any>> {
    return Flowable.just(make('client channel response'));
  }

  treatFlopEvent(flopEvent: FlopEvent): void {
    this.tableComponent.cards[flopEvent.cardPosition] = flopEvent.cardName;
  }

}


function logRequest(type: string, payload: Payload<any, any>): void {
  console.log(`Responder response to ${type}, data: ${payload.data || 'null'}`);
}

function make(data: string): Payload<any, any> {
  return {
    data,
    metadata: '',
  };
}


