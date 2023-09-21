import { Component } from '@angular/core';

@Component({
  selector: 'app-completion-list',
  templateUrl: './completion-list.component.html',
  styleUrls: ['./completion-list.component.scss']
})
export class CompletionListComponent {
  displayedColumns = [
    'select',
    'Course Name',
    'Start Date',
    'End Date',
    'actions',
  ];

  breadscrums = [
    {
      title: 'Class List',
      items: ['Schedule Class'],
      active: 'Class List',
    },
  ];
}
