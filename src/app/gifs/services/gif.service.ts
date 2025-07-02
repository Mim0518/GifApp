import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import type {GiphyResponse} from '../interfaces/giphy.interfaces'
import {Gif} from '../interfaces/gif.interface';
import {GifMapper} from '../mapper/gif.mapper';
import {map, Observable, tap} from 'rxjs';

const loadFromLocalStorage = () => {
  const historyString = localStorage.getItem('gifs') ?? '{}';
  const gifs = JSON.parse(historyString);
  return gifs;
}

@Injectable({
  providedIn: 'root'
})
export class GifService {
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()))
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(false);
  private currentPage = signal(0);
  trendingGifGroup = computed<Gif[][]>(()=> {
    const groups = [];
    for(let i = 0; i < this.trendingGifs().length; i+=3){
      groups.push(this.trendingGifs().slice(i,i+3));
    }
    return groups;
  });

  constructor() {
    this.loadTrendigGifs();
  }

  saveGifToLocalStorage = effect(()=>{
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs',historyString);
  });

  loadTrendigGifs(){
    if(this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);
    this.http.get<GiphyResponse>(`${environment.giphyEndpoint}/gifs/trending`,{
      params:{
        api_key:environment.giphyApiKey,
        limit:24,
        offset:this.currentPage() * 24,
      }
    }).subscribe((resp) =>{
      const gifs = GifMapper.mapGiphyResponseToGifs(resp.data);
      this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
      this.currentPage.update(currentPage => currentPage + 1);
      console.log(this.currentPage());
      this.trendingGifsLoading.set(false);
    });
  }

  searchGifs(query: string){
    return this.http.get<GiphyResponse>(`${environment.giphyEndpoint}/gifs/search`,{
      params:{
        api_key:environment.giphyApiKey,
        limit:21,
        q:query
      }
    }).pipe(
      map(({data}) => data),
      map(items => GifMapper.mapGiphyResponseToGifs(items)),
      tap((items) =>{
        this.searchHistory.update((history) =>({
          ...history,
          [query.toLowerCase()]:items,
        }));
      })
    );
  }

  getHistoryGifs(query:string):Gif[]{
    return this.searchHistory()[query] ?? [];
  }
}
