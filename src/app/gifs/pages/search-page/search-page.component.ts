import {Component, inject, signal} from '@angular/core';
import {GiftListComponent} from "../../components/gift-list/gift-list.component";
import {GifService} from '../../services/gif.service';
import {Gif} from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
    imports: [
        GiftListComponent
    ],
  templateUrl: './search-page.component.html'
})
export default class SearchPageComponent {
  gifsService = inject(GifService);
  gifs = signal<Gif[]>([])
  onSearch(query: string) {
    this.gifsService.searchGifs(query).subscribe(resp =>{
      this.gifs.set(resp)
    });
  }
}
