import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressListComponent } from './address-list/address-list.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AddressService } from './address.service';
import { AddressesStore, REMOVE } from './addressesStore';
import { CustomMaterialModule } from './custom-material.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowValidationErrorComponent } from './show-validation-error/show-validation-error.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressListComponent,
    EditAddressComponent,
    AboutComponent,
    HomeComponent,
    ShowValidationErrorComponent,
    AddressDetailsComponent,
    DeleteConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  entryComponents: [AddressDetailsComponent, DeleteConfirmDialogComponent],
  providers: [AddressService, AddressesStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
