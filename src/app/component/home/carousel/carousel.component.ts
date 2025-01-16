import { Component } from '@angular/core';
import {OwlOptions,CarouselModule} from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-carousel',
  imports: [CarouselModule, ],
  templateUrl: './carousel.component.html',
  standalone: true,
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
}
