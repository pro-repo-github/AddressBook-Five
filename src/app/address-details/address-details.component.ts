import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { AddressService } from '../address.service';
import { AddressesStore, REMOVE } from '../addressesStore';
import { DataService } from '../data.service';
import { Address } from '../models/model-interfaces';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})

export class AddressDetailsComponent implements OnInit {
  address: Address;
  dataServiceSubscription: Subscription;
  deleteConfirmation: string;
  showAddressNumber: boolean = false;

  constructor(private addressService: AddressService, private addressesStore: AddressesStore, private route: ActivatedRoute, private router: Router,
    public dialog: MatDialog, private data: DataService) { }

  ngOnInit() {
   this.dataServiceSubscription = this.data.currentMessage.subscribe(message => { this.loadaddress(message); }); 
  }

  ngOnDestroy(): void {
    if (this.dataServiceSubscription) {
      this.dataServiceSubscription.unsubscribe();
    }
  }

  loadaddress(address) {
    this.address = address;
    let addressesArr = this.address.addresses;
    const indexLength = addressesArr.length;
    if (indexLength > 1) {
      this.showAddressNumber = true;
    }
  }

  deleteAddress(id: number) {
    this.addressService.deleteAddress(id).subscribe(address => {
      this.addressesStore.dispatch({ type: REMOVE, data: { id: id } });
      this.addressService.socket.emit('broadcast_address', { type: REMOVE, data: { id: id } });
      const relativeUrl = '..';
      this.router.navigate([relativeUrl], { relativeTo: this.route });
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '600px',
      data: {
        firstname: this.address.firstname,
        surname: this.address.surname,
        email: this.address.email,
        phone: this.address.phone
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteConfirmation = result;
      if (this.deleteConfirmation == "yes") {
        this.deleteAddress(this.address.id);
      }
    });
  }

}


