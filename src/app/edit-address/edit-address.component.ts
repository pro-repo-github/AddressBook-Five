import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Address, createInitialAddress } from '../models/model-interfaces';
import { emailValidator, urlValidator } from '../app-validators';
import { AddressService } from '../address.service';
import { DataService } from '../data.service';
import { AddressesStore, ADD, EDIT } from '../addressesStore';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  address: Address = createInitialAddress();
  addressForm: FormGroup;
  addressesArray: FormArray;
  dataServiceSubscription: Subscription;
  paramsSubscription: Subscription;
  showAddressNumber: boolean = false;
  constructor(private addressService: AddressService, private addressesStore: AddressesStore,
    fb: FormBuilder, private route: ActivatedRoute, private router: Router, private data: DataService) {
    this.addressForm = fb.group({
      firstname: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator]],
      phone: ['', []],
      addresses: fb.array([
        this.createAddressControls()
      ]),
      company: fb.group({
        name: ['', []],
        website: ['', [urlValidator]]
      })
    });
    this.addressesArray = <FormArray>this.addressForm.controls['addresses'];
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        const flag = (params['flag']);
        if (!flag) {
          this.dataServiceSubscription = this.data.currentMessage.subscribe(message => { this.loadaddress(message); });
        }
      });
  }
 
  checkCount = 0;

  ngOnChanges(changes: SimpleChanges) {
   //e console.log('Address changed', changes['address'].currentValue);
    console.log('checkCount', this.checkCount++);
  }

  ngOnDestroy(): void {
    if (this.dataServiceSubscription) {
      this.dataServiceSubscription.unsubscribe();
    }
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  private createAddressControls(): FormGroup {
    return new FormGroup({
      street: new FormControl('', [Validators.required]),
      postcode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])
    });
  }

  addAddress() {
    this.addressesArray.push(this.createAddressControls());
    return false;
  }

  removeAddress(i: number) {
    this.addressesArray.removeAt(i);
    return false;
  }

  saveaddress(value: any) {
    Object.assign(this.address, value);
    if (this.address.id) {
      this.addressService.updateAddress(this.address).subscribe(address => {
        this.addressesStore.dispatch({ type: EDIT, data: address });
        this.addressService.socket.emit('broadcast_address', { type: EDIT, data: address });
        const relativeUrl = '../details/';
        this.newMessage(address, relativeUrl);
      });
    } else {
      this.addressService.createAddress(this.address).subscribe(address => {
        this.addressesStore.dispatch({ type: ADD, data: address });
        this.addressService.socket.emit('broadcast_address', { type: ADD, data: address });
        const relativeUrl = '../../details';
        this.newMessage(address, relativeUrl);
      });
    }
  }

  loadaddress(address) {
    this.adjustAddressesArray(address.addresses);
    this.addressForm.patchValue(address);
    this.address = address;
    let addressesArr = this.address.addresses;
    const indexLength = addressesArr.length;
    if (indexLength > 1) {
      this.showAddressNumber = true;
    }
  }

  private adjustAddressesArray(addresses: any[]) {
    const AddressCount = addresses ? addresses.length : 0;
    while (AddressCount > this.addressesArray.controls.length) {
      this.addAddress();
    }
    while (AddressCount < this.addressesArray.controls.length) {
      this.removeAddress(0);
    }
  }

  newMessage(address, url) {
    this.data.changeMessage(address);
    this.router.navigate([url], { relativeTo: this.route });
  }

}

