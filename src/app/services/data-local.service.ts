import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = []

  constructor(private storage: Storage, private toastController: ToastController) {
  }

  guardarPelicula(pelicula: PeliculaDetalle):boolean {

    let existe = false;
    let mensaje = '';

    for (let peli of this.peliculas) {
      if (peli.id === pelicula.id && peli.title===pelicula.title) {
        existe = true;
        console.log(peli.id)
        console.log(this.peliculas)
        break;
      }
    }
    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Eliminada de favoritos'
    }
    else {
      this.peliculas.push(pelicula);
      mensaje = "Añadida a favoritos"
    }
    this.storage.set('peliculas', this.peliculas);
    this.presentToast(mensaje);
    return !existe;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  public  async cargarPeliculas() {
    const peliculas= await this.storage.get('peliculas');
    if(peliculas!=null){
      this.peliculas=peliculas;
    }
    return this.peliculas;
  }

  async existePelicula(id:number) {
    await this.cargarPeliculas();
    const existe = this.peliculas.find(peli => peli.id === id);
    return (existe) ? true : false;
  }

}
