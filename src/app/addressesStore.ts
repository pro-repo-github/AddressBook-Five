import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Address } from './models/model-interfaces';

export const LOAD = 'LOAD';
export const ADD = 'ADD';
export const EDIT = 'EDIT';
export const REMOVE = 'REMOVE';

export class AddressesStore {
  private addresses: Address[] = [];
  items$ = new BehaviorSubject<Address[]>([]);

  dispatch(action) {
    console.log("dispatched")
    this.addresses = this._reduce(this.addresses, action);
    this.items$.next(this.addresses);
  }

  _reduce(addresses: Address[], action) {
    switch (action.type) {
      case LOAD:
        return [...action.data];
      case ADD:
        return [...addresses, action.data];
      case EDIT:
        return addresses.map(address => {
          const editedAddress = action.data;
          if (address.id !== editedAddress){
            return address;
          }
          return editedAddress      });
      case REMOVE:
        return addresses.filter(address => address.id !== action.data.id);
      default:
        return addresses;
    }
  }
}