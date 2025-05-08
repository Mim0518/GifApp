import {Component, input} from '@angular/core';
import {Gif} from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.component.html'
})
export class GifListItemComponent {
    gif = input.required<Gif>()
}
