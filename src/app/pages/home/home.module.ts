import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { SwiperCarouselComponent } from './swiper-carousel/swiper-carousel.component';


@NgModule({
  declarations: [
    HomeComponent,
    SwiperCarouselComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
