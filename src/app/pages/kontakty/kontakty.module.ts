import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KontaktyRoutingModule } from './kontakty-routing.module';
import { KontaktyComponent } from './kontakty.component';


@NgModule({
  declarations: [
    KontaktyComponent
  ],
  imports: [
    CommonModule,
    KontaktyRoutingModule
  ]
})
export class KontaktyModule { }
