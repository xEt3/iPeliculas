import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input()peliculas:Pelicula[]=[]
  @Output() cargarMas = new EventEmitter();

  slidesOpt={
    slidesPerView: 10.2,
    breakpoints: {
      // when window width is <= 720px
      720: {
          slidesPerView: 3.2
      },
      // when window width is <= 999px
      999: {
          slidesPerView: 6.2
          
      }},
    freeMode: true
  };

  constructor(private modalController:ModalController) { }

  ngOnInit() {}

  onClick(){
   this.cargarMas.emit();
  }

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
