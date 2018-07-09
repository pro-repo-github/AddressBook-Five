import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Address, createInitialAddress } from './models/model-interfaces';

@Injectable()
export class DataService {
  address: Address = createInitialAddress();
  private messageSource = new BehaviorSubject<Address>(this.address);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(address: Address, url?: String) {
    this.messageSource.next(address)
  }

}