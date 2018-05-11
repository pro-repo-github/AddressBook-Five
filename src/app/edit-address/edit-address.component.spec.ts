import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EditAddressComponent } from './edit-address.component';
import { AddressService } from '../address.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';


describe('EditAddressComponent', () => {
  let component: EditAddressComponent;
  let fixture: ComponentFixture<EditAddressComponent>;
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
      declarations: [EditAddressComponent], imports: [
        HttpModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes([])
      ], providers: [AddressService], schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressComponent);
    component = fixture.componentInstance;
    addressService = TestBed.get(AddressService);
    route = TestBed.get(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.addressForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    let email = component.addressForm.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['invalidEmail']).toBeTruthy();

    // Set email to something correct
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['invalidEmail']).toBeFalsy();
  });

  it('website field validity', () => {
    let errors = {};
    let website = component.addressForm.get('company.website');
    expect(website.valid).toBeTruthy();

    // Set website to something
    website.setValue("test");
    errors = website.errors || {};
    expect(errors['invalidUrl']).toBeTruthy();

    // Set website to something correct
    website.setValue("www.test.com");
    errors = website.errors || {};
    expect(errors['invalidUrl']).toBeFalsy();
  });

  it('should call addressService getAddress, Load chosedAddress and fill the form', async(() => {
    spyOn(addressService, 'getAddress').and.returnValue(Observable.of(chosedaddress));
    (<any>route.params).next({ id: '42' });
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(addressService.getAddress).toHaveBeenCalled();
      let email = component.addressForm.controls['email'];
      expect(email.value).toBe('max.muster@provider.ch');
      let website = component.addressForm.get('company.website');
      expect(website.value).toBe('www.mustermann.ch');
    });

  }));

  it('form valid when full', async(() => {
    spyOn(addressService, 'getAddress').and.returnValue(Observable.of(chosedaddress));
    (<any>route.params).next({ id: '42' });
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(addressService.getAddress).toHaveBeenCalled();
      expect(component.addressForm.valid).toBeTruthy();
    });

  }));

  it('should press the save button and call component saveaddress with the chosedAddress as argument', async(() => {
    spyOn(addressService, 'getAddress').and.returnValue(Observable.of(chosedaddress));
    let spySaveaddress = spyOn(component, 'saveaddress').and.callFake(function () { });
    (<any>route.params).next({ id: '42' });
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(addressService.getAddress).toHaveBeenCalled();
      fixture.detectChanges();
      fixture.debugElement.nativeElement.querySelector('button[type=submit]').click();
      expect(component.saveaddress).toHaveBeenCalled();
      let findArguments = spySaveaddress.calls.mostRecent().args;
      expect(findArguments[0].firstname).toBe(chosedaddress.firstname);
    });

  }));

});
