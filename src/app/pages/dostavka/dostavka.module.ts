import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DostavkaRoutingModule } from './dostavka-routing.module';
import { DostavkaComponent } from './dostavka.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DostavkaComponent
  ],
  imports: [
    CommonModule,
    DostavkaRoutingModule,
    SharedModule
  ]
})
export class DostavkaModule { }
