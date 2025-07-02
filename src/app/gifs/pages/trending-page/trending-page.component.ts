import {AfterViewInit, Component, ElementRef, inject, viewChild} from '@angular/core';
import {GifService} from '../../services/gif.service';
import {ScrollStateService} from '../../../shared/services/scroll-state.service';


@Component({
  selector: 'app-trending-page',
  imports: [  ],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent implements AfterViewInit{
  ngAfterViewInit(): void {
      const scrollDiv = this.scrollDivRef()?.nativeElement;
      if (!scrollDiv) return;
      scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('GroupDiv');
  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    const isAtBottom = scrollTop + clientHeight + 500 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);
    if(isAtBottom){
      this.gifService.loadTrendigGifs()
    }
  }


}
