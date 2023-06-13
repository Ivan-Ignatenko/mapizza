import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogovirPublichnoyiOfertyRoutingModule } from './dogovir-publichnoyi-oferty-routing.module';
import { DogovirPublichnoyiOfertyComponent } from './dogovir-publichnoyi-oferty.component';


@NgModule({
  declarations: [
    DogovirPublichnoyiOfertyComponent
  ],
  imports: [
    CommonModule,
    DogovirPublichnoyiOfertyRoutingModule
  ]
})
export class DogovirPublichnoyiOfertyModule { }
