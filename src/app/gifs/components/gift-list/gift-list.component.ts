import { Component } from '@angular/core';
import type { Gif } from '../../interfaces/gif.interface';
import {GifListItemComponent} from '../gif-list-item/gif-list-item.component';

@Component({
  selector: 'gift-list',
  imports: [
    GifListItemComponent
  ],
  templateUrl: './gift-list.component.html'
})
export class GiftListComponent {
  gifs: Gif[] = [
    { id: "1", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" },
    { id: "2", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" },
    { id: "3", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" },
    { id: "4", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" },
    { id: "5", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" },
    { id: "6", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" },
    { id: "7", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" },
    { id: "8", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" },
    { id: "9", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" },
    { id: "10", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" },
    { id: "11", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" },
    { id: "12", url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" }
  ];
}
