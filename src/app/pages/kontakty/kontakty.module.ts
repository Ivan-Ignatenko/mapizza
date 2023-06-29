import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KontaktyRoutingModule } from './kontakty-routing.module';
import { KontaktyComponent } from './kontakty.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    KontaktyComponent
  ],
  imports: [
    CommonModule,
    KontaktyRoutingModule,
    SharedModule
  ]
})
export class KontaktyModule { }
