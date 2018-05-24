import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddressDetailsComponent } from './address-details.component';
import { AddressService } from '../address.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

describe('AddressDetailsComponent', () => {
  let component: AddressDetailsComponent;
  let fixture: ComponentFixture<AddressDetailsComponent>;
  let addressService: AddressService;
  let route: ActivatedRoute;
  let chosedaddress: any = {
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
      "website": "www.mustermann.ch"
    },
    "firstname": "Max",
    "surname": "Mustermann",
    "email": "max.muster@provider.ch",
    "phone": "0000000000000",
    "id": 104
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressDetailsComponent], schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatCardModule,
        MatListModule
      ], providers: [AddressService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressDetailsComponent);
    component = fixture.componentInstance;
    addressService = TestBed.get(AddressService);
    route = TestBed.get(ActivatedRoute);
    (<any>route.params).next({ id: '42' });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addressService getAddress with the address_id and load the Address', fakeAsync(() => {
    const spy = spyOn(addressService, 'getAddress').and.returnValue(Observable.of(chosedaddress));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('42');
    expect(component.address).toEqual(chosedaddress);
    expect(component.address.firstname).toBe("Max");
  }));

  it('should call addressService getAddress, Load the Address and fill mat-card-content mat-list:first-child', fakeAsync(() => {
   spyOn(addressService, 'getAddress').and.returnValue(Observable.of(chosedaddress));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    let matList = fixture.debugElement.query(By.css('.mat-list:first-child')).nativeElement;
    //firstname
    let spanTextContent = matList.querySelector('.mat-list-item:first-child .mat-list-item-content span').textContent;
    expect(spanTextContent).toBe('Max');
    //surname
    spanTextContent = matList.querySelector('.mat-list-item:nth-last-child(4) .mat-list-item-content span').textContent;
    expect(spanTextContent).toBe('Mustermann');
    //email
    spanTextContent = matList.querySelector('.mat-list-item:nth-last-child(3) .mat-list-item-content span').textContent;
    expect(spanTextContent).toBe('max.muster@provider.ch');
    //company name
    spanTextContent = matList.querySelector('.mat-list-item:nth-last-child(2) .mat-list-item-content span').textContent;
    expect(spanTextContent).toBe('Mustermann Company');
    //company website
    spanTextContent = matList.querySelector('.mat-list-item:last-child .mat-list-item-content span').textContent;
    expect(spanTextContent).toBe('www.mustermann.ch');

  }));
});
