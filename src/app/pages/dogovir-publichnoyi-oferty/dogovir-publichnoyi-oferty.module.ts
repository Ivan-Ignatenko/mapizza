import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogovirPublichnoyiOfertyRoutingModule } from './dogovir-publichnoyi-oferty-routing.module';
import { DogovirPublichnoyiOfertyComponent } from './dogovir-publichnoyi-oferty.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DogovirPublichnoyiOfertyComponent
  ],
  imports: [
    CommonModule,
    DogovirPublichnoyiOfertyRoutingModule,
    SharedModule
  ]
})
export class DogovirPublichnoyiOfertyModule { }
