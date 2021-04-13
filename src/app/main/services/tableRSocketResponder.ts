import {Payload, Responder} from 'rsocket-types';
import {Flowable, Single} from 'rsocket-flowable';
import {JsonSerializer} from 'rsocket-core';
import {TableComponent} from '../components/table/table.component';
import {RsocketEvent} from '../models/rsocket-event';
import {EventHandlerService} from './event-handler.service';

export class TableRSocketResponder implements Responder<any, any> {

  private tableComponent: TableComponent;
  private eventHandlerService: EventHandlerService;

  constructor(tableComponent: TableComponent, eventHandlerService: EventHandlerService) {
    this.tableComponent = tableComponent;
    this.eventHandlerService = eventHandlerService;
  }

  metadataPush(payload: Payload<any, any>): Single<void> {
    return Single.error(new Error('not implemented'));
  }

  fireAndForget(payload: Payload<any, string>): void {
    const event = new RsocketEvent();
    Object.assign(event, JsonSerializer.deserialize(payload.data));
    this.eventHandlerService.handleEvent(this.tableComponent, event)
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


