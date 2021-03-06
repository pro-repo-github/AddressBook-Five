import { Injectable, Inject } from '@angular/core';
import { Address } from './models/model-interfaces';
import { AddressesStore, LOAD, ADD } from './addressesStore';
import { Http, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import { SOCKET_IO } from './app.tokens';
const WEB_SOCKET_URL = 'http://localhost:3001';
const BASE_URL = 'http://localhost:3000/api/addresses/';
@Injectable()
export class AddressService {
  addresses$: Observable<Address[]>;
  socket: SocketIOClient.Socket;

  constructor(private http: Http, private addressesStore: AddressesStore, @Inject(SOCKET_IO) socketIO) {
    this.http.get(BASE_URL).map(res => res.json())
      .subscribe((tasks) => {
        this.addressesStore.dispatch({ type: LOAD, data: tasks });
      });
    this.addresses$ = addressesStore.items$;
    this.socket = socketIO(WEB_SOCKET_URL);
    Observable.fromEvent(this.socket, 'address_saved')
      .subscribe((address) => {
        this.addressesStore.dispatch(address);
      });
  }

  getAddress(id: number | string): Observable<Address> {
    return this.http.get(BASE_URL + id)
      .map(res => res.json());
  }

  createAddress(Address: Address): Observable<Address> {
    return this.http.post(BASE_URL, Address)
      .map(res => res.json());
  }

  updateAddress(Address: Address) {
    return this.http.put(BASE_URL + Address.id, Address)
      .map(res => res.json());
  }

  deleteAddress(id: number): Observable<Response> {
    return this.http.delete(BASE_URL + id);
  }

  saveAddress(Address: Address) {
    const options = {
      body: Address,
      method: Address.id ? RequestMethod.Put : RequestMethod.Post
    };

    return this.http.request(BASE_URL + (Address.id || ''), options)
      .map(res => res.json());
  }
}
