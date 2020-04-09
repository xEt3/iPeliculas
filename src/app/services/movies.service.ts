import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, Pelicula, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey
const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage:number=0;
  private buscarPage:number=0;
  private termino:string="";
  private generos;
  constructor(private http: HttpClient) {

  }

  private ejecutarQuery<T>(query:string){
    query=url+query
    query+=`&api_key=${apiKey}&language=es&include_image_language=es`
    return this.http.get<T>(query);
  }

  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(),hoy.getMonth()+1,0).getDate();
    const mes = hoy.getMonth()+1;
    let mesString;
    if(mes<10){
      mesString='0'+mes;
    }else{
      mesString=mes;
    }
    const inicio=`${hoy.getFullYear()}-${mesString}-01`
    const fin=`${hoy.getFullYear()}-${mesString}-${ultimoDia}`
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPulares() {
    this.popularesPage++;
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`);
  }

  buscarPeliculas(termino:string) {
    if(termino!==this.termino){
      this.termino=termino;
      this.buscarPage=1;
    }else{
      this.buscarPage++;
    }
    return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${termino}&page=${this.buscarPage}`);
  }

  getPeliculaDetalle(id:string){
    //a=1 es para que el primer parametro sea con ?
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`)

  }
  getActoresPelicula(id:string){
    //a=1 es para que el primer parametro sea con ?
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`)

  }

  cargarGeneros():Promise<Genre[]>{
    return new Promise(resolve=>{
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe(resp=>{
        this.generos=resp['genres'];
        resolve(this.generos);
      })
    })
  }
  
}