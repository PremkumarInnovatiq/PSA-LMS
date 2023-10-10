import { Component } from '@angular/core';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent {
  breadscrums = [
    {
      title: 'Create Survey',
      items: ['Survey'],
      active: 'Create Survey',
    },
  ];

}
