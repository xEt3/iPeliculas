import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';
import { Tab3Page } from '../../tab3/tab3.page';
import { MoviesService } from '../../services/movies.service';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  
  @Input()peliculas:Pelicula[]=[]

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

  constructor(private modalController:ModalController,private dataLocalService:DataLocalService) { }

  ngOnInit() {}
  @Output() load = new EventEmitter<boolean>();

  async verDetalle(id:string){
    const modal = await this.modalController.create({
      component:DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.onDidDismiss().then(data=>{
      this.load.emit(true);
    })
    modal.present();
  }
}
