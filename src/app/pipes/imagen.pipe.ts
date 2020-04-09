import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const url = environment.imagePath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size:string='w500'): string {
    if(img){
      const imgUrl = `${url}/${size}${img}`;
      return imgUrl;
    }
    return 'assets/no-image-banner.jpg';
  }

}
