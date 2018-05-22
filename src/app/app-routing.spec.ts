import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { AddressListComponent } from './address-list/address-list.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AddressService } from './address.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app-routing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Component } from '@angular/core';
import { CustomMaterialModule } from './custom-material.Module';

describe('Router: App', () => {
    let location: Location;
    let router: Router;
    let fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CustomMaterialModule, ReactiveFormsModule, HttpModule, RouterTestingModule.withRoutes(routes)],
            declarations: [
                AddressListComponent,
                EditAddressComponent,
                AddressDetailsComponent,
                AboutComponent,
                HomeComponent,
                AppComponent
            ], providers: [AddressService], schemas: [NO_ERRORS_SCHEMA]

        });

        router = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture = TestBed.createComponent(AppComponent);
    });

    it('navigate to "home" takes you to /home', fakeAsync(() => {
        router.navigate(['home']);
        tick();
        expect(location.path()).toBe('/home');
    }));
   
    it('navigate to "list" takes you to /list', fakeAsync(() => {
        router.navigate(['list']);
        tick();
        expect(location.path()).toBe('/list');
    }));
   
    it('navigate to "list/new" takes you to /list/new', fakeAsync(() => {
        router.navigate(['list/new']);
        tick();
        expect(location.path()).toBe('/list/new');
    }));
   
    it('navigate to "list/edit/1" takes you to /list/edit/1', fakeAsync(() => {
        router.navigate(['list/edit',1]);
        tick();
        expect(location.path()).toBe('/list/edit/1');
    }));
    
    it('navigate to "about" takes you to /about', fakeAsync(() => {
        router.navigate(['about']);
        tick();
        expect(location.path()).toBe('/about');
    }));
    
});