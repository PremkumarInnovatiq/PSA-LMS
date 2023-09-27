import { Component } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  breadscrums = [
    {
      title: 'Article',
      items: ['Instructor'],
      active: 'Article',
    },
  ];
}
