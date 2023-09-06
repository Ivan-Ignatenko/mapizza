import { Component } from '@angular/core';
import { IActionResponce } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';

import Swiper, { Navigation } from 'swiper';

@Component({
  selector: 'app-swiper-carousel',
  templateUrl: './swiper-carousel.component.html',
  styleUrls: ['./swiper-carousel.component.scss']
})
export class SwiperCarouselComponent {

  public slides: IActionResponce[] = [];

  constructor(
    private actionsService: ActionsService
  ){}

  ngAfterViewInit(): void {
    new Swiper('.swiper-container', {
      modules: [Navigation],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerView: 1
    });
  }

  ngOnInit(): void {
    this.getAllActions();
  }

  getAllActions(): void {
    this.actionsService.getAll().subscribe(data => {
      this.slides = data as IActionResponce[];
    })
  }
}
