import {
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatDialogModule,
  MatTabsModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule
  ],
})
export class MaterialModule { }