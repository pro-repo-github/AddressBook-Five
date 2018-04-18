import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddressDetailsComponent } from './address-details.component';
import { AddressService } from '../address.service';
import { HttpModule } from '@angular/http';
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from '@angular/material/dialog';

describe('AddressDetailsComponent', () => {
  let component: AddressDetailsComponent;
  let fixture: ComponentFixture<AddressDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressDetailsComponent], schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpModule,
        RouterTestingModule,
        MatDialogModule
      ], providers: [AddressService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
