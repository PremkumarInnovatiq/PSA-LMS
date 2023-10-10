import { Component } from '@angular/core';

@Component({
  selector: 'app-progaram-completion-list',
  templateUrl: './progaram-completion-list.component.html',
  styleUrls: ['./progaram-completion-list.component.scss']
})
export class ProgaramCompletionListComponent {
  breadscrums = [
    {
      title: 'Program Completion List',
      items: ['Program'],
      active: 'Program Completion List',
    },
  ];
}
