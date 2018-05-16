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
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('AddressListComponent', () => {
    let component: AddressListComponent;
    let fixture: ComponentFixture<AddressListComponent>;
    let addressService: AddressService;
    let ngContainer: DebugElement;
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
            "firstname": "Max",
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
            declarations: [AddressListComponent],
            imports: [
                MatTableModule,
                MatPaginatorModule,
                MatSortModule,
                MatListModule,
                MatFormFieldModule,
                MatInputModule,
                HttpModule,
                RouterTestingModule.withRoutes([]),
                BrowserAnimationsModule
            ], schemas: [NO_ERRORS_SCHEMA], providers: [AddressService]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddressListComponent);
        component = fixture.componentInstance;
        addressService = TestBed.get(AddressService);
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
      });
    it('should call addressService loadAllAddress, Load All Addresses and fill mat-table', fakeAsync(() => {
        spyOn(addressService, "loadAllAddress").and.callFake(function () {
            component.dataSource = new MatTableDataSource(addressArray);
            component.dataSource.paginator = component.paginator;
            component.dataSource.sort = component.sort;
            return Observable.from([]);
        });
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        expect(addressService.loadAllAddress).toHaveBeenCalled();
        expect(component.dataSource.filteredData).toEqual(addressArray);
        expect(fixture.debugElement.nativeElement.querySelector('mat-table')).toBeDefined();
    }));

});