import { Component } from '@angular/core';
import {GiftListComponent} from '../../components/gift-list/gift-list.component';

@Component({
  selector: 'app-trending-page',
  imports: [
    GiftListComponent
  ],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent {

}
