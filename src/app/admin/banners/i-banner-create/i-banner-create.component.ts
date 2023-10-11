import { Component } from '@angular/core';

@Component({
  selector: 'app-i-banner-create',
  templateUrl: './i-banner-create.component.html',
  styleUrls: ['./i-banner-create.component.scss']
})
export class IBannerCreateComponent {
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
