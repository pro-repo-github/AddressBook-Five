import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    BrowserAnimationsModule, 
    MatToolbarModule, 
    MatFormFieldModule,
    MatTableModule, 
    MatInputModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTabsModule, 
    MatGridListModule,
    MatCardModule, 
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatDialogModule
  ],
  exports: [
    BrowserAnimationsModule, 
    MatToolbarModule, 
    MatFormFieldModule,
    MatTableModule, 
    MatInputModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTabsModule, 
    MatGridListModule, 
    MatCardModule, 
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatDialogModule
  ]
})
export class CustomMaterialModule { }