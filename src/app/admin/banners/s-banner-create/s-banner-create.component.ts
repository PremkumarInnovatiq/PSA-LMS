import { Component } from '@angular/core';

@Component({
  selector: 'app-s-banner-create',
  templateUrl: './s-banner-create.component.html',
  styleUrls: ['./s-banner-create.component.scss']
})
export class SBannerCreateComponent {
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
