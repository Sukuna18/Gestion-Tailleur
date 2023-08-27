import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadImageService {
  defaultUrl:string = "https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0="
  thumbnail: string | ArrayBuffer | null | undefined = this.defaultUrl;

  constructor() { }
  onImageSelected(event: Event|undefined): void {
    const inputElement = event?.target as HTMLInputElement;
    let selectedImage: File | null;
    let imagePreview: string | ArrayBuffer | null | undefined;
    if (inputElement.files && inputElement.files[0]) {
      selectedImage = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>): void => {
      imagePreview = e.target?.result;
      this.thumbnail = imagePreview;
        console.log(this.thumbnail);
        console.log(selectedImage);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      selectedImage = null;
      imagePreview = null;
    }
  }
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
    //   const imageToSend = this.imagePreview instanceof ArrayBuffer
    // ? new Blob([new Uint8Array(this.imagePreview)])
    // : typeof this.imagePreview === 'string'
    // ? this.dataURItoBlob(this.imagePreview)
    // : null;