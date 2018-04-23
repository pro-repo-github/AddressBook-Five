import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddressListComponent } from './address-list.component';
import { MatTableDataSource, MatSort, MatPaginator, } from '@angular/material';
import { AddressService } from '../address.service';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

 
describe('AddressListComponent', () => {
let component: AddressListComponent;
let fixture: ComponentFixture<AddressListComponent>;
let addressService: AddressService;
let matTable: DebugElement;
const addressArray: any[] = [
{
"addresses": [
{
"street": "Musterstraße 17 ",
"postcode": "1234",
"city": "Musterstadt ",
"country": "Switzerland"
}
],
"company": {
"name": "ABC Company",
"website": "www.mustermann.ch"
},
"firstname": "Max ",
"surname": "Mustermann",
"email": "max.muster@provider.ch",
"phone": "0000000000000",
"id": 100
},
{
"addresses": [
{
"street": "Musterstraße 17 ",
"postcode": "1234",
"city": "Musterstadt ",
"country": "Switzerland"
}
],
"company": {
"name": "Mustermann Company",
"catchPhrase": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
"website": "www.mustermann.ch"
},
"firstname": "Max ",
"surname": "Mustermann",
"email": "max.muster@provider.ch",
"phone": "0000000000000",
"id": 102
}
];
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [AddressListComponent], schemas: [NO_ERRORS_SCHEMA],
imports: [
MatTableModule,
MatPaginatorModule,
MatSortModule,
MatListModule,
MatFormFieldModule,
MatInputModule,
HttpModule,
BrowserAnimationsModule
], providers: [AddressService]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(AddressListComponent);
component = fixture.componentInstance;
addressService = TestBed.get(AddressService);
matTable = fixture.debugElement.query(By.css('mat-table'));
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
it('should call addressService loadAllAddress methode', fakeAsync(() => {
spyOn(addressService, 'loadAllAddress').and.returnValue(Observable.from([addressArray]));
component.ngOnInit();
tick();
expect(addressService.loadAllAddress).toHaveBeenCalled();
}));
it('should show mat-table contain', fakeAsync(() => {
spyOn(addressService, 'loadAllAddress').and.returnValue(Observable.from([addressArray]));
component.ngOnInit();
tick();
expect(matTable.nativeElement.textContent.trim()).toContain('Firstname');
}));
});