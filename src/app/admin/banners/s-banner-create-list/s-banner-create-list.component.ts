import { Component } from '@angular/core';

@Component({
  selector: 'app-s-banner-create-list',
  templateUrl: './s-banner-create-list.component.html',
  styleUrls: ['./s-banner-create-list.component.scss']
})
export class SBannerCreateListComponent {
  breadscrums = [
    {
      title: 'Blank',
      items: ['Extra'],
      active: 'Blank',
    },
  ];
  constructor() {
    // constructor
  }
}
