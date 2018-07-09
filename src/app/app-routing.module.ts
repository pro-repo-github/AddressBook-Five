import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressListComponent } from './address-list/address-list.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
//list
export const routes: Routes = [{ path: 'home', component: HomeComponent },
{
  path: 'list',
  children: [{
    path: '', component: AddressListComponent
  },
  { path: 'details', component: AddressDetailsComponent },
  { path: 'edit', component: EditAddressComponent },
  { path: 'new/:flag', component: EditAddressComponent }]
},
{ path: 'about', component: AboutComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
