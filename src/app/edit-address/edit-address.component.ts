import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Address, createInitialAddress } from '../models/model-interfaces';
import { emailValidator, urlValidator } from '../app-validators';
import { AddressService } from '../address.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  address: Address = createInitialAddress();
  addressForm: FormGroup;
  addressesArray: FormArray;
  subscription: Subscription;
  showAddressNumber: boolean = false;
  constructor(private addressService: AddressService,
    fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
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
    this.subscription = this.route.params
      .subscribe(params => {
        const id = (params['id']);
        if (id) {
          this.loadaddress(id);
        }
      });
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
        const relativeUrl = '../../details/' + address.id;
        this.router.navigate([relativeUrl], { relativeTo: this.route });
      });
    } else {
      this.addressService.createAddress(this.address).subscribe(address => {
        const relativeUrl = '../details/' + address.id;
        this.router.navigate([relativeUrl], { relativeTo: this.route });
      });
    }
  }

  loadaddress(id: number) {
    this.addressService.getAddress(id).subscribe(address => {
      this.adjustAddressesArray(address.addresses);
      this.addressForm.patchValue(address);
      this.address = address;
      let addressesArr = this.address.addresses;
      const indexLength = addressesArr.length;
      if (indexLength > 1) {
        this.showAddressNumber = true;
      }
    });
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

  cancel() {
    const relativeUrl = this.router.url.includes('new') ? '..' : '../../details/' + this.address.id;
    this.router.navigate([relativeUrl], { relativeTo: this.route });
    return false;
  }

}

