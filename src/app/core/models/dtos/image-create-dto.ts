import { Photo } from "../entities/photo";

export interface ImageCreateDto extends Photo{
  imageBase64:string;
  isResize:boolean;
  isShowSlider:boolean;
  isShowGallery:boolean;
}
