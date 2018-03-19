import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { AddressService } from '../address.service';
import { Address, createInitialAddress } from '../models/model-interfaces';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {
  address: Address = createInitialAddress();
  subscription: Subscription;
  deleteConfirmation: string;
  show: boolean = false;

  constructor(private addressService: AddressService, private route: ActivatedRoute, private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(params => {
        const id = (params['id']);
        if (id) {
          this.loadaddress(id);
        }
      });
  }

  loadaddress(id: number) {
    this.addressService.getAddress(id).subscribe(address => {
      this.address = address;
      let addressesArr = this.address.addresses;
      const indexLength = addressesArr.length;
      if (indexLength > 1) {
        this.show = true;
      }
    });
  }

  deleteAddress(id: number) {
    this.addressService.deleteAddress(id).subscribe(address => {
      const relativeUrl = '../..';
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


