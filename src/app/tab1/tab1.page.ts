import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  peliculasRecientes:Pelicula[]=[];
  peliculasPopulares:Pelicula[]=[];
  constructor(private moviesService:MoviesService) {}

  ngOnInit(){
    this.moviesService.getFeature().subscribe(data=>{
      this.peliculasRecientes=data.results;
    });
    this.getPopulares();
  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    this.moviesService.getPulares().subscribe(data=>{
      // se utiliza un arreglo temporal porque no se usa un pipe asyncrono y solo se actualizara si cambia el array entero
      const arrTemp=[...this.peliculasPopulares,...data.results];
      this.peliculasPopulares=arrTemp;
    })
  }
}
