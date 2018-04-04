import { Injectable } from '@angular/core';
import { Address } from './models/model-interfaces';
import { Http, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
const BASE_URL = 'http://localhost:3000/api/addresses/';
@Injectable()
export class AddressService {

  constructor(private http: Http) { }

  loadAllAddress(): Observable<Address[]> {
    return this.http.get(BASE_URL)
      .map(res => res.json());
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