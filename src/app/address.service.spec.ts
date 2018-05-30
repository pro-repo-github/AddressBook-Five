
import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { BaseRequestOptions, Http, ConnectionBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { HttpModule } from '@angular/http';
import { AddressService } from './address.service';
import { MockBackend } from '@angular/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
let addressesArray: any[] = [
  {
      "addresses": [
          {
              "street": "Musterstraße 17",
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
      "email": "abc.muster@provider.ch",
      "phone": "0000000000000",
      "id": 100
  },
  {
      "addresses": [
          {
              "street": "Musterstraße 18",
              "postcode": "1234",
              "city": "Musterstadt ",
              "country": "Switzerland"
          }
      ],
      "company": {
          "name": "Mustermann Company",
          "website": "www.mustermann.ch"
      },
      "firstname": "Max ",
      "surname": "Mustermann",
      "email": "max.muster@provider.ch",
      "phone": "0000000000000",
      "id": 102
  }
];
let chosedaddress: any = {
  "addresses": [
    {
      "street": "Musterstraße 17 ",
      "postcode": "1234",
      "city": "Musterstadt",
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
describe('AddressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ], providers: [
        AddressService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http, useFactory: (mockBackend: ConnectionBackend,
            defaultOptions: BaseRequestOptions) => {
            return new Http(mockBackend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
      ], schemas: [NO_ERRORS_SCHEMA]
    });
  });

  let addressService: AddressService;
  let mockBackend: MockBackend;

  beforeEach(inject([AddressService, MockBackend],
    (_addressService, _mockBackend) => {
      addressService = _addressService;
      mockBackend = _mockBackend;
    })
  );

  it('should be created', inject([AddressService], (service: AddressService) => {
    expect(service).toBeTruthy();
  }));

  it('should trigger a HTTP-GET and return All Addresses', (() => {
    mockBackend.connections.subscribe(connection => {
      const expectedUrl = 'http://localhost:3000/api/addresses/';
      expect(connection.request.url).toBe(expectedUrl);
      expect(connection.request.method).toBe(RequestMethod.Get);
      const response = new ResponseOptions({ body: JSON.stringify(addressesArray) });
      connection.mockRespond(new Response(response));
    });
    addressService.loadAllAddress().subscribe(
      addresses => {
       //first addressesArray object
        expect(addresses[0].email).toBe('abc.muster@provider.ch');
        expect(addresses[0].company.name).toBe('ABC Company');
        expect(addresses[0].addresses[0].street).toBe('Musterstraße 17');
        //second addressesArray object
        expect(addresses[1].email).toBe('max.muster@provider.ch');
        expect(addresses[1].company.name).toBe('Mustermann Company');
        expect(addresses[1].addresses[0].street).toBe('Musterstraße 18');
      });
  }));

  it('should trigger a HTTP-GET with address-id and return the Address', (() => {
    mockBackend.connections.subscribe(connection => {
      const expectedUrl = 'http://localhost:3000/api/addresses/104';
      expect(connection.request.url).toBe(expectedUrl);
      expect(connection.request.method).toBe(RequestMethod.Get);
      const response = new ResponseOptions({ body: JSON.stringify(chosedaddress) });
      connection.mockRespond(new Response(response));
    });
    addressService.getAddress(104).subscribe(
      address => {
        expect(address.email).toBe('max.muster@provider.ch');
        expect(address.company.name).toBe('Mustermann Company');
        expect(address.addresses[0].city).toBe('Musterstadt');
      });
  }));

  it('should trigger a HTTP-Put with Address, the address_id and return the Address', (() => {
    mockBackend.connections.subscribe(connection => {
      const expectedUrl = 'http://localhost:3000/api/addresses/104';
      expect(connection.request.url).toBe(expectedUrl);
      expect(connection.request.method).toBe(RequestMethod.Put);
      const response = new ResponseOptions({ body: JSON.stringify(chosedaddress) });
      connection.mockRespond(new Response(response));
    });
    addressService.updateAddress(chosedaddress).subscribe(
      address => {
        expect(address.email).toBe('max.muster@provider.ch');
        expect(address.company.name).toBe('Mustermann Company');
        expect(address.addresses[0].city).toBe('Musterstadt');
      });
  }));

  it('should trigger a HTTP-POST with new Address and return the new Address', (() => {
    mockBackend.connections.subscribe(connection => {
      const expectedUrl = 'http://localhost:3000/api/addresses/';
      expect(connection.request.url).toBe(expectedUrl);
      expect(connection.request.method).toBe(RequestMethod.Post);
      const response = new ResponseOptions({ body: JSON.stringify(chosedaddress) });
      connection.mockRespond(new Response(response));
    });
    addressService.createAddress(chosedaddress).subscribe(
      address => {
        expect(address.email).toBe('max.muster@provider.ch');
        expect(address.company.name).toBe('Mustermann Company');
        expect(address.addresses[0].city).toBe('Musterstadt');
      });
  }));

  it('should trigger a HTTP-Delete with address_id and return status 200', (() => {
    mockBackend.connections.subscribe(connection => {
      const expectedUrl = 'http://localhost:3000/api/addresses/104';
      expect(connection.request.url).toBe(expectedUrl);
      expect(connection.request.method).toBe(RequestMethod.Delete);
      const response = new ResponseOptions({ status: 200});
      connection.mockRespond(new Response(response));
    });
    addressService.deleteAddress(104).subscribe(
      responseData => {
        expect(responseData.status).toBe(200);
      });
  }));
});
