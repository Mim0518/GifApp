import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import type {GiphyResponse} from '../interfaces/giphy.interfaces'

@Injectable({
  providedIn: 'root'
})
export class GifService {
  private http = inject(HttpClient);
  constructor() {
    this.loadTrendigGifs();
  }
  loadTrendigGifs(){
    this.http.get<GiphyResponse>(`${environment.giphyEndpoint} /gifs/trending`,{
      params:{
        api_key:environment.giphyApiKey,
        limit:20
      }
    });
  }
}
