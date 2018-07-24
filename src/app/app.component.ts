import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AddressService } from './address.service';
import { Address } from './models/model-interfaces';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  
  addressCounter: number;

  constructor(private addressService: AddressService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadAddressCounter();
  }

  loadAddressCounter() {
    this.addressService.addresses$.subscribe((addresses) => {
     this.addressCounter= addresses.map((address:Address)=>{}).length;
     this.changeDetector.markForCheck();
    });

  }

 
}
