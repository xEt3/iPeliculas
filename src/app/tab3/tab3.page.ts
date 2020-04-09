import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  {

  peliculas: PeliculaDetalle[] = []
  peliculasGeneros: peliculasGenero[]=[];

  constructor(private dataLocalService: DataLocalService, private movieService: MoviesService) {   }

  async ionViewWillEnter(){
    await this.cargarPeliculas();
  }

  public async cargarPeliculas(){
    this.peliculas=await this.dataLocalService.cargarPeliculas();
    this.agruparPeliculasPorGenero(this.peliculas);

  }


  agruparPeliculasPorGenero(peliculas: PeliculaDetalle[]) {
    this.peliculasGeneros=[];
    for (let pelicula of peliculas) {
      for (let genero of pelicula.genres) {
        this.registrarPeliculaEnGenero(pelicula, genero) 
      }
    }
  }

  registrarPeliculaEnGenero(pelicula: PeliculaDetalle, genero: Genre) {
    
    for (let peliculasGenero of this.peliculasGeneros) {
      if (peliculasGenero.genero.name === genero.name) {
        this.guardarPeliculaEnGeneroExistente(peliculasGenero,pelicula);
        return;
      }
    }
    this.guardarPeliculaEnGeneroNuevo(genero,pelicula);
  }

  guardarPeliculaEnGeneroExistente(peliculasGenero:peliculasGenero,pelicula: PeliculaDetalle){
    peliculasGenero.peliculas.push(pelicula);
  }

  guardarPeliculaEnGeneroNuevo(genero:Genre,pelicula: PeliculaDetalle){
    this.peliculasGeneros.push({genero:genero,peliculas:[pelicula]})
  }
}

interface peliculasGenero {
  genero: Genre,
  peliculas: PeliculaDetalle[]
}
