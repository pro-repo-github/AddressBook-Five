import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, } from '@angular/material';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  dataSource: any;
  displayedColumns = ['firstname', 'surname', 'company', 'email', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private addressService: AddressService) { }

  ngOnInit() {
    this.loadAllAddress();
  }

  loadAllAddress() {
    this.addressService.loadAllAddress().subscribe((addresses) => {
      this.dataSource = new MatTableDataSource(addresses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteAddress(id: number) {
    this.addressService.deleteAddress(id).subscribe(address => {
      this.loadAllAddress();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}




