import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EditAddressComponent } from './edit-address.component';
import { AddressService } from '../address.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";


describe('EditAddressComponent', () => {
  let component: EditAddressComponent;
  let fixture: ComponentFixture<EditAddressComponent>;

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
    fixture.detectChanges();
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
});
