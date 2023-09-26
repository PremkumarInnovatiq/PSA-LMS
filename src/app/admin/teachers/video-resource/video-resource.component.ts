import { Component } from '@angular/core';

@Component({
  selector: 'app-video-resource',
  templateUrl: './video-resource.component.html',
  styleUrls: ['./video-resource.component.scss']
})
export class VideoResourceComponent {
  breadscrums = [
    {
      title: 'Video Resource',
      items: ['Instructor'],
      active: 'Video Resource',
    },
  ];

  cards: any;
}
