import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, } from '@angular/material';
import { AddressService } from '../address.service';
import { DataService } from '../data.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements AfterViewInit {
  dataSource: any;
  displayedColumns = ['firstname', 'surname', 'company', 'email', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private addressService: AddressService, private cdr: ChangeDetectorRef,
    private data: DataService, private router: Router) { }

  ngAfterViewInit() {
    this.loadAllAddress();
    this.cdr.detectChanges();
  }

  loadAllAddress() {
    this.addressService.addresses$.subscribe((addresses) => {
      this.dataSource = new MatTableDataSource(addresses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  deleteAddress(id: number) {
    this.addressService.deleteAddress(id).subscribe(() => {
      this.loadAllAddress();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  newMessage(address) {
    this.data.changeMessage(address);
    this.router.navigate(['/list/details']);
  }
}




