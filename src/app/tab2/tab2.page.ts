import { Component } from '@angular/core';
import { analyzeFileForInjectables } from '@angular/compiler';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  cargando=false;
  peliculas:Pelicula[]=[]
  textoBuscar='';

  ideas=['Spiderman','Avenger', 'El señor de los anillos' ,'La vida es bella']


  constructor(private moviesService:MoviesService, private modalController:ModalController) {}

  onSearchChange(ev){
    const termino = ev.detail.value;
    if(termino!==''){
      this.cargando=true;
      this.buscarPelicula(termino);
    }else{
      this.peliculas=[];
    }
  }

  buscarPelicula(termino:string){
    this.moviesService.buscarPeliculas(termino).subscribe(data=>{
      this.peliculas=data.results;
      this.cargando=false;
    })
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
