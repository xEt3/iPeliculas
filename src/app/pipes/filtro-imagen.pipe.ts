import { Pipe, PipeTransform } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';

@Pipe({
  name: 'filtroImagen'
})
export class FiltroImagenPipe implements PipeTransform {

  transform(peliculas:Pelicula[]):Pelicula[] {
    return peliculas.filter(peli=>{
      return peli.backdrop_path
    });
  }

}
