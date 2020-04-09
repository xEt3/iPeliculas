import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  oculto=150;

  actores:Cast[]=[]
  pelicula:PeliculaDetalle={};
  existe=false;

  slidesOpt={
    slidesPerView:3.3,
    freeMode: true,
    spaceBetween:-5
  };

  constructor(private dataLocal:DataLocalService, private moviesService:MoviesService, private modalController:ModalController) { }

  async ngOnInit() {

    this.moviesService.getPeliculaDetalle(this.id).subscribe(data=>{
      this.pelicula=data});

    this.moviesService.getActoresPelicula(this.id).subscribe(data=>{
      this.actores=data.cast;
    });
    await this.comprobarFavorito();
    console.log(this.existe)
    console.log(this.pelicula)
  }

  volver(){
    this.modalController.dismiss();
  }

  async favorito(){
    this.existe= this.dataLocal.guardarPelicula(this.pelicula);
    
  }

  async comprobarFavorito(){
    this.existe = await this.dataLocal.existePelicula(this.id);
  }
}
