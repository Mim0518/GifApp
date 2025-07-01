import {Datum, GiphyResponse} from '../interfaces/giphy.interfaces';
import {Gif} from '../interfaces/gif.interface';

export class GifMapper {
  static mapGiphyItemToGif(item:Datum):Gif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }
  static mapGiphyResponseToGifs(response:Datum[]):Gif[]{
    return response.map(item => this.mapGiphyItemToGif(item))
  }
}
