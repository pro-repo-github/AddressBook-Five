import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { AddressService } from './address.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ], schemas: [NO_ERRORS_SCHEMA], providers: [AddressService]
    });
  });

  it('should be created', inject([AddressService], (service: AddressService) => {
    expect(service).toBeTruthy();
  }));
});
