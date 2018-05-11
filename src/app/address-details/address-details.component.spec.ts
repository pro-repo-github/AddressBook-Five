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
      "catchPhrase": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
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
        MatDialogModule
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
  it('should load the correct address in address-details-mode', fakeAsync(() => {
    const spy = spyOn(addressService, 'getAddress').and.returnValue(Observable.of(chosedaddress));
    component.ngOnInit();
    fixture.detectChanges();
    tick();
    expect(spy).toHaveBeenCalledWith('42');
    expect(component.address).toEqual(chosedaddress);
    expect(component.address.firstname).toBe("Max");
    let matListItem = fixture.debugElement.query(By.css('mat-list-item'));
    expect(matListItem.nativeElement.textContent).toContain('Max');
  }));
});
