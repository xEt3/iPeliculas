import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input()peliculas:Pelicula[]=[]
  
  slidesOpt={
    slidesPerView: 4.2,
    breakpoints: {
      // when window width is <= 720px
      2000: {
        slidesPerView: 3.3
      },
      1500: {
          slidesPerView: 2.3
      },
      1200: {
        slidesPerView: 2.2
      } ,
      // when window width is <= 999px
      720: {
          slidesPerView: 1.3,
          spaceBetweenSlides: 50
          
      }},
    freeMode: true
  };
  
  constructor( private modalController:ModalController) { }

  ngOnInit() {}

  async verDetalle(id:string){
    const modal = await this.modalController.create({
      component:DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }

}
